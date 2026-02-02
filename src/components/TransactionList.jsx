import React, { useState } from 'react';
import { Trash2, Search, Filter, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/helpers';

const TransactionList = ({ transactions, categories, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Filter and sort transactions
  const filteredTransactions = transactions
    .filter((t) => {
      const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           t.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || t.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'amount') return b.amount - a.amount;
      return 0;
    });

  return (
    <div className="space-y-6 relative">
      {/* Background decorations */}
      <div className="fixed top-40 right-20 w-72 h-72 bg-gradient-to-br from-primary-500/10 to-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      {/* Page Header */}
      <div className="card p-6 hover-lift">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
              <Filter className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Transactions</h1>
              <p className="text-slate-500 dark:text-slate-400">{transactions.length} total transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4 hover-lift">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-500" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-12"
            />
          </div>
          
          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="input w-full md:w-40"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expenses</option>
          </select>
          
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input w-full md:w-40"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>
        </div>
      </div>

      {/* Transactions List */}
      {filteredTransactions.length > 0 ? (
        <div className="card overflow-hidden hover-lift">
          <div className="overflow-x-auto">
            <table className="modern-table">
              <thead>
                <tr>
                  <th className="pl-6">Description</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th className="text-right pr-6">Amount</th>
                  <th className="text-right pr-6">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr 
                    key={transaction.id}
                    className="transition-all duration-300"
                  >
                    <td className="pl-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-transform duration-300 ${
                          transaction.type === 'income' 
                            ? 'bg-primary-100 dark:bg-primary-900/30' 
                            : 'bg-red-100 dark:bg-red-900/30'
                        }`}>
                          {transaction.type === 'income' ? <TrendingUp className="w-5 h-5 text-primary-600 dark:text-primary-400" /> : <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{transaction.description}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{transaction.categoryName}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{transaction.categoryIcon || '📦'}</span>
                        <span className="text-sm text-slate-600 dark:text-slate-400">{transaction.categoryName}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{formatDate(transaction.date)}</span>
                      </div>
                    </td>
                    <td className="text-right pr-6">
                      <span className={`font-bold transition-all duration-300 ${
                        transaction.type === 'income' 
                          ? 'text-primary-600 dark:text-primary-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className="text-right pr-6">
                      <button
                        onClick={() => onDelete(transaction.id)}
                        className="icon-btn text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        title="Delete transaction"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card p-12 text-center hover-lift">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary-100 dark:bg-slate-700 flex items-center justify-center">
            <Filter className="w-10 h-10 text-primary-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No transactions found</h3>
          <p className="text-slate-500 dark:text-slate-400">
            {searchTerm || filterType !== 'all' 
              ? 'Try adjusting your filters' 
              : 'Start by adding your first transaction'}
          </p>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
