// SupportView.tsx
import React, { useState } from 'react';
import { DEFAULT_TICKETS, FAQS } from '../mockData';
import type { SupportTicket } from '../mockData';
import { MessageSquare, Send, CheckCircle2, ChevronDown, ChevronUp, User, Clock } from 'lucide-react';

export const SupportView: React.FC = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>(DEFAULT_TICKETS);
  const [expandedFaqIdx, setExpandedFaqIdx] = useState<number | null>(null);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<SupportTicket['category']>('Technical Inquiry');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTicket: SupportTicket = {
      id: `TCK-${Math.floor(411 + Math.random() * 50)}`,
      studentName: name,
      email,
      category,
      subject,
      message,
      status: 'Open',
      dateSubmitted: new Date().toISOString().split('T')[0]
    };

    setTickets(prev => [newTicket, ...prev]);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 4000);
  };

  const toggleFaq = (idx: number) => {
    setExpandedFaqIdx(prev => (prev === idx ? null : idx));
  };

  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <MessageSquare color="var(--primary)" /> eProjects Support Desk & FAQ
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
          Interact directly with the eProjects Team, submit technical inquiries, or review key architectural FAQs.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', flexWrap: 'wrap' }}>
        
        {/* Ticket Submission Form */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3>Submit an Inquiry Ticket</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Fill in the details regarding any issues or technical support required for your Big Data HDFS configurations.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Student Full Name</span>
                <input 
                  type="text" 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="input-field" 
                  placeholder="e.g. Liam Johnson" 
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Academy Email Address</span>
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field" 
                  placeholder="name@aptech-edu.net" 
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Category Classification</span>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value as SupportTicket['category'])}
                  className="input-field"
                  style={{ background: 'var(--bg-primary)' }}
                >
                  <option value="Technical Inquiry">Technical Inquiry (Hadoop/Mongo)</option>
                  <option value="Bug Report">System Bug Report</option>
                  <option value="Documentation Help">Documentation Inquiries</option>
                  <option value="Feedback">Portal Feedback</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Subject Title</span>
                <input 
                  type="text" 
                  required 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)}
                  className="input-field" 
                  placeholder="Brief issue headline" 
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Detailed Message description</span>
              <textarea 
                required 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                className="input-field" 
                style={{ height: '90px', resize: 'none' }}
                placeholder="Include error codes or specific logs if applicable..." 
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ height: '42px', justifyContent: 'center' }}>
              <Send size={14} /> Submit Support Ticket
            </button>
          </form>

          {showSuccess && (
            <div className="fade-in" style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.8rem',
              color: 'var(--primary)'
            }}>
              <CheckCircle2 size={16} />
              <span>Ticket submitted successfully! eProjects Team response will follow via email support.</span>
            </div>
          )}
        </div>

        {/* Collapsible FAQ Section */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3>Frequently Asked Questions</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Quick solutions to common queries concerning Big Data infrastructure parameters.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, overflowY: 'auto' }}>
            {FAQS.map((faq, idx) => (
              <div 
                key={idx} 
                className="glass-panel" 
                style={{ 
                  border: '1px solid',
                  borderColor: expandedFaqIdx === idx ? 'var(--primary)' : 'var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  transition: 'var(--transition)'
                }}
              >
                <div 
                  onClick={() => toggleFaq(idx)}
                  style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: expandedFaqIdx === idx ? 'rgba(16, 185, 129, 0.03)' : 'transparent',
                    fontWeight: 600,
                    fontSize: '0.85rem'
                  }}
                >
                  <span style={{ color: expandedFaqIdx === idx ? 'var(--primary)' : '#ffffff' }}>{faq.q}</span>
                  {expandedFaqIdx === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {expandedFaqIdx === idx && (
                  <div style={{ 
                    padding: '12px 16px', 
                    fontSize: '0.8rem', 
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                    borderTop: '1px solid var(--border-color)',
                    background: 'rgba(0,0,0,0.1)'
                  }} className="fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Ticket Logs List Table */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ marginBottom: '16px' }}>Academic Inquiry Logs</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', flexWrap: 'wrap' }}>
          
          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '10px' }}>Ticket ID</th>
                  <th style={{ padding: '10px' }}>Student</th>
                  <th style={{ padding: '10px' }}>Classification</th>
                  <th style={{ padding: '10px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr 
                    key={t.id} 
                    onClick={() => setSelectedTicketId(t.id)}
                    style={{ 
                      borderBottom: '1px solid rgba(255,255,255,0.03)',
                      cursor: 'pointer',
                      background: selectedTicketId === t.id ? 'rgba(255,255,255,0.03)' : 'transparent',
                      transition: 'var(--transition)'
                    }}
                  >
                    <td style={{ padding: '12px 10px', fontWeight: 'bold', color: 'var(--accent)' }}>{t.id}</td>
                    <td style={{ padding: '12px 10px' }}>{t.studentName}</td>
                    <td style={{ padding: '12px 10px', color: 'var(--text-secondary)' }}>{t.category}</td>
                    <td style={{ padding: '12px 10px' }}>
                      <span style={{
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        background: t.status === 'Resolved' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                        color: t.status === 'Resolved' ? 'var(--primary)' : 'var(--warning)',
                        border: t.status === 'Resolved' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)'
                      }}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Ticket Detail Panel */}
          <div className="glass-panel" style={{ padding: '20px', background: 'rgba(255,255,255,0.015)' }}>
            {!selectedTicket ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Select a ticket log to view correspondence logs.
              </div>
            ) : (
              <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                  <h4 style={{ color: '#ffffff' }}>{selectedTicket.subject}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{selectedTicket.dateSubmitted}</span>
                </div>

                {/* Message */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <User size={16} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#ffffff' }}>{selectedTicket.studentName}</span>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                      {selectedTicket.message}
                    </p>
                  </div>
                </div>

                {/* Response */}
                {selectedTicket.teamResponse ? (
                  <div style={{ 
                    display: 'flex', 
                    gap: '10px', 
                    background: 'rgba(16, 185, 129, 0.05)', 
                    border: '1px solid rgba(16, 185, 129, 0.15)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px',
                    marginTop: '10px'
                  }}>
                    <div style={{ background: 'var(--primary-dim)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--primary)' }}>
                      AP
                    </div>
                    <div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)' }}>eProjects Support Response</span>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4, fontFamily: 'var(--font-mono)' }}>
                        {selectedTicket.teamResponse}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    fontSize: '0.8rem', 
                    color: 'var(--warning)', 
                    background: 'rgba(245, 158, 11, 0.05)', 
                    border: '1px solid rgba(245, 158, 11, 0.15)',
                    padding: '10px',
                    borderRadius: 'var(--radius-sm)',
                    marginTop: '10px'
                  }}>
                    <Clock size={14} />
                    <span>Inquiry queued. An administrative assistant is preparing a diagnostic resolution.</span>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};
