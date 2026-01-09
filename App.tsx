
import React, { useState, useEffect, useCallback } from 'react';
import { Layout } from './components/Layout';
import { Hero } from './components/Hero';
import { Dashboard } from './components/Dashboard';
import { KeyVault } from './components/KeyVault';
import { FAQSection } from './components/FAQSection';
import { LegalPage } from './components/LegalPage';
import { AgreementModal } from './components/AgreementModal';
import { Page, ToastMessage, Language } from './types';
import { ToastContainer } from './components/Toast';
import { translations } from './translations';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('alexcipher_lang') as Language) || 'fr';
  });

  const [hasAcceptedTerms, setHasAcceptedTerms] = useState<boolean>(() => {
    return localStorage.getItem('alexcipher_accepted') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('alexcipher_lang', language);
  }, [language]);

  const handleAcceptTerms = () => {
    setHasAcceptedTerms(true);
    localStorage.setItem('alexcipher_accepted', 'true');
  };

  const addToast = useCallback((text: string, type: 'success' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <Hero onStart={() => navigate('dashboard')} language={language} />;
      case 'dashboard':
        return <Dashboard addToast={addToast} language={language} />;
      case 'keys':
        return <KeyVault addToast={addToast} language={language} />;
      case 'faq':
        return <FAQSection language={language} />;
      case 'privacy':
        return <LegalPage type="privacy" language={language} />;
      case 'terms':
        return <LegalPage type="terms" language={language} />;
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
    >
      {!hasAcceptedTerms && (
        <AgreementModal language={language} onAccept={handleAcceptTerms} />
      )}
      {renderPage()}
      <ToastContainer toasts={toasts} />
    </Layout>
  );
};

export default App;
