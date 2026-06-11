// App.tsx
import { useState, useEffect } from 'react';
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
  BookOpen, LogOut, User, Activity, Home, Menu, X, ShieldAlert
} from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';
import {
  type TabType,
  type UserRole,
  canAccessTab,
  getDefaultTabForRole,
  TAB_PERMISSIONS,
} from './utils/permissions';

interface UserInfo {
  name: string;
  email: string;
  role: UserRole;
}

const NAV_ITEMS: { id: TabType; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Analytics Tableau', icon: LayoutDashboard },
  { id: 'cluster', label: 'Hadoop HDFS Core', icon: Server },
  { id: 'ml', label: 'Predictive ML Studio', icon: Brain },
  { id: 'ingestion', label: 'Ingestion Portal', icon: Upload },
  { id: 'streaming', label: 'IoT Sensor Stream', icon: Radio },
  { id: 'support', label: 'Support & FAQ', icon: MessageSquare },
  { id: 'docs', label: 'Documentation Hub', icon: BookOpen },
];

function App() {
  const [viewMode, setViewMode] = useState<'landing' | 'portal'>('landing');
  const [user, setUser] = useState<UserInfo | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  useEffect(() => {
    if (!user) return;
    if (!canAccessTab(user.role, activeTab)) {
      setActiveTab(getDefaultTabForRole(user.role));
    }
  }, [user, activeTab]);

  const handleLogin = (authenticatedUser: UserInfo) => {
    setUser(authenticatedUser);
    setActiveTab(getDefaultTabForRole(authenticatedUser.role));
  };

  const handleBackToHome = () => {
    setViewMode('landing');
    closeSidebar();
  };

  const handleLogout = () => {
    setUser(null);
    setViewMode('landing');
    closeSidebar();
  };

  const handleEnterPortal = () => {
    setViewMode('portal');
  };

  const handleTabChange = (tab: TabType) => {
    if (user && canAccessTab(user.role, tab)) {
      setActiveTab(tab);
      closeSidebar();
    }
  };

  const renderView = () => {
    if (!user) return null;

    if (!canAccessTab(user.role, activeTab)) {
      return (
        <div className="glass-panel fade-in" style={{ padding: '32px', textAlign: 'center' }}>
          <ShieldAlert size={40} color="var(--warning)" style={{ marginBottom: '16px' }} />
          <h2>Access Restricted</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
            Your {user.role} role does not have permission to open this module.
          </p>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <DashboardView userRole={user.role} />;
      case 'cluster':
        return <HadoopClusterView userRole={user.role} />;
      case 'ml':
        return <MLStudioView userRole={user.role} />;
      case 'ingestion':
        return <IngestionView userRole={user.role} />;
      case 'streaming':
        return <StreamingView userRole={user.role} />;
      case 'support':
        return <SupportView userRole={user.role} />;
      case 'docs':
        return <DocsView />;
      default:
        return <DashboardView userRole={user.role} />;
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

  const visibleNavItems = NAV_ITEMS.filter((item) =>
    TAB_PERMISSIONS[item.id].includes(user.role)
  );

  const activeNavLabel = NAV_ITEMS.find((item) => item.id === activeTab)?.label ?? 'Dashboard';

  return (
    <div className="portal-layout">
      <div
        className={`portal-sidebar-overlay${sidebarOpen ? ' open' : ''}`}
        onClick={closeSidebar}
        aria-hidden={!sidebarOpen}
      />

      <header className="portal-mobile-header">
        <button
          type="button"
          className="mobile-menu-btn portal-menu-btn"
          onClick={() => setSidebarOpen((open) => !open)}
          aria-label={sidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="portal-mobile-title">
          <Activity color="var(--primary)" size={18} />
          <span>{activeNavLabel}</span>
        </div>
      </header>

      <aside className={`portal-sidebar${sidebarOpen ? ' open' : ''}`}>
        <button
          type="button"
          onClick={handleBackToHome}
          title="Back to main page"
          className="portal-sidebar-logo sidebar-logo-btn"
        >
          <div className="portal-sidebar-logo-icon">
            <Activity color="var(--primary)" size={20} />
          </div>
          <div>
            <h4 className="portal-sidebar-brand">EarthScape</h4>
            <span className="portal-sidebar-tagline">Climate Agency</span>
          </div>
        </button>

        <nav className="portal-sidebar-nav">
          <button
            type="button"
            className="btn btn-secondary portal-nav-btn portal-nav-btn-home"
            onClick={handleBackToHome}
          >
            <Home size={18} /> Back to Main Page
          </button>

          {visibleNavItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              className={`btn btn-secondary portal-nav-btn${activeTab === id ? ' active' : ''}`}
              onClick={() => handleTabChange(id)}
            >
              <Icon size={18} /> {label}
            </button>
          ))}

          {user.role === 'Analyst' && (
            <p className="portal-role-hint">
              Analyst access: analytics, ML, streaming monitor, support, and docs. Infrastructure modules require Admin.
            </p>
          )}
        </nav>

        <div className="portal-sidebar-footer">
          <ThemeToggle />
          <div className="portal-user-row">
            <div className="portal-user-avatar">
              <User size={18} color="var(--primary)" />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <p className="portal-user-name">{user.name}</p>
              <div className="portal-user-role">
                <span className={`status-indicator ${user.role === 'Admin' ? 'status-online' : 'status-busy'}`} />
                <span>{user.role} Authority</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-danger portal-sign-out"
            onClick={handleLogout}
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      <main className="portal-main">
        {renderView()}
      </main>
    </div>
  );
}

export default App;
