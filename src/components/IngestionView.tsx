// IngestionView.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Upload, Database, FileSpreadsheet, Image, Activity, CheckCircle2 } from 'lucide-react';
import type { UserRole } from '../utils/permissions';

interface IngestionStep {
  label: string;
  status: 'pending' | 'active' | 'success' | 'failed';
  details?: string;
}

export const IngestionView: React.FC<{ userRole: UserRole }> = ({ userRole }) => {
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordsCount, setRecordsCount] = useState(0);
  const [ingestionSpeed, setIngestionSpeed] = useState(0);
  const [showCompleteAlert, setShowCompleteAlert] = useState(false);
  
  // Pipeline processing steps
  const [pipelineSteps, setPipelineSteps] = useState<IngestionStep[]>([
    { label: 'Ingest File & Verify Schema', status: 'pending' },
    { label: 'Cleanse Records & Handle Missing Values', status: 'pending' },
    { label: 'Segment Data into HDFS 128MB Blocks', status: 'pending' },
    { label: 'Replicate Blocks across DataNodes', status: 'pending' },
    { label: 'Index Geospatial Metadata into MongoDB', status: 'pending' }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pipelineTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const speedTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      pipelineTimersRef.current.forEach(clearTimeout);
      if (speedTimerRef.current) clearInterval(speedTimerRef.current);
    };
  }, []);

  const clearPipelineTimers = () => {
    pipelineTimersRef.current.forEach(clearTimeout);
    pipelineTimersRef.current = [];
    if (speedTimerRef.current) {
      clearInterval(speedTimerRef.current);
      speedTimerRef.current = null;
    }
  };

  const scheduleStep = (callback: () => void, delay: number) => {
    const timer = setTimeout(callback, delay);
    pipelineTimersRef.current.push(timer);
  };

  const startPipeline = (type: 'csv' | 'tiff' | 'json') => {
    if (userRole !== 'Admin') return;
    clearPipelineTimers();
    setIsProcessing(true);
    setShowCompleteAlert(false);
    setIngestionSpeed(0);
    setRecordsCount(0);
    
    // Reset pipeline steps
    setPipelineSteps([
      { label: 'Ingest File & Verify Schema', status: 'active', details: 'Scanning headers and checking standard climate schema...' },
      { label: 'Cleanse Records & Handle Missing Values', status: 'pending' },
      { label: 'Segment Data into HDFS 128MB Blocks', status: 'pending' },
      { label: 'Replicate Blocks across DataNodes', status: 'pending' },
      { label: 'Index Geospatial Metadata into MongoDB', status: 'pending' }
    ]);

    speedTimerRef.current = setInterval(() => {
      setIngestionSpeed(() => Math.round(45 + Math.random() * 85));
    }, 400);

    scheduleStep(() => {
      // Step 1 done, Step 2 active
      setPipelineSteps(prev => [
        { label: 'Ingest File & Verify Schema', status: 'success', details: `File parsed successfully. Structure: ${type === 'tiff' ? 'Satellite GeoTIFF Grid' : type === 'csv' ? 'Station Telemetry Columns' : 'IoT Sensor Stream JSON'}.` },
        { label: 'Cleanse Records & Handle Missing Values', status: 'active', details: 'Running spatial regression to fill null temperatures...' },
        ...prev.slice(2)
      ]);
      setRecordsCount(120900);
    }, 1200);

    scheduleStep(() => {
      // Step 2 done, Step 3 active
      setPipelineSteps(prev => [
        prev[0],
        { label: 'Cleanse Records & Handle Missing Values', status: 'success', details: 'Sanitized 24 null metrics. Geospatial constraints normalized.' },
        { label: 'Segment Data into HDFS 128MB Blocks', status: 'active', details: 'Chunking file stream into HDFS-optimised blocks...' },
        ...prev.slice(3)
      ]);
      setRecordsCount(483600);
    }, 2400);

    scheduleStep(() => {
      // Step 3 done, Step 4 active
      const blockCount = type === 'tiff' ? 12 : type === 'csv' ? 4 : 2;
      setPipelineSteps(prev => [
        prev[0],
        prev[1],
        { label: 'Segment Data into HDFS 128MB Blocks', status: 'success', details: `Split file into ${blockCount} distinct 128MB chunks.` },
        { label: 'Replicate Blocks across DataNodes', status: 'active', details: 'Transmitting block copies to nodes using Rack Awareness policy...' },
        prev[4]
      ]);
      setRecordsCount(958100);
    }, 3800);

    scheduleStep(() => {
      // Step 4 done, Step 5 active
      setPipelineSteps(prev => [
        prev[0],
        prev[1],
        prev[2],
        { label: 'Replicate Blocks across DataNodes', status: 'success', details: 'Replicas placed safely on datanode-01, datanode-02, and datanode-03.' },
        { label: 'Index Geospatial Metadata into MongoDB', status: 'active', details: 'Compiling index catalog on coordinates sphere...' }
      ]);
      setRecordsCount(1342900);
    }, 5000);

    scheduleStep(() => {
      if (speedTimerRef.current) clearInterval(speedTimerRef.current);
      speedTimerRef.current = null;
      setPipelineSteps(prev => [
        prev[0],
        prev[1],
        prev[2],
        prev[3],
        { label: 'Index Geospatial Metadata into MongoDB', status: 'success', details: 'Geospatial index created. MongoDB operational collections updated.' }
      ]);
      setIsProcessing(false);
      setIngestionSpeed(0);
      setShowCompleteAlert(true);
    }, 6200);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const ext = file.name.split('.').pop()?.toLowerCase();
      
      if (ext === 'csv') startPipeline('csv');
      else if (ext === 'tif' || ext === 'tiff') startPipeline('tiff');
      else if (ext === 'json') startPipeline('json');
      else alert('Please upload a valid climate dataset (.csv, .json, or .tif/tiff file).');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const ext = file.name.split('.').pop()?.toLowerCase();
      
      if (ext === 'csv') startPipeline('csv');
      else if (ext === 'tif' || ext === 'tiff') startPipeline('tiff');
      else if (ext === 'json') startPipeline('json');
      else alert('Please upload a valid climate dataset (.csv, .json, or .tif/tiff file).');
    }
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* View Header */}
      <div>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Upload color="var(--primary)" /> Climate Data Ingestion Pipeline
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
          Simulated high-performance gateway ingestion. Stream satellite raster bands, station CSVs, and IoT logs into HDFS.
          <span style={{ display: 'block', marginTop: '6px', fontSize: '0.8rem', color: 'var(--primary)' }}>
            Admin-only data pipeline — authorized personnel may ingest and replicate climate datasets into HDFS.
          </span>
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '24px', flexWrap: 'wrap' }}>
        
        {/* Upload portal zone */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div 
            className="glass-panel" 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            style={{
              padding: '40px',
              textAlign: 'center',
              border: dragActive ? '2px dashed var(--primary)' : '1px dashed var(--border-color)',
              background: dragActive ? 'rgba(16, 185, 129, 0.05)' : 'var(--card-bg)',
              borderRadius: 'var(--radius-lg)',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              transition: 'var(--transition)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '300px'
            }}
            onClick={() => !isProcessing && fileInputRef.current?.click()}
          >
            <input 
              ref={fileInputRef} 
              type="file" 
              style={{ display: 'none' }} 
              accept=".csv,.json,.tiff,.tif" 
              onChange={handleFileChange}
              disabled={isProcessing}
            />

            <div style={{ 
              background: 'rgba(255,255,255,0.02)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '50%', 
              padding: '20px',
              marginBottom: '16px',
              color: 'var(--primary)',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.05)'
            }}>
              <Upload size={32} />
            </div>
            
            <h4 style={{ marginBottom: '8px' }}>Drag & Drop Climate Dataset</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '280px', lineHeight: 1.4 }}>
              Supports GeoTIFF imagery (`.tif`), Station tables (`.csv`), and IoT streams (`.json`).
            </p>
          </div>

          {/* Quick presets for testing */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '12px', fontWeight: 600 }}>
              LOAD PRE-CONFIGURED SCENARIOS FOR VERIFICATION
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => startPipeline('tiff')}
                disabled={isProcessing}
                style={{ fontSize: '0.8rem', padding: '8px 10px', justifyContent: 'center' }}
              >
                <Image size={14} color="var(--primary)" /> Satellite TIF
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => startPipeline('csv')}
                disabled={isProcessing}
                style={{ fontSize: '0.8rem', padding: '8px 10px', justifyContent: 'center' }}
              >
                <FileSpreadsheet size={14} color="var(--accent)" /> Weather CSV
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => startPipeline('json')}
                disabled={isProcessing}
                style={{ fontSize: '0.8rem', padding: '8px 10px', justifyContent: 'center' }}
              >
                <Database size={14} color="var(--warning)" /> IoT Sensor JSON
              </button>
            </div>
          </div>
        </div>

        {/* Real-time progress tracker */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '445px' }}>
          <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={20} color="var(--primary)" /> Ingestion Thread Analyzer
          </h3>

          {/* Performance metrics banner */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>INGESTION RATE</span>
              <h2 style={{ color: isProcessing ? 'var(--primary)' : 'var(--text-muted)' }}>
                {ingestionSpeed > 0 ? `${ingestionSpeed} MB/s` : '0.0 MB/s'}
              </h2>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>RECORDS COMPILED</span>
              <h2 style={{ color: isProcessing ? 'var(--accent)' : 'var(--text-muted)' }}>
                {recordsCount > 0 ? recordsCount.toLocaleString() : '0'}
              </h2>
            </div>
          </div>

          {/* Stepper Pipeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, overflowY: 'auto' }}>
            {pipelineSteps.map((step, idx) => (
              <div key={idx} style={{ 
                display: 'flex', 
                gap: '12px',
                opacity: step.status === 'pending' ? 0.4 : 1,
                transition: 'opacity 0.3s ease'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* Icon depending on status */}
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    border: '1.5px solid',
                    borderColor: step.status === 'success' ? 'var(--primary)' : step.status === 'active' ? 'var(--accent)' : 'var(--border-color)',
                    background: step.status === 'success' ? 'var(--primary-dim)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    color: step.status === 'success' ? 'var(--primary)' : step.status === 'active' ? 'var(--accent)' : 'var(--text-muted)'
                  }}>
                    {step.status === 'success' ? '✓' : idx + 1}
                  </div>
                  {idx < pipelineSteps.length - 1 && (
                    <div style={{ width: '1.5px', background: 'var(--border-color)', flex: 1, margin: '4px 0' }} />
                  )}
                </div>
                <div>
                  <span style={{ 
                    fontWeight: 600, 
                    fontSize: '0.85rem',
                    color: step.status === 'success' ? '#ffffff' : step.status === 'active' ? 'var(--accent)' : 'var(--text-primary)'
                  }}>{step.label}</span>
                  {step.details && (
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                      {step.details}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Success Banner */}
          {showCompleteAlert && (
            <div className="fade-in" style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.8rem',
              color: 'var(--primary)',
              marginTop: '16px'
            }}>
              <CheckCircle2 size={16} />
              <span>HDFS load successfully completed. Grid collections synced to metadata catalog!</span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
