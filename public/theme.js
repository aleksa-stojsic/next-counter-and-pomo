(function initTheme() {
  var theme = localStorage.getItem('theme') || 'light';
  if (theme === 'dark') {
    document.querySelector('html').setAttribute('data-theme', 'dark');
  }
})();
