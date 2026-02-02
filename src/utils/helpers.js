// LocalStorage utilities
const STORAGE_KEYS = {
  TRANSACTIONS: 'finance_tracker_transactions',
  CATEGORIES: 'finance_tracker_categories',
  BUDGET: 'finance_tracker_budget',
};

// Default categories
const DEFAULT_CATEGORIES = {
  income: [
    { id: 'salary', name: 'Salary', icon: '💼', color: '#10b981' },
    { id: 'freelance', name: 'Freelance', icon: '💻', color: '#0ea5e9' },
    { id: 'investments', name: 'Investments', icon: '📈', color: '#8b5cf6' },
    { id: 'business', name: 'Business', icon: '🏢', color: '#f59e0b' },
    { id: 'other-income', name: 'Other', icon: '💰', color: '#6b7280' },
  ],
  expense: [
    { id: 'housing', name: 'Housing', icon: '🏠', color: '#ef4444' },
    { id: 'transportation', name: 'Transportation', icon: '🚗', color: '#f59e0b' },
    { id: 'food', name: 'Food & Dining', icon: '🍔', color: '#10b981' },
    { id: 'utilities', name: 'Utilities', icon: '💡', color: '#0ea5e9' },
    { id: 'healthcare', name: 'Healthcare', icon: '🏥', color: '#ec4899' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: '#8b5cf6' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#f97316' },
    { id: 'education', name: 'Education', icon: '📚', color: '#06b6d4' },
    { id: 'savings', name: 'Savings', icon: '🏦', color: '#14b8a6' },
    { id: 'other-expense', name: 'Other', icon: '📦', color: '#6b7280' },
  ],
};

// Get transactions from localStorage
export const getTransactions = () => {
  try {
    const transactions = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return transactions ? JSON.parse(transactions) : [];
  } catch (error) {
    console.error('Error reading transactions:', error);
    return [];
  }
};

// Save transactions to localStorage
export const saveTransactions = (transactions) => {
  try {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  } catch (error) {
    console.error('Error saving transactions:', error);
  }
};

// Get categories from localStorage or use defaults
export const getCategories = () => {
  try {
    const categories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return categories ? JSON.parse(categories) : DEFAULT_CATEGORIES;
  } catch (error) {
    console.error('Error reading categories:', error);
    return DEFAULT_CATEGORIES;
  }
};

// Save categories to localStorage
export const saveCategories = (categories) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  } catch (error) {
    console.error('Error saving categories:', error);
  }
};

// Get budget from localStorage
export const getBudget = () => {
  try {
    const budget = localStorage.getItem(STORAGE_KEYS.BUDGET);
    return budget ? JSON.parse(budget) : { monthlyLimit: 5000, alertThreshold: 80 };
  } catch (error) {
    console.error('Error reading budget:', error);
    return { monthlyLimit: 5000, alertThreshold: 80 };
  }
};

// Save budget to localStorage
export const saveBudget = (budget) => {
  try {
    localStorage.setItem(STORAGE_KEYS.BUDGET, JSON.stringify(budget));
  } catch (error) {
    console.error('Error saving budget:', error);
  }
};

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Format date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Get current month transactions
export const getCurrentMonthTransactions = (transactions) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  return transactions.filter((t) => {
    const tDate = new Date(t.date);
    return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
  });
};

// Calculate summary
export const calculateSummary = (transactions) => {
  const currentMonthTxns = getCurrentMonthTransactions(transactions);
  
  const income = currentMonthTxns
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expenses = currentMonthTxns
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  return {
    income,
    expenses,
    balance: income - expenses,
    transactionCount: currentMonthTxns.length,
  };
};

// Get expenses by category
export const getExpensesByCategory = (transactions) => {
  const currentMonthTxns = getCurrentMonthTransactions(transactions);
  const expenses = currentMonthTxns.filter((t) => t.type === 'expense');
  
  const categoryTotals = expenses.reduce((acc, t) => {
    const existing = acc.find((c) => c.category === t.category);
    if (existing) {
      existing.value += t.amount;
    } else {
      acc.push({ category: t.category, value: t.amount, name: t.categoryName });
    }
    return acc;
  }, []);
  
  return categoryTotals.sort((a, b) => b.value - a.value);
};

