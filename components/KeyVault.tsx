
import React, { useState, useEffect } from 'react';
import { EncryptionKey, Language } from '../types';
import { Plus, Trash2, Copy, Key as KeyIcon, Clock, Download, Upload, Brain, Leaf, ShieldAlert, Users, GraduationCap, ChevronRight } from 'lucide-react';
import { translations } from '../translations';

interface KeyVaultProps {
  addToast: (msg: string, type?: 'success' | 'error') => void;
  language: Language;
}

export const KeyVault: React.FC<KeyVaultProps> = ({ addToast, language }) => {
  const t = translations[language].keys;
  const [keys, setKeys] = useState<EncryptionKey[]>([]);
  const [newKeyName, setNewKeyName] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('alexcipher_keys');
    if (saved) setKeys(JSON.parse(saved));
  }, []);

  const saveKeys = (updated: EncryptionKey[]) => {
    setKeys(updated);
    localStorage.setItem('alexcipher_keys', JSON.stringify(updated));
  };

  const generateKey = () => {
    if (!newKeyName.trim()) return addToast(translations[language].keys.placeholderName, "error");
    
    const newValue = Array.from(window.crypto.getRandomValues(new Uint8Array(24)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    const newKey: EncryptionKey = {
      id: Math.random().toString(36).substring(7),
      name: newKeyName,
      value: newValue,
      createdAt: Date.now()
    };

    saveKeys([newKey, ...keys]);
    setNewKeyName('');
    addToast(t.keyAdded);
  };

  const deleteKey = (id: string) => {
    saveKeys(keys.filter(k => k.id !== id));
    addToast(t.keyDeleted);
  };

  const copyKey = (val: string) => {
    navigator.clipboard.writeText(val);
    addToast(t.keyCopied);
  };

  const handleExport = () => {
    if (keys.length === 0) return;
    const dataStr = JSON.stringify(keys, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `alexcipher_keys.json`);
    linkElement.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedKeys = JSON.parse(event.target?.result as string);
        if (Array.isArray(importedKeys)) {
          const existingIds = new Set(keys.map(k => k.id));
          const newUniqueKeys = importedKeys.filter(k => !existingIds.has(k.id) && k.value);
          if (newUniqueKeys.length === 0) return addToast(t.importExists, "error");
          saveKeys([...newUniqueKeys, ...keys]);
          addToast(`${newUniqueKeys.length} ${t.importSuccess}`);
        }
      } catch (err) {
        addToast(t.importError, "error");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const getEduIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="w-5 h-5" />;
      case 'Leaf': return <Leaf className="w-5 h-5" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      default: return <GraduationCap className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 text-center lg:text-left">
        <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">{t.title}</h2>
        <p className="text-slate-400 text-lg">{t.desc}</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Gestionnaire Technique (8 colonnes) */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
             {/* Panneau de Création */}
            <div className="md:col-span-1">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sticky top-24 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-cyan-400" /> {t.newKey}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">{t.labelName}</label>
                    <input 
                      type="text"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      placeholder={t.placeholderName}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                    />
                  </div>
                  <button 
                    onClick={generateKey} 
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-[#0f172a] font-bold py-4 rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-cyan-500/10"
                  >
                    {t.btnGenerate}
                  </button>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button onClick={handleExport} className="flex flex-col items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold py-3 rounded-xl border border-slate-700 transition-colors">
                      <Download className="w-4 h-4" /> {t.btnExport}
                    </button>
                    <label className="flex flex-col items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold py-3 rounded-xl border border-slate-700 cursor-pointer text-center transition-colors">
                      <Upload className="w-4 h-4" /> {t.btnImport}
                      <input type="file" className="hidden" accept=".json" onChange={handleImport} />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Liste des Clés */}
            <div className="md:col-span-2 space-y-4">
              {keys.length === 0 ? (
                <div className="bg-slate-900/50 border border-dashed border-slate-800 rounded-3xl p-16 text-center">
                  <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-700">
                    <KeyIcon className="w-8 h-8" />
                  </div>
                  <p className="text-slate-500 font-medium">{t.empty}</p>
                </div>
              ) : (
                keys.map((key) => (
                  <div key={key.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex items-center justify-between group hover:border-slate-700 hover:bg-slate-800/50 transition-all shadow-lg">
                    <div className="flex-grow overflow-hidden">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-bold text-white truncate text-lg">{key.name}</span>
                        <span className="text-[10px] text-slate-500 whitespace-nowrap bg-slate-800 px-2 py-1 rounded-md">
                          <Clock className="w-3 h-3 inline mr-1" /> 
                          {new Date(key.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <code className="text-sm text-cyan-400/70 mono truncate block bg-black/30 p-2 rounded-lg border border-white/5">
                        {key.value}
                      </code>
                    </div>
                    <div className="flex flex-col gap-2 ml-6">
                      <button 
                        onClick={() => copyKey(key.value)} 
                        className="p-3 text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-xl transition-all"
                      >
                        <Copy className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => deleteKey(key.id)} 
                        className="p-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Section Éducative (4 colonnes) */}
        <div className="lg:col-span-4">
          <div className="bg-slate-900/30 border border-slate-800/50 rounded-3xl p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-indigo-500/20 rounded-xl">
                <GraduationCap className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">{t.edu.title}</h3>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">{t.edu.subtitle}</p>
              </div>
            </div>

            <div className="space-y-6">
              {t.edu.cards.map((card, i) => (
                <div key={i} className="group relative">
                  <div className="flex gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl group-hover:border-indigo-500/50 transition-all">
                    <div className="shrink-0 p-3 bg-slate-950 border border-slate-800 rounded-xl text-indigo-400 group-hover:scale-110 transition-transform">
                      {getEduIcon(card.icon)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                        {card.title}
                        <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                      </h4>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <Leaf className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-emerald-400">Éco-Conception</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed italic">
                Saviez-vous que le chiffrement local consomme jusqu'à 90% moins d'énergie qu'un service cloud ? En utilisant AlexCipher, vous protégez vos données tout en préservant la planète.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
