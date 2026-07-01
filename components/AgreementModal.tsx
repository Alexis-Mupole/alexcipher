import React, { useState } from 'react';
import { ShieldCheck, CheckCircle, AlertTriangle } from 'lucide-react';
import { translations } from '../translations';
import { Language } from '../types';

interface AgreementModalProps {
  language: Language;
  onAccept: () => void;
}

export const AgreementModal: React.FC<AgreementModalProps> = ({ language, onAccept }) => {
  const t = translations[language].agreement;
  const [agreed1, setAgreed1] = useState(false);
  const [agreed2, setAgreed2] = useState(false);

  const canContinue = agreed1 && agreed2;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 backdrop-blur-xl" style={{ backgroundColor: 'var(--overlay)' }} />

      <div className="relative w-full max-w-lg max-h-[90vh] border rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in duration-300" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
        <div className="p-6 md:p-8 text-center overflow-y-auto">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'var(--accent-soft)' }}>
            <ShieldCheck className="w-8 h-8" style={{ color: 'var(--accent)' }} />
          </div>

          <h2 className="text-2xl font-bold mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {t.title}
          </h2>

          <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
            {t.desc}
          </p>

          <div className="space-y-4 text-left mb-8">
            <label className="flex items-start gap-4 p-4 border rounded-2xl cursor-pointer transition-all group" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <input 
                type="checkbox" 
                checked={agreed1} 
                onChange={() => setAgreed1(!agreed1)}
                className="mt-1 w-5 h-5 md:w-4 md:h-4 rounded shrink-0"
                style={{ accentColor: 'var(--accent)' }}
              />
              <span className="text-sm font-medium leading-tight transition-colors" style={{ color: 'var(--text-secondary)' }}>
                {t.check1}
              </span>
            </label>

            <label className="flex items-start gap-4 p-4 border rounded-2xl cursor-pointer transition-all group" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <input 
                type="checkbox" 
                checked={agreed2} 
                onChange={() => setAgreed2(!agreed2)}
                className="mt-1 w-5 h-5 md:w-4 md:h-4 rounded shrink-0"
                style={{ accentColor: 'var(--accent)' }}
              />
              <span className="text-sm font-medium leading-tight transition-colors" style={{ color: 'var(--text-secondary)' }}>
                {t.check2}
              </span>
            </label>
          </div>
        </div>

        <div className="p-6 md:p-8" style={{ borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-elevated)' }}>
          <div className="flex flex-col gap-4">
            <button 
              disabled={!canContinue}
              onClick={onAccept}
              className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-white"
              style={canContinue ? { background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))' } : { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)' }}
            >
              <CheckCircle className="w-5 h-5" />
              {t.btn}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] uppercase font-bold tracking-widest" style={{ color: '#f97316' }}>
              <AlertTriangle className="w-3 h-3" />
              {language === 'fr' ? 'Usage local uniquement' : 'Local use only'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
