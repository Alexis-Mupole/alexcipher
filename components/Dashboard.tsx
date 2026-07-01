import React, { useState, useEffect } from 'react';
import { CipherMethod, Language, Page } from '../types';
import { Lock, Unlock, Copy, RefreshCcw, ShieldCheck, Shield, ArrowLeft, Sparkles, Share2, Loader2, Binary, Fingerprint, Eye, EyeOff, Key, Terminal, FileText } from 'lucide-react';
import { vigenereEncrypt, vigenereDecrypt, aesEncrypt, aesDecrypt } from '../services/cryptoService';
import { translations } from '../translations';
import { KeyManager } from './KeyManager';

const MAX_CHAR_LIMIT = 100000;

interface DashboardProps {
  addToast: (msg: string, type?: 'success' | 'error') => void;
  language: Language;
  onNavigate: (page: Page) => void;
}

const methodMeta = {
  [CipherMethod.AES]: { icon: Shield, desc: 'AES-256-CBC' },
  [CipherMethod.VIGENERE]: { icon: Key, desc: 'Polyalphabetic' },
  [CipherMethod.CAESAR]: { icon: ArrowLeft, desc: 'Shift Cipher' },
  [CipherMethod.BASE64]: { icon: FileText, desc: 'Encoding' },
};

export const Dashboard: React.FC<DashboardProps> = ({ addToast, language, onNavigate }) => {
  const t = translations[language].dashboard;
  const ts = translations[language].toasts;
  const common = translations[language].common;

  const [activeTab, setActiveTab] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [sourceText, setSourceText] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [method, setMethod] = useState<CipherMethod>(CipherMethod.AES);
  const [result, setResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const utf8ToBase64 = (str: string) => btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(parseInt(p1, 16))));
  const base64ToUtf8 = (str: string) => decodeURIComponent(atob(str).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

  const handleAction = async () => {
    if (!sourceText) return addToast(ts.msgRequired, "error");
    if (method !== CipherMethod.BASE64 && !secretKey) return addToast(ts.keyRequired, "error");

    setIsProcessing(true);
    setResult('');
    setShowResult(false);

    await new Promise(resolve => setTimeout(resolve, 1200));

    try {
      let output = '';
      if (activeTab === 'encrypt') {
        if (method === CipherMethod.AES) output = aesEncrypt(sourceText, secretKey);
        else if (method === CipherMethod.CAESAR) {
          const shift = ((parseInt(secretKey) || 3) % 26 + 26) % 26;
          output = sourceText.replace(/[a-z]/gi, (c) => String.fromCharCode(((c.charCodeAt(0) - (c <= 'Z' ? 65 : 97) + shift) % 26) + (c <= 'Z' ? 65 : 97)));
        } else if (method === CipherMethod.VIGENERE) output = vigenereEncrypt(sourceText, secretKey).output;
        else if (method === CipherMethod.BASE64) output = utf8ToBase64(sourceText);
        addToast(ts.encryptSuccess);
      } else {
        if (method === CipherMethod.AES) output = aesDecrypt(sourceText, secretKey);
        else if (method === CipherMethod.CAESAR) {
          const shift = (26 - ((parseInt(secretKey) || 3) % 26 + 26) % 26) % 26;
          output = sourceText.replace(/[a-z]/gi, (c) => String.fromCharCode(((c.charCodeAt(0) - (c <= 'Z' ? 65 : 97) + shift) % 26) + (c <= 'Z' ? 65 : 97)));
        } else if (method === CipherMethod.VIGENERE) output = vigenereDecrypt(sourceText, secretKey).output;
        else if (method === CipherMethod.BASE64) output = base64ToUtf8(sourceText);
        addToast(ts.decryptSuccess);
      }
      setResult(output);
      setShowResult(true);
    } catch (e) {
      addToast(activeTab === 'encrypt' ? ts.error : ts.decryptError, "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    addToast(ts.copied);
  };

  const handleShare = async () => {
    if (!result) return;

    if (navigator.share) {
      try {
        await navigator.share({ text: result });
      } catch (err) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
      addToast(ts.shareNotSupported);
    }
  };

  const reset = () => {
    setSourceText('');
    setResult('');
    setSecretKey('');
    setIsProcessing(false);
    setShowResult(false);
  };

  const charPercent = sourceText.length / MAX_CHAR_LIMIT;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <button 
        onClick={() => onNavigate('landing')}
        className="flex items-center gap-2 transition-all mb-8 group text-sm font-medium"
        style={{ color: 'var(--text-muted)' }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        {common.backHome}
      </button>

      <div className="glass-card rounded-[2.5rem] shadow-2xl overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)' }}>
        {/* ─── Tabs ─── */}
        <div className="flex p-3 gap-3" style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)' }}>
          {(['encrypt', 'decrypt'] as const).map(tab => {
            const isActive = activeTab === tab;
            const isEncrypt = tab === 'encrypt';
            const accentColor = isEncrypt ? 'var(--accent)' : '#6366f1';
            return (
              <button
                key={tab}
                disabled={isProcessing}
                onClick={() => { setActiveTab(tab); reset(); }}
                className="flex-1 flex items-center justify-center gap-3 py-3.5 rounded-xl font-bold text-sm transition-all duration-300"
                style={{
                  backgroundColor: isActive ? (isEncrypt ? 'var(--accent-soft)' : 'rgba(99,102,241,0.1)') : 'transparent',
                  color: isActive ? accentColor : 'var(--text-muted)',
                  boxShadow: isActive ? `inset 0 1px 0 rgba(255,255,255,0.1)` : 'none',
                }}
              >
                <div className="icon-box w-8 h-8" style={{
                  backgroundColor: isActive ? (isEncrypt ? 'var(--accent)' : '#6366f1') : 'var(--bg-elevated)',
                  color: isActive ? '#fff' : 'var(--text-muted)',
                  boxShadow: isActive ? `0 4px 12px ${isEncrypt ? 'var(--accent-soft)' : 'rgba(99,102,241,0.3)'}` : 'none',
                }}>
                  {isEncrypt ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                </div>
                <div className="text-left">
                  <div className="text-xs font-black uppercase tracking-wider">
                    {isEncrypt ? t.encrypt : t.decrypt}
                  </div>
                  <div className="text-[8px] font-bold uppercase tracking-widest opacity-60" style={{ color: isActive ? accentColor : 'var(--text-muted)' }}>
                    {isEncrypt ? 'AES-256 • Secure' : 'AES-256 • Recover'}
                  </div>
                </div>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                )}
              </button>
            );
          })}
        </div>

        <div className="p-6 lg:p-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* ═══ Input Column ═══ */}
            <div className="space-y-8">
              {/* Input */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                    <Terminal className="w-3 h-3" />
                    {activeTab === 'encrypt' ? t.labelSource : t.labelEncrypted}
                  </label>
                  <span className="text-[9px] font-bold px-2.5 py-1 rounded-lg" style={{
                    color: charPercent > 0.9 ? '#f97316' : 'var(--text-muted)',
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                  }}>
                    {sourceText.length.toLocaleString()} / {MAX_CHAR_LIMIT.toLocaleString()}
                  </span>
                </div>
                <div className="relative">
                  <textarea 
                    disabled={isProcessing}
                    value={sourceText}
                    maxLength={MAX_CHAR_LIMIT}
                    onChange={(e) => setSourceText(e.target.value)}
                    placeholder={activeTab === 'encrypt' ? t.placeholderSource : t.placeholderEncrypted}
                    className="input-glow w-full h-56 border-2 rounded-2xl p-5 resize-none leading-relaxed text-sm"
                    style={{ 
                      backgroundColor: 'var(--input-bg)', 
                      borderColor: sourceText ? 'var(--accent)' : 'var(--border-color)', 
                      color: 'var(--text-primary)',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  />
                  {sourceText.length > 0 && (
                    <button
                      onClick={() => setSourceText('')}
                      className="absolute top-3 right-3 icon-box w-7 h-7"
                      style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-secondary)' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  )}
                </div>
                {charPercent > 0 && (
                  <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                    <div className="h-full rounded-full transition-all duration-300" style={{
                      width: `${charPercent * 100}%`,
                      backgroundColor: charPercent > 0.9 ? '#f97316' : 'var(--accent)',
                    }} />
                  </div>
                )}
              </div>

              {/* Method Selector */}
              <div>
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--text-muted)' }}>
                  <Fingerprint className="w-3 h-3" />
                  {t.labelMethod}
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {Object.values(CipherMethod).map((m) => {
                    const meta = methodMeta[m];
                    const Icon = meta.icon;
                    const isActive = method === m;
                    const accentColor = m === CipherMethod.AES ? 'var(--accent)' : m === CipherMethod.VIGENERE ? '#8b5cf6' : m === CipherMethod.CAESAR ? '#f97316' : '#10b981';
                    return (
                      <button
                        key={m}
                        disabled={isProcessing}
                        onClick={() => setMethod(m)}
                        className="flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left active:scale-[0.97]"
                        style={{
                          backgroundColor: isActive ? `${accentColor}0d` : 'var(--input-bg)',
                          borderColor: isActive ? accentColor : 'var(--border-color)',
                          color: isActive ? accentColor : 'var(--text-muted)',
                        }}
                      >
                        <div className="icon-box w-9 h-9 shrink-0" style={{
                          backgroundColor: isActive ? `${accentColor}1a` : 'var(--bg-elevated)',
                          color: isActive ? accentColor : 'var(--text-muted)',
                          border: isActive ? `1px solid ${accentColor}33` : '1px solid var(--border-color)',
                        }}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[11px] font-bold leading-tight">{m}</div>
                          <div className="text-[8px] font-semibold uppercase tracking-wider opacity-60">{meta.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Key Manager */}
              {method !== CipherMethod.BASE64 && (
                <KeyManager 
                  language={language}
                  value={secretKey}
                  onChange={setSecretKey}
                  addToast={addToast}
                />
              )}

              {/* Action Button */}
              <button 
                onClick={handleAction}
                disabled={isProcessing}
                className="group relative w-full overflow-hidden rounded-2xl transition-all duration-500 active:scale-[0.97]"
                style={{
                  boxShadow: isProcessing ? 'none' : `0 8px 32px ${activeTab === 'encrypt' ? 'var(--accent-soft)' : 'rgba(99,102,241,0.3)'}`,
                }}
              >
                <div className="absolute inset-0 transition-all duration-700" style={{
                  background: isProcessing
                    ? 'var(--bg-secondary)'
                    : activeTab === 'encrypt'
                      ? 'linear-gradient(135deg, var(--accent), var(--accent-dark))'
                      : 'linear-gradient(135deg, #6366f1, #4f46e5)',
                }} />

                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {!isProcessing && (
                  <div className="absolute top-0 -inset-full h-full w-1/2 transform -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine" />
                )}

                {isProcessing && (
                  <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[var(--accent)] to-[#6366f1] animate-progress" />
                )}

                <div className="relative flex items-center justify-center gap-4 py-4.5 px-8">
                  {isProcessing ? (
                    <>
                      <div className="relative">
                        <Loader2 className="w-5 h-5 animate-spin" style={{ color: 'var(--accent)' }} />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white">
                          {activeTab === 'encrypt' 
                            ? (language === 'fr' ? 'Chiffrement en cours' : 'Encrypting') 
                            : (language === 'fr' ? 'Déchiffrement en cours' : 'Decrypting')}
                        </span>
                        <span className="text-[8px] font-bold uppercase tracking-widest text-white/50">
                          {method} • {activeTab === 'encrypt' ? 'Encoding' : 'Decoding'}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="icon-box w-10 h-10" style={{
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        color: '#fff',
                      }}>
                        {activeTab === 'encrypt' ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-black uppercase tracking-[0.15em] text-white">
                          {activeTab === 'encrypt' ? t.btnEncrypt : t.btnDecrypt}
                        </span>
                        <span className="text-[8px] font-bold uppercase tracking-widest text-white/50">
                          {method} • {activeTab === 'encrypt' ? 'Secure' : 'Recover'}
                        </span>
                      </div>
                      <Fingerprint className="w-5 h-5 opacity-30 group-hover:opacity-70 transition-all group-hover:rotate-12 text-white ml-auto" />
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* ═══ Result Column ═══ */}
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                  <Terminal className="w-3 h-3" />
                  {t.labelResult}
                </label>
                {result && !isProcessing && (
                  <span className="counter-badge animate-in fade-in" style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }}>
                    {result.length.toLocaleString()} BYTES
                  </span>
                )}
              </div>

              <div className="flex-grow flex flex-col border-2 rounded-2xl overflow-hidden relative min-h-[400px] transition-all duration-300" style={{
                backgroundColor: result ? 'var(--input-bg)' : 'var(--bg-secondary)',
                borderColor: result ? 'var(--accent)' : 'var(--border-color)',
              }}>
                {/* Processing */}
                {isProcessing ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10 animate-in fade-in duration-500" style={{ backgroundColor: 'var(--overlay)' }}>
                    <div className="relative mb-10">
                      <div className="w-28 h-28 rounded-full flex items-center justify-center overflow-hidden" style={{
                        border: '3px solid var(--accent-soft)',
                        animation: 'pulse-ring 2s ease-in-out infinite',
                      }}>
                        <Binary className="w-10 h-10 animate-pulse" style={{ color: 'var(--accent)', opacity: 0.3 }} />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex gap-1.5">
                        {[0, 1, 2, 3].map(i => (
                          <div key={i} className="w-2 h-2 rounded-full animate-bounce" style={{
                            backgroundColor: 'var(--accent)',
                            animationDelay: `${i * 0.12}s`,
                            opacity: 0.6 - (i * 0.1),
                          }} />
                        ))}
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-[0.4em]" style={{ color: 'var(--text-muted)' }}>
                        {language === 'fr' ? 'Traitement...' : 'Processing...'}
                      </span>
                    </div>
                  </div>
                ) : result ? (
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between px-6 py-3" style={{ borderBottom: '1px solid var(--accent-soft)', backgroundColor: 'var(--bg-tertiary)' }}>
                      <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.15em]" style={{ color: 'var(--accent)' }}>
                        <ShieldCheck className="w-3 h-3" />
                        {language === 'fr' ? 'Sortie Sécurisée' : 'Secure Output'}
                      </div>
                      <div className="flex gap-1.5">
                        <button onClick={copyToClipboard} className="icon-box w-7 h-7" style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-elevated)' }}>
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={handleShare} className="icon-box w-7 h-7" style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-elevated)' }}>
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="p-6 mono text-sm break-all flex-grow overflow-y-auto custom-scrollbar animate-in fade-in duration-500" style={{ color: 'var(--accent)', fontFamily: "'JetBrains Mono', monospace" }} translate="no">
                      {result}
                    </div>
                  </div>
                ) : (
                  <div className="flex-grow flex flex-col items-center justify-center p-12 text-center">
                    <div className="empty-state-icon">
                      {activeTab === 'encrypt' ? <Shield className="w-8 h-8" /> : <Unlock className="w-8 h-8" />}
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] max-w-[180px] leading-loose" style={{ color: 'var(--text-muted)' }}>
                      {t.placeholderResult}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
                      <Sparkles className="w-3 h-3" />
                      {language === 'fr' ? 'Entrez du texte pour commencer' : 'Enter text to begin'}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom actions */}
              {result && !isProcessing && (
                <div className="flex items-center gap-3 mt-5 animate-in slide-in-from-bottom-4 duration-500">
                  <button onClick={copyToClipboard} className="btn-primary flex-1">
                    <Copy className="w-4 h-4" />
                    <span>{t.btnCopy}</span>
                  </button>
                  <button onClick={handleShare} className="btn-secondary flex-1">
                    <Share2 className="w-4 h-4" />
                    <span>{t.btnShare}</span>
                  </button>
                  <button 
                    onClick={reset} 
                    className="icon-box w-[50px] h-[50px] shrink-0"
                    style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.borderColor = '#ef4444'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                  >
                    <RefreshCcw className="w-4 h-4" />
                  </button>
                </div>
              )}

              {!result && !isProcessing && sourceText.length > 0 && (
                <div className="flex justify-center mt-6">
                  <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-widest px-3 py-2 rounded-lg animate-pulse" style={{ backgroundColor: 'rgba(6,182,212,0.05)', color: 'var(--accent)', border: '1px solid var(--accent-soft)' }}>
                    <ArrowLeft className="w-3 h-3" />
                    {language === 'fr' ? 'Prêt à chiffrer' : 'Ready to encrypt'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ─── Security Footer ─── */}
        <div className="px-8 py-5 flex flex-wrap items-center justify-center gap-4" style={{ borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)' }}>
          {t.security.map((sec, i) => (
            <div key={i} className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.15em]" style={{ color: 'var(--text-muted)' }}>
              <span className="status-dot" style={{ color: '#10b981' }} />
              {sec}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shine {
          from { left: -100%; }
          to { left: 100%; }
        }
        .animate-shine {
          animation: shine 1.8s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.05); opacity: 0.6; }
        }
        .animate-progress {
          animation: progressBar 2s ease-in-out infinite;
        }
        @keyframes progressBar {
          0% { width: 0%; left: 0; }
          50% { width: 100%; left: 0; }
          100% { width: 0%; left: 100%; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--accent-soft); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--accent); }
      `}</style>
    </div>
  );
};
