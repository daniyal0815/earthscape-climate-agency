// Login.tsx
import React, { useState } from 'react';
import { Shield, Lock, Mail, Server, ArrowLeft } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface LoginProps {
  onLogin: (user: { name: string; email: string; role: 'Admin' | 'Analyst' }) => void;
  onBack?: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate database lookup latency
    setTimeout(() => {
      if (email.trim() === 'admin@earthscape.org' && password === 'admin') {
        onLogin({
          name: 'Daniyal Raza (Admin)',
          email: 'admin@earthscape.org',
          role: 'Admin',
        });
      } else if (email.trim() === 'analyst@earthscape.org' && password === 'analyst') {
        onLogin({
          name: 'Asad Shakeel (Analyst)',
          email: 'analyst@earthscape.org',
          role: 'Analyst',
        });
      } else {
        setError('Invalid credentials. Please use the preloaded credentials for testing.');
      }
      setLoading(false);
    }, 800);
  };

  const fillCredentials = (role: 'Admin' | 'Analyst') => {
    if (role === 'Admin') {
      setEmail('admin@earthscape.org');
      setPassword('admin');
    } else {
      setEmail('analyst@earthscape.org');
      setPassword('analyst');
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--body-gradient)'
    }} className="fade-in">
      <div style={{ position: 'absolute', top: '20px', left: '20px', right: '20px', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem', padding: '8px 14px' }}
          >
            <ArrowLeft size={16} /> Back to Main Page
          </button>
        )}
        <div style={{ marginLeft: 'auto' }}>
          <ThemeToggle />
        </div>
      </div>
      {/* Background graphic accents */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
        top: '-10%',
        left: '-10%',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)',
        bottom: '-10%',
        right: '-10%',
        zIndex: 0
      }} />

      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '450px',
        padding: '40px',
        position: 'relative',
        zIndex: 1,
        borderRadius: 'var(--radius-lg)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            marginBottom: '16px',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.2)'
          }}>
            <Server size={32} color="var(--primary)" />
          </div>
          <h2>EarthScape Climate Agency</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '8px' }}>
            Secure Infrastructure Access Control
          </p>
        </div>

        {/* Credentials hints */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          marginBottom: '24px',
        }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '10px', fontWeight: 600 }}>
            QUICK ACCESS TEST CREDENTIALS
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button 
              type="button" 
              onClick={() => fillCredentials('Admin')}
              className="btn btn-secondary" 
              style={{ fontSize: '0.8rem', padding: '8px 12px', justifyContent: 'center' }}
            >
              <Shield size={12} color="var(--primary)" /> Daniyal Raza (Admin)
            </button>
            <button 
              type="button" 
              onClick={() => fillCredentials('Analyst')}
              className="btn btn-secondary" 
              style={{ fontSize: '0.8rem', padding: '8px 12px', justifyContent: 'center' }}
            >
              <Shield size={12} color="var(--accent)" /> Asad Shakeel (Analyst)
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px',
              fontSize: '0.85rem',
              color: 'var(--danger)',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={14} /> Agency Email Address
            </label>
            <input
              type="email"
              required
              className="input-field"
              placeholder="e.g. analyst@earthscape.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lock size={14} /> Security Password
            </label>
            <input
              type="password"
              required
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', height: '45px', marginTop: '8px' }}
          >
            {loading ? 'Decrypting Access Keys...' : 'Authenticate Credentials'}
          </button>
          
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'center', height: '45px', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              Back to Public Site
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
