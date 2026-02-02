import React, { useState } from 'react';
import { Sparkles, Lightbulb, AlertTriangle, CheckCircle, ArrowRight, RefreshCw, Heart } from 'lucide-react';

const AIAdvice = ({ advice }) => {
  const [activeCard, setActiveCard] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getAdviceIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-primary-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'danger':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'info':
        return <Lightbulb className="w-5 h-5 text-blue-500" />;
      case 'health-score':
        return <Sparkles className="w-5 h-5 text-primary-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-primary-500" />;
    }
  };

  const getAdviceGradient = (type) => {
    switch (type) {
      case 'success':
        return 'from-primary-500 to-emerald-600';
      case 'warning':
        return 'from-amber-500 to-orange-600';
      case 'danger':
        return 'from-red-500 to-rose-600';
      case 'info':
        return 'from-blue-500 to-indigo-600';
      case 'health-score':
        return 'from-primary-500 to-emerald-600';
      default:
        return 'from-primary-500 to-emerald-600';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-primary-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="w-4 h-4 text-primary-500" />;
      case 'good':
        return <CheckCircle className="w-4 h-4 text-amber-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      window.location.reload();
    }, 1000);
  };

  const healthScoreCard = advice.find(a => a.type === 'health-score');
  const otherAdvice = advice.filter(a => a.type !== 'health-score');

  return (
    <div className="space-y-6 relative">
      {/* Background decorations */}
      <div className="fixed top-40 right-20 w-72 h-72 bg-gradient-to-br from-primary-500/10 to-emerald-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="fixed bottom-40 left-20 w-96 h-96 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      {/* Page Header */}
      <div className="card p-6 hover-lift">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 via-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30 animate-pulse-slow">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI Financial Advice</h1>
              <p className="text-slate-500 dark:text-slate-400">Personalized insights based on your spending patterns</p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            className="icon-btn bg-primary-100 dark:bg-slate-700 text-primary-600 dark:text-primary-400"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Health Score Card */}
      {healthScoreCard && (
        <div className="card p-6 group hover-lift overflow-hidden relative">
          {/* Gradient accent */}
          <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${getAdviceGradient(healthScoreCard.type)}`}></div>
          
          <div className="pl-6">
            <div className="flex items-start gap-6">
              {/* Score Circle */}
              <div className="relative">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    className="text-slate-100 dark:text-slate-700"
                  />
                  {/* Score circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#healthGradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${healthScoreCard.score * 2.83} 283`}
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#16a34a" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-4xl font-bold ${getScoreColor(healthScoreCard.score)}`}>
                    {healthScoreCard.score}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">OUT OF 100</span>
                </div>
              </div>
              
              {/* Score Details */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="badge badge-primary">Financial Health Score</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  {healthScoreCard.message}
                </h3>
                
                {/* Factors */}
                <div className="space-y-3">
                  {healthScoreCard.factors && healthScoreCard.factors.map((factor, idx) => (
                    <div key={idx} className="settings-card flex items-center gap-3">
                      {getStatusIcon(factor.status)}
                      <span className="text-sm text-slate-600 dark:text-slate-400 flex-1">{factor.label}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              factor.status === 'excellent' ? 'bg-primary-500' :
                              factor.status === 'good' ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${(factor.score / (factor.status === 'excellent' ? 40 : factor.status === 'good' ? 30 : 10)) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400 w-8">{factor.score}pts</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Advice Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {otherAdvice.map((item, index) => (
          <div 
            key={index}
            className="advice-card"
            onMouseEnter={() => setActiveCard(index)}
            onMouseLeave={() => setActiveCard(null)}
          >
            {/* Gradient accent */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${getAdviceGradient(item.type)}`}></div>
            
            <div className="flex items-start gap-4 pl-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getAdviceGradient(item.type)} flex items-center justify-center shadow-lg flex-shrink-0 transition-transform duration-300 ${activeCard === index ? 'scale-110' : ''}`}>
                {item.icon ? (
                  <span className="text-2xl">{item.icon}</span>
                ) : (
                  getAdviceIcon(item.type)
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`badge ${
                    item.type === 'success' ? 'badge-success' :
                    item.type === 'warning' ? 'badge-warning' :
                    item.type === 'danger' ? 'badge-danger' :
                    'badge-info'
                  }`}>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  {item.message}
                </p>
                {item.action && (
                  <div className="mt-4 flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium text-sm transition-all duration-300">
                    <span>{item.action}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>

            {/* Hover glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${getAdviceGradient(item.type)} opacity-0 transition-opacity duration-300 pointer-events-none`}></div>
          </div>
        ))}
      </div>

      {/* Tips Section */}
      <div className="card p-6 group hover-lift">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          Quick Tips for Better Finances
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: '📝', title: 'Track Daily', desc: 'Log expenses daily for accuracy' },
            { icon: '📅', title: 'Review Weekly', desc: 'Check your spending every week' },
            { icon: '🎯', title: 'Set Goals', desc: 'Define clear savings targets' },
            { icon: '🔄', title: 'Stay Consistent', desc: 'Build a habit of tracking' },
            { icon: '💳', title: 'Pay Cards Early', desc: 'Avoid interest charges' },
            { icon: '🏦', title: 'Emergency Fund', desc: 'Save 3-6 months expenses' },
            { icon: '📊', title: 'Analyze Trends', desc: 'Understand your spending' },
            { icon: '🚀', title: 'Automate', desc: 'Set up automatic transfers' },
          ].map((tip, index) => (
            <div 
              key={index}
              className="settings-card"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{tip.icon}</span>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white text-sm">{tip.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{tip.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational Section */}
      <div className="card p-6 bg-gradient-to-br from-primary-500 via-emerald-500 to-teal-500 text-white hover-lift">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
            <Heart className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1">Remember: Small Steps Lead to Big Changes!</h3>
            <p className="text-primary-100 text-sm">
              Financial wellness is a journey, not a destination. Every positive choice you make brings you closer to your goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAdvice;
