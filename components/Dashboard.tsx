import React, { useState, useEffect } from 'react';
import { CipherMethod, Language, Page } from '../types';
import { Lock, Unlock, Copy, RefreshCcw, ShieldCheck, Shield, ArrowLeft, Sparkles, Share2, Loader2, Binary, Fingerprint, Key, Terminal, FileText, CheckCircle2, Zap } from 'lucide-react';
import { vigenereEncrypt, vigenereDecrypt, aesEncrypt, aesDecrypt } from '../services/cryptoService';
import { translations } from '../translations';
import { KeyManager } from './KeyManager';

const MAX_CHAR_LIMIT = 100000;

interface DashboardProps {
  addToast: (msg: string, type?: 'success' | 'error') => void;
  language: Language;
  onNavigate: (page: Page) => void;
  sharedText?: string | null;
}

const methodMeta: Record<CipherMethod, { icon: React.FC<{ className?: string }>; desc: string; color: string }> = {
  [CipherMethod.AES]: { icon: Shield, desc: 'AES-256-CBC', color: 'var(--accent)' },
  [CipherMethod.VIGENERE]: { icon: Key, desc: 'Polyalphabetic', color: '#8b5cf6' },
  [CipherMethod.CAESAR]: { icon: ArrowLeft, desc: 'Shift Cipher', color: '#f97316' },
  [CipherMethod.BASE64]: { icon: FileText, desc: 'Encoding', color: '#10b981' },
};

