
import React, { useState, useMemo } from 'react';
import { Key, RefreshCw, Eye, EyeOff, Gamepad2, Info, Copy, Eraser } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface KeyManagerProps {
  language: Language;
  value: string;
  onChange: (val: string) => void;
  addToast: (msg: string, type?: 'success' | 'error') => void;
}

export const KeyManager: React.FC<KeyManagerProps> = ({ language, value, onChange, addToast }) => {
  const t = translations[language].dashboard.keyManager;
  const labels = translations[language].dashboard;
  const [activeTab, setActiveTab] = useState<'manual' | 'auto' | 'theme'>('manual');
  const [showPassword, setShowPassword] = useState(false);

  const strength = useMemo(() => {
    if (!value) return 0;
    let s = 0;
    if (value.length > 10) s += 1;
    if (/[A-Z]/.test(value)) s += 1;
    if (/[0-9]/.test(value)) s += 1;
    if (/[^A-Za-z0-9]/.test(value)) s += 1;
    return s;
  }, [value]);

  const generateRandomKey = () => {
    const array = new Uint8Array(24);
    window.crypto.getRandomValues(array);
    const hex = Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
    onChange(hex);
    addToast(translations[language].keys.keyAdded);
  };

  const copyKey = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    addToast(translations[language].toasts.copied);
  };

  const clearKey = () => {
    onChange('');
  };

  const strengthColors = ['bg-slate-700', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-emerald-500'];
  const strengthText = labels.strength[strength];

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex bg-slate-950/50 p-1 rounded-xl border border-slate-800">
        <button 
          onClick={() => setActiveTab('manual')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'manual' ? 'bg-cyan-500 text-[#0f172a]' : 'text-slate-400 hover:text-white'}`}
        >
          <Key className="w-3.5 h-3.5" /> {t.tabs[0]}
        </button>
        <button 
          onClick={() => setActiveTab('auto')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'auto' ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          <RefreshCw className="w-3.5 h-3.5" /> {t.tabs[1]}
        </button>
        <button 
          onClick={() => setActiveTab('theme')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'theme' ? 'bg-emerald-500 text-[#0f172a]' : 'text-slate-400 hover:text-white'}`}
        >
          <Gamepad2 className="w-3.5 h-3.5" /> {t.tabs[2]}
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 relative min-h-[160px] flex flex-col justify-center">
        {activeTab === 'manual' && (
          <div className="space-y-3 animate-in fade-in duration-300">
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={labels.placeholderKey}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 pr-10 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all notranslate"
                translate="no"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <span>Force</span>
                <span className={strength > 0 ? strengthColors[strength].replace('bg-', 'text-') : 'text-slate-600'}>
                  {strengthText}
                </span>
              </div>
              <div className="flex gap-1 h-1">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className={`flex-1 rounded-full transition-all duration-500 ${strength >= i ? strengthColors[strength] : 'bg-slate-800'}`} 
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'auto' && (
          <div className="text-center space-y-4 animate-in fade-in duration-300">
            <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl h-[56px] flex items-center justify-center overflow-hidden">
              <code 
                className="text-cyan-400 mono text-[10px] break-all leading-tight notranslate"
                translate="no"
              >
                {value || '••••••••••••••••••••••••••••••••'}
              </code>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={generateRandomKey}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" /> {t.generate}
              </button>
              {value && (
                <>
                  <button 
                    onClick={copyKey}
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all"
                    title="Copier"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={clearKey}
                    className="p-2.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-all"
                    title="Effacer"
                  >
                    <Eraser className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === 'theme' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <select 
              onChange={(e) => onChange(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              value={Object.values(t.themes).includes(value) ? value : ""}
            >
              <option value="" disabled>{t.themeSelect}</option>
              {Object.entries(t.themes).map(([key, val]) => (
                <option key={key} value={val}>{key.charAt(0).toUpperCase() + key.slice(1)}</option>
              ))}
            </select>
            <div className="bg-emerald-500/5 border border-emerald-500/20 p-2.5 rounded-lg h-[34px] flex items-center overflow-hidden">
               <code 
                 className="text-emerald-400/80 mono text-[10px] block truncate w-full notranslate"
                 translate="no"
               >
                {value || '---'}
               </code>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3 p-3 rounded-xl bg-orange-500/5 border border-orange-500/10">
        <Info className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
        <p className="text-[10px] text-orange-200/60 leading-relaxed italic">
          {t.warning}
        </p>
      </div>
    </div>
  );
};
