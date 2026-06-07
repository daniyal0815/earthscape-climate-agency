// StreamingView.tsx
import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';
import { Radio, AlertTriangle, ShieldAlert, Lock, Settings, RefreshCw } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface StreamPoint {
  time: string;
  temperature: number;
  co2: number;
  pm25: number;
}

interface AlertMessage {
  id: string;
  time: string;
  sensor: 'Temperature' | 'CO2' | 'PM2.5';
  value: number;
  threshold: number;
  severity: 'Warning' | 'Critical';
}

interface StreamingViewProps {
  userRole: 'Admin' | 'Analyst';
}

const createInitialStreamData = (): StreamPoint[] => {
  const initData: StreamPoint[] = [];
  const baseTime = new Date();
  for (let i = 9; i >= 0; i--) {
    const t = new Date(baseTime.getTime() - i * 3000);
    initData.push({
      time: t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      temperature: Number((32.0 + Math.random() * 4).toFixed(1)),
      co2: Number((418.0 + Math.random() * 8).toFixed(1)),
      pm25: Number((45.0 + Math.random() * 20).toFixed(1))
    });
  }
  return initData;
};

const buildAlert = (
  time: string,
  sensor: 'Temperature' | 'CO2' | 'PM2.5',
  val: number,
  thresh: number
): AlertMessage => ({
  id: `ALT-${Date.now().toString().slice(-4)}`,
  time,
  sensor,
  value: val,
  threshold: thresh,
  severity: val > thresh * 1.1 ? 'Critical' : 'Warning'
});

