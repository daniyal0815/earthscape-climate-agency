// MLStudioView.tsx
import React, { useState, useEffect, useRef } from 'react';
import { ML_FORECAST_DATA } from '../mockData';
import { 
  ResponsiveContainer, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend 
} from 'recharts';
import { Brain, Sliders, CheckCircle2, TrendingUp, Cpu } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface LossPoint {
  epoch: number;
  trainLoss: number;
  valLoss: number;
}

export const MLStudioView: React.FC = () => {
  const { chartStyles } = useTheme();
  const [modelType, setModelType] = useState<'LSTM' | 'RandomForest' | 'LinearRegression'>('LSTM');
  const [learningRate, setLearningRate] = useState(0.01);
  const [epochs, setEpochs] = useState(100);
  const [trainRatio, setTrainRatio] = useState(80);
  
  // Execution states
  const [isTraining, setIsTraining] = useState(false);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [isTrained, setIsTrained] = useState(false);
  const [lossHistory, setLossHistory] = useState<LossPoint[]>([]);
  
  const [stats, setStats] = useState({ r2: 0, mae: 0, rmse: 0 });
  const trainingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (trainingTimerRef.current) clearInterval(trainingTimerRef.current);
    };
  }, []);

  const handleTrain = () => {
    setIsTraining(true);
    setIsTrained(false);
    setCurrentEpoch(0);
    setLossHistory([]);

    const totalSteps = epochs;
    let step = 0;
    const history: LossPoint[] = [];

    // Base statistical variance depending on model
    const multiplier = modelType === 'LSTM' ? 0.95 : modelType === 'RandomForest' ? 0.88 : 0.70;

    if (trainingTimerRef.current) clearInterval(trainingTimerRef.current);

    trainingTimerRef.current = setInterval(() => {
      step += Math.max(1, Math.round(epochs / 25));
      if (step >= totalSteps) {
        step = totalSteps;
        if (trainingTimerRef.current) clearInterval(trainingTimerRef.current);
        trainingTimerRef.current = null;
        
        // Finalize model stats
        setStats({
          r2: Number((0.85 + Math.random() * 0.12 * multiplier).toFixed(4)),
          mae: Number((0.08 - Math.random() * 0.04 * multiplier).toFixed(4)),
          rmse: Number((0.11 - Math.random() * 0.05 * multiplier).toFixed(4))
        });
        
        setIsTraining(false);
        setIsTrained(true);
      }

      setCurrentEpoch(step);

      // Generate training loss curve formula
      const baseLoss = modelType === 'LSTM' ? 0.45 : modelType === 'RandomForest' ? 0.35 : 0.25;
      const decay = step / epochs;
      const trainLoss = baseLoss * Math.exp(-4 * decay) + Math.random() * 0.015;
      const valLoss = baseLoss * Math.exp(-3.5 * decay) + 0.02 + Math.random() * 0.02;

      history.push({
        epoch: step,
        trainLoss: Number(trainLoss.toFixed(5)),
        valLoss: Number(valLoss.toFixed(5))
      });

      setLossHistory([...history]);
    }, 100);
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* View Header */}
      <div>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Brain color="var(--primary)" /> Machine Learning Predictive Studio
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
          Train neural network models (LSTM) or ensemble architectures (Random Forest) to forecast global environmental anomalies.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', flexWrap: 'wrap' }}>
        
        {/* Hyperparameter Config Panel */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={20} color="var(--primary)" /> Hyperparameter Tuning Center
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Model Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Predictive Architecture</span>
              <select 
                value={modelType} 
                onChange={(e) => setModelType(e.target.value as 'LSTM' | 'RandomForest' | 'LinearRegression')}
                className="input-field"
                style={{ background: 'var(--bg-primary)' }}
                disabled={isTraining}
              >
                <option value="LSTM">Long Short-Term Memory Network (Recurrent LSTM)</option>
                <option value="RandomForest">Random Forest Regressor (Ensemble Trees)</option>
                <option value="LinearRegression">Multi-Variable Linear Regression</option>
              </select>
            </div>

            {/* LR Slider */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Learning Rate (α)</span>
                <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{learningRate}</span>
              </div>
              <input 
                type="range" 
                min="0.001" 
                max="0.1" 
                step="0.005"
                value={learningRate} 
                onChange={(e) => setLearningRate(Number(e.target.value))}
                style={{ accentColor: 'var(--accent)' }}
                disabled={isTraining}
              />
            </div>

            {/* Epochs Slider */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{modelType === 'RandomForest' ? 'Estimators (TreesCount)' : 'Training Epochs'}</span>
                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{epochs}</span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="300" 
                step="10"
                value={epochs} 
                onChange={(e) => setEpochs(Number(e.target.value))}
                style={{ accentColor: 'var(--primary)' }}
                disabled={isTraining}
              />
            </div>

            {/* Train Ratio Slider */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Train / Validation Split Ratio</span>
                <span style={{ color: 'var(--warning)', fontWeight: 600 }}>{trainRatio}% / {100 - trainRatio}%</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="90" 
                step="5"
                value={trainRatio} 
                onChange={(e) => setTrainRatio(Number(e.target.value))}
                style={{ accentColor: 'var(--warning)' }}
                disabled={isTraining}
              />
            </div>
          </div>

          {/* Action Button */}
          <button 
            onClick={handleTrain} 
            disabled={isTraining} 
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', height: '45px', marginTop: '16px' }}
          >
            <Cpu size={16} /> {isTraining ? `Fitting weights... Epoch [${currentEpoch}/${epochs}]` : 'Initiate Model Training'}
          </button>
        </div>

        {/* Live Training Curves */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '370px' }}>
          <h3>Model Optimization Curve</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>
            Observing absolute errors converge during parallel stochastic descent.
          </p>

          <div style={{ flex: 1, minHeight: '180px' }}>
            {lossHistory.length === 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', fontSize: '0.85rem', flexDirection: 'column', gap: '6px' }}>
                <Brain size={32} strokeWidth={1} />
                <span>Initialize training to plot dynamic Mean Squared Error convergence.</span>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={lossHistory}>
                  <defs>
                    <linearGradient id="trainLossGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="valLossGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--warning)" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="var(--warning)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartStyles.gridStroke} />
                  <XAxis dataKey="epoch" label={{ value: 'Epochs', position: 'insideBottom', offset: -5, fill: 'var(--text-secondary)' }} stroke="var(--text-secondary)" fontSize={10} />
                  <YAxis label={{ value: 'Loss (MSE)', angle: -90, position: 'insideLeft', fill: 'var(--text-secondary)' }} stroke="var(--text-secondary)" fontSize={10} />
                  <Tooltip contentStyle={chartStyles.tooltipStyle} />
                  <Legend />
                  <Area type="monotone" dataKey="trainLoss" name="Training Loss" stroke="var(--primary)" fillOpacity={1} fill="url(#trainLossGrad)" strokeWidth={1.5} />
                  <Area type="monotone" dataKey="valLoss" name="Validation Loss" stroke="var(--warning)" fillOpacity={1} fill="url(#valLossGrad)" strokeWidth={1.5} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

      </div>

      {/* Model Performance & Projections Section */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={20} color="var(--primary)" /> Climate Projections (Target 2050)
          </h3>

          {/* Model Statistics badges */}
          {isTrained && (
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }} className="fade-in">
              <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '6px', padding: '6px 12px', fontSize: '0.8rem' }}>
                R² Index: <strong style={{ color: 'var(--primary)' }}>{stats.r2}</strong>
              </div>
              <div style={{ background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '6px', padding: '6px 12px', fontSize: '0.8rem' }}>
                MAE Score: <strong style={{ color: 'var(--accent)' }}>{stats.mae}</strong>
              </div>
              <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '6px', padding: '6px 12px', fontSize: '0.8rem' }}>
                RMSE: <strong style={{ color: 'var(--warning)' }}>{stats.rmse}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--primary)' }}>
                <CheckCircle2 size={14} /> Training Finalized
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          
          {/* Projections LineChart */}
          <div style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ML_FORECAST_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartStyles.gridStroke} />
                <XAxis dataKey="year" stroke="var(--text-secondary)" fontSize={12} />
                <YAxis label={{ value: 'Temp Anomaly (°C)', angle: -90, position: 'insideLeft', fill: 'var(--text-secondary)' }} stroke="var(--text-secondary)" fontSize={12} />
                <Tooltip contentStyle={chartStyles.tooltipStyle} />
                <Legend />
                {/* Historical Line */}
                <Line type="monotone" dataKey="historical" name="Historical Observed" stroke="var(--text-primary)" strokeWidth={3} dot={{ r: 5 }} />
                
                {/* Predictions (only active or dotted if trained) */}
                <Line 
                  type="monotone" 
                  dataKey="businessAsUsual" 
                  name="Forecast: Business-As-Usual (Pessimistic)" 
                  stroke="var(--danger)" 
                  strokeWidth={isTrained ? 3 : 1.5} 
                  strokeDasharray={isTrained ? "0" : "4 4"}
                  dot={{ r: isTrained ? 4 : 0 }} 
                />
                
                <Line 
                  type="monotone" 
                  dataKey="mitigationScenario" 
                  name="Forecast: Sustainable Mitigation (Optimistic)" 
                  stroke="var(--primary)" 
                  strokeWidth={isTrained ? 3 : 1.5} 
                  strokeDasharray={isTrained ? "0" : "4 4"}
                  dot={{ r: isTrained ? 4 : 0 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Model Description Info card */}
          <div className="glass-panel" style={{ padding: '20px', background: 'rgba(255,255,255,0.015)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ color: 'var(--accent)' }}>Predictive Analytics Analysis</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              By evaluating the preceding climate inputs, the ML models draw deep patterns:
            </p>
            <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: 1.4 }}>
              <li>
                <strong style={{ color: 'var(--danger)' }}>Business-as-Usual (BAU)</strong>: Standard LSTM modeling expects surface temperatures to reach <strong>+2.50°C</strong> by 2050 under active industrial carbon emissions.
              </li>
              <li>
                <strong style={{ color: 'var(--primary)' }}>Sustainable Mitigation</strong>: Assuming swift policy shifts capping greenhouse concentrations, models stabilize the rise to <strong>+1.42°C</strong>, mitigating tipping-point hazards.
              </li>
              {!isTrained && (
                <li style={{ color: 'var(--warning)', listStyleType: 'none', marginLeft: '-16px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                  ⚠️ Projections will gain accuracy once you configure hyper-weights and execute the training fitting loop.
                </li>
              )}
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
};
