import React, { useState } from 'react';
import { Settings, Save, DollarSign, Bell, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

const BudgetSettings = ({ budget, onSave, categories }) => {
  const [monthlyLimit, setMonthlyLimit] = useState(budget.monthlyLimit);
  const [alertThreshold, setAlertThreshold] = useState(budget.alertThreshold);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    onSave({
      monthlyLimit: parseFloat(monthlyLimit),
      alertThreshold: parseInt(alertThreshold),
    });
    
    setIsSaving(false);
    setSaved(true);
    
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 relative">
      {/* Background decorations */}
      <div className="fixed top-40 left-20 w-72 h-72 bg-gradient-to-br from-primary-500/10 to-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="fixed bottom-40 right-20 w-96 h-96 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      {/* Page Header */}
      <div className="card p-6 hover-lift">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
            <Settings className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Budget Settings</h1>
            <p className="text-slate-500 dark:text-slate-400">Manage your financial goals and preferences</p>
          </div>
        </div>
      </div>

      {/* Budget Settings */}
      <div className="card p-6 lg:p-8 space-y-8 hover-lift">
        {/* Monthly Budget */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-emerald-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Monthly Budget</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Set your monthly spending limit</p>
            </div>
          </div>
          
          <div className="pl-14">
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-primary-500">$</span>
              <input
                type="number"
                value={monthlyLimit}
                onChange={(e) => setMonthlyLimit(e.target.value)}
                min="0"
                step="100"
                className="input pl-10 text-3xl font-bold"
                placeholder="5000"
              />
            </div>
            
            {/* Budget visualization */}
            <div className="mt-4 settings-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">Budget Range</span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  ${monthlyLimit >= 0 ? monthlyLimit : '0'} / month
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary-500 to-emerald-600 rounded-full transition-all duration-500"
                  style={{ width: '100%' }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Set a realistic budget based on your income and expenses
              </p>
            </div>
          </div>
        </div>

        {/* Alert Threshold */}
        <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Alert Threshold</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Get notified when you reach this percentage of your budget</p>
            </div>
          </div>
          
          <div className="pl-14">
            <div className="flex items-center gap-4">
              <input
                type="range"
                value={alertThreshold}
                onChange={(e) => setAlertThreshold(e.target.value)}
                min="50"
                max="100"
                step="5"
                className="flex-1 h-3 bg-slate-200 dark:bg-slate-600 rounded-full appearance-none cursor-pointer accent-primary-500"
              />
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">{alertThreshold}%</span>
              </div>
            </div>
            
            {/* Alert visualization */}
            <div className="mt-4 settings-card">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  Alert will trigger at {formatCurrency(monthlyLimit * (alertThreshold / 100))}
                </span>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 h-2 bg-amber-200 dark:bg-slate-600 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${alertThreshold}%` }}
                  ></div>
                </div>
                <div className="flex-1 h-2 bg-primary-200 dark:bg-slate-600 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-500 rounded-full transition-all duration-500"
                    style={{ width: `${100 - alertThreshold}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
                <span>Warning Zone</span>
                <span>Safe Zone</span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary-500 to-emerald-600 text-white hover-lift cursor-pointer">
              <p className="text-sm text-primary-100 mb-1">Monthly Budget</p>
              <p className="text-2xl font-bold">${monthlyLimit >= 0 ? monthlyLimit : '0'}</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white hover-lift cursor-pointer">
              <p className="text-sm text-amber-100 mb-1">Alert at</p>
              <p className="text-2xl font-bold">{alertThreshold}%</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white hover-lift cursor-pointer">
              <p className="text-sm text-teal-100 mb-1">Safe Spending</p>
              <p className="text-2xl font-bold">${formatCurrency(monthlyLimit * ((100 - alertThreshold) / 100))}</p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            {saved ? (
              <>
                <CheckCircle className="w-5 h-5 text-primary-500" />
                <span className="text-primary-600 dark:text-primary-400 font-medium">Settings saved successfully!</span>
              </>
            ) : (
              <>
                <TrendingUp className="w-5 h-5" />
                <span>Changes are saved automatically</span>
              </>
            )}
          </div>
          
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`btn btn-primary flex items-center gap-2 hover-lift ${
              isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSaving ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetSettings;

// Helper function for formatting currency
function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
