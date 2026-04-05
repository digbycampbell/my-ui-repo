import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/ui/Header';
import { WebsiteMockup } from './pages/WebsiteMockup';
import { ToolsDashboard } from './pages/ToolsDashboard';
import { StyleGuide } from './pages/StyleGuide';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Router>
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'dark bg-slate-950' : 'bg-white'}`}>
        <Header 
          isLoggedIn={isLoggedIn} 
          onLoginToggle={handleLoginToggle} 
          isDark={isDark}
          onThemeToggle={toggleTheme}
        />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<WebsiteMockup />} />
            <Route path="/dashboard" element={<ToolsDashboard />} />
            <Route path="/styleguide" element={<StyleGuide />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
