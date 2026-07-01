import React from 'react';
import { HelpCircle, ShieldCheck, Zap, ServerOff, Lightbulb, Smartphone, ShieldAlert, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Language, Page } from '../types';
import { translations } from '../translations';

interface FAQSectionProps {
  language: Language;
  onNavigate: (page: Page) => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ language, onNavigate }) => {
  const t = translations[language].faq;
  const common = translations[language].common;

  const tipIcons = [
    <Smartphone className="w-5 h-5" />,
    <Zap className="w-5 h-5" />,
    <ShieldAlert className="w-5 h-5" />,
    <CheckCircle2 className="w-5 h-5" />
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
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
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
          {t.title}
        </h2>
        <p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {t.tagline}
        </p>
      </div>

      {/* Intro Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {[
              { icon: <ServerOff className="w-6 h-6" />, color: '#f97316', bg: 'rgba(249, 115, 22, 0.1)', ...t.features[0] },
              { icon: <ShieldCheck className="w-6 h-6" />, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', ...t.features[1] },
              { icon: <Zap className="w-6 h-6" />, color: 'var(--accent)', bg: 'var(--accent-soft)', ...t.features[2] },
          ].map((item, i) => (
            <div key={i} className="card-hover border p-8 rounded-3xl text-center" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
              <div className="icon-box w-14 h-14 mx-auto mb-6" style={{ backgroundColor: item.bg, color: item.color }}>{item.icon}</div>
            <h4 className="font-bold mb-2 text-xl" style={{ color: 'var(--text-primary)' }}>{item.title}</h4>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-5 gap-12">
        {/* Tips Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="feature-pill mb-8" style={{ backgroundColor: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.2)', color: '#eab308' }}>
            <Lightbulb className="w-4 h-4" />
            <span className="text-sm font-bold">{t.sections.tips}</span>
          </div>

          {t.tips.map((tip, i) => (
            <div key={i} className="card-hover border p-6 rounded-2xl relative overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
              <div className="absolute top-0 left-0 w-1 h-full transition-opacity" style={{ backgroundColor: 'var(--accent)', opacity: 0 }} />
              <div className="flex gap-4">
                <div className="icon-box w-10 h-10 shrink-0" style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }}>
                  {tipIcons[i % tipIcons.length]}
                </div>
                <div>
                  <h4 className="font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{tip.title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{tip.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="lg:col-span-3 space-y-6">
          <div className="feature-pill mb-8" style={{ backgroundColor: 'var(--accent-soft)', border: '1px solid var(--accent)', color: 'var(--accent)' }}>
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm font-bold">{t.sections.faq}</span>
          </div>

          <div className="space-y-4">
            {t.items.map((item, i) => (
              <div key={i} className="card-hover card-accent border rounded-2xl p-6" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
                <h3 className="text-lg font-bold mb-3 flex items-start gap-3" style={{ color: 'var(--text-primary)' }}>
                  <span className="font-mono mt-1 text-sm" style={{ color: 'var(--accent)' }}>Q.</span>
                  {item.q}
                </h3>
                <div className="flex gap-3">
                  <span className="font-mono text-sm mt-0.5" style={{ color: '#10b981' }}>R.</span>
                  <p className="leading-relaxed text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Security Note */}
      <div className="glass-card mt-20 p-8 rounded-3xl text-center">
        <div className="icon-box icon-box-glow w-14 h-14 mx-auto mb-4" style={{ color: 'var(--accent)', backgroundColor: 'var(--accent-soft)' }}>
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h4 className="font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
          {language === 'fr' ? 'Sécurité par Design' : 'Security by Design'}
        </h4>
        <p className="text-sm max-w-xl mx-auto italic" style={{ color: 'var(--text-muted)' }}>
          {language === 'fr' 
            ? 'AlexCipher est un projet open-source. Nous croyons que la sécurité ne doit pas être une boîte noire. Chaque ligne de code est auditable pour garantir votre vie privée.'
            : 'AlexCipher is an open-source project. We believe security should not be a black box. Every line of code is auditable to guarantee your privacy.'}
        </p>
      </div>
    </div>
  );
};
