export default function Layout({ children }) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      {children}
      <footer className='footer footer-center p-4 bg-base-200'>
        <div>
          <p>
            &copy; {new Date().getFullYear()} • Made with{' '}
            <span role='img' aria-label='computer-coffee'>
              💻 & ☕
            </span>{' '}
            by{' '}
            <a
              href='https://github.com/aleksa-codes/next-counter-and-pomo'
              className='link link-primary link-hover'
              target='_blank'
              rel='noreferrer'
            >
              aleksa.codes
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
