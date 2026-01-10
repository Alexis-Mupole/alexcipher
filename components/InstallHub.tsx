import React, { useState } from 'react';
import { Smartphone, LayoutGrid, Home, X, CheckCircle2, ShieldCheck, Download, Loader2, Sparkles, Info, Cpu, Package, Zap, ChevronRight, Monitor, AppWindow } from 'lucide-react';
import { translations } from '../translations';
import { Language } from '../types';

interface InstallHubProps {
  language: Language;
  onClose: () => void;
  onTriggerInstall: () => Promise<void>;
  isIOS: boolean;
}

export const InstallHub: React.FC<InstallHubProps> = ({ language, onClose, onTriggerInstall, isIOS }) => {
  const t = translations[language].installHub;
  const [step, setStep] = useState<'selection' | 'preparing'>('selection');
  const [progress, setProgress] = useState(0);

  const startNativeInstall = async () => {
    setStep('preparing');
    
    // Simulation d'initialisation du package système (indispensable pour le ressenti "Download")
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(async () => {
          await onTriggerInstall();
          setStep('selection');
        }, 400);
      }
      setProgress(p);
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-300">
      {/* Background Dimmer */}
      <div 
        className="absolute inset-0 bg-[#020617]/95 backdrop-blur-xl sm:backdrop-blur-md" 
        onClick={step === 'selection' ? onClose : undefined} 
      />
      
      {/* Container: Bottom Sheet on Mobile, Centered Modal on Desktop */}
      <div className="relative w-full max-w-xl bg-[#0f172a] border-t sm:border border-slate-800 rounded-t-[2.5rem] sm:rounded-[3rem] shadow-[0_-15px_60px_rgba(0,0,0,0.6)] overflow-hidden animate-in slide-in-from-bottom duration-500 flex flex-col max-h-[92vh]">
        
        {/* Progress Bar (Visible during preparation) */}
        <div 
          className="absolute top-0 left-0 h-1.5 bg-gradient-to-r from-cyan-500 to-indigo-500 shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-300 z-50" 
          style={{ width: `${progress}%`, opacity: step === 'preparing' ? 1 : 0 }} 
        />

        {/* Header Section */}
        <div className="p-6 md:p-8 flex items-center justify-between border-b border-slate-800/40 bg-slate-950/20 shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl text-cyan-400">
              {step === 'preparing' ? <Loader2 className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                {step === 'preparing' ? 'Initialisation...' : t.title}
              </h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">
                {step === 'preparing' ? 'Préparation du noyau de sécurité' : 'Module de Déploiement Natif'}
              </p>
            </div>
          </div>
          {step === 'selection' && (
            <button 
              onClick={onClose} 
              className="p-3 text-slate-500 hover:text-white bg-slate-800/50 rounded-xl transition-all active:scale-90"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Body Content */}
        <div className="p-6 md:p-10 overflow-y-auto">
          {step === 'preparing' ? (
            <div className="py-12 flex flex-col items-center text-center space-y-10 animate-in fade-in duration-500">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <div className="absolute inset-0 border-8 border-slate-800/50 rounded-full" />
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="64"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={402}
                    strokeDashoffset={402 - (402 * progress) / 100}
                    className="text-cyan-500 transition-all duration-300"
                  />
                </svg>
                <div className="flex flex-col items-center">
                  <Cpu className="w-10 h-10 text-cyan-400 animate-pulse mb-1" />
                  <span className="text-2xl font-black text-white">{Math.round(progress)}%</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm font-medium max-w-xs mx-auto">
                Téléchargement et configuration des algorithmes AES-256 dans votre environnement local...
              </p>
            </div>
          ) : isIOS ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6">
              <div className="bg-slate-950/50 border border-slate-800 rounded-[2.5rem] p-10 text-center space-y-8">
                <ShieldCheck className="w-12 h-12 text-indigo-400 mx-auto" />
                <h3 className="text-slate-200 text-xl font-black leading-tight max-w-xs mx-auto">{t.iosNote}</h3>
                
                <div className="grid gap-4 text-left">
                  <div className="flex items-center gap-5 p-5 bg-slate-900/80 rounded-2xl border border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500 text-slate-950 flex items-center justify-center text-sm font-black shadow-lg">1</div>
                    <p className="text-sm text-slate-400 font-bold uppercase">Appuyez sur <span className="text-white font-black">Partager</span></p>
                  </div>
                  <div className="flex items-center gap-5 p-5 bg-slate-900/80 rounded-2xl border border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500 text-slate-950 flex items-center justify-center text-sm font-black shadow-lg">2</div>
                    <p className="text-sm text-slate-400 font-bold uppercase"><span className="text-white font-black">Sur l'écran d'accueil</span></p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-5 animate-in fade-in slide-in-from-bottom-6">
              {/* Option 1: NATIVE APP LIST INSTALL */}
              <button 
                onClick={startNativeInstall}
                className="group relative flex items-center gap-6 p-8 bg-slate-950 border border-slate-800 hover:border-cyan-500/50 rounded-[2rem] transition-all text-left active:scale-[0.98] shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="shrink-0 p-5 bg-slate-900 border border-slate-800 rounded-2xl text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all shadow-xl">
                  <Package className="w-8 h-8" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-black text-white text-lg leading-none">{t.option1Title}</h3>
                    <div className="px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-[8px] text-cyan-400 font-black uppercase tracking-widest">Full App</div>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{t.option1Desc}</p>
                </div>
                <ChevronRight className="w-6 h-6 text-slate-800 group-hover:text-cyan-500 transition-colors shrink-0" />
              </button>

              {/* Option 2: HOMESCREEN QUICK ACCESS */}
              <button 
                onClick={onTriggerInstall}
                className="group relative flex items-center gap-6 p-8 bg-slate-950 border border-slate-800 hover:border-indigo-500/50 rounded-[2rem] transition-all text-left active:scale-[0.98] shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="shrink-0 p-5 bg-slate-900 border border-slate-800 rounded-2xl text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-xl">
                  <Home className="w-8 h-8" />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="font-black text-white text-lg leading-none mb-1">{t.option2Title}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{t.option2Desc}</p>
                </div>
                <ChevronRight className="w-6 h-6 text-slate-800 group-hover:text-indigo-500 transition-colors shrink-0" />
              </button>

              <div className="mt-6 flex items-start gap-4 p-6 bg-cyan-500/5 border border-cyan-500/10 rounded-[1.5rem]">
                <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed uppercase tracking-wider">
                  L'installation native (WebAPK) place AlexCipher dans votre tiroir d'applications Android. Elle garantit une navigation sans barre d'adresse et un accès sécurisé immédiat.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer / Close Button */}
        <div className="px-8 py-8 md:px-12 md:py-10 bg-slate-950/80 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-6 shrink-0">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">System Ready for Patch</span>
          </div>
          <button 
            onClick={onClose}
            className="w-full sm:w-auto px-12 py-4 text-[12px] font-black uppercase tracking-[0.5em] text-slate-400 hover:text-cyan-400 transition-all border border-transparent hover:border-cyan-500/20 rounded-2xl active:scale-95"
          >
            {t.close}
          </button>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(34, 211, 238, 0.1); border-radius: 10px; }
      `}</style>
    </div>
  );
};