import React, { useState } from 'react';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Questionnaire from './pages/Questionnaire';
import Dashboard from './pages/Dashboard';

type Page = 'landing' | 'login' | 'register' | 'questionnaire' | 'dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing onNavigate={handleNavigate} />;
      case 'login':
        return <Auth mode="login" onNavigate={handleNavigate} />;
      case 'register':
        return <Auth mode="register" onNavigate={handleNavigate} />;
      case 'questionnaire':
        return <Questionnaire onNavigate={handleNavigate} />;
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      default:
        return <Landing onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="font-sans">
      {renderPage()}
    </div>
  );
}

export default App;