export const StreamingView: React.FC<StreamingViewProps> = ({ userRole }) => {
  const { chartStyles } = useTheme();
  const [streamData, setStreamData] = useState<StreamPoint[]>(createInitialStreamData);
  const [thresholds, setThresholds] = useState({ temp: 38.0, co2: 430.0, pm25: 80.0 });
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(true);

  useEffect(() => {
    if (!isStreaming) return;

    const timer = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      const isSpike = Math.random() > 0.8;
      const newTemp = Number((34.0 + Math.random() * 3 + (isSpike && Math.random() > 0.5 ? 5 : 0)).toFixed(1));
      const newCo2 = Number((420.0 + Math.random() * 6 + (isSpike && Math.random() > 0.5 ? 12 : 0)).toFixed(1));
      const newPm25 = Number((50.0 + Math.random() * 20 + (isSpike && Math.random() > 0.5 ? 30 : 0)).toFixed(1));

      const newPoint: StreamPoint = {
        time: timeStr,
        temperature: newTemp,
        co2: newCo2,
        pm25: newPm25
      };

      setStreamData(prev => [...prev.slice(1), newPoint]);

      const newAlerts: AlertMessage[] = [];
      if (newTemp > thresholds.temp) {
        newAlerts.push(buildAlert(timeStr, 'Temperature', newTemp, thresholds.temp));
      }
      if (newCo2 > thresholds.co2) {
        newAlerts.push(buildAlert(timeStr, 'CO2', newCo2, thresholds.co2));
      }
      if (newPm25 > thresholds.pm25) {
        newAlerts.push(buildAlert(timeStr, 'PM2.5', newPm25, thresholds.pm25));
      }

      if (newAlerts.length > 0) {
        setAlerts(prev => [...newAlerts, ...prev].slice(0, 16));
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [isStreaming, thresholds]);

  const handleThresholdChange = (key: 'temp' | 'co2' | 'pm25', val: number) => {
    if (userRole !== 'Admin') return;
    setThresholds(prev => ({ ...prev, [key]: val }));
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Radio color="var(--primary)" style={{ animation: 'pulse-glow 1.5s infinite' }} /> IoT Real-Time Climate Stream
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
            Live sensor feeds tracking temperature spikes, CO2 emissions, and micro-particles with automated alerting triggers.
          </p>
        </div>
        
        <button 
          className={`btn ${isStreaming ? 'btn-danger' : 'btn-primary'}`}
          onClick={() => setIsStreaming(!isStreaming)}
        >
          <RefreshCw size={16} style={{ animation: isStreaming ? 'spin 3s linear infinite' : 'none' }} />
          {isStreaming ? 'Freeze Telemetry Stream' : 'Resume Telemetry Stream'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', flexWrap: 'wrap' }}>
        
        {/* Main Scrolling Charts Area */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', height: '500px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Active Environmental Feeds</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Polling Interval: 3.0s</span>
          </div>

          <div style={{ flex: 1, minHeight: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={streamData}>
                <defs>
                  <linearGradient id="tempStream" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--danger)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="var(--danger)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="co2Stream" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="pm25Stream" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={chartStyles.gridStroke} />
                <XAxis dataKey="time" stroke="var(--text-secondary)" fontSize={10} />
                <YAxis stroke="var(--text-secondary)" fontSize={10} />
                <Tooltip contentStyle={chartStyles.tooltipStyle} />
                <Legend />
                <Area type="monotone" dataKey="temperature" name="Temp Anomaly (°C)" stroke="var(--danger)" fillOpacity={1} fill="url(#tempStream)" strokeWidth={2} />
                <Area type="monotone" dataKey="co2" name="Atmospheric CO2 (ppm)" stroke="var(--accent)" fillOpacity={1} fill="url(#co2Stream)" strokeWidth={2} />
                <Area type="monotone" dataKey="pm25" name="PM 2.5 (µg/m³)" stroke="var(--primary)" fillOpacity={1} fill="url(#pm25Stream)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Configurations & Alerts Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Threshold configurations */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', marginBottom: '14px' }}>
              <Settings size={18} color="var(--primary)" /> Sensor Alarm Gates
            </h3>

            {userRole !== 'Admin' && (
              <div style={{
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.75rem',
                color: 'var(--warning)',
                marginBottom: '16px'
              }}>
                <Lock size={12} />
                <span>Threshold overrides restricted to Administrators.</span>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Temp Gate (°C)</span>
                  <span style={{ fontWeight: 600, color: 'var(--danger)' }}>{thresholds.temp}°C</span>
                </div>
                <input 
                  type="number" 
                  step="0.5"
                  value={thresholds.temp} 
                  disabled={userRole !== 'Admin'}
                  className="input-field"
                  onChange={(e) => handleThresholdChange('temp', Number(e.target.value))}
                  style={{ fontSize: '0.85rem', padding: '6px 10px' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>CO₂ Gate (ppm)</span>
                  <span style={{ fontWeight: 600, color: 'var(--accent)' }}>{thresholds.co2} ppm</span>
                </div>
                <input 
                  type="number" 
                  value={thresholds.co2} 
                  disabled={userRole !== 'Admin'}
                  className="input-field"
                  onChange={(e) => handleThresholdChange('co2', Number(e.target.value))}
                  style={{ fontSize: '0.85rem', padding: '6px 10px' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>PM2.5 Gate (µg/m³)</span>
                  <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{thresholds.pm25} µg/m³</span>
                </div>
                <input 
                  type="number" 
                  value={thresholds.pm25} 
                  disabled={userRole !== 'Admin'}
                  className="input-field"
                  onChange={(e) => handleThresholdChange('pm25', Number(e.target.value))}
                  style={{ fontSize: '0.85rem', padding: '6px 10px' }}
                />
              </div>
            </div>
          </div>

          {/* Real-time Alerts Log */}
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', height: '228px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertTriangle size={16} color={alerts.length > 0 ? 'var(--danger)' : 'var(--text-muted)'} /> Active Alerts Log
              </span>
              {alerts.length > 0 && (
                <button 
                  onClick={clearAlerts} 
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer' }}
                >
                  Clear Feed
                </button>
              )}
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {alerts.length === 0 ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', fontSize: '0.8rem', gap: '6px' }}>
                  <ShieldAlert size={20} strokeWidth={1.5} />
                  <span>Streams operate inside safe threshold guidelines.</span>
                </div>
              ) : (
                alerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    style={{
                      background: alert.severity === 'Critical' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                      border: '1px solid',
                      borderColor: alert.severity === 'Critical' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(245, 158, 11, 0.3)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '8px 12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                      fontSize: '0.75rem'
                    }}
                    className="fade-in"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                      <span style={{ color: alert.severity === 'Critical' ? 'var(--danger)' : 'var(--warning)' }}>
                        ⚠️ {alert.severity} Spike: {alert.sensor}
                      </span>
                      <span style={{ color: 'var(--text-muted)' }}>{alert.time}</span>
                    </div>
                    <span style={{ color: 'var(--text-secondary)' }}>
                      Detected: <strong>{alert.value}</strong> (Safe Cap: {alert.threshold})
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
