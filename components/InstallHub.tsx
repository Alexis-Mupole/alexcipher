import React, { useState } from 'react';
import { Download, X, Loader2, Cpu, Package, Home, Zap, Info, ShieldCheck, ChevronRight } from 'lucide-react';
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
      <div 
        className="absolute inset-0 backdrop-blur-xl sm:backdrop-blur-md" 
        style={{ backgroundColor: 'var(--overlay)' }}
        onClick={step === 'selection' ? onClose : undefined} 
      />

      <div className="relative w-full max-w-xl border-t sm:border rounded-t-[2.5rem] sm:rounded-[3rem] shadow-[0_-15px_60px_rgba(0,0,0,0.3)] overflow-hidden animate-in slide-in-from-bottom duration-500 flex flex-col max-h-[92vh]" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>

        {/* Progress Bar */}
        <div 
          className="absolute top-0 left-0 h-1.5 bg-gradient-to-r shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all duration-300 z-50" 
          style={{ width: `${progress}%`, opacity: step === 'preparing' ? 1 : 0, background: 'linear-gradient(to right, var(--accent), #6366f1)' }} 
        />

        {/* Header */}
        <div className="p-6 md:p-8 flex items-center justify-between shrink-0" style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-elevated)' }}>
            <div className="flex items-center gap-4">
              <div className="icon-box w-14 h-14 border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--accent)' }}>
                {step === 'preparing' ? <Loader2 className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
              </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
                {step === 'preparing' ? (language === 'fr' ? 'Initialisation...' : 'Initializing...') : t.title}
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                {step === 'preparing' ? (language === 'fr' ? 'Préparation du noyau de sécurité' : 'Preparing security kernel') : (language === 'fr' ? 'Module de Déploiement Natif' : 'Native Deployment Module')}
              </p>
            </div>
          </div>
          {step === 'selection' && (
            <button 
              onClick={onClose} 
              className="p-3 rounded-xl transition-all active:scale-90" style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-secondary)' }}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-6 md:p-10 overflow-y-auto">
          {step === 'preparing' ? (
            <div className="py-12 flex flex-col items-center text-center space-y-10 animate-in fade-in duration-500">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <div className="absolute inset-0 border-8 rounded-full" style={{ borderColor: 'var(--border-color)' }} />
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
                    className="transition-all duration-300"
                    style={{ color: 'var(--accent)' }}
                  />
                </svg>
                <div className="flex flex-col items-center">
                  <Cpu className="w-10 h-10 animate-pulse mb-1" style={{ color: 'var(--accent)' }} />
                  <span className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>{Math.round(progress)}%</span>
                </div>
              </div>
              <p className="text-sm font-medium max-w-xs mx-auto" style={{ color: 'var(--text-muted)' }}>
                {language === 'fr' 
                  ? 'Téléchargement et configuration des algorithmes AES-256 dans votre environnement local...'
                  : 'Downloading and configuring AES-256 algorithms in your local environment...'}
              </p>
            </div>
          ) : isIOS ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6">
              <div className="border rounded-[2.5rem] p-10 text-center space-y-8" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                <ShieldCheck className="w-12 h-12 mx-auto" style={{ color: '#6366f1' }} />
                <h3 className="text-xl font-black leading-tight max-w-xs mx-auto" style={{ color: 'var(--text-secondary)' }}>{t.iosNote}</h3>

                <div className="grid gap-4 text-left">
                  <div className="flex items-center gap-5 p-5 rounded-2xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shadow-lg" style={{ backgroundColor: '#6366f1', color: '#fff' }}>1</div>
                    <p className="text-sm font-bold uppercase" style={{ color: 'var(--text-muted)' }}>
                      {language === 'fr' ? 'Appuyez sur' : 'Tap'}{' '}
                      <span className="text-white font-black" style={{ color: 'var(--text-primary)' }}>
                        {language === 'fr' ? 'Partager' : 'Share'}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-5 p-5 rounded-2xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shadow-lg" style={{ backgroundColor: '#6366f1', color: '#fff' }}>2</div>
                    <p className="text-sm font-bold uppercase" style={{ color: 'var(--text-muted)' }}>
                      <span className="text-white font-black" style={{ color: 'var(--text-primary)' }}>
                        {language === 'fr' ? "Sur l'écran d'accueil" : "Add to Home Screen"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-5 animate-in fade-in slide-in-from-bottom-6">
              <button 
                onClick={startNativeInstall}
                className="card-hover-glow group relative flex items-center gap-6 p-8 border rounded-[2rem] text-left shadow-xl"
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(to right, var(--accent-soft), transparent)' }} />
                <div className="icon-box w-[72px] h-[72px] border shadow-xl" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)', color: 'var(--accent)' }}>
                  <Package className="w-8 h-8" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-black text-lg leading-none" style={{ color: 'var(--text-primary)' }}>{t.option1Title}</h3>
                    <div className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest" style={{ backgroundColor: 'var(--accent-soft)', border: '1px solid var(--accent)', color: 'var(--accent)' }}>Full App</div>
                  </div>
                  <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--text-muted)' }}>{t.option1Desc}</p>
                </div>
                <ChevronRight className="w-6 h-6 shrink-0" style={{ color: 'var(--border-color)' }} />
              </button>

              <button 
                onClick={onTriggerInstall}
                className="card-hover-glow group relative flex items-center gap-6 p-8 border rounded-[2rem] text-left shadow-xl"
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(to right, rgba(99, 102, 241, 0.05), transparent)' }} />
                <div className="icon-box w-[72px] h-[72px] border shadow-xl" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)', color: '#6366f1' }}>
                  <Home className="w-8 h-8" />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="font-black text-lg leading-none mb-1" style={{ color: 'var(--text-primary)' }}>{t.option2Title}</h3>
                  <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--text-muted)' }}>{t.option2Desc}</p>
                </div>
                <ChevronRight className="w-6 h-6 shrink-0" style={{ color: 'var(--border-color)' }} />
              </button>

              <div className="glass-card mt-6 flex items-start gap-4 p-6 rounded-[1.5rem]" style={{ backgroundColor: 'var(--accent-soft)' }}>
                <div className="icon-box w-8 h-8 shrink-0" style={{ color: 'var(--accent)', backgroundColor: 'var(--accent-soft)' }}>
                  <Info className="w-4 h-4" />
                </div>
                <p className="text-[10px] font-medium leading-relaxed uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  {language === 'fr' 
                    ? "L'installation native (WebAPK) place AlexCipher dans votre tiroir d'applications Android. Elle garantit une navigation sans barre d'adresse et un accès sécurisé immédiat."
                    : 'Native installation (WebAPK) places AlexCipher in your Android app drawer. It ensures adress-bar-free navigation and immediate secure access.'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-8 md:px-12 md:py-10 flex flex-col sm:flex-row items-center justify-between gap-6 shrink-0" style={{ borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)' }}>
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5" style={{ color: '#10b981' }} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: 'var(--text-muted)' }}>
              {language === 'fr' ? 'Prêt pour Installation' : 'Ready for Installation'}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="btn-secondary w-full sm:w-auto"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
