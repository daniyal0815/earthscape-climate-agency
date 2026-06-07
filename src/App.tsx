// App.tsx
import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';
import { DashboardView } from './components/DashboardView';
import { HadoopClusterView } from './components/HadoopClusterView';
import { MLStudioView } from './components/MLStudioView';
import { IngestionView } from './components/IngestionView';
import { StreamingView } from './components/StreamingView';
import { SupportView } from './components/SupportView';
import { DocsView } from './components/DocsView';

import { 
  LayoutDashboard, Server, Brain, Upload, Radio, MessageSquare, 
  BookOpen, LogOut, User, Activity, Home 
} from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';

type TabType = 'dashboard' | 'cluster' | 'ml' | 'ingestion' | 'streaming' | 'support' | 'docs';

interface UserInfo {
  name: string;
  email: string;
  role: 'Admin' | 'Analyst';
}

function App() {
  const [viewMode, setViewMode] = useState<'landing' | 'portal'>('landing');
  const [user, setUser] = useState<UserInfo | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  const handleLogin = (authenticatedUser: UserInfo) => {
    setUser(authenticatedUser);
    setActiveTab('dashboard');
  };

  const handleBackToHome = () => {
    setViewMode('landing');
  };

  const handleLogout = () => {
    setUser(null);
    setViewMode('landing');
  };

  const handleEnterPortal = () => {
    setViewMode('portal');
  };

  // Render active view
  const renderView = () => {
    if (!user) return null;
    
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'cluster':
        return <HadoopClusterView />;
      case 'ml':
        return <MLStudioView />;
      case 'ingestion':
        return <IngestionView />;
      case 'streaming':
        return <StreamingView userRole={user.role} />;
      case 'support':
        return <SupportView />;
      case 'docs':
        return <DocsView />;
      default:
        return <DashboardView />;
    }
  };

  if (viewMode === 'landing') {
    return (
      <LandingPage
        onEnterPortal={handleEnterPortal}
        isLoggedIn={!!user}
      />
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} onBack={handleBackToHome} />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      
      {/* Sidebar Navigation */}
      <aside style={{
        width: '280px',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 10
      }}>
        {/* Title / Logo */}
        <button
          type="button"
          onClick={handleBackToHome}
          title="Back to main page"
          style={{
            padding: '24px 20px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            width: '100%',
            textAlign: 'left',
            transition: 'var(--transition)'
          }}
          className="sidebar-logo-btn"
        >
          <div style={{
            background: 'var(--primary-dim)',
            border: '1px solid var(--border-color-active)',
            borderRadius: '8px',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Activity color="var(--primary)" size={20} />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', letterSpacing: '-0.01em', fontWeight: 700, color: 'var(--text-primary)' }}>EarthScape</h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Climate Agency</span>
          </div>
        </button>

        {/* Tab Items */}
        <nav style={{ padding: '20px 14px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          <button
            className="btn btn-secondary"
            onClick={handleBackToHome}
            style={{
              justifyContent: 'flex-start',
              border: '1px solid var(--border-color)',
              background: 'var(--surface-subtle)',
              color: 'var(--text-primary)',
              fontWeight: 500,
              marginBottom: '8px'
            }}
          >
            <Home size={18} /> Back to Main Page
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => setActiveTab('dashboard')}
            style={{
              justifyContent: 'flex-start',
              border: 'none',
              background: activeTab === 'dashboard' ? 'var(--primary-dim)' : 'transparent',
              color: activeTab === 'dashboard' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'dashboard' ? 600 : 400
            }}
          >
            <LayoutDashboard size={18} /> Analytics Tableau
          </button>

          <button 
            className="btn btn-secondary" 
            onClick={() => setActiveTab('cluster')}
            style={{
              justifyContent: 'flex-start',
              border: 'none',
              background: activeTab === 'cluster' ? 'var(--primary-dim)' : 'transparent',
              color: activeTab === 'cluster' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'cluster' ? 600 : 400
            }}
          >
            <Server size={18} /> Hadoop HDFS Core
          </button>

          <button 
            className="btn btn-secondary" 
            onClick={() => setActiveTab('ml')}
            style={{
              justifyContent: 'flex-start',
              border: 'none',
              background: activeTab === 'ml' ? 'var(--primary-dim)' : 'transparent',
              color: activeTab === 'ml' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'ml' ? 600 : 400
            }}
          >
            <Brain size={18} /> Predictive ML Studio
          </button>

          <button 
            className="btn btn-secondary" 
            onClick={() => setActiveTab('ingestion')}
            style={{
              justifyContent: 'flex-start',
              border: 'none',
              background: activeTab === 'ingestion' ? 'var(--primary-dim)' : 'transparent',
              color: activeTab === 'ingestion' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'ingestion' ? 600 : 400
            }}
          >
            <Upload size={18} /> Ingestion Portal
          </button>

          <button 
            className="btn btn-secondary" 
            onClick={() => setActiveTab('streaming')}
            style={{
              justifyContent: 'flex-start',
              border: 'none',
              background: activeTab === 'streaming' ? 'var(--primary-dim)' : 'transparent',
              color: activeTab === 'streaming' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'streaming' ? 600 : 400
            }}
          >
            <Radio size={18} /> IoT Sensor Stream
          </button>

          <button 
            className="btn btn-secondary" 
            onClick={() => setActiveTab('support')}
            style={{
              justifyContent: 'flex-start',
              border: 'none',
              background: activeTab === 'support' ? 'var(--primary-dim)' : 'transparent',
              color: activeTab === 'support' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'support' ? 600 : 400
            }}
          >
            <MessageSquare size={18} /> Support & FAQ
          </button>

          <button 
            className="btn btn-secondary" 
            onClick={() => setActiveTab('docs')}
            style={{
              justifyContent: 'flex-start',
              border: 'none',
              background: activeTab === 'docs' ? 'var(--primary-dim)' : 'transparent',
              color: activeTab === 'docs' ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'docs' ? 600 : 400
            }}
          >
            <BookOpen size={18} /> Documentation Hub
          </button>
        </nav>

        {/* User Card at bottom */}
        <div style={{
          padding: '20px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <ThemeToggle />
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              background: 'var(--surface-muted)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border-color)'
            }}>
              <User size={18} color="var(--primary)" />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {user.name}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                <span className={`status-indicator ${user.role === 'Admin' ? 'status-online' : 'status-busy'}`} />
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 'bold' }}>
                  {user.role} Authority
                </span>
              </div>
            </div>
          </div>

          <button 
            className="btn btn-danger" 
            onClick={handleLogout}
            style={{ fontSize: '0.8rem', padding: '8px 12px', justifyContent: 'center' }}
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '40px', marginLeft: '280px', minHeight: '100vh', overflowY: 'auto' }}>
        
        {renderView()}
      </div>

    </div>
  );
}

export default App;
