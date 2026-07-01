import React, { useState } from 'react';
import { Page, Language, Theme } from '../types';
import { Shield, LayoutGrid, Key, HelpCircle, Mail, Download, Phone, ShieldCheck, PlusCircle, Sparkles, Sun, Moon, Home, ChevronDown, X, Globe } from 'lucide-react';
import { translations } from '../translations';

interface LayoutProps {
  children: React.ReactNode;
  activePage: Page;
  onNavigate: (page: Page) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  showInstallButton?: boolean;
  onInstallClick?: () => void;
  displayPage: Page;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activePage, 
  onNavigate, 
  language, 
  setLanguage,
  theme,
  setTheme,
  showInstallButton,
  onInstallClick,
  displayPage
}) => {
  const t = translations[language].nav;
  const common = translations[language].common;
  const [showMoreSheet, setShowMoreSheet] = useState(false);

  const handleNav = (page: Page) => {
    onNavigate(page);
    setShowMoreSheet(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    setShowMoreSheet(false);
  };

  const isMainPage = displayPage === 'dashboard' || displayPage === 'keys' || displayPage === 'faq';
  const isLanding = displayPage === 'landing' || displayPage === 'privacy' || displayPage === 'terms';

  const tabItems = [
    { id: 'dashboard' as Page, icon: <LayoutGrid className="w-5 h-5" />, label: t.dashboard },
    { id: 'keys' as Page, icon: <Key className="w-5 h-5" />, label: t.keys },
    { id: 'faq' as Page, icon: <HelpCircle className="w-5 h-5" />, label: t.faq },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-50" style={{ backgroundColor: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-color)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div 
              className="flex items-center gap-3 cursor-pointer group active:scale-95 transition-transform"
              onClick={() => handleNav('landing')}
            >
              <div className="relative">
                <div className="absolute inset-0 blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-xl" style={{ backgroundColor: 'var(--accent)' }}></div>
                <div className="icon-box w-9 h-9 md:w-10 md:h-10 shadow-lg group-hover:shadow-xl" style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))', color: '#fff' }}>
                  <Shield className="w-5 h-5 md:w-5 md:h-5" />
                </div>
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>
                Alex<span style={{ color: 'var(--accent)' }}>Cipher</span>
              </span>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center space-x-10 text-xs font-bold uppercase tracking-widest">
              {tabItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className="flex items-center gap-2 transition-all duration-300"
                  style={{ color: activePage === item.id ? 'var(--accent)' : 'var(--text-muted)' }}
                  onMouseEnter={(e) => { if (activePage !== item.id) e.currentTarget.style.color = 'var(--text-primary)'; }}
                  onMouseLeave={(e) => { if (activePage !== item.id) e.currentTarget.style.color = 'var(--text-muted)'; }}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {/* Desktop install */}
              {showInstallButton && (
                <button 
                  onClick={onInstallClick}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 group relative overflow-hidden"
                  style={{ backgroundColor: 'var(--accent-soft)', border: '1px solid var(--accent)', color: 'var(--accent)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-soft)'; e.currentTarget.style.color = 'var(--accent)'; }}
                >
                  <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                  <span className="hidden lg:inline">{common.install}</span>
                  <Sparkles className="w-3 h-3 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              )}

              {/* Theme toggle (desktop) */}
              <button
                onClick={toggleTheme}
                className="hidden md:flex p-2.5 rounded-xl transition-all active:scale-90"
                style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid var(--border-color)' }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Language toggle (desktop) */}
              <div className="hidden md:flex items-center rounded-xl p-1" style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>
                <button 
                  onClick={() => setLanguage('fr')}
                  className="px-3 py-1.5 text-[10px] font-black rounded-lg transition-all"
                  style={language === 'fr' ? { backgroundColor: 'var(--accent)', color: '#fff' } : { color: 'var(--text-muted)' }}
                >
                  FR
                </button>
                <button 
                  onClick={() => setLanguage('en')}
                  className="px-3 py-1.5 text-[10px] font-black rounded-lg transition-all"
                  style={language === 'en' ? { backgroundColor: 'var(--accent)', color: '#fff' } : { color: 'var(--text-muted)' }}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main className="flex-grow" style={!isLanding ? { paddingBottom: 'calc(64px + env(safe-area-inset-bottom, 0px))' } : {}}>
        {children}
      </main>

      {/* ─── Bottom Tab Bar (mobile only) ─── */}
      {!isLanding && (
        <div className="md:hidden tab-bar">
          {tabItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="tab-btn"
                style={{ color: isActive ? 'var(--accent)' : 'var(--text-muted)' }}
              >
                {isActive && <span className="tab-indicator" />}
                {item.icon}
                <span style={{ fontWeight: isActive ? 800 : 600, opacity: isActive ? 1 : 0.7 }}>
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* More button */}
          <button
            onClick={() => setShowMoreSheet(true)}
            className="tab-btn"
            style={{ color: 'var(--text-muted)' }}
          >
            <span className="relative">
              <ChevronDown className="w-5 h-5" />
            </span>
            <span style={{ fontWeight: 600, opacity: 0.7 }}>
              {language === 'fr' ? 'Plus' : 'More'}
            </span>
          </button>
        </div>
      )}

      {/* ─── More Bottom Sheet (mobile) ─── */}
      {showMoreSheet && (
        <>
          <div className="sheet-overlay" onClick={() => setShowMoreSheet(false)} />
          <div className="sheet" style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-color)' }}>
            <div className="sheet-handle" />
            
            <div className="px-6 pb-8 pt-2 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                {language === 'fr' ? 'Options' : 'Options'}
              </h3>

              {/* Install (in sheet) */}
              {showInstallButton && (
                <button
                  onClick={() => { setShowMoreSheet(false); onInstallClick?.(); }}
                  className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all active:scale-[0.97]"
                  style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-dark))', color: '#fff' }}
                >
                  <Download className="w-5 h-5" />
                  {common.install}
                </button>
              )}

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all"
                style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" style={{ color: 'var(--accent)' }} /> : <Moon className="w-5 h-5" style={{ color: 'var(--accent)' }} />}
                {theme === 'dark' 
                  ? (language === 'fr' ? 'Mode Clair' : 'Light Mode')
                  : (language === 'fr' ? 'Mode Sombre' : 'Dark Mode')}
              </button>

              {/* Language toggle */}
              <div className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                <Globe className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => setLanguage('fr')}
                    className="px-4 py-2 rounded-xl text-xs font-black transition-all"
                    style={language === 'fr' ? { backgroundColor: 'var(--accent)', color: '#fff' } : { backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}
                  >
                    FR
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className="px-4 py-2 rounded-xl text-xs font-black transition-all"
                    style={language === 'en' ? { backgroundColor: 'var(--accent)', color: '#fff' } : { backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}
                  >
                    EN
                  </button>
                </div>
              </div>

              <div className="h-px" style={{ backgroundColor: 'var(--border-color)' }} />

              {/* Legal links */}
              <div className="flex gap-4">
                <button onClick={() => handleNav('privacy')} className="flex-1 text-center py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}>
                  Privacy
                </button>
                <button onClick={() => handleNav('terms')} className="flex-1 text-center py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}>
                  Terms
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ─── Footer (desktop only) ─── */}
      <footer className="hidden md:block" style={{ backgroundColor: 'var(--bg-tertiary)', borderTop: '1px solid var(--border-color)' }}>
        <div className="max-w-7xl mx-auto px-4 pt-20 pb-16">
          <div className="grid md:grid-cols-4 gap-16 mb-16 text-center md:text-left">
            <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3 mb-6">
                <div className="icon-box w-10 h-10" style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }}>
                  <Shield className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black tracking-tighter" style={{ color: 'var(--text-primary)' }}>Alex<span style={{ color: 'var(--accent)' }}>Cipher</span></span>
              </div>
              <p className="text-sm leading-relaxed max-w-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                {language === 'fr' 
                  ? 'La suite de sécurité ultime pour vos communications privées. 100% local, sans aucun serveur. Votre vie privée est un droit.'
                  : 'The ultimate security suite for your private communications. 100% local, no server. Your privacy is a right.'}
              </p>
              <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>
                <ShieldCheck className="w-4 h-4" /> {language === 'fr' ? 'SÉCURISÉ LOCAL SANS STOCKAGE' : 'SECURE LOCAL NO-STORAGE'}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-8 text-[10px] uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>{language === 'fr' ? 'Navigation' : 'Navigation'}</h4>
              <ul className="space-y-5 text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                <li><button onClick={() => handleNav('dashboard')} style={{ opacity: 0.7 }} className="hover:opacity-100 transition-opacity">{t.dashboard}</button></li>
                <li><button onClick={() => handleNav('keys')} style={{ opacity: 0.7 }} className="hover:opacity-100 transition-opacity">{t.keys}</button></li>
                <li><button onClick={() => handleNav('faq')} style={{ opacity: 0.7 }} className="hover:opacity-100 transition-opacity">{t.faq}</button></li>
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-bold mb-8 text-[10px] uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>Contact</h4>
              <div className="space-y-4 w-full">
                <a href="mailto:regusopus@gmail.com" className="flex items-center justify-center md:justify-start gap-4 text-xs font-bold uppercase tracking-widest transition-all group" style={{ color: 'var(--text-muted)' }}>
                  <div className="icon-box w-9 h-9" style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }}>
                    <Mail className="w-4 h-4" />
                  </div>
                  regusopus@gmail.com
                </a>
                <a href="https://wa.me/243997306308" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start gap-4 text-xs font-bold uppercase tracking-widest transition-all group" style={{ color: 'var(--text-muted)' }}>
                  <div className="icon-box w-9 h-9" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                    <Phone className="w-4 h-4" />
                  </div>
                  {t.whatsapp}
                </a>
              </div>
            </div>
          </div>
          <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-8" style={{ borderTop: '1px solid var(--border-color)' }}>
            <div className="text-center md:text-left">
              <span className="font-bold text-[10px] uppercase tracking-[0.2em] block mb-1" style={{ color: 'var(--text-muted)' }}>{translations[language].nav.developer}</span>
              <span className="text-[9px] uppercase tracking-[0.3em]" style={{ color: 'var(--text-muted)' }}>© AlexCipher — MMXXV — All Rights Reserved</span>
            </div>
            <div className="flex gap-10 font-bold uppercase tracking-widest text-[10px]">
              <button onClick={() => handleNav('privacy')} style={{ color: 'var(--text-muted)' }} className="hover:opacity-100 transition-opacity" onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Privacy</button>
              <button onClick={() => handleNav('terms')} style={{ color: 'var(--text-muted)' }} className="hover:opacity-100 transition-opacity" onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>Terms</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
