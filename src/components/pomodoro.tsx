'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ThemeToggle } from '@/components/theme-toggle';
import { ArrowDown, ArrowUp, Play, Pause } from 'lucide-react';
import confetti from 'canvas-confetti';

const circleRadius = 45;
const circumference = 2 * Math.PI * circleRadius;

export function Pomodoro() {
  const [count, setCount] = useState<number | '🏁'>(0);
  const [settings, setSettings] = useState({
    maxCount: 1,
    auto: false,
    autoDown: false,
    pomodoro: false,
    workMessage: '🍅 Start working',
  });

  const resetState = useCallback(() => {
    setCount(0);
    setSettings({ maxCount: 1, auto: false, autoDown: false, pomodoro: false, workMessage: '🍅 Start working' });
  }, []);

  const handleCountChange = useCallback(
    (value: number) => {
      if (count === '🏁') {
        resetState();
      } else {
        setCount((prev) => (typeof prev === 'number' ? prev + value : 0));
      }
    },
    [count, resetState],
  );

  const toggleSetting = useCallback((key: 'auto' | 'autoDown') => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const controlPomodoro = useCallback(() => {
    if (!settings.pomodoro) {
      const initialCount = Math.abs(typeof count === 'number' ? count : 0) * 60 || 1800;
      setCount(initialCount);
      setSettings((prev) => ({ ...prev, maxCount: initialCount, pomodoro: true, auto: true, autoDown: true }));
    } else {
      resetState();
    }

    if (count === '🏁') {
      resetState();
    }
  }, [count, settings.pomodoro, resetState]);

  const minutes = typeof count === 'number' ? String(Math.floor(Math.abs(count) / 60)).padStart(2, '0') : '00';
  const seconds = typeof count === 'number' ? String(Math.abs(count) % 60).padStart(2, '0') : '00';

  useEffect(() => {
    if (settings.auto) {
      const interval = setInterval(() => {
        handleCountChange(settings.autoDown ? -1 : 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [settings.auto, settings.autoDown, handleCountChange]);

  useEffect(() => {
    if (settings.pomodoro && count === 0) {
      const launchConfetti = () => {
        confetti({
          particleCount: 150,
          startVelocity: 30,
          spread: 360,
          origin: { x: Math.random(), y: Math.random() - 0.1 },
        });
      };

      launchConfetti();
      setTimeout(launchConfetti, 500);
      setTimeout(launchConfetti, 1000);

      setSettings((prev) => ({ ...prev, auto: false, pomodoro: false, workMessage: '✔️ Work done, great job!' }));
      setCount('🏁');

      setTimeout(() => confetti.reset(), 4000);
    }
  }, [count, settings.pomodoro]);

  const progressPercentage =
    typeof count === 'number' && typeof settings.maxCount === 'number'
      ? Math.min(100, Math.max(0, ((settings.maxCount - count) / settings.maxCount) * 100))
      : 0;

  const strokeDashoffset = circumference * (1 - progressPercentage / 100);

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader className='flex flex-row justify-end items-center'>
        <ThemeToggle />
      </CardHeader>
      <CardContent className='flex flex-col items-center justify-center p-6'>
        <div className='relative w-64 h-64 mb-8'>
          <svg className='w-full h-full' viewBox='0 0 100 100'>
            <circle
              className='text-muted stroke-current'
              strokeWidth='5'
              cx='50'
              cy='50'
              r={circleRadius}
              fill='transparent'
            />
            <circle
              className={cn('text-blue-600 stroke-current', !settings.pomodoro && 'hidden')}
              strokeWidth='5'
              strokeLinecap='round'
              cx='50'
              cy='50'
              r={circleRadius}
              fill='transparent'
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform='rotate(-90 50 50)'
            />
          </svg>
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold'>
            {settings.pomodoro ? `${minutes}:${seconds}` : count}
          </div>
        </div>

        <h2 className='text-2xl font-semibold mb-4 text-center'>
          {!settings.pomodoro ? settings.workMessage : '🍅 Focusing...'}
        </h2>

        <div className='grid grid-cols-3 gap-2 mb-6 w-full'>
          <Button onClick={() => handleCountChange(-1)} disabled={settings.pomodoro} variant='outline'>
            -1
          </Button>
          <Button onClick={() => setCount(30)} disabled={settings.pomodoro} variant='outline'>
            30
          </Button>
          <Button onClick={() => handleCountChange(1)} disabled={settings.pomodoro} variant='outline'>
            +1
          </Button>
        </div>

        <div className='flex flex-col items-center gap-4 w-full mb-6'>
          <div className='flex items-center justify-between w-full'>
            <span>Auto count direction: {settings.autoDown ? 'down' : 'up'}</span>
            <Button
              onClick={() => toggleSetting('autoDown')}
              disabled={settings.pomodoro}
              size='icon'
              variant='outline'
            >
              {settings.autoDown ? <ArrowDown className='h-4 w-4' /> : <ArrowUp className='h-4 w-4' />}
            </Button>
          </div>
          <div className='flex items-center justify-between w-full'>
            <span>Auto count: {settings.auto ? 'on' : 'off'}</span>
            <Switch
              checked={settings.auto}
              onCheckedChange={() => toggleSetting('auto')}
              disabled={settings.pomodoro}
            />
          </div>
        </div>

        <Button className='w-full mb-4' onClick={controlPomodoro} size='lg'>
          {settings.pomodoro ? (
            <>
              <Pause className='mr-2 h-5 w-5' /> End Pomodoro
            </>
          ) : (
            <>
              <Play className='mr-2 h-5 w-5' /> Start Pomodoro
            </>
          )}
        </Button>

        <p className='text-sm text-muted-foreground text-center'>
          Focus for 30min. Don&apos;t forget a small break after!
        </p>
      </CardContent>
    </Card>
  );
}
