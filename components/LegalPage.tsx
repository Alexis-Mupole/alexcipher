import React from 'react';
import { Shield, ScrollText, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Language, Page } from '../types';
import { translations } from '../translations';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  language: Language;
  onNavigate: (page: Page) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, language, onNavigate }) => {
  const content = translations[language].legal[type];
  const common = translations[language].common;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-16">
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

      <div className="text-center mb-16">
        <div className="icon-box icon-box-glow w-16 h-16 mx-auto mb-6" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: type === 'privacy' ? 'var(--accent)' : '#6366f1' }}>
          {type === 'privacy' ? (
            <Shield className="w-8 h-8" />
          ) : (
            <ScrollText className="w-8 h-8" />
          )}
        </div>
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
          {content.title}
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {content.desc}
        </p>
      </div>

      <div className="space-y-12">
        {content.sections.map((section, idx) => (
          <section key={idx} className="card-hover border p-8 rounded-3xl relative overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
            <div className="absolute top-0 left-0 w-1 h-full transition-opacity group-hover:opacity-100" style={{ backgroundColor: type === 'privacy' ? 'var(--accent)' : '#6366f1', opacity: 0 }} />
            <div className="flex items-start gap-4">
              <div className="icon-box w-10 h-10 mt-1" style={{ backgroundColor: type === 'privacy' ? 'var(--accent-soft)' : 'rgba(99, 102, 241, 0.1)', color: type === 'privacy' ? 'var(--accent)' : '#6366f1' }}>
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{section.title}</h3>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {section.content}
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 pt-8 text-center text-sm italic" style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
        {language === 'fr' ? 'Dernière mise à jour' : 'Last updated'} : {language === 'fr' ? 'Jan 2026' : 'Jan 2026'}
      </div>
    </div>
  );
};
