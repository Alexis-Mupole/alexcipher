
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
      <div className="absolute inset-0 bg-[#0f172a] backdrop-blur-xl" />
      
      <div className="relative w-full max-w-lg max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in duration-300">
        <div className="p-6 md:p-8 text-center overflow-y-auto">
          <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8 text-cyan-400" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">
            {t.title}
          </h2>
          
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            {t.desc}
          </p>
          
          <div className="space-y-4 text-left mb-8">
            <label className="flex items-start gap-4 p-4 bg-slate-950 border border-slate-800 rounded-2xl cursor-pointer hover:border-slate-700 transition-all group">
              <input 
                type="checkbox" 
                checked={agreed1} 
                onChange={() => setAgreed1(!agreed1)}
                className="mt-1 w-5 h-5 md:w-4 md:h-4 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500 shrink-0"
              />
              <span className="text-sm text-slate-300 font-medium leading-tight group-hover:text-white transition-colors">
                {t.check1}
              </span>
            </label>
            
            <label className="flex items-start gap-4 p-4 bg-slate-950 border border-slate-800 rounded-2xl cursor-pointer hover:border-slate-700 transition-all group">
              <input 
                type="checkbox" 
                checked={agreed2} 
                onChange={() => setAgreed2(!agreed2)}
                className="mt-1 w-5 h-5 md:w-4 md:h-4 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500 shrink-0"
              />
              <span className="text-sm text-slate-300 font-medium leading-tight group-hover:text-white transition-colors">
                {t.check2}
              </span>
            </label>
          </div>
        </div>

        <div className="p-6 md:p-8 bg-slate-900 border-t border-slate-800">
          <div className="flex flex-col gap-4">
            <button 
              disabled={!canContinue}
              onClick={onAccept}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                canContinue 
                ? 'bg-cyan-500 text-[#0f172a] hover:scale-[1.02] shadow-lg shadow-cyan-500/20' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <CheckCircle className="w-5 h-5" />
              {t.btn}
            </button>
            
            <div className="flex items-center justify-center gap-2 text-orange-500/60 text-[10px] uppercase font-bold tracking-widest">
              <AlertTriangle className="w-3 h-3" />
              Usage local uniquement
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
