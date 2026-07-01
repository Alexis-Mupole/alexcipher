import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { Dashboard } from './components/Dashboard';
import { KeyVault } from './components/KeyVault';
import { FAQSection } from './components/FAQSection';
import { LegalPage } from './components/LegalPage';
import { AgreementModal } from './components/AgreementModal';
import { InstallHub } from './components/InstallHub';
import { Page, ToastMessage, Language, Theme } from './types';
import { ToastContainer } from './components/Toast';
import { translations } from './translations';

const pageDepth: Record<Page, number> = {
  landing: 0,
  dashboard: 1,
  keys: 1,
  faq: 1,
  privacy: 2,
  terms: 2,
};

const getInitialPage = (): Page => 'landing';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(getInitialPage);
  const [prevPage, setPrevPage] = useState<Page | null>(null);
  const [transitionDir, setTransitionDir] = useState<'forward' | 'back'>('forward');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedPage, setDisplayedPage] = useState<Page>(getInitialPage);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showInstallHub, setShowInstallHub] = useState(false);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navLockRef = useRef(false);

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('alexcipher_theme') as Theme;
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('alexcipher_lang') as Language) || 'fr';
  });

  const [hasAcceptedTerms, setHasAcceptedTerms] = useState<boolean>(() => {
    return localStorage.getItem('alexcipher_accepted') === 'true';
  });

  const addToast = useCallback((text: string, type: 'success' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('alexcipher_theme', theme);
    window.dispatchEvent(new CustomEvent('theme-change', { detail: theme }));
  }, [theme]);

  useEffect(() => {
    const handleUpdate = () => {
      addToast(language === 'fr' ? "Une mise à jour est prête. Redémarrage imminent..." : "A new update is ready. Restarting soon...", 'success');
    };
    window.addEventListener('pwa-update-available', handleUpdate);
    return () => window.removeEventListener('pwa-update-available', handleUpdate);
  }, [addToast, language]);

  const doNavigate = useCallback((page: Page) => {
    if (navLockRef.current) return;
    if (page === currentPage || isTransitioning) return;
    navLockRef.current = true;

    const dir = (pageDepth[page] ?? 0) >= (pageDepth[currentPage] ?? 0) ? 'forward' : 'back';
    setPrevPage(currentPage);
    setTransitionDir(dir);

    setIsTransitioning(true);
    setDisplayedPage(page);

    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    transitionTimer.current = setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
      navLockRef.current = false;
    }, 300);

    localStorage.setItem('alexcipher_page', page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, isTransitioning]);

  useEffect(() => {
    const onHashChange = () => {
      const hash = (window.location.hash.replace('#', '') || 'landing') as Page;
      const validPages: Page[] = ['landing', 'dashboard', 'keys', 'faq', 'privacy', 'terms'];
      if (validPages.includes(hash)) {
        doNavigate(hash);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [doNavigate]);

  useEffect(() => {
    localStorage.setItem('alexcipher_lang', language);
  }, [language]);

  useEffect(() => {
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    const standalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    setIsStandalone(standalone);

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setShowInstallHub(false);
      setIsStandalone(true);
      addToast(language === 'fr' ? "AlexCipher est maintenant installé !" : "AlexCipher is now installed!");
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [addToast, language]);

  const handleInstallClick = () => {
    setShowInstallHub(true);
  };

  const triggerActualInstall = async () => {
    if (isIOS && !isStandalone) {
      addToast(translations[language].common.iosInstall, 'success');
      setShowInstallHub(false);
      return;
    }

    if (!deferredPrompt) {
      addToast(language === 'fr' ? "Veuillez utiliser le menu du navigateur pour installer." : "Please use the browser menu to install.", "error");
      setShowInstallHub(false);
      return;
    }

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } catch (err) {
      console.error("Installation failed", err);
    } finally {
      setShowInstallHub(false);
    }
  };

  const handleAcceptTerms = () => {
    setHasAcceptedTerms(true);
    localStorage.setItem('alexcipher_accepted', 'true');
  };

  const navigate = (page: Page) => {
    const hash = page === 'landing' ? '' : page;
    const currentHash = window.location.hash.replace('#', '');
    if (currentHash === hash || navLockRef.current) return;
    window.location.hash = hash;
  };

  useEffect(() => {
    return () => {
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    };
  }, []);

  const getTransitionClass = () => {
    if (!isTransitioning) return '';
    if (transitionDir === 'forward') {
      return 'page-enter';
    }
    return 'page-enter-back';
  };

  const renderPage = (page: Page) => {
    switch (page) {
      case 'landing':
        return <Hero key="landing" onStart={() => navigate('dashboard')} language={language} />;
      case 'dashboard':
        return <Dashboard key="dashboard" addToast={addToast} language={language} onNavigate={navigate} />;
      case 'keys':
        return <KeyVault key="keys" addToast={addToast} language={language} onNavigate={navigate} />;
      case 'faq':
        return <FAQSection key="faq" language={language} onNavigate={navigate} />;
      case 'privacy':
        return <LegalPage key="privacy" type="privacy" language={language} onNavigate={navigate} />;
      case 'terms':
        return <LegalPage key="terms" type="terms" language={language} onNavigate={navigate} />;
      default:
        return <Hero key="landing" onStart={() => navigate('dashboard')} language={language} />;
    }
  };

  return (
    <Layout 
      activePage={currentPage} 
      onNavigate={navigate} 
      language={language} 
      setLanguage={setLanguage}
      theme={theme}
      setTheme={setTheme}
      showInstallButton={(!!deferredPrompt || (isIOS && !isStandalone)) && !isStandalone}
      onInstallClick={handleInstallClick}
      displayPage={displayedPage}
    >
      {!hasAcceptedTerms && (
        <AgreementModal language={language} onAccept={handleAcceptTerms} />
      )}

      {showInstallHub && (
        <InstallHub 
          language={language} 
          isIOS={isIOS}
          onClose={() => setShowInstallHub(false)}
          onTriggerInstall={triggerActualInstall}
        />
      )}

      <div className={`${getTransitionClass()} min-h-full`}>
        {renderPage(displayedPage)}
      </div>
      <ToastContainer toasts={toasts} />
    </Layout>
  );
};

export default App;
