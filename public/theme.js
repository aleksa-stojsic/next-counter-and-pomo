(function initTheme() {
  var theme = localStorage.getItem('theme') || 'light';
  if (theme === 'dark') {
    localStorage.setItem('theme', 'dark');
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
