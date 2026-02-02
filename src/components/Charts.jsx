import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

const Charts = ({ monthlyData, expensesByCategory, transactions }) => {
  // Calculate trends
  const currentMonth = new Date().getMonth();
  const lastMonthTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === (currentMonth - 1) % 12;
  });
  
  const currentMonthTransactions = transactions.filter(t => {
    const date = new Date(t.date);
    return date.getMonth() === currentMonth;
  });
  
  const lastMonthIncome = lastMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const currentMonthIncome = currentMonthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const lastMonthExpenses = lastMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const currentMonthExpenses = currentMonthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const incomeChange = lastMonthIncome > 0 ? ((currentMonthIncome - lastMonthIncome) / lastMonthIncome * 100).toFixed(1) : 0;
  const expenseChange = lastMonthExpenses > 0 ? ((currentMonthExpenses - lastMonthExpenses) / lastMonthExpenses * 100).toFixed(1) : 0;

  const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#0ea5e9', '#8b5cf6', '#ec4899', '#f97316', '#06b6d4', '#14b8a6', '#6b7280'];

  const TrendCard = ({ title, value, change, icon: Icon, isPositive }) => (
    <div className="stat-card group">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${
          isPositive ? 'bg-primary-100 dark:bg-primary-900/30' : 'bg-red-100 dark:bg-red-900/30'
        }`}>
          <Icon className={`w-6 h-6 ${isPositive ? 'text-primary-600 dark:text-primary-400' : 'text-red-600 dark:text-red-400'}`} />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-primary-600 dark:text-primary-400' : 'text-red-600 dark:text-red-400'}`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{title}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
    </div>
  );

  return (
    <div className="space-y-6 relative">
      {/* Background decorations */}
      <div className="fixed top-40 left-20 w-72 h-72 bg-gradient-to-br from-primary-500/10 to-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="fixed bottom-40 right-20 w-96 h-96 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      {/* Page Header */}
      <div className="card p-6 hover-lift">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
            <TrendingUp className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics</h1>
            <p className="text-slate-500 dark:text-slate-400">Detailed financial insights and trends</p>
          </div>
        </div>
      </div>

      {/* Trend Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <TrendCard 
          title="Total Income" 
          value={formatCurrency(currentMonthIncome)} 
          change={incomeChange}
          icon={DollarSign}
          isPositive={parseFloat(incomeChange) >= 0}
        />
        <TrendCard 
          title="Total Expenses" 
          value={formatCurrency(currentMonthExpenses)} 
          change={expenseChange}
          icon={TrendingDown}
          isPositive={parseFloat(expenseChange) <= 0}
        />
        <TrendCard 
          title="Net Savings" 
          value={formatCurrency(currentMonthIncome - currentMonthExpenses)} 
          change={currentMonthIncome > 0 ? ((currentMonthIncome - currentMonthExpenses) / currentMonthIncome * 100).toFixed(1) : 0}
          icon={TrendingUp}
          isPositive={(currentMonthIncome - currentMonthExpenses) >= 0}
        />
        <TrendCard 
          title="Transactions" 
          value={currentMonthTransactions.length} 
          change={lastMonthTransactions.length > 0 ? ((currentMonthTransactions.length - lastMonthTransactions.length) / lastMonthTransactions.length * 100).toFixed(1) : 0}
          icon={Calendar}
          isPositive={currentMonthTransactions.length >= lastMonthTransactions.length}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="card p-6 group hover-lift">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Monthly Trends</h2>
          {monthlyData.length > 0 ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#94a3b8" 
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={12}
                    tickLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '12px', 
                      border: 'none',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                      backgroundColor: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
                    }}
                    formatter={(value) => formatCurrency(value)}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="income" 
                    stroke="#22c55e" 
                    strokeWidth={3}
                    fill="url(#incomeGradient)"
                    name="Income"
                    className="transition-all duration-300"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="expenses" 
                    stroke="#ef4444" 
                    strokeWidth={3}
                    fill="url(#expenseGradient)"
                    name="Expenses"
                    className="transition-all duration-300"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-72 flex flex-col items-center justify-center text-slate-400">
              <TrendingUp className="w-12 h-12 mb-4 opacity-50" />
              <p className="font-medium">No data available</p>
              <p className="text-sm mt-1">Add more transactions to see your trends</p>
            </div>
          )}
        </div>

        {/* Expenses by Category */}
        <div className="card p-6 group hover-lift">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Expenses Distribution</h2>
          {expensesByCategory.length > 0 ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expensesByCategory} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:opacity-20" />
                  <XAxis 
                    type="number"
                    stroke="#94a3b8" 
                    fontSize={12}
                    tickLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <YAxis 
                    dataKey="name"
                    type="category"
                    stroke="#94a3b8" 
                    fontSize={12}
                    tickLine={false}
                    width={100}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '12px', 
                      border: 'none',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                      backgroundColor: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
                    }}
                    formatter={(value) => formatCurrency(value)}
                  />
                  <Bar 
                    dataKey="value" 
                    radius={[0, 8, 8, 0]}
                    className="transition-all duration-300 hover:opacity-80"
                  >
                    {expensesByCategory.map((entry, index) => (
                      <cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-72 flex flex-col items-center justify-center text-slate-400">
              <DollarSign className="w-12 h-12 mb-4 opacity-50" />
              <p className="font-medium">No expenses yet</p>
              <p className="text-sm mt-1">Add expense transactions to see your breakdown</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Charts;
