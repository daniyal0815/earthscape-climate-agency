// LandingPage.tsx
import React, { useState, useEffect } from 'react';
import { Activity, ShieldAlert, Cpu, Globe, Server, ArrowRight, Database, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface LandingPageProps {
  onEnterPortal: () => void;
  isLoggedIn?: boolean;
}

const NAV_LINKS = [
  { href: '#mission', label: 'Mission' },
  { href: '#metrics', label: 'Live Sentinel' },
  { href: '#pillars', label: 'Core Technology' },
  { href: '#team', label: 'ECA Agency' },
];

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterPortal, isLoggedIn = false }) => {
  const [co2, setCo2] = useState(418.52);
  const [temp, setTemp] = useState(1.18);
  const [nodes, setNodes] = useState(32);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCo2(prev => Number((prev + (Math.random() - 0.5) * 0.05).toFixed(2)));
      setTemp(prev => Number((prev + (Math.random() - 0.5) * 0.002).toFixed(4)));
      if (Math.random() > 0.8) {
        setNodes(prev => Math.min(36, Math.max(28, prev + (Math.random() > 0.5 ? 1 : -1))));
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--body-gradient)',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-sans)',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      
      <div className="landing-grid-bg" />

      <header className="landing-header">
        <div className="landing-header-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: 'var(--primary-dim)',
              border: '1px solid var(--border-color-active)',
              borderRadius: '8px',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Activity color="var(--primary)" size={18} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>EarthScape</h4>
              <span className="landing-brand-subtitle" style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Climate Agency</span>
            </div>
          </div>

          <nav className="landing-nav-desktop nav-links">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </nav>

          <div className="landing-header-actions">
            <ThemeToggle compact />
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <button
              onClick={onEnterPortal}
              className="btn btn-primary btn-portal-full"
              style={{ padding: '10px 18px', fontSize: '0.85rem', fontWeight: 600 }}
            >
              {isLoggedIn ? 'Go to Dashboard' : 'Launch Research Portal'} <ArrowRight size={14} />
            </button>
            <button
              onClick={onEnterPortal}
              className="btn btn-primary btn-portal-short"
              style={{ fontSize: '0.85rem', fontWeight: 600 }}
              aria-label="Launch Research Portal"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
        aria-hidden={!mobileMenuOpen}
      />
      <nav className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`} aria-hidden={!mobileMenuOpen}>
        <div className="mobile-nav-header">
          <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Menu</span>
          <button type="button" className="mobile-menu-btn" onClick={closeMobileMenu} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        {NAV_LINKS.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="mobile-nav-link"
            onClick={closeMobileMenu}
          >
            {link.label}
          </a>
        ))}
        <button
          onClick={() => { closeMobileMenu(); onEnterPortal(); }}
          className="btn btn-primary"
          style={{ marginTop: '12px', justifyContent: 'center' }}
        >
          {isLoggedIn ? 'Go to Dashboard' : 'Launch Research Portal'} <ArrowRight size={14} />
        </button>
      </nav>

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        zIndex: 2,
        padding: '80px 24px 60px 24px',
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <div className="hero-badge">
          <Globe size={14} /> Planetary Observation System v4.1 Active
        </div>

        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          maxWidth: '850px',
          margin: '0 auto 20px auto',
          color: 'var(--text-primary)'
        }}>
          Decoding Earth's Climate Intelligence Through <span style={{ color: 'var(--primary)' }}>Big Data</span>
        </h1>

        <p style={{
          fontSize: '1.1rem',
          color: 'var(--text-secondary)',
          maxWidth: '650px',
          margin: '0 auto 40px auto',
          lineHeight: 1.6
        }}>
          EarthScape Climate Agency (ECA) orchestrates high-fidelity distributed stream engines, neural network prediction scenarios, and big data clusters to map and forecast global environmental anomalies.
        </p>

        {/* Double Button CTA */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '60px' }}>
          <button 
            onClick={onEnterPortal}
            className="btn btn-primary"
            style={{
              padding: '14px 28px',
              fontSize: '0.95rem',
              fontWeight: 600
            }}
          >
            {isLoggedIn ? 'Go to Dashboard' : 'Launch Secure Dashboard'} <ArrowRight size={16} style={{ marginLeft: '4px' }} />
          </button>
          
          <a 
            href="#pillars"
            className="btn btn-secondary"
            style={{
              padding: '14px 28px',
              fontSize: '0.95rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            Explore Core Technology
          </a>
        </div>
      </section>

      {/* Live Environmental Sentinel Ticker */}
      <section id="metrics" style={{
        position: 'relative',
        zIndex: 2,
        padding: '0 24px 60px 24px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div className="glass-panel sentinel-panel">
          <span style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            display: 'block',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            🛰️ Live Environmental Sentinel Ingestion Feed
          </span>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px'
          }}>
            {/* CO2 widget */}
            <div className="metric-card">
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>CO₂ Concentration</span>
              <h2 style={{ fontFamily: 'var(--font-mono)', color: 'var(--warning)', margin: 0, fontSize: '1.8rem' }}>
                {co2} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ppm</span>
              </h2>
              <span style={{ fontSize: '0.65rem', color: 'var(--warning)', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '3px' }}>
                ● Real-time sensor stream active
              </span>
            </div>

            <div className="metric-card">
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Global Temperature Anomaly</span>
              <h2 style={{ fontFamily: 'var(--font-mono)', color: 'var(--danger)', margin: 0, fontSize: '1.8rem' }}>
                +{temp} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>°C</span>
              </h2>
              <span style={{ fontSize: '0.65rem', color: 'var(--danger)', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '3px' }}>
                ▲ Escalating surface heat metric
              </span>
            </div>

            <div className="metric-card">
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Active HDFS Storage Nodes</span>
              <h2 style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)', margin: 0, fontSize: '1.8rem' }}>
                {nodes} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Online</span>
              </h2>
              <span style={{ fontSize: '0.65rem', color: 'var(--success-text)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                ✔ Distributed Hadoop Rack Operational
              </span>
            </div>

            <div className="metric-card">
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>MapReduce Cluster Load</span>
              <h2 style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', margin: 0, fontSize: '1.8rem' }}>
                98.4% <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Efficiency</span>
              </h2>
              <span style={{ fontSize: '0.65rem', color: 'var(--accent)', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '3px' }}>
                ⚡ Processing geospatial raster matrices
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Agency Mission Statement */}
      <section id="mission" style={{
        position: 'relative',
        zIndex: 2,
        padding: '60px 24px',
        maxWidth: '1200px',
        margin: '0 auto',
        borderTop: '1px solid var(--section-divider)'
      }}>
        <div className="landing-mission-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              AGENCY CORE STATEMENT
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginTop: '8px', lineHeight: 1.25 }}>
              Tackling Environmental Complexity through Academic Rigor
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '20px', lineHeight: 1.6, fontSize: '0.95rem' }}>
              As a premier simulated initiative representing the **Aptech eProject Curriculum**, EarthScape Climate Agency maps out standard engineering constraints. By combining big data architectures and visual data flows, our analysts achieve planetary visibility.
            </p>
            <p style={{ color: 'var(--text-secondary)', marginTop: '14px', lineHeight: 1.6, fontSize: '0.95rem' }}>
              Our stack spans highly concurrent React layers, MongoDB GeoJSON catalogs, Hadoop-based MapReduce cluster pipelines, and LSTM recurrent weather projections.
            </p>

            <button 
              onClick={onEnterPortal}
              className="btn btn-primary"
              style={{ marginTop: '28px', padding: '12px 24px', fontSize: '0.85rem' }}
            >
              {isLoggedIn ? 'Return to Dashboard' : 'Access Academic Systems'} <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ position: 'relative' }}>
            <div className="glass-panel" style={{
              padding: '30px',
              border: '1px solid var(--border-color)',
              background: 'var(--surface-subtle)'
            }}>
              <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert color="var(--primary)" size={20} /> Academic Objectives
              </h3>
              
              <ul style={{
                listStyleType: 'none',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)'
              }}>
                <li style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✓</span>
                  <span><strong>Distributed Storage Architecture</strong>: High-fidelity replicas placed dynamically across HDFS data partitions.</span>
                </li>
                <li style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✓</span>
                  <span><strong>Analytical Tableau Engine</strong>: Multi-variable statistical cross-filtering and live Pearson-r calculations.</span>
                </li>
                <li style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✓</span>
                  <span><strong>Recurrent Prediction Projections</strong>: Neural Network models fitted to historical surface temperatures to forecast future scenarios.</span>
                </li>
                <li style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>✓</span>
                  <span><strong>Full Data Flow Audits</strong>: Meticulous DFD systems mapping out ingestion schemas from raster arrays to MongoDB catalogs.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Technology Pillars Section */}
      <section id="pillars" style={{
        position: 'relative',
        zIndex: 2,
        padding: '60px 24px 80px 24px',
        maxWidth: '1200px',
        margin: '0 auto',
        borderTop: '1px solid var(--section-divider)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            ENGINEERING SCHEMAS & INFRASTRUCTURE
          </span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginTop: '8px' }}>
            Three Pillars of Planetary Intelligence
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '12px auto 0 auto', fontSize: '0.9rem' }}>
            Our infrastructure couples high-throughput streaming ports with analytical databases to ensure reliable, high-performance climate computation.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {/* Pillar 1 */}
          <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', background: 'var(--surface-subtle)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <Server size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Hadoop Distributed File System</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Massive scaling capability chunking multi-gigabyte files into 128MB data blocks, replicated three-fold with comprehensive rack awareness to secure datasets against unexpected server outages.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', background: 'var(--surface-subtle)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.05)', border: '1px solid rgba(6, 182, 212, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
              <Cpu size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Predictive ML Neural Studio</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Leveraging Long Short-Term Memory recurrent architectures to model and train weights against weather anomalies, enabling accurate predictions of environmental scenarios through 2050.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', background: 'var(--surface-subtle)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--warning)' }}>
              <Database size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Geospatial Metadata Catalog</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Stores spatial coordinates and climate metadata records dynamically inside MongoDB GeoJSON document structures, ensuring millisecond-level responses for cross-filtering dashboard tasks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Frame */}
      <section style={{
        position: 'relative',
        zIndex: 2,
        padding: '0 24px 80px 24px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <div className="glass-panel" style={{
          padding: '48px',
          textAlign: 'center',
          background: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>
            Ready to Inspect Earth's Distributed Core?
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '550px', margin: '0 auto 28px auto', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Access our analytical subsystems, configure MapReduce training runs, parse test datasets, and inspect visual data flow diagrams.
          </p>

          <button 
            onClick={onEnterPortal}
            className="btn btn-primary"
            style={{
              padding: '14px 32px',
              fontSize: '0.95rem',
              fontWeight: 600
            }}
          >
            {isLoggedIn ? 'Go to Dashboard' : 'Log in to Research Portal'} <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="team" style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        padding: '48px 24px 32px 24px',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '32px',
          fontSize: '0.85rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Activity color="var(--primary)" size={16} />
              <strong style={{ fontSize: '0.95rem' }}>ECA Systems</strong>
            </div>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '300px', fontSize: '0.75rem', lineHeight: 1.4 }}>
              Distributed Climate Analytics, Hadoop HDFS monitoring, and weather scenario neural modeling systems.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '64px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Academic Portal</span>
              <a href="#mission" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.75rem' }}>Core Mission</a>
              <a href="#metrics" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.75rem' }}>Sentinel Feed</a>
              <a href="#pillars" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.75rem' }}>Framework Stack</a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Aptech eProject</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Course: Big Data Systems</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Batch Code: 2307C1</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Faculty: Urooh Rehman</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Status: Production Verified</span>
            </div>
          </div>
        </div>

        <div style={{
          maxWidth: '1200px',
          margin: '32px auto 0 auto',
          paddingTop: '20px',
          borderTop: '1px solid var(--section-divider)',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}>
          <span>© 2026 EarthScape Climate Agency (ECA). All rights reserved.</span>
          <span>Aptech eProject Deliverable 2307C1</span>
        </div>
      </footer>

    </div>
  );
};
