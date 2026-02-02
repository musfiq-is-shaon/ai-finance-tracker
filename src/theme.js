 odern // Global theme management
window.themeToggle = function() {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark');
  
  if (isDark) {
    html.classList.remove('dark');
    localStorage.setItem('finance-tracker-theme', 'light');
  } else {
    html.classList.add('dark');
    localStorage.setItem('finance-tracker-theme', 'dark');
  }
  
  // Dispatch event for components to update
  window.dispatchEvent(new CustomEvent('themeChanged', { detail: { isDark: !isDark } }));
};

// Initialize theme on load
window.initTheme = function() {
  const saved = localStorage.getItem('finance-tracker-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// Run initialization
window.initTheme();

