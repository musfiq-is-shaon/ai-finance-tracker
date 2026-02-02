import React, { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const TransactionForm = ({ categories, onAdd }) => {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const currentCategories = categories[type] || [];

  const validateForm = () => {
    const newErrors = {};
    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!category) {
      newErrors.category = 'Please select a category';
    }
    if (!date) {
      newErrors.date = 'Please select a date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate network delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const selectedCategory = currentCategories.find((c) => c.id === category);
    
    onAdd({
      type,
      amount: parseFloat(amount),
      description: description.trim(),
      category: category,
      categoryName: selectedCategory?.name || category,
      categoryIcon: selectedCategory?.icon || '📦',
      categoryColor: selectedCategory?.color || '#6b7280',
      date,
    });
    
    // Reset form
    setAmount('');
    setDescription('');
    setCategory('');
    setDate(new Date().toISOString().split('T')[0]);
    setErrors({});
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 relative">
      {/* Background decorations */}
      <div className="fixed top-40 left-20 w-72 h-72 bg-gradient-to-br from-primary-500/10 to-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="fixed bottom-40 right-20 w-96 h-96 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      {/* Page Header */}
      <div className="card p-6 hover-lift">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
            <Plus className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Add Transaction</h1>
            <p className="text-slate-500 dark:text-slate-400">Record your income or expense</p>
          </div>
        </div>
      </div>

      {/* Type Toggle */}
      <div className="card p-2">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setType('expense');
              setCategory('');
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 rounded-xl font-medium transition-all duration-300 hover-lift-sm ${
              type === 'expense'
                ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/30'
                : 'bg-primary-100 dark:bg-slate-700 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-slate-600'
            }`}
          >
            <TrendingDown className="w-5 h-5" />
            Expense
          </button>
          <button
            type="button"
            onClick={() => {
              setType('income');
              setCategory('');
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 rounded-xl font-medium transition-all duration-300 hover-lift-sm ${
              type === 'income'
                ? 'bg-gradient-to-r from-primary-500 to-emerald-600 text-white shadow-lg shadow-primary-500/30'
                : 'bg-primary-100 dark:bg-slate-700 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-slate-600'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            Income
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="card p-6 lg:p-8 space-y-6">
        {/* Amount */}
        <div className="group">
          <label className="label">Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-primary-500">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              className={`input pl-8 text-2xl font-bold ${errors.amount ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
            />
          </div>
          {errors.amount && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.amount}</p>
          )}
        </div>

        {/* Description */}
        <div className="group">
          <label className="label">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What was this for?"
            className={`input ${errors.description ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.description}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="label">Category</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {currentCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`category-card ${category === cat.id ? 'category-card-active' : ''}`}
              >
                <span className="text-2xl block mb-2">{cat.icon}</span>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{cat.name}</p>
              </button>
            ))}
          </div>
          {errors.category && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.category}</p>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="label">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className={`input ${errors.date ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.date}</p>
          )}
        </div>

        {/* Preview */}
        {amount && description && category && (
          <div className="p-5 rounded-2xl bg-primary-50 dark:bg-slate-700/50 border border-primary-200 dark:border-slate-600 transition-all duration-300 hover-lift">
            <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-3">Preview</p>
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
                type === 'income' ? 'bg-primary-100 dark:bg-primary-900/30' : 'bg-red-100 dark:bg-red-900/30'
              }`}>
                {type === 'income' ? '💰' : '💸'}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 dark:text-white text-lg">{description}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {currentCategories.find((c) => c.id === category)?.name} • {new Date(date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-xl font-bold ${type === 'income' ? 'text-primary-600 dark:text-primary-400' : 'text-red-600 dark:text-red-400'}`}>
                  {type === 'income' ? '+' : '-'}{formatCurrency(parseFloat(amount) || 0)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full btn btn-primary py-4 text-lg font-semibold group hover-lift ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Adding...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" />
              Add {type === 'income' ? 'Income' : 'Expense'}
              <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
