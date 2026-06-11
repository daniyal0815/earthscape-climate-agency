// HadoopClusterView.tsx
import React, { useState, useEffect, useRef } from 'react';
import { HADOOP_NODES, MAPREDUCE_JOBS } from '../mockData';
import { Server, Database, Play, AlertCircle, Terminal, Cpu, HardDrive, RefreshCw, Lock } from 'lucide-react';
import type { UserRole } from '../utils/permissions';

interface HadoopClusterViewProps {
  userRole: UserRole;
}

export const HadoopClusterView: React.FC<HadoopClusterViewProps> = ({ userRole }) => {
  const [nodes, setNodes] = useState(HADOOP_NODES);
  const [selectedJobId, setSelectedJobId] = useState('MR-001');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionProgress, setExecutionProgress] = useState(0);
  const [executionStage, setExecutionStage] = useState('');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  
  // Custom MapReduce state
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customJobName, setCustomJobName] = useState('MyCustomClimateJob');
  const [customJavaCode, setCustomJavaCode] = useState(
`public static class ClimateMapper extends Mapper<LongWritable, Text, Text, FloatWritable> {
    private Text stationKey = new Text();
    private FloatWritable tempVal = new FloatWritable();

    public void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
        String[] tokens = value.toString().split(",");
        if (tokens[0].equals("StationID")) return; // Skip Header
        
        float temp = Float.parseFloat(tokens[2]); // Temp reading
        if (temp > 45.0f) { // Anomaly threshold
            stationKey.set(tokens[1]); // Region Name
            tempVal.set(temp);
            context.write(stationKey, tempVal);
        }
    }
}`
  );

  const consoleEndRef = useRef<HTMLDivElement>(null);
  const executionTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [consoleLogs]);

  useEffect(() => {
    return () => {
      if (executionTimerRef.current) clearInterval(executionTimerRef.current);
    };
  }, []);

  const triggerMapReduce = () => {
    if (userRole !== 'Admin' || isExecuting) return;
    
    setIsExecuting(true);
    setExecutionProgress(0);
    setConsoleLogs([]);
    
    const activeJob = isCustomMode 
      ? {
          id: 'MR-CUSTOM',
          name: customJobName,
          description: 'User compiled custom MapReduce job.',
          inputDataset: 'hdfs:///data/climate/custom/logs_raw.csv',
          outputDirectory: 'hdfs:///analytics/output/custom_analysis/',
          mapperCount: 4,
          reducerCount: 1,
          logs: [
            `Job initialized. Submission ID: job_20260521_custom_${Date.now().toString().slice(-4)}`,
            'Compiling Mapper & Reducer Java classes in Sandbox...',
            'Compilation successful. Class files loaded into ResourceManager.',
            'NameNode splitting dataset across 4 cluster sectors.',
            'Map Phase started. Spawning 4 thread mappers.',
            'Map progress: 50% - Scanning for custom conditions.',
            'Map progress: 100% - Generated intermediate pairs.',
            'Shuffle & Sort: Distributing records by geography.',
            'Reduce Phase started: Consolidating key values.',
            'Reduce progress: 100% - Operation finished.',
            'Writing output files to hdfs:///analytics/output/custom_analysis/part-r-00000',
            'Job completed successfully.'
          ]
        }
      : MAPREDUCE_JOBS.find(j => j.id === selectedJobId) || MAPREDUCE_JOBS[0];

    const totalLogs = activeJob.logs;
    
    // Simulate node resource spikes
    setNodes(prev => prev.map(node => {
      if (node.role === 'DataNode') {
        return {
          ...node,
          status: 'Busy',
          cpuUsage: Math.min(95, node.cpuUsage + 25),
          ramUsage: Math.min(90, node.ramUsage + 12),
          activeTasks: node.activeTasks + 2
        };
      }
      if (node.role === 'ResourceManager') {
        return { ...node, status: 'Busy', cpuUsage: 80, ramUsage: 75 };
      }
      return node;
    }));

    if (executionTimerRef.current) clearInterval(executionTimerRef.current);

    executionTimerRef.current = setInterval(() => {
      setExecutionProgress(prev => {
        const next = prev + 1;

        if (next === 1) {
          setExecutionStage('SPLITTING DATA BLOCKS');
          setConsoleLogs(curr => [...curr, `[SYSTEM] ${totalLogs[0]}`, `[SYSTEM] ${totalLogs[1] || ''}`]);
        } else if (next === 25) {
          setExecutionStage('PARALLEL MAPPING OPERATIONS');
          setConsoleLogs(curr => [...curr, `[SYSTEM] ${totalLogs[2]}`, `[SYSTEM] ${totalLogs[3] || ''}`]);
        } else if (next === 50) {
          setExecutionStage('SHUFFLING & SORTING PARTITIONS');
          setConsoleLogs(curr => [...curr, `[SYSTEM] ${totalLogs[4] || ''}`, `[SYSTEM] ${totalLogs[5] || ''}`, `[SYSTEM] ${totalLogs[6] || ''}`]);
        } else if (next === 75) {
          setExecutionStage('MERGING & REDUCING KEYS');
          setConsoleLogs(curr => [...curr, `[SYSTEM] ${totalLogs[7] || ''}`, `[SYSTEM] ${totalLogs[8] || ''}`, `[SYSTEM] ${totalLogs[9] || ''}`]);
        } else if (next === 95) {
          setExecutionStage('WRITING BLOCKS TO HDFS');
          setConsoleLogs(curr => [...curr, `[SYSTEM] ${totalLogs[10] || ''}`]);
        } else if (next >= 100) {
          if (executionTimerRef.current) clearInterval(executionTimerRef.current);
          executionTimerRef.current = null;
          setExecutionStage('JOB FINISHED');
          setConsoleLogs(curr => [...curr, `[SYSTEM] ${totalLogs[totalLogs.length - 1]}`, '[SUCCESS] MapReduce task finalized. Cluster returning to idle state.']);
          setIsExecuting(false);
          setNodes(HADOOP_NODES);
          return 100;
        }
        return next;
      });
    }, 150);
  };

  const getStageColor = () => {
    switch (executionStage) {
      case 'SPLITTING DATA BLOCKS': return 'var(--accent)';
      case 'PARALLEL MAPPING OPERATIONS': return 'var(--primary)';
      case 'SHUFFLING & SORTING PARTITIONS': return 'var(--warning)';
      case 'MERGING & REDUCING KEYS': return 'var(--danger)';
      case 'WRITING BLOCKS TO HDFS': return '#a855f7';
      case 'JOB FINISHED': return 'var(--primary)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* View Header */}
      <div>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Server color="var(--primary)" /> HDFS Cluster & MapReduce Engine
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
          Real-time observation panel of our distributed Hadoop climate storage lake and MapReduce parallel processor threads.
          <span style={{ display: 'block', marginTop: '6px', fontSize: '0.8rem', color: 'var(--primary)' }}>
            Admin-only infrastructure module — cluster orchestration and MapReduce job execution.
          </span>
        </p>
      </div>

      {/* Cluster Map Section */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Database size={20} color="var(--primary)" /> Hadoop HDFS Core Cluster Map
          </h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="status-indicator status-online"></span> HDFS Status: HEALTHY
          </span>
        </div>

        {/* Distributed Nodes Layout */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '16px',
          position: 'relative'
        }}>
          
          {/* Loop over nodes */}
          {nodes.map((node, i) => (
            <div key={i} className="glass-panel" style={{ 
              padding: '16px', 
              background: node.status === 'Busy' ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255, 255, 255, 0.02)',
              borderColor: node.status === 'Busy' ? 'var(--primary)' : 'var(--border-color)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Particle animations inside DataNodes when processing */}
              {isExecuting && node.role === 'DataNode' && (
                <div className="particle-flow-down" style={{ animationDelay: `${i * 0.4}s` }} />
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{node.name}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  <span className={`status-indicator ${
                    node.status === 'Online' ? 'status-online' : node.status === 'Busy' ? 'status-busy' : 'status-offline'
                  }`} />
                  {node.status}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Role</span>
                  <span style={{ color: 'var(--accent)', fontWeight: 500 }}>{node.role}</span>
                </div>

                {/* Gauges */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Cpu size={12} /> CPU</span>
                    <span>{node.cpuUsage}%</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                    <div style={{ 
                      height: '100%', 
                      background: node.cpuUsage > 80 ? 'var(--danger)' : node.cpuUsage > 50 ? 'var(--warning)' : 'var(--primary)', 
                      width: `${node.cpuUsage}%`,
                      transition: 'width 0.5s ease'
                    }} />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Server size={12} /> RAM</span>
                    <span>{node.ramUsage}%</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                    <div style={{ 
                      height: '100%', 
                      background: node.ramUsage > 85 ? 'var(--danger)' : 'var(--primary)', 
                      width: `${node.ramUsage}%`,
                      transition: 'width 0.5s ease'
                    }} />
                  </div>
                </div>

                {node.storageCapacityGB > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><HardDrive size={12} /> Disk</span>
                      <span>{Math.round((node.storageUsedGB / node.storageCapacityGB) * 100)}%</span>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px' }}>
                      <div style={{ 
                        height: '100%', 
                        background: 'var(--accent)', 
                        width: `${(node.storageUsedGB / node.storageCapacityGB) * 100}%`,
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* MapReduce Execution Center */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', flexWrap: 'wrap' }}>
        
        {/* Job selector & Compiler Panel */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3>Distributed MapReduce Orchestrator</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Submit parallelized computation tasks to crunch raw HDFS spatial grids.
          </p>

          {/* Tab Selection */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', gap: '16px' }}>
            <button 
              className="btn btn-secondary" 
              onClick={() => setIsCustomMode(false)}
              style={{ 
                border: 'none', 
                background: 'none',
                color: !isCustomMode ? 'var(--primary)' : 'var(--text-secondary)',
                borderBottom: !isCustomMode ? '2px solid var(--primary)' : 'none',
                borderRadius: 0,
                padding: '4px 8px'
              }}
            >
              Standard Libraries
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => setIsCustomMode(true)}
              style={{ 
                border: 'none', 
                background: 'none',
                color: isCustomMode ? 'var(--primary)' : 'var(--text-secondary)',
                borderBottom: isCustomMode ? '2px solid var(--primary)' : 'none',
                borderRadius: 0,
                padding: '4px 8px'
              }}
            >
              Custom Java MapReduce
            </button>
          </div>

          {!isCustomMode ? (
            // Predefined Jobs
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {MAPREDUCE_JOBS.map((job) => (
                <div 
                  key={job.id} 
                  onClick={() => !isExecuting && setSelectedJobId(job.id)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid',
                    borderColor: selectedJobId === job.id ? 'var(--primary)' : 'var(--border-color)',
                    background: selectedJobId === job.id ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
                    cursor: isExecuting ? 'not-allowed' : 'pointer',
                    transition: 'var(--transition)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{job.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>{job.id}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{job.description}</p>
                </div>
              ))}
            </div>
          ) : (
            // Custom Mapper Input
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Job Class Identifier</span>
                <input 
                  type="text" 
                  value={customJobName} 
                  onChange={(e) => setCustomJobName(e.target.value)}
                  className="input-field" 
                  placeholder="e.g. TemperatureAnomalyMapper" 
                  disabled={isExecuting}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Java Source Code</span>
                <textarea 
                  value={customJavaCode} 
                  onChange={(e) => setCustomJavaCode(e.target.value)}
                  className="input-field" 
                  style={{ height: '140px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', resize: 'none' }}
                  disabled={isExecuting}
                />
              </div>
            </div>
          )}

          <button 
            onClick={triggerMapReduce} 
            disabled={isExecuting || userRole !== 'Admin'} 
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', height: '45px', marginTop: 'auto' }}
          >
            <Play size={16} fill="currentColor" /> {isExecuting ? 'Parallel Threads Executing...' : 'Execute Parallel Job'}
          </button>
          {userRole !== 'Admin' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--warning)', marginTop: '8px' }}>
              <Lock size={14} /> MapReduce execution restricted to Administrators.
            </div>
          )}
        </div>

        {/* Animated Terminal / Progress Output */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '430px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={18} color="var(--primary)" /> Hadoop Output Console
            </h3>
            {isExecuting && (
              <RefreshCw size={14} className="status-indicator status-online" style={{ animation: 'spin 2s linear infinite' }} />
            )}
          </div>

          {/* Progress bar */}
          {isExecuting && (
            <div style={{ 
              background: 'rgba(255,255,255,0.03)', 
              border: '1px solid var(--border-color)', 
              padding: '12px 16px', 
              borderRadius: 'var(--radius-sm)', 
              marginBottom: '16px' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
                <span>Execution Stage: <strong style={{ color: getStageColor() }}>{executionStage}</strong></span>
                <span style={{ color: 'var(--primary)' }}>{executionProgress}%</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}>
                <div style={{ height: '100%', background: 'var(--primary)', width: `${executionProgress}%`, transition: 'width 0.15s linear' }} />
              </div>
            </div>
          )}

          {/* Shell logging */}
          <div style={{ 
            flex: 1, 
            background: 'var(--console-bg)', 
            borderRadius: 'var(--radius-md)', 
            border: '1px solid var(--border-color)', 
            padding: '16px', 
            overflowY: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            lineHeight: 1.5,
            color: 'var(--console-text)'
          }}>
            {consoleLogs.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: '8px' }}>
                <AlertCircle size={32} strokeWidth={1} />
                <span>Submit a MapReduce job to stream logs.</span>
              </div>
            ) : (
              consoleLogs.map((log, idx) => {
                let color = 'var(--console-text)';
                if (log.startsWith('[SUCCESS]')) color = 'var(--primary)';
                else if (log.startsWith('[SYSTEM]')) color = 'var(--accent)';
                
                return (
                  <div key={idx} style={{ color, marginBottom: '6px', borderLeft: log.startsWith('[SUCCESS]') ? '2px solid var(--primary)' : 'none', paddingLeft: log.startsWith('[SUCCESS]') ? '8px' : 0 }}>
                    {log}
                  </div>
                );
              })
            )}
            <div ref={consoleEndRef} />
          </div>
        </div>

      </div>

    </div>
  );
};
