// DashboardView.tsx
import React, { useState, useMemo } from 'react';
import { CLIMATE_DATASET } from '../mockData';
import { 
  ResponsiveContainer, AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';
import { Filter, Thermometer, Flame, Leaf, Wind, RefreshCw, BarChart2 } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import type { UserRole } from '../utils/permissions';

interface DashboardViewProps {
  userRole: UserRole;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ userRole }) => {
  const { chartStyles } = useTheme();
  const [yearRange, setYearRange] = useState<[number, number]>([1980, 2025]);
  const [regionFilter, setRegionFilter] = useState('Global');
  
  // Dynamic correlation selector
  const [indepVar, setIndepVar] = useState<'co2Level' | 'deforestationRate'>('co2Level');
  const [depVar, setDepVar] = useState<'tempAnomaly' | 'extremeEvents'>('tempAnomaly');

  const filteredData = useMemo(() => {
    return CLIMATE_DATASET.filter(d => d.year >= yearRange[0] && d.year <= yearRange[1]);
  }, [yearRange]);

  // Compute aggregates based on selection
  const statistics = useMemo(() => {
    if (filteredData.length === 0) return { avgTemp: 0, avgCo2: 0, totalDeforest: 0, totalEvents: 0 };
    
    const sumTemp = filteredData.reduce((acc, c) => acc + c.tempAnomaly, 0);
    const sumCo2 = filteredData.reduce((acc, c) => acc + c.co2Level, 0);
    const sumDeforest = filteredData.reduce((acc, c) => acc + c.deforestationRate, 0);
    const sumEvents = filteredData.reduce((acc, c) => acc + c.extremeEvents, 0);

    return {
      avgTemp: Number((sumTemp / filteredData.length).toFixed(2)),
      avgCo2: Number((sumCo2 / filteredData.length).toFixed(1)),
      avgDeforest: Number((sumDeforest / filteredData.length).toFixed(1)),
      totalEvents: sumEvents
    };
  }, [filteredData]);

  // Compute correlation coefficient (Pearson r) dynamically
  const correlationVal = useMemo(() => {
    if (filteredData.length < 2) return 0;
    
    const x = filteredData.map(d => d[indepVar]);
    const y = filteredData.map(d => d[depVar]);
    
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((a, b, idx) => a + b * y[idx], 0);
    const sumX2 = x.reduce((a, b) => a + b * b, 0);
    const sumY2 = y.reduce((a, b) => a + b * b, 0);
    
    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    
    if (denominator === 0) return 0;
    return Number((numerator / denominator).toFixed(4));
  }, [filteredData, indepVar, depVar]);

  const getCorrelationInterpretation = (r: number) => {
    const absR = Math.abs(r);
    let strength = 'negligible';
    if (absR >= 0.7) strength = 'strong';
    else if (absR >= 0.4) strength = 'moderate';
    else if (absR >= 0.2) strength = 'weak';

    const direction = r > 0 ? 'positive' : 'negative';
    return `Calculated Pearson correlation coefficient of r = ${r} indicates a ${strength} ${direction} mathematical relationship between ${
      indepVar === 'co2Level' ? 'Atmospheric CO2 Level (ppm)' : 'Tree Cover Deforestation Rate (Mha)'
    } and ${
      depVar === 'tempAnomaly' ? 'Surface Temperature Anomaly (°C)' : 'Extreme Environmental Events (annual count)'
    }.`;
  };

  const resetFilters = () => {
    setYearRange([1980, 2025]);
    setRegionFilter('Global');
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BarChart2 color="var(--primary)" /> Analytical Tableau Dashboard
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
            Interactive insights engine correlating global climate anomalies, CO2 inputs, and satellite forest monitoring.
            {userRole === 'Analyst' && (
              <span style={{ display: 'block', marginTop: '6px', fontSize: '0.8rem', color: 'var(--accent)' }}>
                Analyst workspace — explore and correlate datasets. Infrastructure ingestion and cluster jobs require Admin access.
              </span>
            )}
          </p>
        </div>
        
        {/* Reset button */}
        <button className="btn btn-secondary" onClick={resetFilters}>
          <RefreshCw size={16} /> Reset Engine
        </button>
      </div>

      {/* Filters Toolbar */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)', fontWeight: 600 }}>
          <Filter size={18} /> Filters
        </div>
        
        <div style={{ height: '24px', width: '1px', background: 'var(--border-color)', display: 'inline-block' }} />

        {/* Region Filter */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Observation Scope</span>
          <select 
            value={regionFilter} 
            onChange={(e) => setRegionFilter(e.target.value)}
            className="input-field"
            style={{ padding: '8px 12px', background: 'var(--bg-primary)' }}
          >
            <option value="Global">Global Observatory</option>
            <option value="NorthAmerica">North America Sector</option>
            <option value="Amazonia">Amazonia Rainforest</option>
            <option value="Eurasia">Eurasia Continent</option>
            <option value="Antarctica">Antarctica Ice-Sheet</option>
          </select>
        </div>

        {/* Time Slider */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, minWidth: '240px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <span>Temporal Range Selection</span>
            <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{yearRange[0]} — {yearRange[1]}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.8rem' }}>1980</span>
            <input 
              type="range" 
              min="1980" 
              max="2025" 
              value={yearRange[0]} 
              onChange={(e) => setYearRange([Math.min(Number(e.target.value), yearRange[1] - 5), yearRange[1]])}
              style={{ flex: 1, accentColor: 'var(--primary)' }}
            />
            <input 
              type="range" 
              min="1980" 
              max="2025" 
              value={yearRange[1]} 
              onChange={(e) => setYearRange([yearRange[0], Math.max(Number(e.target.value), yearRange[0] + 5)])}
              style={{ flex: 1, accentColor: 'var(--primary)' }}
            />
            <span style={{ fontSize: '0.8rem' }}>2025</span>
          </div>
        </div>
      </div>

      {/* Aggregate Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'var(--danger-dim)', padding: '12px', borderRadius: '10px' }}>
            <Thermometer color="var(--danger)" size={24} />
          </div>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Mean Temp Anomaly</p>
            <h2 style={{ color: 'var(--danger)' }}>+{statistics.avgTemp}°C</h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Above baseline</p>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(6, 182, 212, 0.15)', padding: '12px', borderRadius: '10px' }}>
            <Flame color="var(--accent)" size={24} />
          </div>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Atmospheric CO₂</p>
            <h2 style={{ color: 'var(--accent)' }}>{statistics.avgCo2} ppm</h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Global avg level</p>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '12px', borderRadius: '10px' }}>
            <Leaf color="var(--primary)" size={24} />
          </div>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Forest Tree Loss</p>
            <h2 style={{ color: 'var(--primary)' }}>{statistics.avgDeforest} Mha</h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Deforest rate per annum</p>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '12px', borderRadius: '10px' }}>
            <Wind color="var(--warning)" size={24} />
          </div>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Severe Events</p>
            <h2 style={{ color: 'var(--warning)' }}>{statistics.totalEvents}</h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Aggregated records</p>
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '20px' }}>
        
        {/* Temp & CO2 Trend */}
        <div className="glass-panel" style={{ padding: '20px', height: '400px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '1.1rem' }}>Global Temperature Anomaly vs CO₂ Growth</h3>
          <div style={{ flex: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredData}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--danger)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--danger)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={chartStyles.gridStroke} />
                <XAxis dataKey="year" stroke="var(--text-secondary)" fontSize={12} />
                <YAxis yAxisId="left" label={{ value: 'Temp Anomaly (°C)', angle: -90, position: 'insideLeft', fill: 'var(--danger)', offset: -2 }} stroke="var(--danger)" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'CO2 (ppm)', angle: 90, position: 'insideRight', fill: 'var(--accent)', offset: 2 }} stroke="var(--accent)" fontSize={12} />
                <Tooltip contentStyle={chartStyles.tooltipStyle} />
                <Legend />
                <Area yAxisId="left" type="monotone" dataKey="tempAnomaly" name="Temp Anomaly (°C)" stroke="var(--danger)" fillOpacity={1} fill="url(#colorTemp)" strokeWidth={2} />
                <Area yAxisId="right" type="monotone" dataKey="co2Level" name="Atmospheric CO₂ (ppm)" stroke="var(--accent)" fillOpacity={1} fill="url(#colorCo2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tree Loss & Weather Incidents */}
        <div className="glass-panel" style={{ padding: '20px', height: '400px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '1.1rem' }}>Deforestation Rates & Extreme Weather Outbreaks</h3>
          <div style={{ flex: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartStyles.gridStroke} />
                <XAxis dataKey="year" stroke="var(--text-secondary)" fontSize={12} />
                <YAxis yAxisId="left" label={{ value: 'Tree Cover Loss (Mha)', angle: -90, position: 'insideLeft', fill: 'var(--primary)', offset: -2 }} stroke="var(--primary)" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'Weather Events (count)', angle: 90, position: 'insideRight', fill: 'var(--warning)', offset: 2 }} stroke="var(--warning)" fontSize={12} />
                <Tooltip contentStyle={chartStyles.tooltipStyle} />
                <Legend />
                <Bar yAxisId="left" dataKey="deforestationRate" name="Forest Tree Loss (Mha)" fill="var(--primary)" fillOpacity={0.85} radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="extremeEvents" name="Weather Incidents" stroke="var(--warning)" strokeWidth={3} dot={{ r: 4 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Advanced Statistical Correlation Explorer */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Wind color="var(--primary)" /> HDFS Climate Correlation Explorer
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
          Execute statistical covariance calculations across multi-variate variables over the chosen years.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          
          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Independent Variable (X-Axis)</span>
              <select 
                value={indepVar} 
                onChange={(e) => setIndepVar(e.target.value as 'co2Level' | 'deforestationRate')}
                className="input-field"
                style={{ background: 'var(--bg-primary)' }}
              >
                <option value="co2Level">Atmospheric CO2 Level (ppm)</option>
                <option value="deforestationRate">Tree Cover Loss Rate (Mha)</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Dependent Variable (Y-Axis)</span>
              <select 
                value={depVar} 
                onChange={(e) => setDepVar(e.target.value as 'tempAnomaly' | 'extremeEvents')}
                className="input-field"
                style={{ background: 'var(--bg-primary)' }}
              >
                <option value="tempAnomaly">Mean Surface Temp Anomaly (°C)</option>
                <option value="extremeEvents">Extreme Environmental Events</option>
              </select>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Pearson R Coefficient</p>
              <h1 style={{ fontSize: '2.5rem', color: correlationVal > 0.6 ? 'var(--danger)' : 'var(--primary)', letterSpacing: '-0.03em', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                {correlationVal}
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>/ 1.0000</span>
              </h1>
            </div>
          </div>

          {/* Interactive Scatter / Line correlation output */}
          <div style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartStyles.gridStroke} />
                  <XAxis dataKey="year" stroke="var(--text-secondary)" fontSize={12} />
                  <YAxis yAxisId="left" stroke="var(--primary)" label={{ value: indepVar === 'co2Level' ? 'CO2 (ppm)' : 'Tree Loss (Mha)', angle: -90, position: 'insideLeft', fill: 'var(--primary)', offset: -2 }} fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" stroke="var(--accent)" label={{ value: depVar === 'tempAnomaly' ? 'Temp Anomaly (°C)' : 'Events Count', angle: 90, position: 'insideRight', fill: 'var(--accent)', offset: 2 }} fontSize={12} />
                  <Tooltip contentStyle={chartStyles.tooltipStyle} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey={indepVar} name={indepVar === 'co2Level' ? 'CO2 Concentration' : 'Deforestation rate'} stroke="var(--primary)" strokeWidth={2} dot={{ r: 4 }} />
                  <Line yAxisId="right" type="monotone" dataKey={depVar} name={depVar === 'tempAnomaly' ? 'Surface Temp' : 'Climate Incidents'} stroke="var(--accent)" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div style={{
              background: 'rgba(16, 185, 129, 0.05)',
              border: '1px solid rgba(16, 185, 129, 0.15)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 16px',
              fontSize: '0.85rem',
              color: 'var(--text-primary)',
              marginTop: '16px',
              lineHeight: '1.4'
            }}>
              {getCorrelationInterpretation(correlationVal)}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
