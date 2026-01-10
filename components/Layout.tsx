import React, { useState } from 'react';
import { Page, Language } from '../types';
import { Shield, LayoutGrid, Key, HelpCircle, Github, Mail, Menu, X, Download, Phone, ShieldCheck, PlusCircle, Sparkles } from 'lucide-react';
import { translations } from '../translations';

interface LayoutProps {
  children: React.ReactNode;
  activePage: Page;
  onNavigate: (page: Page) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  showInstallButton?: boolean;
  onInstallClick?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activePage, 
  onNavigate, 
  language, 
  setLanguage,
  showInstallButton,
  onInstallClick
}) => {
  const t = translations[language].nav;
  const common = translations[language].common;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNav = (page: Page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'dashboard' as Page, icon: <LayoutGrid className="w-4 h-4" />, label: t.dashboard },
    { id: 'keys' as Page, icon: <Key className="w-4 h-4" />, label: t.keys },
    { id: 'faq' as Page, icon: <HelpCircle className="w-4 h-4" />, label: t.faq },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a] selection:bg-cyan-500/30">
      {/* Header avec support Notch */}
      <header className="sticky top-0 z-50 bg-[#0f172a]/95 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div 
              className="flex items-center gap-3 cursor-pointer group active:scale-95 transition-transform"
              onClick={() => handleNav('landing')}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-xl"></div>
                <div className="relative p-2.5 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] group-hover:scale-110 transition-all duration-300">
                  <Shield className="w-6 h-6 text-[#0f172a]" />
                </div>
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                Alex<span className="text-cyan-400">Cipher</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-10 text-xs font-bold uppercase tracking-widest">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-2 transition-all duration-300 ${activePage === item.id ? 'text-cyan-400' : 'text-slate-400 hover:text-white hover:translate-y-[-1px]'}`}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {showInstallButton && (
                <button 
                  onClick={onInstallClick}
                  className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-slate-900 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-cyan-500 hover:text-slate-950 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all active:scale-95 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-cyan-500/10 animate-pulse" />
                  <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                  {common.install}
                  <Sparkles className="w-3 h-3 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              )}

              {/* Language Selector */}
              <div className="flex items-center bg-slate-950 border border-slate-800 p-1 rounded-xl">
                <button 
                  onClick={() => setLanguage('fr')}
                  className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all ${language === 'fr' ? 'bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/20' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  FR
                </button>
                <button 
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all ${language === 'en' ? 'bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/20' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  EN
                </button>
              </div>

              {/* Mobile Toggle */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2.5 text-slate-400 hover:text-white bg-slate-800/50 rounded-xl border border-slate-700/50 transition-all active:scale-90"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-[#0f172a] animate-in slide-in-from-top duration-300 pb-12 shadow-2xl">
            <div className="px-4 py-8 space-y-4">
              {showInstallButton && (
                <button 
                  onClick={() => { onInstallClick?.(); setIsMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-4 px-6 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-cyan-600 text-slate-900 text-base font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 mb-6 relative overflow-hidden"
                >
                  <Download className="w-6 h-6" />
                  {common.install}
                  <div className="absolute top-0 left-0 w-full h-full bg-white/10 animate-pulse pointer-events-none" />
                </button>
              )}
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center gap-5 px-6 py-5 rounded-2xl text-base font-black uppercase tracking-widest transition-all ${activePage === item.id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-lg' : 'text-slate-400 hover:bg-slate-800/50 border border-transparent'}`}
                >
                  <div className={`p-2.5 rounded-xl ${activePage === item.id ? 'bg-cyan-500 text-slate-900' : 'bg-slate-800 text-slate-500'}`}>
                    {item.icon}
                  </div>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-16 mb-16 text-center md:text-left">
            <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-1.5 bg-cyan-500/10 rounded-lg">
                  <Shield className="w-6 h-6 text-cyan-400" />
                </div>
                <span className="text-2xl font-black text-white tracking-tighter">Alex<span className="text-cyan-400">Cipher</span></span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm font-medium">
                La suite de sécurité ultime pour vos communications privées. 100% local, sans aucun serveur. Votre vie privée est un droit.
              </p>
              <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500/50">
                <ShieldCheck className="w-4 h-4" /> SECURE END-TO-END NO-STORAGE
              </div>
            </div>
            <div className="hidden md:block">
              <h4 className="text-white font-bold mb-8 text-[10px] uppercase tracking-[0.3em] text-slate-600">Navigation</h4>
              <ul className="space-y-5 text-xs font-bold uppercase tracking-widest text-slate-400">
                <li><button onClick={() => handleNav('dashboard')} className="hover:text-cyan-400 transition-colors">Dashboard</button></li>
                <li><button onClick={() => handleNav('keys')} className="hover:text-cyan-400 transition-colors">Mes Clés</button></li>
                <li><button onClick={() => handleNav('faq')} className="hover:text-cyan-400 transition-colors">Aide & Sécurité</button></li>
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-white font-bold mb-8 text-[10px] uppercase tracking-[0.3em] text-slate-600">Contact</h4>
              <div className="space-y-4 w-full">
                <a href="mailto:regusopus@gmail.com" className="flex items-center justify-center md:justify-start gap-4 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-cyan-400 transition-all group">
                  <div className="p-2.5 bg-slate-900 rounded-xl group-hover:bg-cyan-500 group-hover:text-slate-900 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  regusopus@gmail.com
                </a>
                <a href="https://wa.me/243997306308" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start gap-4 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-emerald-400 transition-all group">
                  <div className="p-2.5 bg-slate-900 rounded-xl group-hover:bg-emerald-500 group-hover:text-slate-900 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  {t.whatsapp}
                </a>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <span className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] block mb-1">{translations[language].nav.developer}</span>
              <span className="text-slate-700 text-[9px] uppercase tracking-[0.3em]">© AlexCipher — MMXXV — All Rights Reserved</span>
            </div>
            <div className="flex gap-10 font-bold uppercase tracking-widest text-[10px]">
              <button onClick={() => handleNav('privacy')} className="text-slate-500 hover:text-white transition-colors">Privacy</button>
              <button onClick={() => handleNav('terms')} className="text-slate-500 hover:text-white transition-colors">Terms</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};