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

  const strengthColors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-emerald-500'];
  const strengthText = labels.strength[strength];

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex p-1 rounded-xl border" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
        <button 
          onClick={() => setActiveTab('manual')}
          className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all"
          style={activeTab === 'manual' ? { backgroundColor: 'var(--accent)', color: '#fff' } : { color: 'var(--text-muted)' }}
        >
          <Key className="w-3.5 h-3.5" /> {t.tabs[0]}
        </button>
        <button 
          onClick={() => setActiveTab('auto')}
          className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all"
          style={activeTab === 'auto' ? { backgroundColor: '#6366f1', color: '#fff' } : { color: 'var(--text-muted)' }}
        >
          <RefreshCw className="w-3.5 h-3.5" /> {t.tabs[1]}
        </button>
        <button 
          onClick={() => setActiveTab('theme')}
          className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all"
          style={activeTab === 'theme' ? { backgroundColor: '#10b981', color: '#fff' } : { color: 'var(--text-muted)' }}
        >
          <Gamepad2 className="w-3.5 h-3.5" /> {t.tabs[2]}
        </button>
      </div>

      {/* Content Area */}
      <div className="glass-card p-4 rounded-2xl relative min-h-[160px] flex flex-col justify-center" style={{ backgroundColor: 'var(--input-bg)' }}>
        {activeTab === 'manual' && (
          <div className="space-y-3 animate-in fade-in duration-300">
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={labels.placeholderKey}
                className="w-full border rounded-xl p-3 pr-10 text-sm transition-all focus:outline-none focus:ring-1 notranslate"
                style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                translate="no"
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                <span>{language === 'fr' ? 'Force' : 'Strength'}</span>
                <span style={strength > 0 ? { color: ['', '#ef4444', '#f97316', '#eab308', '#10b981'][strength] } : { color: 'var(--text-muted)' }}>
                  {strengthText}
                </span>
              </div>
              <div className="flex gap-1 h-1">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="flex-1 rounded-full transition-all duration-500" 
                    style={{ backgroundColor: strength >= i ? ['', '#ef4444', '#f97316', '#eab308', '#10b981'][strength] : 'var(--border-color)' }} 
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'auto' && (
          <div className="text-center space-y-4 animate-in fade-in duration-300">
            <div className="border p-3 rounded-xl h-[56px] flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
              <code 
                className="mono text-[10px] break-all leading-tight notranslate"
                style={{ color: 'var(--accent)' }}
                translate="no"
              >
                {value || '••••••••••••••••••••••••••••••••'}
              </code>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={generateRandomKey}
                className="flex-1 text-white font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
                style={{ backgroundColor: '#6366f1' }}
              >
                <RefreshCw className="w-3.5 h-3.5" /> {t.generate}
              </button>
              {value && (
                <>
                  <button 
                    onClick={copyKey}
                    className="p-2.5 rounded-lg transition-all"
                    style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}
                    title={language === 'fr' ? 'Copier' : 'Copy'}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={clearKey}
                    className="p-2.5 rounded-lg transition-all text-red-400"
                    style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                    title={language === 'fr' ? 'Effacer' : 'Clear'}
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
              className="w-full border rounded-xl p-3 text-sm transition-all focus:outline-none focus:ring-1"
              style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              value={Object.values(t.themes).includes(value) ? value : ""}
            >
              <option value="" disabled>{t.themeSelect}</option>
              {Object.entries(t.themes).map(([key, val]) => (
                <option key={key} value={val}>{key.charAt(0).toUpperCase() + key.slice(1)}</option>
              ))}
            </select>
            <div className="p-2.5 rounded-lg h-[34px] flex items-center overflow-hidden" style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
               <code 
                 className="mono text-[10px] block truncate w-full notranslate"
                 style={{ color: 'rgba(16, 185, 129, 0.8)' }}
                 translate="no"
               >
                {value || '---'}
               </code>
            </div>
          </div>
        )}
      </div>

      <div className="glass-card flex gap-3 p-3 rounded-xl" style={{ backgroundColor: 'rgba(249, 115, 22, 0.05)' }}>
        <div className="icon-box w-7 h-7 shrink-0" style={{ color: '#fb923c', backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
          <Info className="w-4 h-4" />
        </div>
        <p className="text-[10px] leading-relaxed italic" style={{ color: 'var(--text-muted)' }}>
          {t.warning}
        </p>
      </div>
    </div>
  );
};
