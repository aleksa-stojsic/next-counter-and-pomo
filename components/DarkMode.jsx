import styles from '../styles/DarkMode.module.css';

const ISSERVER = typeof window === 'undefined';

const setDark = () => {
  localStorage.setItem('theme', 'dark');
  document.documentElement.setAttribute('data-theme', 'dark');
};

const setLight = () => {
  localStorage.setItem('theme', 'light');
  document.documentElement.setAttribute('data-theme', 'light');
};

const storedTheme = !ISSERVER ? localStorage.getItem('theme') : null;

const prefersDark =
  !ISSERVER &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const defaultDark =
  storedTheme === 'dark' || (storedTheme === null && prefersDark);

let checkBox = !ISSERVER ? document.getElementById('checkbox') : null;

if (defaultDark) {
  setDark();
  checkBox.checked = true;
}

const toggleTheme = (e) => {
  if (e.target.checked) {
    setDark();
  } else {
    setLight();
  }
};

export default function DarkMode() {
  return (
    <div className={styles.toggleThemeWrapper}>
      <span>☀️</span>
      <label className={styles.toggleTheme} htmlFor='checkbox'>
        <input type='checkbox' id='checkbox' onChange={toggleTheme} />
        <div className={`${styles.slider} ${styles.round}`}></div>
      </label>
      <span>🌒</span>
    </div>
  );
}
