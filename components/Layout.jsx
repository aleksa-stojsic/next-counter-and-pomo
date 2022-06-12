export default function Layout({ children }) {
  return (
    // layout div with tailwind css 100 vh height centered
    <div className='flex flex-col items-center justify-center min-h-screen'>
      {children}
      <footer className='footer footer-center p-4 bg-base-300'>
        <div>
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
        </div>
      </footer>
    </div>
  );
}
