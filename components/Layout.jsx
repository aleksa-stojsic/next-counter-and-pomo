import styles from '../styles/Layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      {children}
      <footer>
        <p>
          &copy; {new Date().getFullYear()} • Made with
          <span role='img' aria-label='computer-coffee'>
            💻 & ☕
          </span>
          by
          <a
            href='https://github.com/aleksa-stojsic'
            target='_blank'
            rel='noreferrer'
          >
            {' '}
            Aleksa Stojsic
          </a>
        </p>
      </footer>
    </div>
  );
}
