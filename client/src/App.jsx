import { useState, useEffect } from 'react';
import AuthModule from './components/AuthModule.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('login');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      if (hash === '#login') {
        setActiveTab('login');
        scrollToAuth();
      } else if (hash === '#register') {
        setActiveTab('register');
        scrollToAuth();
      }
    };
    const scrollToAuth = () => {
      const authElement = document.getElementById('auth-section')
      if (authElement) {
        authElement.scrollIntoView({ behavior: 'smooth' });
      }
    };
    handleHashChange(); // Call it initially to set the correct tab based on the current hash

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };

  }, []);
  return (
    <div style={{padding: '20px'}}>
      <AuthModule initialMode={activeTab} />
      </div>
  );
}
