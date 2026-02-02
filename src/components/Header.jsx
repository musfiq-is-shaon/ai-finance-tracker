import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Sun, 
  Moon,
  Wallet,
  TrendingUp,
  BarChart3,
  Settings,
  Sparkles
} from 'lucide-react';

const Header = ({ 
  activeTab, 
  onTabChange,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Wallet },
    { id: 'add', label: 'Add Transaction', icon: TrendingUp },
    { id: 'transactions', label: 'Transactions', icon: BarChart3 },
    { id: 'advice', label: 'AI Advice', icon: Sparkles },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      const hasDark = document.documentElement.classList.contains('dark');
      setIsDark(hasDark);
    };
    
    updateTheme();
    
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);

  const handleThemeToggle = () => {
    window.themeToggle();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-700/90 backdrop-blur-xl border-b border-blue-200 dark:border-slate-600 transition-all duration-300">
      {/* Gradient accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
                <Wallet className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent transition-all duration-300">
                FinanceAI
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">{today}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`nav-link flex items-center gap-2 transition-all duration-300 ${
                    isActive ? 'nav-link-active' : ''
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              className="icon-btn bg-blue-100 dark:bg-slate-600 text-indigo-600 dark:text-indigo-400 hover:bg-blue-200 dark:hover:bg-slate-500"
              aria-label="Toggle theme"
              id="theme-toggle-btn"
            >
              <span style={{ display: isDark ? 'none' : 'block' }}>
                <Moon className="w-5 h-5" />
              </span>
              <span style={{ display: isDark ? 'block' : 'none' }}>
                <Sun className="w-5 h-5 text-amber-400" />
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="icon-btn md:hidden bg-blue-100 dark:bg-slate-600 text-indigo-600 dark:text-indigo-400"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-blue-200 dark:border-slate-600 bg-white/95 dark:bg-slate-700/95 backdrop-blur-xl transition-all duration-300">
          <nav className="px-4 py-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <span className="ml-auto">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
