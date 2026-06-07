// DocsView.tsx
import React, { useState } from 'react';
import { BookOpen, Award, FileText, Cpu, Layout, HelpCircle } from 'lucide-react';

export const DocsView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'problem' | 'dfd' | 'flowchart' | 'specs' | 'install'>('problem');

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* View Header */}
      <div>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BookOpen color="var(--primary)" /> Academic Documentation Hub
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
          Official EarthScape Climate Agency eProject deliverables, design specifications, and DFD layout maps.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '24px', flexWrap: 'wrap' }}>
        
        {/* Navigation Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            className="btn btn-secondary" 
            onClick={() => setActiveSection('problem')}
            style={{ 
              justifyContent: 'flex-start',
              color: activeSection === 'problem' ? 'var(--primary)' : 'var(--text-primary)',
              borderColor: activeSection === 'problem' ? 'var(--primary)' : 'var(--border-color)',
              background: activeSection === 'problem' ? 'var(--primary-dim)' : 'transparent'
            }}
          >
            <FileText size={16} /> 1. Problem Statement
          </button>
          
          <button 
            className="btn btn-secondary" 
            onClick={() => setActiveSection('dfd')}
            style={{ 
              justifyContent: 'flex-start',
              color: activeSection === 'dfd' ? 'var(--primary)' : 'var(--text-primary)',
              borderColor: activeSection === 'dfd' ? 'var(--primary)' : 'var(--border-color)',
              background: activeSection === 'dfd' ? 'var(--primary-dim)' : 'transparent'
            }}
          >
            <Layout size={16} /> 2. Data Flow (DFD)
          </button>

          <button 
            className="btn btn-secondary" 
            onClick={() => setActiveSection('flowchart')}
            style={{ 
              justifyContent: 'flex-start',
              color: activeSection === 'flowchart' ? 'var(--primary)' : 'var(--text-primary)',
              borderColor: activeSection === 'flowchart' ? 'var(--primary)' : 'var(--border-color)',
              background: activeSection === 'flowchart' ? 'var(--primary-dim)' : 'transparent'
            }}
          >
            <Award size={16} /> 3. MapReduce Flow
          </button>

          <button 
            className="btn btn-secondary" 
            onClick={() => setActiveSection('specs')}
            style={{ 
              justifyContent: 'flex-start',
              color: activeSection === 'specs' ? 'var(--primary)' : 'var(--text-primary)',
              borderColor: activeSection === 'specs' ? 'var(--primary)' : 'var(--border-color)',
              background: activeSection === 'specs' ? 'var(--primary-dim)' : 'transparent'
            }}
          >
            <Cpu size={16} /> 4. System Specs
          </button>

          <button 
            className="btn btn-secondary" 
            onClick={() => setActiveSection('install')}
            style={{ 
              justifyContent: 'flex-start',
              color: activeSection === 'install' ? 'var(--primary)' : 'var(--text-primary)',
              borderColor: activeSection === 'install' ? 'var(--primary)' : 'var(--border-color)',
              background: activeSection === 'install' ? 'var(--primary-dim)' : 'transparent'
            }}
          >
            <HelpCircle size={16} /> 5. Setup & Install
          </button>

          {/* Student Group Info */}
          <div className="glass-panel" style={{ padding: '16px', marginTop: '12px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ color: 'var(--primary)', fontWeight: 'bold', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>PROJECT TEAM (Sem-6)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div>
                <strong style={{ color: '#ffffff' }}>M. OWAIS KHAN</strong>
                <div style={{ color: 'var(--text-secondary)' }}>Student1483137</div>
              </div>
              <div>
                <strong style={{ color: '#ffffff' }}>M. OWAIS KHAN</strong>
                <div style={{ color: 'var(--text-secondary)' }}>Student1484254</div>
              </div>
              <div>
                <strong style={{ color: '#ffffff' }}>M. SHEHARYAR</strong>
                <div style={{ color: 'var(--text-secondary)' }}>Student1485732</div>
              </div>
              <div>
                <strong style={{ color: '#ffffff' }}>M. UMAR</strong>
                <div style={{ color: 'var(--text-secondary)' }}>Student1484275</div>
              </div>
              <div>
                <strong style={{ color: '#ffffff' }}>M. ROHAN ZAFAR</strong>
                <div style={{ color: 'var(--text-secondary)' }}>Student1486748</div>
              </div>
            </div>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '6px', color: 'var(--accent)', fontSize: '0.7rem' }}>
              Timeline: 09-May to 08-Jun
            </div>
          </div>
        </div>

        {/* Content Viewer */}
        <div className="glass-panel" style={{ padding: '30px', minHeight: '500px', lineHeight: 1.6 }}>
          
          {/* Section 1: Problem Definition */}
          {activeSection === 'problem' && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', color: 'var(--primary)' }}>
                1. Problem Definition & Core Context
              </h2>
              
              <div style={{ background: 'rgba(255,255,255,0.01)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ color: 'var(--accent)', marginBottom: '8px' }}>Background Situation</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Climate change is a global challenge demanding comprehensive analysis and proactive measures. The surge in greenhouse gas emissions, logging/deforestation, and changes in land occupancy have triggered shifts in climate behaviors, yielding severe droughts, wildfires, and storm surges. 
                </p>
              </div>

              <div>
                <h4 style={{ color: '#ffffff', marginBottom: '8px' }}>The Challenge: EarthScape Climate Agency</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  The EarthScape Climate Agency receives huge volumes of data daily from satellites, environmental IoT telemetry, and national weather indexes. 
                  Traditional relational databases fail to handle the massive multi-terabyte data volume, scale storage limits, and execute fast calculations. 
                </p>
              </div>

              <div>
                <h4 style={{ color: '#ffffff', marginBottom: '8px' }}>The Proposed Solution</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  We implement a distributed architecture combining:
                </p>
                <ul style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li><strong>Hadoop HDFS</strong>: For linear scaling, fault-tolerant replication, and spatial file chunk distribution.</li>
                  <li><strong>Hadoop MapReduce</strong>: For parallel batch execution of matrix math, missing data imputation, and correlations.</li>
                  <li><strong>MongoDB</strong>: For high-velocity indexing of live stream sensor logs and metadata indexes.</li>
                  <li><strong>Predictive Models (LSTM/Random Forest)</strong>: For calculating warming patterns and forecast predictions up to the year 2050.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Section 2: DFD Diagrams */}
          {activeSection === 'dfd' && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h2 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', color: 'var(--primary)' }}>
                2. Data Flow Diagrams (DFDs)
              </h2>

              {/* DFD Level 0 */}
              <div>
                <h4 style={{ color: 'var(--accent)', marginBottom: '12px' }}>DFD Level 0: Context Diagram</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Illustrates the external entities that feed raw climate grids into the system boundary and get analysis metrics back.
                </p>
                
                {/* Visual DFD Level 0 Block Diagram */}
                <div style={{ 
                  background: 'var(--console-bg)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: 'var(--radius-md)', 
                  padding: '24px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '20px'
                }}>
                  <div style={{ background: 'rgba(6, 182, 212, 0.1)', border: '1px solid var(--accent)', padding: '12px', borderRadius: '6px', fontSize: '0.8rem', textAlign: 'center', minWidth: '120px' }}>
                    <strong>Environmental Satellites / Stations</strong>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '4px' }}>GeoTIFFs & CSV Logs</div>
                  </div>
                  
                  <div style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>➔</div>

                  <div style={{ 
                    background: 'rgba(16, 185, 129, 0.1)', 
                    border: '2px solid var(--primary)', 
                    padding: '20px 30px', 
                    borderRadius: '12px', 
                    fontSize: '0.9rem', 
                    textAlign: 'center',
                    boxShadow: '0 0 15px rgba(16, 185, 129, 0.1)',
                    minWidth: '220px'
                  }}>
                    <strong>ECA CLIMATE PLATFORM</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>MapReduce, HDFS, ML</div>
                  </div>

                  <div style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>➔</div>

                  <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid var(--warning)', padding: '12px', borderRadius: '6px', fontSize: '0.8rem', textAlign: 'center', minWidth: '120px' }}>
                    <strong>Stakeholders / Analysts</strong>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Dashboards & Alerts</div>
                  </div>
                </div>
              </div>

              {/* DFD Level 1 */}
              <div>
                <h4 style={{ color: 'var(--accent)', marginBottom: '12px' }}>DFD Level 1: Functional Sub-processes</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  Decomposes the internal processing units, demonstrating mapping pathways, HDFS repositories, and metadata stores.
                </p>

                {/* Level 1 Process Blocks list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px', background: 'rgba(255,255,255,0.01)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--primary)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 'bold' }}>PROCESS 1.0</span>
                    <div>
                      <strong style={{ fontSize: '0.85rem', color: '#ffffff' }}>High-Velocity Data Ingestion Gate</strong>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Verifies file schema, Normalizes geographical bounds, and splits file byte-streams into HDFS blocks.</p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px', background: 'rgba(255,255,255,0.01)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 'bold' }}>PROCESS 2.0</span>
                    <div>
                      <strong style={{ fontSize: '0.85rem', color: '#ffffff' }}>HDFS Storage Mapper</strong>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Distributes replicated block segments across DataNodes and catalogs indices in MongoDB stores.</p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px', background: 'rgba(255,255,255,0.01)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--warning)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--warning)', fontWeight: 'bold' }}>PROCESS 3.0</span>
                    <div>
                      <strong style={{ fontSize: '0.85rem', color: '#ffffff' }}>Distributed MapReduce Processor</strong>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Spawns Map threads on nodes, performs local key consolidation, shuffles intermediate buffers, and reduces results.</p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '16px', background: 'rgba(255,255,255,0.01)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--danger)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--danger)', fontWeight: 'bold' }}>PROCESS 4.0</span>
                    <div>
                      <strong style={{ fontSize: '0.85rem', color: '#ffffff' }}>LSTM Predictor & Alert Engine</strong>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Trains neural networks on historical data points to generate scenarios and triggers real-time warning alarms.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Flowcharts */}
          {activeSection === 'flowchart' && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', color: 'var(--primary)' }}>
                3. MapReduce Activity Flowchart
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Delineates the exact logical loop executed by Hadoop during parallel cluster data reduction:
              </p>

              {/* Graphical flow cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                <div style={{ width: '220px', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '10px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', fontSize: '0.8rem' }}>
                  <strong>Start: Read Dataset Input</strong>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Identify HDFS block addresses</div>
                </div>
                <span style={{ color: 'var(--primary)' }}>↓</span>
                
                <div style={{ width: '220px', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '10px', textAlign: 'center', background: 'rgba(6, 182, 212, 0.1)', borderColor: 'var(--accent)', fontSize: '0.8rem' }}>
                  <strong>Input Split Mapping</strong>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Execute Mapper class parallelly</div>
                </div>
                <span style={{ color: 'var(--primary)' }}>↓</span>

                <div style={{ width: '220px', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '10px', textAlign: 'center', background: 'rgba(245, 158, 11, 0.1)', borderColor: 'var(--warning)', fontSize: '0.8rem' }}>
                  <strong>Shuffle & Sort Phase</strong>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Group identical key collections</div>
                </div>
                <span style={{ color: 'var(--primary)' }}>↓</span>

                <div style={{ width: '220px', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '10px', textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', borderColor: 'var(--danger)', fontSize: '0.8rem' }}>
                  <strong>Reduce Operations</strong>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Merge key arrays to single value</div>
                </div>
                <span style={{ color: 'var(--primary)' }}>↓</span>

                <div style={{ width: '220px', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '10px', textAlign: 'center', background: 'rgba(16, 185, 129, 0.1)', borderColor: 'var(--primary)', fontSize: '0.8rem' }}>
                  <strong>Write Output Blocks</strong>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Save final part-r-0000 files to HDFS</div>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Specs */}
          {activeSection === 'specs' && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', color: 'var(--primary)' }}>
                4. Academic Project System Specs
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="glass-panel" style={{ padding: '20px', background: 'rgba(255,255,255,0.01)' }}>
                  <h4 style={{ color: 'var(--accent)', marginBottom: '12px' }}>Hardware Prerequisites</h4>
                  <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li><strong>CPU</strong>: Minimum i5 4-Cores (Intel i7 Core recommended for cluster VM virtualization).</li>
                    <li><strong>Memory (RAM)</strong>: 16 GB DDR4/DDR5 system memory.</li>
                    <li><strong>Storage</strong>: 500 GB High-Speed Solid-State Disk (SSD).</li>
                    <li><strong>GPU</strong>: Standard integrated or dedicated Graphics Card.</li>
                    <li><strong>Operating System</strong>: 64-Bit Microsoft Windows 10/11 or modern Linux.</li>
                  </ul>
                </div>

                <div className="glass-panel" style={{ padding: '20px', background: 'rgba(255,255,255,0.01)' }}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '12px' }}>Software Prerequisites</h4>
                  <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li><strong>Big Data</strong>: Apache Hadoop 3.x cluster framework, HDFS.</li>
                    <li><strong>Analytics Server</strong>: Apache Impala server for analytical SQL queries.</li>
                    <li><strong>Operational Cache</strong>: MongoDB Compass and Shell v6.x.</li>
                    <li><strong>Notebooks</strong>: Jupyter Anaconda Notebook 3 for model exploration.</li>
                    <li><strong>Visualizations</strong>: Tableau Desktop / Tableau Public.</li>
                    <li><strong>IDE Tools</strong>: Microsoft VS Code / PyCharm / RStudio.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Setup Instructions */}
          {activeSection === 'install' && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h2 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', color: 'var(--primary)' }}>
                5. Running & Installation Guide
              </h2>
              
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                How to initialize, run, and compile the EarthScape Climate Agency web interface repository:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                <div style={{ background: 'var(--console-bg)', border: '1px solid var(--border-color)', padding: '14px', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--primary)', display: 'block', marginBottom: '6px' }}># Step 1: Navigate to repository workspace</span>
                  cd C:\earthscape-climate-agency
                </div>

                <div style={{ background: 'var(--console-bg)', border: '1px solid var(--border-color)', padding: '14px', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--primary)', display: 'block', marginBottom: '6px' }}># Step 2: Install client packages & charts libraries</span>
                  npm install
                </div>

                <div style={{ background: 'var(--console-bg)', border: '1px solid var(--border-color)', padding: '14px', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--primary)', display: 'block', marginBottom: '6px' }}># Step 3: Run the local Vite dev server</span>
                  npm run dev
                </div>

                <div style={{ background: 'var(--console-bg)', border: '1px solid var(--border-color)', padding: '14px', borderRadius: '6px' }}>
                  <span style={{ color: 'var(--primary)', display: 'block', marginBottom: '6px' }}># Step 4: Build a compiled static production package</span>
                  npm run build
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
