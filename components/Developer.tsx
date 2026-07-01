import React from 'react';
import { Language, Page } from '../types';
import { translations } from '../translations';
import { Code2, MapPin, Briefcase, GraduationCap, Wrench, Mail, Phone, ExternalLink, MessageCircle, ArrowLeft, Shield, Globe, Server, Database, Network, HardDrive } from 'lucide-react';

interface DeveloperProps {
  language: Language;
  onNavigate: (page: Page) => void;
}

const techIcons = [Code2, Server, Database, Network, HardDrive, Globe];

export const Developer: React.FC<DeveloperProps> = ({ language, onNavigate }) => {
  const t = translations[language].developer;
  const common = translations[language].common;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
      <button 
        onClick={() => onNavigate('landing')}
        className="flex items-center gap-2 transition-colors mb-6 group text-sm font-medium"
        style={{ color: 'var(--text-muted)' }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        {common.back}
      </button>

      {/* Hero */}
      <div className="text-center mb-16">
        <div className="icon-box icon-box-glow w-20 h-20 mx-auto mb-6" style={{ backgroundColor: 'var(--bg-secondary)', border: '2px solid var(--border-color)', color: 'var(--accent)' }}>
          <Code2 className="w-10 h-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
          {t.desc}
        </h1>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <span className="tag flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> {t.location}
          </span>
          <span className="tag flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5" /> {t.experience}
          </span>
          <span className="tag flex items-center gap-1.5" style={{ color: 'var(--accent)', borderColor: 'var(--accent)', backgroundColor: 'var(--accent-soft)' }}>
            {t.role}
          </span>
        </div>
      </div>

      {/* About */}
      <section className="card-hover card-accent border p-8 rounded-3xl mb-8" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
        <h2 className="text-2xl font-bold mb-4 gradient-text">{language === 'fr' ? 'À Propos' : 'About'}</h2>
        <p className="leading-relaxed text-base" style={{ color: 'var(--text-secondary)' }}>
          {t.about}
        </p>
      </section>

      {/* Qualifications */}
      <section className="card-hover border p-8 rounded-3xl mb-8" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="icon-box w-10 h-10" style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }}>
            <GraduationCap className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{t.qualifications}</h2>
        </div>
        <ul className="space-y-4">
          {t.qualList.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ backgroundColor: 'var(--accent)' }} />
              <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Services */}
      <section className="card-hover border p-8 rounded-3xl mb-8" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="icon-box w-10 h-10" style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }}>
            <Wrench className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{t.services}</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {t.serviceList.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-2xl" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <div className="icon-box w-9 h-9 shrink-0" style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }}>
                <Shield className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="card-hover border p-8 rounded-3xl mb-12" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
        <div className="flex items-center gap-3 mb-8">
          <div className="icon-box w-10 h-10" style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }}>
            <Mail className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{t.contact}</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <a href="mailto:regusopus@gmail.com" className="flex items-center gap-4 p-5 rounded-2xl transition-all active:scale-[0.97] group" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <div className="icon-box w-10 h-10" style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }}>
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Email</div>
              <div className="text-sm font-semibold group-hover:underline" style={{ color: 'var(--text-primary)' }}>regusopus@gmail.com</div>
            </div>
          </a>
          <a href="https://wa.me/243997306308" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 rounded-2xl transition-all active:scale-[0.97] group" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <div className="icon-box w-10 h-10" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{t.whatsapp}</div>
              <div className="text-sm font-semibold group-hover:underline" style={{ color: 'var(--text-primary)' }}>+243 997 306 308</div>
            </div>
          </a>
          <a href="tel:+243997306308" className="flex items-center gap-4 p-5 rounded-2xl transition-all active:scale-[0.97] group" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <div className="icon-box w-10 h-10" style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }}>
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{language === 'fr' ? 'Téléphone' : 'Phone'}</div>
              <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>+243 997 306 308</div>
            </div>
          </a>
          <a href="https://alexismupole.me" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 rounded-2xl transition-all active:scale-[0.97] group" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
            <div className="icon-box w-10 h-10" style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }}>
              <ExternalLink className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{language === 'fr' ? 'Site Web' : 'Website'}</div>
              <div className="text-sm font-semibold group-hover:underline" style={{ color: 'var(--text-primary)' }}>alexismupole.me</div>
            </div>
          </a>
        </div>
      </section>

      <div className="text-center">
        <a 
          href="https://alexismupole.me" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-3 px-8 py-4 text-sm font-bold rounded-full"
        >
          <ExternalLink className="w-4 h-4" />
          {t.viewPortfolio}
        </a>
      </div>
    </div>
  );
};