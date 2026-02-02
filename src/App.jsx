import React, { useState, useEffect, useCallback } from 'react';
import {
  getTransactions,
  saveTransactions,
  getCategories,
  getBudget,
  calculateSummary,
  getExpensesByCategory,
  getMonthlyData,
  generateFinancialAdvice,
  DEFAULT_CATEGORIES,
} from './utils/helpers';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Charts from './components/Charts';
import AIAdvice from './components/AIAdvice';
import BudgetSettings from './components/BudgetSettings';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [budget, setBudget] = useState({ monthlyLimit: 5000, alertThreshold: 80 });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  
  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('finance-tracker-theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Theme toggle function exposed globally
  useEffect(() => {
    window.themeToggle = () => {
      setIsDarkMode(prev => !prev);
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('finance-tracker-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const loadData = () => {
      const savedTransactions = getTransactions();
      const savedCategories = getCategories();
      const savedBudget = getBudget();
      
      setTransactions(savedTransactions);
      setCategories(savedCategories);
      setBudget(savedBudget);
      setIsLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveTransactions(transactions);
    }
  }, [transactions, isLoading]);

  const addTransaction = useCallback((transaction) => {
    setTransactions((prev) => [
      {
        ...transaction,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateBudget = useCallback((newBudget) => {
    setBudget(newBudget);
    localStorage.setItem('finance_tracker_budget', JSON.stringify(newBudget));
  }, []);

  const summary = calculateSummary(transactions);
  const expensesByCategory = getExpensesByCategory(transactions);
  const monthlyData = getMonthlyData(transactions);
  const financialAdvice = generateFinancialAdvice(transactions, budget);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            summary={summary}
            budget={budget}
            expensesByCategory={expensesByCategory}
          />
        );
      case 'add':
        return <TransactionForm categories={categories} onAdd={addTransaction} />;
      case 'transactions':
        return (
          <TransactionList 
            transactions={transactions}
            categories={categories}
            onDelete={deleteTransaction}
          />
        );
      case 'charts':
        return (
          <Charts 
            monthlyData={monthlyData}
            expensesByCategory={expensesByCategory}
            transactions={transactions}
          />
        );
      case 'advice':
        return <AIAdvice advice={financialAdvice} />;
      case 'settings':
        return (
          <BudgetSettings 
            budget={budget}
            onSave={updateBudget}
            categories={categories}
          />
        );
      default:
        return (
          <Dashboard 
            summary={summary}
            budget={budget}
            expensesByCategory={expensesByCategory}
          />
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50 dark:bg-slate-800">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Loading your finance tracker...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-slate-800">
      <Header 
        onMenuClick={() => setIsMobileMenuOpen(true)}
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setIsMobileMenuOpen(false);
        }}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <main className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
