import React, { useState, useEffect } from 'react';
import { EncryptionKey, Language, Page } from '../types';
import { Plus, Trash2, Copy, Key as KeyIcon, Clock, Download, Upload, Brain, Leaf, ShieldAlert, Users, GraduationCap, ChevronRight, ArrowLeft } from 'lucide-react';
import { translations } from '../translations';

interface KeyVaultProps {
  addToast: (msg: string, type?: 'success' | 'error') => void;
  language: Language;
  onNavigate: (page: Page) => void;
}

export const KeyVault: React.FC<KeyVaultProps> = ({ addToast, language, onNavigate }) => {
  const t = translations[language].keys;
  const common = translations[language].common;
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
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <button 
        onClick={() => onNavigate('landing')}
        className="flex items-center gap-2 transition-colors mb-6 group text-sm font-medium"
        style={{ color: 'var(--text-muted)' }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        {common.backHome}
      </button>

      <div className="mb-12 text-center lg:text-left">
        <h2 className="text-4xl font-extrabold mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>{t.title}</h2>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>{t.desc}</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-1">
              <div className="border rounded-3xl p-6 md:sticky md:top-24 shadow-xl card-hover" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <div className="icon-box w-8 h-8" style={{ color: 'var(--accent)', backgroundColor: 'var(--accent-soft)' }}><Plus className="w-4 h-4" /></div> {t.newKey}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: 'var(--text-muted)' }}>{t.labelName}</label>
                    <input 
                      type="text"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      placeholder={t.placeholderName}
                      className="w-full border rounded-2xl p-4 text-sm transition-all focus:outline-none focus:ring-2"
                      style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <button 
                    onClick={generateKey} 
                    className="btn-primary w-full"
                  >
                    {t.btnGenerate}
                  </button>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button onClick={handleExport} className="btn-secondary py-3">
                      <Download className="w-4 h-4" /> {t.btnExport}
                    </button>
                    <label className="btn-secondary py-3 cursor-pointer text-center">
                      <Upload className="w-4 h-4" /> {t.btnImport}
                      <input type="file" className="hidden" accept=".json" onChange={handleImport} />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4 min-w-0">
              {keys.length === 0 ? (
                <div className="border border-dashed rounded-3xl p-16 text-center" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
                  <div className="empty-state-icon">
                    <KeyIcon className="w-8 h-8" />
                  </div>
                  <p className="font-medium" style={{ color: 'var(--text-muted)' }}>{t.empty}</p>
                </div>
              ) : (
                keys.map((key) => (
                  <div key={key.id} className="card-hover card-accent border rounded-3xl p-5 flex items-center gap-4 shadow-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
                    <div className="flex-grow min-w-0 overflow-hidden">
                      <div className="flex items-center gap-3 mb-2 min-w-0">
                        <span className="font-bold truncate text-base leading-tight" style={{ color: 'var(--text-primary)' }}>{key.name}</span>
                        <span className="text-[9px] px-2 py-0.5 rounded-md border" style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
                          {new Date(key.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="relative group/code">
                        <code 
                          className="text-[11px] mono truncate block p-2.5 rounded-xl border font-medium notranslate"
                          style={{ color: 'var(--accent)', backgroundColor: 'var(--input-bg)', borderColor: 'var(--border-color)' }}
                          translate="no"
                        >
                          {key.value}
                        </code>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-1 pl-3" style={{ borderLeft: '1px solid var(--border-color)' }}>
                      <button 
                        onClick={() => copyKey(key.value)} 
                        className="p-2.5 rounded-xl transition-all"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.backgroundColor = 'var(--accent-soft)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                        title={language === 'fr' ? 'Copier' : 'Copy'}
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteKey(key.id)} 
                        className="p-2.5 rounded-xl transition-all"
                        style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                        title={language === 'fr' ? 'Supprimer' : 'Delete'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="glass-card rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="icon-box w-11 h-11" style={{ backgroundColor: 'rgba(99, 102, 241, 0.2)', color: '#6366f1' }}>
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>{t.edu.title}</h3>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{t.edu.subtitle}</p>
              </div>
            </div>

            <div className="space-y-6">
              {t.edu.cards.map((card, i) => (
                <div key={i} className="group relative">
                  <div className="card-hover card-accent flex gap-4 p-5 border rounded-2xl" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
                    <div className="icon-box w-11 h-11 border" style={{ backgroundColor: 'var(--bg-tertiary)', borderColor: 'var(--border-color)', color: '#6366f1' }}>
                      {getEduIcon(card.icon)}
                    </div>
                    <div>
                      <h4 className="font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                        {card.title}
                        <ChevronRight className="w-3 h-3 transition-all" style={{ color: 'var(--text-muted)' }} />
                      </h4>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 rounded-2xl" style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
              <div className="flex items-center gap-3 mb-3">
                <Leaf className="w-5 h-5" style={{ color: '#34d399' }} />
                <span className="text-sm font-bold" style={{ background: 'linear-gradient(135deg, #34d399, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t.eco.title}</span>
              </div>
              <p className="text-[11px] leading-relaxed italic" style={{ color: 'var(--text-muted)' }}>
                {t.eco.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
