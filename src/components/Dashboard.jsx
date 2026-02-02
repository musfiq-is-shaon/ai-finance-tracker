import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, AlertTriangle, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const Dashboard = ({ summary, budget, expensesByCategory }) => {
  const budgetUsage = budget.monthlyLimit > 0 
    ? Math.min((summary.expenses / budget.monthlyLimit) * 100, 100) 
    : 0;
  
  const isOverBudget = summary.expenses > budget.monthlyLimit;
  const savingsRate = summary.income > 0 
    ? ((summary.balance / summary.income) * 100).toFixed(1) 
    : 0;

  const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#0ea5e9', '#8b5cf6', '#ec4899', '#f97316', '#06b6d4', '#14b8a6', '#6b7280'];

  const StatCard = ({ title, value, icon: Icon, trend, trendValue, isPositive, colorClass }) => (
    <div className="stat-card group">
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{title}</p>
          <p className={`text-2xl lg:text-3xl font-bold mt-1 transition-all duration-300 ${colorClass}`}>
            {value}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${colorClass.replace('text-', 'bg-').replace('dark:', 'dark:bg-').replace('900', '100').replace('600', '100').replace('danger', 'red').replace('success', 'emerald')} bg-primary-100 dark:bg-slate-700`}>
          <Icon className={`w-6 h-6 ${colorClass}`} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className={`text-sm font-medium ${isPositive ? 'text-primary-600 dark:text-primary-400' : 'text-red-600 dark:text-red-400'}`}>
          {trendValue}
        </span>
        <span className="text-sm text-slate-500 dark:text-slate-400">{trend}</span>
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-500/5 to-emerald-500/5 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500"></div>
    </div>
  );

  return (
    <div className="space-y-6 relative">
      {/* Background gradient orbs */}
      <div className="fixed top-40 right-20 w-96 h-96 bg-gradient-to-br from-primary-500/10 to-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="fixed top-80 left-20 w-72 h-72 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Your financial overview at a glance</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-4 py-1.5 bg-gradient-to-r from-primary-500 to-emerald-600 text-white text-sm rounded-full font-medium shadow-lg shadow-primary-500/30">
            This Month
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard 
          title="Total Income" 
          value={formatCurrency(summary.income)} 
          icon={TrendingUp} 
          trend="vs last month" 
          trendValue="+12.5%" 
          isPositive={true}
          colorClass="text-primary-600 dark:text-primary-400"
        />
        <StatCard 
          title="Total Expenses" 
          value={formatCurrency(summary.expenses)} 
          icon={TrendingDown} 
          trend="vs last month" 
          trendValue="+8.2%" 
          isPositive={false}
          colorClass="text-red-600 dark:text-red-400"
        />
        <StatCard 
          title="Net Balance" 
          value={formatCurrency(summary.balance)} 
          icon={DollarSign} 
          trend="Savings Rate" 
          trendValue={`${savingsRate}%`} 
          isPositive={parseFloat(savingsRate) >= 20}
          colorClass={summary.balance >= 0 ? 'text-slate-900 dark:text-white' : 'text-red-600 dark:text-red-400'}
        />
        <StatCard 
          title="Budget Status" 
          value={`${budgetUsage.toFixed(0)}%`} 
          icon={CreditCard} 
          trend="of budget used" 
          trendValue={isOverBudget ? 'Over budget!' : 'On track'}
          isPositive={!isOverBudget}
          colorClass={isOverBudget ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expenses by Category */}
        <div className="card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Expenses by Category</h2>
          </div>
          {expensesByCategory.length > 0 ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expensesByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                    className="transition-all duration-300 hover:opacity-80"
                  >
                    {expensesByCategory.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        stroke="none"
                        className="transition-all duration-300 hover:opacity-100"
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ 
                      borderRadius: '16px', 
                      border: 'none',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                      backgroundColor: document.documentElement.classList.contains('dark') ? '#1e293b' : '#ffffff',
                      color: document.documentElement.classList.contains('dark') ? '#f1f5f9' : '#1e293b'
                    }}
                    labelStyle={{ color: document.documentElement.classList.contains('dark') ? '#f1f5f9' : '#1e293b' }}
                  />
                  <Legend 
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    formatter={(value) => <span className="text-sm text-slate-600 dark:text-slate-400">{value}</span>}
                    iconType="circle"
                    iconSize={10}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-72 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
              <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-slate-700 flex items-center justify-center mb-4">
                <DollarSign className="w-8 h-8" />
              </div>
              <p className="font-medium">No expense data this month</p>
              <p className="text-sm mt-1">Start adding transactions to see your breakdown</p>
            </div>
          )}
        </div>

        {/* Budget Progress */}
        <div className="card p-6 group hover-lift">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Budget Progress</h2>
            <span className={`badge ${isOverBudget ? 'badge-danger' : 'badge-success'}`}>
              {isOverBudget ? 'Over Budget' : 'On Track'}
            </span>
          </div>
          
          {/* Circular Progress */}
          <div className="flex justify-center mb-6">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-slate-100 dark:text-slate-700"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${budgetUsage * 2.83} 283`}
                  className="transition-all duration-1000 ease-out"
                  style={{
                    strokeDashoffset: 283 - (budgetUsage * 2.83)
                  }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#16a34a" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-3xl font-bold ${isOverBudget ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'}`}>
                  {budgetUsage.toFixed(0)}%
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Used</span>
              </div>
            </div>
          </div>

          {/* Budget Details */}
          <div className="space-y-3">
            <div className="settings-card">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">Spent</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(summary.expenses)}</span>
              </div>
            </div>
            <div className="settings-card">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">Budget</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(budget.monthlyLimit)}</span>
              </div>
            </div>
            <div className="settings-card">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">Remaining</span>
                <span className={`font-semibold ${summary.balance >= 0 ? 'text-primary-600 dark:text-primary-400' : 'text-red-600 dark:text-red-400'}`}>
                  {formatCurrency(budget.monthlyLimit - summary.expenses)}
                </span>
              </div>
            </div>
          </div>

          {isOverBudget && (
            <div className="mt-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-700 dark:text-red-300">
                You've exceeded your budget by {formatCurrency(summary.expenses - budget.monthlyLimit)}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-6 group hover-lift">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="action-btn bg-gradient-to-br from-primary-500 to-emerald-600 text-white shadow-lg shadow-primary-500/25">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="font-semibold">Add Income</p>
              <p className="text-sm text-primary-100">Record your earnings</p>
            </div>
          </button>
          
          <button className="action-btn bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/25">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="font-semibold">Add Expense</p>
              <p className="text-sm text-red-100">Track your spending</p>
            </div>
          </button>
          
          <button className="action-btn bg-white dark:bg-slate-700 border-2 border-primary-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 shadow-sm hover:shadow-lg">
            <div className="w-12 h-12 bg-primary-100 dark:bg-slate-600 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="font-semibold">View Reports</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">See detailed analytics</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