// Get monthly data for chart
export const getMonthlyData = (transactions, months = 6) => {
  const now = new Date();
  const data = [];
  
  for (let i = months - 1; i >= 0; i--) {
    const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = targetDate.toLocaleDateString('en-US', { month: 'short' });
    const monthTransactions = transactions.filter((t) => {
      const tDate = new Date(t.date);
      return tDate.getMonth() === targetDate.getMonth() && 
             tDate.getFullYear() === targetDate.getFullYear();
    });
    
    const income = monthTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = monthTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    data.push({
      month: monthName,
      income,
      expenses,
      savings: income - expenses,
    });
  }
  
  return data;
};

// Calculate trend data
export const calculateTrends = (transactions) => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  
  const currentMonthTxns = transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });
  
  const lastMonthTxns = transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear;
  });
  
  const currentIncome = currentMonthTxns.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const currentExpenses = currentMonthTxns.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const lastIncome = lastMonthTxns.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const lastExpenses = lastMonthTxns.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  
  return {
    incomeChange: lastIncome > 0 ? ((currentIncome - lastIncome) / lastIncome * 100).toFixed(1) : 0,
    expenseChange: lastExpenses > 0 ? ((currentExpenses - lastExpenses) / lastExpenses * 100).toFixed(1) : 0,
    currentIncome,
    currentExpenses,
    lastIncome,
    lastExpenses,
  };
};

