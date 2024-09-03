import { Footer } from '@/components/footer';
import { Pomodoro } from '@/components/pomodoro';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <Pomodoro />
      <Footer />
    </main>
  );
}
