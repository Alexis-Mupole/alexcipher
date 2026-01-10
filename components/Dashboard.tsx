import React, { useState, useEffect } from 'react';
import { CipherMethod, Language, Page } from '../types';
import { Lock, Unlock, Copy, RefreshCcw, ShieldCheck, Shield, ArrowLeft, Sparkles, Share2, Loader2, Binary, Fingerprint } from 'lucide-react';
import { vigenereEncrypt, vigenereDecrypt, aesEncrypt, aesDecrypt } from '../services/cryptoService';
import { translations } from '../translations';
import { KeyManager } from './KeyManager';

const MAX_CHAR_LIMIT = 100000;
const APP_URL = "https://alexcipher.vercel.app/";

interface DashboardProps {
  addToast: (msg: string, type?: 'success' | 'error') => void;
  language: Language;
  onNavigate: (page: Page) => void;
}

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

  // Robust Unicode Base64
  const utf8ToBase64 = (str: string) => btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(parseInt(p1, 16))));
  const base64ToUtf8 = (str: string) => decodeURIComponent(atob(str).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

  const handleAction = async () => {
    if (!sourceText) return addToast(ts.msgRequired, "error");
    if (method !== CipherMethod.BASE64 && !secretKey) return addToast(ts.keyRequired, "error");

    setIsProcessing(true);
    setResult('');

    // Séquence de calcul immersive "Pro" (1.5s)
    await new Promise(resolve => setTimeout(resolve, 1500));

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
    
    const shareMessage = `${t.shareText}\n\n${result}\n\n🔓 Déchiffrez-le ici : ${APP_URL}`;
    
    if (navigator.share) {
      try {
        await navigator.share({ 
          title: 'AlexCipher Secure Message', 
          text: shareMessage,
          url: APP_URL
        });
      } catch (err) {
        // En cas d'annulation ou d'erreur, on copie simplement
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
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
      <button 
        onClick={() => onNavigate('landing')}
        className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors mb-6 group text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        {common.backHome}
      </button>

      <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden">
        {/* Tabs Stylisées */}
        <div className="flex border-b border-slate-800 p-2.5 bg-slate-950/50">
          <button 
            disabled={isProcessing}
            onClick={() => { setActiveTab('encrypt'); reset(); }}
            className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-bold transition-all duration-300 ${activeTab === 'encrypt' ? 'text-cyan-400 bg-cyan-400/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Lock className="w-5 h-5" /> {t.encrypt}
          </button>
          <button 
            disabled={isProcessing}
            onClick={() => { setActiveTab('decrypt'); reset(); }}
            className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-bold transition-all duration-300 ${activeTab === 'decrypt' ? 'text-indigo-400 bg-indigo-400/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Unlock className="w-5 h-5" /> {t.decrypt}
          </button>
        </div>

        <div className="p-6 lg:p-14">
          <div className="grid lg:grid-cols-2 gap-14">
            {/* Input Column */}
            <div className="space-y-10">
              <div className="relative">
                <div className="flex justify-between items-end mb-4">
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.25em]">
                    {activeTab === 'encrypt' ? t.labelSource : t.labelEncrypted}
                  </label>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded bg-slate-950 border border-slate-800 ${sourceText.length > MAX_CHAR_LIMIT * 0.9 ? 'text-orange-500' : 'text-slate-600'}`}>
                    {sourceText.length.toLocaleString()} / {MAX_CHAR_LIMIT.toLocaleString()}
                  </span>
                </div>
                <textarea 
                  disabled={isProcessing}
                  value={sourceText}
                  maxLength={MAX_CHAR_LIMIT}
                  onChange={(e) => setSourceText(e.target.value)}
                  placeholder={activeTab === 'encrypt' ? t.placeholderSource : t.placeholderEncrypted}
                  className="w-full h-56 bg-slate-950 border border-slate-800 rounded-3xl p-6 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] leading-relaxed"
                />
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mb-4">
                    {t.labelMethod}
                  </label>
                  <div className="relative group">
                    <select 
                      disabled={isProcessing}
                      value={method}
                      onChange={(e) => setMethod(e.target.value as CipherMethod)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4.5 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all cursor-pointer appearance-none"
                    >
                      <option value={CipherMethod.AES}>{CipherMethod.AES}</option>
                      <option value={CipherMethod.VIGENERE}>{CipherMethod.VIGENERE}</option>
                      <option value={CipherMethod.CAESAR}>{CipherMethod.CAESAR}</option>
                      <option value={CipherMethod.BASE64}>{CipherMethod.BASE64}</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600 group-hover:text-cyan-400 transition-colors">
                      <RefreshCcw className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {method !== CipherMethod.BASE64 && (
                  <KeyManager 
                    language={language}
                    value={secretKey}
                    onChange={setSecretKey}
                    addToast={addToast}
                  />
                )}
              </div>

              {/* ACTION BUTTON - REDESIGNED PRO */}
              <div className="pt-4">
                <button 
                  onClick={handleAction}
                  disabled={isProcessing}
                  className={`group relative w-full overflow-hidden rounded-[1.25rem] transition-all duration-500 active:scale-[0.97] shadow-xl ${
                    isProcessing 
                    ? 'cursor-wait py-7' 
                    : 'hover:scale-[1.01] hover:-translate-y-1'
                  }`}
                >
                  {/* Background Layers */}
                  <div className={`absolute inset-0 transition-all duration-700 ${
                    isProcessing 
                    ? 'bg-slate-800' 
                    : activeTab === 'encrypt' 
                      ? 'bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600' 
                      : 'bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-700'
                  }`} />
                  
                  {/* Glossy Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Animated Border Glow */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity blur-md ${activeTab === 'encrypt' ? 'bg-cyan-400/30' : 'bg-indigo-400/30'}`} />

                  {/* Content Layer */}
                  <div className="relative flex items-center justify-center gap-4 py-5 px-8">
                    {isProcessing ? (
                      <>
                        <div className="relative">
                          <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
                          <div className="absolute inset-0 bg-cyan-400/20 blur-sm rounded-full animate-pulse" />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white animate-pulse">
                          {activeTab === 'encrypt' ? 'Chiffrement...' : 'Analyse du code...'}
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="p-2 bg-black/10 rounded-lg group-hover:bg-black/20 transition-colors">
                          {activeTab === 'encrypt' ? <Lock className="w-5 h-5 text-slate-900" /> : <Unlock className="w-5 h-5 text-white" />}
                        </div>
                        <span className={`text-sm font-black uppercase tracking-[0.25em] ${activeTab === 'encrypt' ? 'text-slate-950' : 'text-white'}`}>
                          {activeTab === 'encrypt' ? t.btnEncrypt : t.btnDecrypt}
                        </span>
                        <Fingerprint className={`w-5 h-5 opacity-40 group-hover:opacity-100 transition-all group-hover:rotate-12 ${activeTab === 'encrypt' ? 'text-slate-900' : 'text-white'}`} />
                      </>
                    )}
                  </div>
                  
                  {/* Progress Line when loading */}
                  {isProcessing && (
                    <div className="absolute bottom-0 left-0 h-1 bg-cyan-400 transition-all duration-[1500ms] ease-out w-full" />
                  )}
                  
                  {/* Hover Shine Animation */}
                  {!isProcessing && (
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 opacity-40 group-hover:animate-shine" />
                  )}
                </button>
              </div>
            </div>

            {/* Result Column */}
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-end mb-4">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.25em]">
                  {t.labelResult}
                </label>
                {result && !isProcessing && (
                  <span className="text-[9px] font-bold text-cyan-500/60 animate-in fade-in tracking-widest">
                    READY: {result.length.toLocaleString()} BYTES
                  </span>
                )}
              </div>
              
              <div className="flex-grow flex flex-col bg-slate-950 border border-slate-800 rounded-[2.5rem] overflow-hidden relative min-h-[400px] shadow-[inset_0_4px_12px_rgba(0,0,0,0.5)]">
                {isProcessing ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md z-10 animate-in fade-in duration-500">
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-cyan-500/30 blur-2xl animate-pulse rounded-full" />
                      <div className="relative w-32 h-32 border border-cyan-500/20 rounded-full flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-scan" />
                        <Binary className="w-12 h-12 text-cyan-400 opacity-40 animate-pulse" />
                        
                        {/* Dot Matrix Decoration */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none">
                          <div className="absolute top-2 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-ping" />
                          <div className="absolute bottom-4 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}} />
                          <div className="absolute top-1/2 right-4 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{animationDelay: '1s'}} />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-500">Traitement Cybernétique</span>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(i => (
                          <div 
                            key={i} 
                            className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" 
                            style={{animationDelay: `${i * 0.15}s`, opacity: 1 - (i * 0.15)}} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : result ? (
                  <div className="p-10 mono text-sm text-cyan-400/90 break-all h-full overflow-y-auto selection:bg-cyan-500/30 animate-in zoom-in-[0.98] duration-700 custom-scrollbar" translate="no">
                    <div className="flex items-center gap-2 mb-4 text-[9px] font-black text-cyan-500/40 uppercase tracking-[0.2em] border-b border-cyan-500/10 pb-2">
                      <ShieldCheck className="w-3 h-3" /> Sortie Sécurisée
                    </div>
                    {result}
                  </div>
                ) : (
                  <div className="flex-grow flex flex-col items-center justify-center p-12 text-center opacity-30 group-hover:opacity-50 transition-opacity">
                    <div className="w-28 h-28 bg-slate-900 rounded-[2rem] flex items-center justify-center mb-8 border border-slate-800 shadow-xl">
                      {activeTab === 'encrypt' ? <Shield className="w-12 h-12 text-slate-700" /> : <Unlock className="w-12 h-12 text-slate-700" />}
                    </div>
                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] max-w-[150px] leading-loose">
                      {t.placeholderResult}
                    </p>
                  </div>
                )}
              </div>

              {result && !isProcessing && (
                <div className="grid grid-cols-2 gap-5 mt-8 animate-in slide-in-from-bottom-6 duration-700">
                  <button onClick={copyToClipboard} className="flex items-center justify-center gap-4 py-4.5 bg-slate-800 hover:bg-slate-700 text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl transition-all active:scale-95 border border-slate-700 shadow-lg group">
                    <Copy className="w-4.5 h-4.5 text-cyan-400 group-hover:scale-110 transition-transform" /> 
                    <span>{t.btnCopy}</span>
                  </button>
                  <button onClick={handleShare} className="flex items-center justify-center gap-4 py-4.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl transition-all active:scale-95 border-none shadow-[0_10px_30px_rgba(34,211,238,0.3)] group">
                    <Share2 className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" /> 
                    <span>{t.btnShare}</span>
                  </button>
                </div>
              )}
              
              <button 
                onClick={reset} 
                disabled={isProcessing} 
                className="mt-10 flex items-center justify-center gap-3 text-slate-500 hover:text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] transition-all group disabled:opacity-30"
              >
                <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-1000 ease-in-out" /> 
                {t.newMsg}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-950/80 px-10 py-6 border-t border-slate-800 flex flex-wrap items-center justify-center gap-x-16 gap-y-4">
          {t.security.map((sec, i) => (
            <div key={i} className="flex items-center gap-3 text-[9px] text-slate-600 font-black uppercase tracking-[0.3em]">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
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
        @keyframes scan {
          0% { transform: translateY(-110%); }
          100% { transform: translateY(110%); }
        }
        .animate-scan {
          animation: scan 2.5s ease-in-out infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.2);
        }
      `}</style>
    </div>
  );
};