// Enhanced AI Financial Advice Generator
export const generateFinancialAdvice = (transactions, budget) => {
  const summary = calculateSummary(transactions);
  const categoryExpenses = getExpensesByCategory(transactions);
  const trends = calculateTrends(transactions);
  const advice = [];
  
  // 1. Overall Financial Health Score (0-100)
  let healthScore = 0;
  const healthFactors = [];
  
  // Savings rate (40 points max)
  const savingsRate = summary.income > 0 ? (summary.balance / summary.income) * 100 : 0;
  if (savingsRate >= 20) {
    healthScore += 40;
    healthFactors.push({ score: 40, label: 'Savings Rate', status: 'excellent' });
  } else if (savingsRate >= 10) {
    healthScore += 25;
    healthFactors.push({ score: 25, label: 'Savings Rate', status: 'good' });
  } else {
    healthScore += 10;
    healthFactors.push({ score: 10, label: 'Savings Rate', status: 'needs-improvement' });
  }
  
  // Budget adherence (30 points max)
  if (budget && summary.expenses <= budget.monthlyLimit * 0.8) {
    healthScore += 30;
    healthFactors.push({ score: 30, label: 'Budget Adherence', status: 'excellent' });
  } else if (budget && summary.expenses <= budget.monthlyLimit) {
    healthScore += 20;
    healthFactors.push({ score: 20, label: 'Budget Adherence', status: 'good' });
  } else {
    healthScore += 5;
    healthFactors.push({ score: 5, label: 'Budget Adherence', status: 'needs-improvement' });
  }
  
  // Expense diversity (20 points max)
  if (categoryExpenses.length >= 5) {
    healthScore += 20;
    healthFactors.push({ score: 20, label: 'Expense Diversity', status: 'excellent' });
  } else if (categoryExpenses.length >= 3) {
    healthScore += 12;
    healthFactors.push({ score: 12, label: 'Expense Diversity', status: 'good' });
  } else {
    healthScore += 5;
    healthFactors.push({ score: 5, label: 'Expense Diversity', status: 'needs-improvement' });
  }
  
  // Transaction frequency (10 points max)
  if (summary.transactionCount >= 10) {
    healthScore += 10;
    healthFactors.push({ score: 10, label: 'Tracking Consistency', status: 'excellent' });
  } else if (summary.transactionCount >= 5) {
    healthScore += 6;
    healthFactors.push({ score: 6, label: 'Tracking Consistency', status: 'good' });
  } else {
    healthScore += 2;
    healthFactors.push({ score: 2, label: 'Tracking Consistency', status: 'needs-improvement' });
  }
  
  // Financial Health Score Card
  advice.push({
    type: 'health-score',
    title: 'Financial Health Score',
    message: `Your current financial health score is ${healthScore}/100`,
    score: healthScore,
    factors: healthFactors,
    icon: '📊',
  });
  
  // 2. Savings Advice
  if (savingsRate >= 20) {
    advice.push({
      type: 'success',
      title: '🎯 Excellent Savings Rate!',
      message: `You're saving ${savingsRate.toFixed(1)}% of your income (${formatCurrency(summary.balance)}). This is above the recommended 20% threshold. Consider investing your savings for long-term growth through diversified index funds or retirement accounts.`,
      action: 'View Investment Options',
      actionLink: 'investments',
    });
  } else if (savingsRate >= 10) {
    advice.push({
      type: 'warning',
      title: '💡 Good Start on Savings',
      message: `You're saving ${savingsRate.toFixed(1)}% of your income. Try to increase this to 20% by reducing non-essential expenses like dining out and entertainment. Small adjustments can make a big difference!`,
      action: 'See Budget Tips',
      actionLink: 'settings',
    });
  } else {
    advice.push({
      type: 'danger',
      title: '⚠️ Low Savings Alert',
      message: `You're only saving ${savingsRate.toFixed(1)}% of your income. This is below the recommended 20%. Review your top expense categories and identify areas to cut back. Start with tracking every purchase for a week.`,
      action: 'Review Expenses',
      actionLink: 'transactions',
    });
  }
  
  // 3. Category-specific insights
  if (categoryExpenses.length > 0) {
    const topCategory = categoryExpenses[0];
    const topCategoryPercentage = ((topCategory.value / summary.expenses) * 100).toFixed(1);
    
    if (parseFloat(topCategoryPercentage) > 40) {
      advice.push({
        type: 'info',
        title: `📊 High ${topCategory.name} Spending`,
        message: `${topCategoryPercentage}% of your expenses (${formatCurrency(topCategory.value)}) went to ${topCategory.name}. This is above the recommended 30% for any single category. Consider setting a specific budget for this category.`,
        action: `Set ${topCategory.name} Budget`,
        actionLink: 'settings',
      });
    }
    
    // Find spending patterns
    const highCategories = categoryExpenses.filter(c => (c.value / summary.expenses) * 100 > 25);
    if (highCategories.length > 1) {
      advice.push({
        type: 'info',
        title: '🔍 Spending Patterns Detected',
        message: `Multiple categories are taking significant portions of your budget: ${highCategories.map(c => c.name).join(', ')}. Consider consolidating or reducing spending in these areas.`,
      });
    }
  }
  
  // 4. Budget advice
  if (budget && summary.expenses > budget.monthlyLimit) {
    const overAmount = summary.expenses - budget.monthlyLimit;
    advice.push({
      type: 'danger',
      title: '🚨 Budget Exceeded',
      message: `You've exceeded your monthly budget by ${formatCurrency(overAmount)}. This month, prioritize essential expenses and defer non-essential purchases to next month.`,
      action: 'Adjust Budget',
      actionLink: 'settings',
    });
  } else if (budget && summary.expenses > budget.monthlyLimit * (budget.alertThreshold / 100)) {
    const remaining = budget.monthlyLimit - summary.expenses;
    advice.push({
      type: 'warning',
      title: '⚡ Budget Warning',
      message: `You've used ${((summary.expenses / budget.monthlyLimit) * 100).toFixed(0)}% of your budget. You have ${formatCurrency(remaining)} remaining for the rest of the month.`,
      action: 'View Remaining Budget',
      actionLink: 'dashboard',
    });
  } else if (budget && summary.expenses < budget.monthlyLimit * 0.5) {
    advice.push({
      type: 'success',
      title: '✅ Under Budget!',
      message: `Great job! You've only used ${((summary.expenses / budget.monthlyLimit) * 100).toFixed(0)}% of your budget. Consider saving the remaining ${formatCurrency(budget.monthlyLimit - summary.expenses)} or treating yourself to something you've been wanting.`,
    });
  }
  
  // 5. Trend insights
  if (parseFloat(trends.expenseChange) > 20) {
    advice.push({
      type: 'warning',
      title: '📈 Spending Increasing',
      message: `Your expenses increased by ${trends.expenseChange}% compared to last month. Review your recent transactions to identify unexpected or unnecessary spending.`,
      action: 'Compare Months',
      actionLink: 'charts',
    });
  } else if (parseFloat(trends.expenseChange) < -10) {
    advice.push({
      type: 'success',
      title: '📉 Spending Decreased',
      message: `Great news! Your expenses decreased by ${Math.abs(trends.expenseChange)}% compared to last month. Keep up the good work and consider setting new savings goals.`,
    });
  }
  
  // 6. Income vs Expenses ratio
  if (summary.income > 0 && summary.expenses > summary.income) {
    advice.push({
      type: 'danger',
      title: '⚠️ Spending Exceeds Income',
      message: `You're spending more than you're earning. This is not sustainable long-term. Consider increasing income through side gigs or reducing expenses immediately.`,
      action: 'Create Action Plan',
      actionLink: 'advice',
    });
  } else if (summary.income > 0 && summary.balance > 0) {
    const monthlySurplus = summary.balance;
    const projectedAnnualSavings = monthlySurplus * 12;
    
    advice.push({
      type: 'success',
      title: '💰 Positive Cash Flow',
      message: `You have a monthly surplus of ${formatCurrency(monthlySurplus)}. At this rate, you'll save approximately ${formatCurrency(projectedAnnualSavings)} this year! Consider automating your savings.`,
      action: 'Set Savings Goal',
      actionLink: 'settings',
    });
  }
  
  // 7. Personalized recommendations based on spending habits
  const shoppingExpenses = categoryExpenses.find(c => c.name.toLowerCase().includes('shopping') || c.name.toLowerCase().includes('other'));
  const entertainmentExpenses = categoryExpenses.find(c => c.name.toLowerCase().includes('entertainment'));
  const diningExpenses = categoryExpenses.find(c => c.name.toLowerCase().includes('food') || c.name.toLowerCase().includes('dining'));
  
  if (shoppingExpenses && (shoppingExpenses.value / summary.expenses) * 100 > 20) {
    advice.push({
      type: 'info',
      title: '🛍️ Shopping Habits',
      message: 'Consider implementing a 24-hour rule for non-essential purchases. Wait a day before buying to avoid impulse spending.',
    });
  }
  
  if (diningExpenses && (diningExpenses.value / summary.expenses) * 100 > 25) {
    advice.push({
      type: 'info',
      title: '🍔 Dining Out',
      message: 'Try meal prepping for work to reduce dining expenses. Even packing lunch twice a week can save you significant money.',
    });
  }
  
  if (entertainmentExpenses && (enttainmentExpenses.value / summary.expenses) * 100 > 15) {
    advice.push({
      type: 'info',
      title: '🎬 Entertainment Budget',
      message: 'Look for free or low-cost entertainment options in your area. Many communities offer free events, outdoor activities, and cultural experiences.',
    });
  }
  
  // 8. Long-term financial goals
  if (summary.balance > 0) {
    const monthsToEmergencyFund = Math.ceil(3000 / summary.balance); // $3000 emergency fund goal
    if (monthsToEmergencyFund <= 6) {
      advice.push({
        type: 'success',
        title: '🏆 Emergency Fund Goal',
        message: `At your current savings rate, you could build a $3,000 emergency fund in about ${monthsToEmergencyFund} months! Start by automating your savings each payday.`,
        action: 'Set Emergency Fund Goal',
        actionLink: 'settings',
      });
    }
  }
  
  return advice;
};

// Helper function to format currency
export const formatCurrencySimple = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export { DEFAULT_CATEGORIES };

