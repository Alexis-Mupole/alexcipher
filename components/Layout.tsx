
import React, { useState } from 'react';
import { Page, Language } from '../types';
import { Shield, LayoutGrid, Key, HelpCircle, Github, MessageCircle, Mail, ExternalLink, Menu, X } from 'lucide-react';
import { translations } from '../translations';

interface LayoutProps {
  children: React.ReactNode;
  activePage: Page;
  onNavigate: (page: Page) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate, language, setLanguage }) => {
  const t = translations[language].nav;
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
    <div className="min-h-screen flex flex-col bg-[#0f172a]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => handleNav('landing')}
            >
              <div className="p-1.5 bg-cyan-500 rounded-lg group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-[#0f172a]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Alex<span className="text-cyan-400">Cipher</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center gap-2 transition-colors ${activePage === item.id ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
                <button 
                  onClick={() => setLanguage('fr')}
                  className={`px-2 py-1 text-[10px] font-bold rounded ${language === 'fr' ? 'bg-cyan-500 text-[#0f172a]' : 'text-slate-400 hover:text-white'}`}
                >
                  FR
                </button>
                <button 
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 text-[10px] font-bold rounded ${language === 'en' ? 'bg-cyan-500 text-[#0f172a]' : 'text-slate-400 hover:text-white'}`}
                >
                  EN
                </button>
              </div>

              <a 
                href="https://github.com/Alexis-Mupole/alexcipher" 
                target="_blank" 
                rel="noreferrer"
                className="hidden sm:block p-2 text-slate-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>

              {/* Mobile Toggle */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg border border-slate-700 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-[#0f172a] animate-in slide-in-from-top duration-300">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-base font-bold transition-all ${activePage === item.id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:bg-slate-800 border border-transparent'}`}
                >
                  <div className={`p-2 rounded-lg ${activePage === item.id ? 'bg-cyan-500 text-[#0f172a]' : 'bg-slate-800 text-slate-400'}`}>
                    {item.icon}
                  </div>
                  {item.label}
                </button>
              ))}
              <a 
                href="https://github.com/Alexis-Mupole/alexcipher" 
                target="_blank" 
                rel="noreferrer"
                className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-slate-400 hover:bg-slate-800 border border-transparent font-bold transition-all"
              >
                <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                  <Github className="w-4 h-4" />
                </div>
                GitHub Repository
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer Professionnel */}
      <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12 text-center md:text-left">
            {/* Logo & Info */}
            <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-cyan-400" />
                <span className="text-xl font-bold text-white tracking-tight">AlexCipher</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                La suite de sécurité ultime pour vos communications. 100% local, 100% privé. Développé avec passion pour l'excellence numérique et la souveraineté technologique.
              </p>
            </div>

            {/* Navigation Rapide */}
            <div className="hidden md:block">
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Navigation</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><button onClick={() => handleNav('dashboard')} className="hover:text-cyan-400 transition-colors">Dashboard</button></li>
                <li><button onClick={() => handleNav('keys')} className="hover:text-cyan-400 transition-colors">Mes Clés</button></li>
                <li><button onClick={() => handleNav('faq')} className="hover:text-cyan-400 transition-colors">Aide & Sécurité</button></li>
              </ul>
            </div>

            {/* Contact & Support */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Contact & Support</h4>
              <div className="space-y-4 w-full">
                <a 
                  href="https://wa.me/243997306308" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-start gap-3 text-sm text-slate-400 hover:text-emerald-400 transition-colors group"
                >
                  <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-emerald-500/10">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  WhatsApp Support
                </a>
                <a 
                  href="mailto:regusopus@gmail.com" 
                  className="flex items-center justify-center md:justify-start gap-3 text-sm text-slate-400 hover:text-cyan-400 transition-colors group"
                >
                  <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-cyan-500/10">
                    <Mail className="w-4 h-4" />
                  </div>
                  regusopus@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Area */}
          <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="text-slate-300 font-bold text-sm">{translations[language].nav.developer}</span>
              <span className="text-slate-500 text-[10px] uppercase tracking-widest">© AlexCipher — 2025</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
               <div className="flex gap-4 text-xs font-medium text-slate-500">
                <button onClick={() => handleNav('privacy')} className="hover:text-white transition-colors">{translations[language].nav.privacy}</button>
                <button onClick={() => handleNav('terms')} className="hover:text-white transition-colors">{translations[language].nav.terms}</button>
                <button className="hover:text-white transition-colors">{translations[language].nav.api}</button>
              </div>
              <div className="h-4 w-px bg-slate-800 hidden md:block"></div>
              <a 
                href="https://github.com/Alexis-Mupole/alexcipher" 
                target="_blank" 
                rel="noreferrer"
                className="text-[10px] text-slate-600 font-mono flex items-center gap-2 hover:text-cyan-400 transition-colors"
              >
                v1.2.0-stable <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
