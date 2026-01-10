import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { Dashboard } from './components/Dashboard';
import { KeyVault } from './components/KeyVault';
import { FAQSection } from './components/FAQSection';
import { LegalPage } from './components/LegalPage';
import { AgreementModal } from './components/AgreementModal';
import { InstallHub } from './components/InstallHub';
import { Page, ToastMessage, Language } from './types';
import { ToastContainer } from './components/Toast';
import { translations } from './translations';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showInstallHub, setShowInstallHub] = useState(false);
  
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
    // Écouter les mises à jour PWA détectées par index.html
    const handleUpdate = () => {
      addToast(language === 'fr' ? "Une mise à jour est prête. Redémarrage imminent..." : "A new update is ready. Restarting soon...", 'success');
    };
    window.addEventListener('pwa-update-available', handleUpdate);
    return () => window.removeEventListener('pwa-update-available', handleUpdate);
  }, [addToast, language]);

  useEffect(() => {
    // Gestion des raccourcis PWA (shortcuts)
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page') as Page;
    if (pageParam && ['dashboard', 'keys', 'faq'].includes(pageParam)) {
      setCurrentPage(pageParam);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('alexcipher_lang', language);
  }, [language]);

  useEffect(() => {
    // Détection iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    // Détection Standalone (Déjà installé)
    const standalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    setIsStandalone(standalone);

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log('AlexCipher: Native install ready (WebAPK mode)');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const handleAppInstalled = () => {
      console.log('AlexCipher: Successfully integrated into OS App List');
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
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <Hero onStart={() => navigate('dashboard')} language={language} />;
      case 'dashboard':
        return <Dashboard addToast={addToast} language={language} onNavigate={navigate} />;
      case 'keys':
        return <KeyVault addToast={addToast} language={language} onNavigate={navigate} />;
      case 'faq':
        return <FAQSection language={language} onNavigate={navigate} />;
      case 'privacy':
        return <LegalPage type="privacy" language={language} onNavigate={navigate} />;
      case 'terms':
        return <LegalPage type="terms" language={language} onNavigate={navigate} />;
      default:
        return <Hero onStart={() => navigate('dashboard')} language={language} />;
    }
  };

  return (
    <Layout 
      activePage={currentPage} 
      onNavigate={navigate} 
      language={language} 
      setLanguage={setLanguage}
      showInstallButton={(!!deferredPrompt || (isIOS && !isStandalone)) && !isStandalone}
      onInstallClick={handleInstallClick}
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

      {renderPage()}
      <ToastContainer toasts={toasts} />
    </Layout>
  );
};

export default App;