export const Dashboard: React.FC<DashboardProps> = ({ addToast, language, onNavigate, sharedText }) => {
  const t = translations[language].dashboard;
  const ts = translations[language].toasts;
  const common = translations[language].common;

  const [activeTab, setActiveTab] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [sourceText, setSourceText] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [method, setMethod] = useState<CipherMethod>(CipherMethod.AES);
  const [result, setResult] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Pre-fill sourceText when text is shared from another app
  const sharedHandled = React.useRef(false);
  useEffect(() => {
    if (sharedText && !sharedHandled.current) {
      sharedHandled.current = true;
      setSourceText(sharedText);
    }
  }, [sharedText]);

  const utf8ToBase64 = (str: string) => btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(parseInt(p1, 16))));
  const base64ToUtf8 = (str: string) => decodeURIComponent(atob(str).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

  const handleAction = async () => {
    if (!sourceText) return addToast(ts.msgRequired, "error");
    if (method !== CipherMethod.BASE64 && !secretKey) return addToast(ts.keyRequired, "error");

    setIsProcessing(true);
    setResult('');

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
      try { await navigator.share({ text: result }); }
      catch { copyToClipboard(); }
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
  };

  const isEncrypt = activeTab === 'encrypt';
  const accentColor = isEncrypt ? 'var(--accent)' : '#6366f1';
  const accentBg = isEncrypt ? 'var(--accent-soft)' : 'rgba(99,102,241,0.1)';
  const charPercent = sourceText.length / MAX_CHAR_LIMIT;

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-12">
      {/* Back */}
      <button 
        onClick={() => onNavigate('landing')}
        className="flex items-center gap-2 mb-6 sm:mb-8 group text-xs sm:text-sm font-semibold"
        style={{ color: 'var(--text-muted)' }}
        onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        {common.backHome}
      </button>

      <div className="glass-card rounded-[1.75rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)' }}>
        {/* ═══ Tabs ═══ */}
        <div className="flex p-2 sm:p-3 gap-2 sm:gap-3" style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)' }}>
          {(['encrypt', 'decrypt'] as const).map(tab => {
            const active = activeTab === tab;
            const enc = tab === 'encrypt';
            const ac = enc ? 'var(--accent)' : '#6366f1';
            return (
              <button
                key={tab}
                disabled={isProcessing}
                onClick={() => { setActiveTab(tab); reset(); }}
                className="flex-1 flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 active:scale-[0.97]"
                style={{
                  backgroundColor: active ? (enc ? 'var(--accent-soft)' : 'rgba(99,102,241,0.1)') : 'transparent',
                  color: active ? ac : 'var(--text-muted)',
                }}
              >
                <div className="icon-box w-8 h-8 sm:w-9 sm:h-9 shrink-0" style={{
                  backgroundColor: active ? ac : 'var(--bg-elevated)',
                  color: active ? '#fff' : 'var(--text-muted)',
                }}>
                  {enc ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                </div>
                <div className="flex flex-col items-start max-sm:hidden">
                  <span className="text-xs font-black uppercase tracking-wider">{enc ? t.encrypt : t.decrypt}</span>
                  <span className="text-[8px] font-bold uppercase tracking-widest opacity-50">{enc ? 'AES-256' : 'AES-256'}</span>
                </div>
                {active && <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: ac }} />}
              </button>
            );
          })}
        </div>

        {/* ═══ Body ═══ */}
        <div className="p-4 sm:p-6 lg:p-10">
          {/* Mobile: stacked | Desktop: side by side */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-14">

            {/* ▸ Input Column */}
            <div className="flex flex-col gap-6 sm:gap-8 order-1">

              {/* Input */}
              <div>
                <div className="flex justify-between items-center mb-2.5 sm:mb-3">
                  <label className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                    <Terminal className="w-3 h-3" />
                    {isEncrypt ? t.labelSource : t.labelEncrypted}
                  </label>
                  <span className="text-[8px] sm:text-[9px] font-bold px-2.5 py-1 rounded-full" style={{
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
                    placeholder={isEncrypt ? t.placeholderSource : t.placeholderEncrypted}
                    className="input-glow w-full min-h-[140px] sm:h-52 border-2 rounded-2xl sm:rounded-3xl p-4 sm:p-5 resize-none leading-relaxed text-sm"
                    style={{ 
                      backgroundColor: 'var(--input-bg)', 
                      borderColor: sourceText ? accentColor : 'var(--border-color)', 
                      color: 'var(--text-primary)',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  />
                  {sourceText.length > 0 && (
                    <button
                      onClick={() => setSourceText('')}
                      className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 icon-box w-7 h-7 rounded-full"
                      style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-secondary)' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  )}
                </div>
                {charPercent > 0 && (
                  <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                    <div className="h-full rounded-full transition-all duration-500" style={{
                      width: `${Math.min(charPercent * 100, 100)}%`,
                      backgroundColor: charPercent > 0.9 ? '#f97316' : accentColor,
                    }} />
                  </div>
                )}
              </div>

              {/* Method */}
              <div>
                <label className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--text-muted)' }}>
                  <Fingerprint className="w-3 h-3" />
                  {t.labelMethod}
                </label>
                <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                  {Object.values(CipherMethod).map((m) => {
                    const meta = methodMeta[m];
                    const Icon = meta.icon;
                    const active = method === m;
                    const ac = meta.color;
                    return (
                      <button
                        key={m}
                        disabled={isProcessing}
                        onClick={() => setMethod(m)}
                        className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-2xl border-2 transition-all text-left active:scale-[0.97]"
                        style={{
                          backgroundColor: active ? `${ac}0d` : 'var(--input-bg)',
                          borderColor: active ? ac : 'var(--border-color)',
                          color: active ? ac : 'var(--text-muted)',
                        }}
                      >
                        <div className="icon-box w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xl" style={{
                          backgroundColor: active ? `${ac}1a` : 'var(--bg-elevated)',
                          color: active ? ac : 'var(--text-muted)',
                        }}>
                          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[10px] sm:text-[11px] font-bold leading-tight truncate">{m}</div>
                          <div className="text-[7px] sm:text-[8px] font-semibold uppercase tracking-wider opacity-50">{meta.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Key */}
              {method !== CipherMethod.BASE64 && (
                <KeyManager language={language} value={secretKey} onChange={setSecretKey} addToast={addToast} />
              )}

              {/* Action */}
              <button 
                onClick={handleAction}
                disabled={isProcessing}
                className="group relative w-full overflow-hidden rounded-2xl sm:rounded-3xl transition-all duration-500 active:scale-[0.97]"
                style={{
                  boxShadow: isProcessing ? 'none' : `0 8px 32px ${isEncrypt ? 'var(--accent-soft)' : 'rgba(99,102,241,0.3)'}`,
                }}
              >
                <div className="absolute inset-0 transition-all duration-700" style={{
                  background: isProcessing
                    ? 'var(--bg-secondary)'
                    : `linear-gradient(135deg, ${accentColor}, ${isEncrypt ? 'var(--accent-dark)' : '#4f46e5'})`,
                }} />

                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {!isProcessing && (
                  <div className="absolute top-0 -inset-full h-full w-1/2 transform -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine" />
                )}

                {isProcessing && (
                  <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[var(--accent)] to-[#6366f1] animate-progress" />
                )}

                <div className="relative flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-5 px-6 sm:px-8">
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" style={{ color: '#fff' }} />
                      <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] text-white">
                        {isEncrypt 
                          ? (language === 'fr' ? 'Chiffrement...' : 'Encrypting...') 
                          : (language === 'fr' ? 'Déchiffrement...' : 'Decrypting...')}
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="icon-box w-9 h-9 sm:w-10 sm:h-10 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff' }}>
                        {isEncrypt ? <Lock className="w-[18px] h-[18px] sm:w-5 sm:h-5" /> : <Unlock className="w-[18px] h-[18px] sm:w-5 sm:h-5" />}
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-xs sm:text-sm font-black uppercase tracking-[0.1em] sm:tracking-[0.15em] text-white">
                          {isEncrypt ? t.btnEncrypt : t.btnDecrypt}
                        </span>
                        <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-widest text-white/40">
                          {method} • {isEncrypt ? 'Encrypt' : 'Decrypt'}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* ▸ Result Column */}
            <div className="flex flex-col order-2 lg:order-none">

              {/* Label */}
              <div className="flex justify-between items-center mb-2.5 sm:mb-3">
                <label className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                  <Terminal className="w-3 h-3" />
                  {t.labelResult}
                </label>
                {result && !isProcessing && (
                  <span className="counter-badge animate-in fade-in" style={{ backgroundColor: accentBg, color: accentColor }}>
                    {result.length.toLocaleString()} BYTES
                  </span>
                )}
              </div>

              {/* Terminal */}
              <div className="flex flex-col border-2 rounded-2xl sm:rounded-3xl overflow-hidden relative min-h-[200px] sm:min-h-[400px] transition-all duration-300" style={{
                backgroundColor: result ? 'var(--input-bg)' : 'var(--bg-secondary)',
                borderColor: result ? accentColor : 'var(--border-color)',
              }}>
                {/* Processing */}
                {isProcessing ? (
                  <div className="absolute inset-0 flex items-center justify-center z-10" style={{ backgroundColor: 'var(--overlay)' }}>
                    <div className="flex flex-col items-center gap-6 animate-in fade-in duration-500">
                      <div className="relative">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center" style={{
                          border: '3px solid var(--accent-soft)',
                          animation: 'pulse-ring 2s ease-in-out infinite',
                        }}>
                          <Binary className="w-8 h-8 sm:w-10 sm:h-10 animate-pulse" style={{ color: 'var(--accent)', opacity: 0.3 }} />
                        </div>
                      </div>
                      <div className="flex gap-1.5">
                        {[0, 1, 2, 3].map(i => (
                          <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-bounce" style={{
                            backgroundColor: 'var(--accent)',
                            animationDelay: `${i * 0.12}s`,
                            opacity: 0.6 - (i * 0.1),
                          }} />
                        ))}
                      </div>
                      <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>
                        {language === 'fr' ? 'Traitement...' : 'Processing...'}
                      </span>
                    </div>
                  </div>
                ) : result ? (
                  <div className="flex flex-col h-full">
                    {/* Terminal header */}
                    <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3" style={{ borderBottom: '1px solid var(--accent-soft)', backgroundColor: 'var(--bg-tertiary)' }}>
                      <div className="flex items-center gap-2 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.1em]" style={{ color: accentColor }}>
                        <ShieldCheck className="w-3 h-3" />
                        Secure Output
                      </div>
                      <div className="flex gap-2">
                        <button onClick={copyToClipboard} className="icon-box w-8 h-8 sm:w-9 sm:h-9 rounded-full" style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-elevated)' }}>
                          <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                        <button onClick={handleShare} className="icon-box w-8 h-8 sm:w-9 sm:h-9 rounded-full" style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-elevated)' }}>
                          <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                    {/* Output */}
                    <div className="p-4 sm:p-6 text-xs sm:text-sm break-all flex-grow overflow-y-auto custom-scrollbar animate-in fade-in duration-500" style={{ color: accentColor, fontFamily: "'JetBrains Mono', monospace" }} translate="no">
                      {result}
                    </div>
                  </div>
                ) : (
                  /* Empty state */
                  <div className="flex-grow flex flex-col items-center justify-center p-8 sm:p-12 text-center">
                    <div className="empty-state-icon">
                      {isEncrypt ? <Shield className="w-8 h-8" /> : <Unlock className="w-8 h-8" />}
                    </div>
                    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] max-w-[160px] sm:max-w-[180px] leading-loose" style={{ color: 'var(--text-muted)' }}>
                      {t.placeholderResult}
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-[7px] sm:text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
                      <Sparkles className="w-3 h-3" />
                      {language === 'fr' ? 'Saisissez votre texte' : 'Enter your text'}
                    </div>
                  </div>
                )}
              </div>

              {/* Result actions */}
              {result && !isProcessing && (
                <div className="flex items-center gap-2 sm:gap-3 mt-4 sm:mt-5 animate-in slide-in-from-bottom-4 duration-500">
                  <button onClick={copyToClipboard} className="flex-1 flex items-center justify-center gap-2 sm:gap-3 py-3.5 sm:py-4 rounded-2xl sm:rounded-full font-black text-[10px] sm:text-[11px] uppercase tracking-[0.15em] transition-all active:scale-[0.97] text-white" style={{ background: `linear-gradient(135deg, ${accentColor}, ${isEncrypt ? 'var(--accent-dark)' : '#4f46e5'})`, boxShadow: `0 4px 16px ${isEncrypt ? 'var(--accent-soft)' : 'rgba(99,102,241,0.3)'}` }}>
                    <Copy className="w-4 h-4" />
                    <span>{t.btnCopy}</span>
                  </button>
                  <button onClick={handleShare} className="flex-1 flex items-center justify-center gap-2 sm:gap-3 py-3.5 sm:py-4 rounded-2xl sm:rounded-full font-black text-[10px] sm:text-[11px] uppercase tracking-[0.15em] transition-all active:scale-[0.97]" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}>
                    <Share2 className="w-4 h-4" />
                    <span>{t.btnShare}</span>
                  </button>
                  <button 
                    onClick={reset}
                    className="flex items-center justify-center w-[48px] sm:w-[52px] h-[48px] sm:h-[52px] rounded-2xl sm:rounded-full transition-all active:scale-[0.95]" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.borderColor = '#ef4444'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                  >
                    <RefreshCcw className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Ready hint */}
              {!result && !isProcessing && sourceText.length > 0 && (
                <div className="flex justify-center mt-5 sm:mt-6">
                  <div className="flex items-center gap-2 text-[7px] sm:text-[8px] font-bold uppercase tracking-widest px-3 py-2 rounded-full animate-pulse" style={{ backgroundColor: accentBg, color: accentColor, border: '1px solid' + (isEncrypt ? 'var(--accent-soft)' : 'rgba(99,102,241,0.2)') }}>
                    <Zap className="w-3 h-3" />
                    {language === 'fr' ? 'Prêt à chiffrer' : 'Ready to encrypt'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ═══ Security Footer ═══ */}
        <div className="px-4 sm:px-8 py-4 sm:py-5 flex flex-wrap items-center justify-center gap-3 sm:gap-6" style={{ borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-tertiary)' }}>
          {t.security.map((sec, i) => (
            <div key={i} className="flex items-center gap-2 text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.1em]" style={{ color: 'var(--text-muted)' }}>
              <CheckCircle2 className="w-3 h-3" style={{ color: '#10b981' }} />
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
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
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
