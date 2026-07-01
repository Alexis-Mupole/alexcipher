import React, { useState } from 'react';
import { Lock, Zap, EyeOff, ArrowRight, X, Type, Cpu, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface HeroProps {
  onStart: () => void;
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({ onStart, language }) => {
  const t = translations[language].hero;
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Type': return <Type className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      case 'Lock': return <Lock className="w-6 h-6" />;
      case 'Send': return <Send className="w-6 h-6" />;
      default: return <ShieldCheck className="w-6 h-6" />;
    }
  };

  return (
    <div className="relative overflow-hidden pt-12 pb-20 lg:pt-32 lg:pb-40">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
        <div className="hero-glow-1"></div>
        <div className="hero-glow-2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="feature-pill mb-6 md:mb-8" style={{ backgroundColor: 'var(--accent-soft)', border: '1px solid var(--accent)', color: 'var(--accent)' }}>
          <Zap className="w-3 h-3" />
          {t.badge}
        </div>

        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]" style={{ color: 'var(--text-primary)' }}>
          {t.title1} <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, var(--accent), #6366f1)` }}>
            {t.title2}
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base md:text-xl mb-8 md:mb-10 leading-relaxed px-4" style={{ color: 'var(--text-secondary)' }}>
          {t.desc}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 md:mb-20 px-4">
          <button 
            onClick={onStart}
            className="btn-primary"
          >
            {t.ctaStart} <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsHowItWorksOpen(true)}
            className="btn-secondary"
          >
            {t.ctaHow}
          </button>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 px-4">
          {[
            { icon: <EyeOff className="w-6 h-6" style={{ color: 'var(--accent)' }} />, ...t.features[0] },
            { icon: <Lock className="w-6 h-6" style={{ color: '#6366f1' }} />, ...t.features[1] },
            { icon: <Zap className="w-6 h-6" style={{ color: '#10b981' }} />, ...t.features[2] }
          ].map((feature, i) => (
            <div key={i} className="card-hover p-6 md:p-8 rounded-3xl border text-left" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <div className="icon-box icon-box-glow w-12 h-12 mb-6" style={{ backgroundColor: 'var(--accent-soft)' }}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 tracking-tight" style={{ color: 'var(--text-primary)' }}>{feature.title}</h3>
              <p className="leading-relaxed text-sm" style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Modal */}
      {isHowItWorksOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 backdrop-blur-sm animate-in fade-in duration-300"
            style={{ backgroundColor: 'var(--overlay)' }}
            onClick={() => setIsHowItWorksOpen(false)}
          />
          <div className="relative w-full max-w-2xl max-h-[90vh] border rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in slide-in-from-bottom-4 duration-300 flex flex-col" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
            <div className="flex items-center justify-between p-6 shrink-0" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <ShieldCheck className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                {t.howItWorks.title}
              </h2>
                <button 
                  onClick={() => setIsHowItWorksOpen(false)}
                  className="icon-box w-9 h-9" style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-secondary)' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto">
              <div className="space-y-8">
                {t.howItWorks.steps.map((step, i) => (
                  <div key={i} className="flex gap-4 md:gap-6 group">
                    <div className="flex flex-col items-center">
                      <div className="icon-box w-10 h-10 md:w-12 md:h-12 border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--accent)' }}>
                        {getStepIcon(step.icon)}
                      </div>
                      {i < t.howItWorks.steps.length - 1 && (
                        <div className="step-line" />
                      )}
                    </div>
                    <div className="pb-4">
                      <h4 className="text-lg font-bold mb-1 transition-colors" style={{ color: 'var(--text-primary)' }}>
                        <span className="mr-2 font-mono" style={{ color: 'var(--accent)' }}>0{i + 1}.</span>
                        {step.title}
                      </h4>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 md:p-6 flex justify-end shrink-0" style={{ borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)' }}>
              <button 
                onClick={() => setIsHowItWorksOpen(false)}
                className="btn-secondary w-full sm:w-auto"
              >
                {t.howItWorks.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
