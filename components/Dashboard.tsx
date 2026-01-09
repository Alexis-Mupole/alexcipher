
import React, { useState, useMemo } from 'react';
import { CipherMethod, VigenereStep, Language, Page } from '../types';
import { Lock, Unlock, Copy, RefreshCcw, ShieldCheck, Shield, ChevronDown, ChevronUp, Cpu, ArrowLeft } from 'lucide-react';
import CryptoJS from 'crypto-js';
import { vigenereEncrypt, vigenereDecrypt } from '../services/cryptoService';
import { translations } from '../translations';
import { KeyManager } from './KeyManager';

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
  const [showSteps, setShowSteps] = useState(false);
  const [vigenereSteps, setVigenereSteps] = useState<VigenereStep[]>([]);

  const handleEncrypt = () => {
    if (!sourceText) return addToast(ts.msgRequired, "error");
    if (method !== CipherMethod.BASE64 && !secretKey) return addToast(ts.keyRequired, "error");

    try {
      let output = '';
      if (method === CipherMethod.AES) {
        output = CryptoJS.AES.encrypt(sourceText, secretKey).toString();
        setVigenereSteps([]);
      } else if (method === CipherMethod.CAESAR) {
        const shift = parseInt(secretKey) || 3;
        output = sourceText.replace(/[a-z]/gi, (char) => {
          const start = char <= 'Z' ? 65 : 97;
          return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
        });
        setVigenereSteps([]);
      } else if (method === CipherMethod.VIGENERE) {
        const { output: vOutput, steps } = vigenereEncrypt(sourceText, secretKey);
        output = vOutput;
        setVigenereSteps(steps);
      } else {
        output = btoa(sourceText);
        setVigenereSteps([]);
      }
      setResult(output);
      addToast(ts.encryptSuccess);
    } catch (e) {
      addToast(ts.error, "error");
    }
  };

  const handleDecrypt = () => {
    if (!sourceText) return addToast(ts.msgRequired, "error");
    if (method !== CipherMethod.BASE64 && !secretKey) return addToast(ts.keyRequired, "error");

    try {
      let output = '';
      if (method === CipherMethod.AES) {
        const bytes = CryptoJS.AES.decrypt(sourceText, secretKey);
        output = bytes.toString(CryptoJS.enc.Utf8);
        if (!output) throw new Error("Key mismatch");
        setVigenereSteps([]);
      } else if (method === CipherMethod.CAESAR) {
        const shift = 26 - (parseInt(secretKey) || 3);
        output = sourceText.replace(/[a-z]/gi, (char) => {
          const start = char <= 'Z' ? 65 : 97;
          return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
        });
        setVigenereSteps([]);
      } else if (method === CipherMethod.VIGENERE) {
        const { output: vOutput, steps } = vigenereDecrypt(sourceText, secretKey);
        output = vOutput;
        setVigenereSteps(steps);
      } else {
        output = atob(sourceText);
        setVigenereSteps([]);
      }
      setResult(output);
      addToast(ts.decryptSuccess);
    } catch (e) {
      addToast(ts.decryptError, "error");
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    addToast(ts.copied);
  };

  const reset = () => {
    setSourceText('');
    setResult('');
    setSecretKey('');
    setVigenereSteps([]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      {/* Back Button */}
      <button 
        onClick={() => onNavigate('landing')}
        className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors mb-6 group text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        {common.backHome}
      </button>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex border-b border-slate-800">
          <button 
            onClick={() => { setActiveTab('encrypt'); reset(); }}
            className={`flex-1 flex items-center justify-center gap-2 py-5 font-bold transition-all ${activeTab === 'encrypt' ? 'text-cyan-400 bg-cyan-400/5' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Lock className="w-5 h-5" /> {t.encrypt}
          </button>
          <button 
            onClick={() => { setActiveTab('decrypt'); reset(); }}
            className={`flex-1 flex items-center justify-center gap-2 py-5 font-bold transition-all ${activeTab === 'decrypt' ? 'text-indigo-400 bg-indigo-400/5' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Unlock className="w-5 h-5" /> {t.decrypt}
          </button>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Text Area */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {activeTab === 'encrypt' ? t.labelSource : t.labelEncrypted}
                </label>
                <textarea 
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                  placeholder={activeTab === 'encrypt' ? t.placeholderSource : t.placeholderEncrypted}
                  className="w-full h-40 bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all resize-none"
                />
              </div>

              {/* Method & Key Management Area */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    {t.labelMethod}
                  </label>
                  <select 
                    value={method}
                    onChange={(e) => setMethod(e.target.value as CipherMethod)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  >
                    <option value={CipherMethod.AES}>{CipherMethod.AES}</option>
                    <option value={CipherMethod.VIGENERE}>{CipherMethod.VIGENERE}</option>
                    <option value={CipherMethod.CAESAR}>{CipherMethod.CAESAR}</option>
                    <option value={CipherMethod.BASE64}>{CipherMethod.BASE64}</option>
                  </select>
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

              <button 
                onClick={activeTab === 'encrypt' ? handleEncrypt : handleDecrypt}
                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-lg ${
                  activeTab === 'encrypt' 
                  ? 'bg-cyan-500 text-[#0f172a] shadow-cyan-500/10' 
                  : 'bg-indigo-600 text-white shadow-indigo-600/10'
                }`}
              >
                {activeTab === 'encrypt' ? <><Lock className="w-5 h-5" /> {t.btnEncrypt}</> : <><Unlock className="w-5 h-5" /> {t.btnDecrypt}</>}
              </button>
            </div>

            <div className="flex flex-col">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                {t.labelResult}
              </label>
              <div className="flex-grow flex flex-col bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden relative group min-h-[160px]">
                {result ? (
                  <>
                    <div className="p-4 mono text-sm text-cyan-400 break-all h-full overflow-y-auto">
                      {result}
                    </div>
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button onClick={copyToClipboard} className="p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-lg backdrop-blur-sm transition-colors">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4 text-slate-700">
                      {activeTab === 'encrypt' ? <Shield className="w-8 h-8" /> : <Unlock className="w-8 h-8" />}
                    </div>
                    <p className="text-slate-600 text-sm font-medium">
                      {activeTab === 'encrypt' ? t.placeholderResult : t.placeholderResult}
                    </p>
                  </div>
                )}
              </div>
              
              <button 
                onClick={reset}
                className="mt-6 flex items-center justify-center gap-2 text-slate-500 hover:text-slate-300 text-sm font-medium transition-colors"
              >
                <RefreshCcw className="w-4 h-4" /> {t.newMsg}
              </button>
            </div>
          </div>

          {vigenereSteps.length > 0 && (
            <div className="mt-8 border-t border-slate-800 pt-6">
              <button onClick={() => setShowSteps(!showSteps)} className="flex items-center gap-2 text-cyan-500 font-bold text-xs uppercase hover:text-cyan-400 transition-colors">
                <Cpu className="w-4 h-4" /> {t.techFlow}
                {showSteps ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showSteps && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                  {vigenereSteps.map((step, idx) => (
                    <div key={idx} className="bg-slate-950 border border-slate-800 p-2 rounded-lg text-center">
                      <div className="flex flex-col gap-1 mono text-xs">
                        <span className="text-white">{step.char}</span>
                        <span className="text-indigo-400">{activeTab === 'encrypt' ? '+' : '-'} {step.keyChar}</span>
                        <div className="h-[1px] bg-slate-800 my-1"></div>
                        <span className="text-cyan-400 font-bold">{step.result}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-slate-800/30 px-8 py-4 border-t border-slate-800 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {t.security.map((sec, i) => (
            <div key={i} className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> {sec}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
