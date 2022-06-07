(function initTheme() {
  var theme = localStorage.getItem('theme') || 'light';
  if (theme === 'dark') {
    localStorage.setItem('theme', 'dark');
    document.querySelector('html').setAttribute('data-theme', 'dark');
  }
})();
