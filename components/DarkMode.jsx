const ISSERVER = typeof window === 'undefined';

const setDark = () => {
  localStorage.setItem('theme', 'dark');
  document.documentElement.setAttribute('data-theme', 'black');
};

const setLight = () => {
  localStorage.setItem('theme', 'light');
  document.documentElement.setAttribute('data-theme', 'garden');
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
    <div className='form-control flex flex-row justify-center items-center mt-auto'>
      <span className='label-text text-3xl mr-1'>☀️</span>
      <label className='label cursor-pointer' htmlFor='checkbox'>
        <input
          type='checkbox'
          className='toggle toggle-primary toggle-lg rounded-full'
          id='checkbox'
          onChange={toggleTheme}
        />
      </label>
      <span className='label-text text-3xl ml-1'>🌒</span>
    </div>
  );
}
