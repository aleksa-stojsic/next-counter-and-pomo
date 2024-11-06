# Next.js Pomodoro Timer

A modern, customizable Pomodoro Timer built with Next.js, TypeScript, and Tailwind CSS. Features a clean UI with dark mode support and interactive elements.

## Demo

Check out the live demo: [nextpomo.netlify.app](https://nextpomo.netlify.app)

## About

Started as a learning project for React Hooks (useState and useEffect) with a simple Counter app. After implementing auto counting functionality, it evolved into a full-fledged Pomodoro timer with Dark Mode support.

## Features

- 🍅 Pomodoro Timer with visual progress indicator
- 🌓 Dark/Light mode toggle with system preference support
- ⚡ Real-time countdown with circular progress bar
- 🎉 Celebration confetti on timer completion
- ⚙️ Customizable settings:
  - Manual time adjustment (+1/-1 minutes)
  - Quick set to 30 minutes
  - Auto count direction (up/down)
  - Auto count toggle
- 📱 Responsive design
- 🎨 Clean UI using shadcn/ui components

## Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- [next-themes](https://github.com/pacocoursey/next-themes)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/aleksa-codes/next-counter-and-pomo.git
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

- Click the "Start Pomodoro" button to begin a timer session
- Use +1/-1 buttons to adjust time before starting
- Click "30" for a quick 30-minute timer
- Toggle auto count and direction using the controls
- Use the theme toggle in the top-right to switch between light/dark modes
- Timer will show a completion message and celebration confetti when finished

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)

## Author

Made with 💻 & ☕ by [aleksa.codes](https://github.com/aleksa-codes)
