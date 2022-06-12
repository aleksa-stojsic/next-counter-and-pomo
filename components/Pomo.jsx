import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function Pomo() {
  const [count, setCount] = useState(0);
  const [maxCount, setMaxCount] = useState(1);
  const [auto, setAuto] = useState(false);
  const [autoDown, setAutoDown] = useState(false);
  const [pomodoro, setPomodoro] = useState(false);
  const [work, setWork] = useState('🍅 Start working');

  useEffect(() => {
    if (auto && !autoDown) {
      const interval = setInterval(() => {
        setCount(count + 1);
      }, 1000);

      if (count === '🏁') {
        setCount(0);
        setWork('🍅 Start working');
      }
      return () => clearInterval(interval);
    }
    if (auto && autoDown) {
      const interval = setInterval(() => {
        setCount(count - 1);
      }, 1000);

      if (count === '🏁') {
        setCount(0);
        setWork('🍅 Start working');
      }

      if (count === 0 && pomodoro) {
        confetti({
          particleCount: 150,
          startVelocity: 30,
          spread: 360,
          origin: {
            x: Math.random(),
            // since they fall down, start a bit higher than random
            y: Math.random() - 0.1
          }
        });
        setTimeout(() => {
          confetti({
            particleCount: 150,
            startVelocity: 30,
            spread: 360,
            origin: {
              x: Math.random(),
              // since they fall down, start a bit higher than random
              y: Math.random() - 0.1
            }
          });
        }, 500);
        setTimeout(() => {
          confetti({
            particleCount: 150,
            startVelocity: 30,
            spread: 360,
            origin: {
              x: Math.random(),
              // since they fall down, start a bit higher than random
              y: Math.random() - 0.1
            }
          });
        }, 1000);
        setAuto(false);
        setCount('🏁');
        setWork('✔️ Work done, great job!');
        setPomodoro(false);
        setTimeout(() => {
          confetti.reset();
        }, 4000);
      }
      return () => clearInterval(interval);
    }
  }, [auto, count, autoDown, pomodoro]);

  const upOne = () => {
    if (count === '🏁') {
      setCount(0);
      setMaxCount(1);
      setWork('🍅 Start working');
    } else {
      setCount(count + 1);
    }
  };

  const downOne = () => {
    if (count === '🏁') {
      setMaxCount(1);
      setCount(0);
      setWork('🍅 Start working');
    } else {
      setCount(count - 1);
    }
  };

  const autoCount = () => {
    if (auto) {
      setAuto(false);
    } else {
      setAuto(true);
    }
    console.log('autoCount', !auto);
  };

  const autoDownCount = () => {
    if (autoDown) {
      setAutoDown(false);
    } else {
      setAutoDown(true);
    }
    console.log('autoDownCount: ', !autoDown);
  };

  const controlPomodoro = () => {
    if (!pomodoro) {
      let initialCount = count;
      if (initialCount !== 0) {
        setCount(Math.abs(initialCount) * 60);
        setMaxCount(Math.abs(initialCount) * 60);
      } else {
        setCount(30 * 60); // default to 30 minutes if count is 0
        setMaxCount(30 * 60);
      }
      setPomodoro(true);
      setAutoDown(true);
      setAuto(true);
    } else {
      setCount(0);
      setMaxCount(1);
      setPomodoro(false);
      setWork('🍅 Start working');
      setAuto(false);
    }

    if (count === '🏁') {
      setCount(0);
      setMaxCount(1);
      setPomodoro(false);
      setWork('🍅 Start working');
      setAuto(false);
    }
    console.log('pomodoro: ', !pomodoro);
  };

  const setCountTo30 = () => {
    setCount(30);
    setMaxCount(1);
  };

  const minutes = String(Math.floor(count / 60)).padStart(2, '0');
  const seconds = String(count - minutes * 60).padStart(2, '0');

  return (
    <>
      <div className='card w-96 bg-base-200 shadow-xl flex flex-col items-center justify-center py-4 my-auto'>
        <div
          className='radial-progress bg-primary text-primary-content border-4 border-primary text-4xl mb-4'
          style={{
            '--value':
              count === '🏁'
                ? 100
                : count <= 0
                ? 0
                : 100 - (count / maxCount) * 100,
            '--size': '8rem'
          }}
        >
          {pomodoro ? minutes + ':' + seconds : count}
        </div>
        <div className='flex flex-col items-center justify-center'>
          <span>
            <span className='text-primary-500 text-xl transform: uppercase'>
              {!pomodoro ? work : '🍅 focusing...'}
            </span>
          </span>
          <div className='divider'></div>
          <p className='text-center mb-4'>
            <button
              onClick={downOne}
              className='btn btn-accent btn-square mr-2 text-2xl'
              disabled={pomodoro}
            >
              -1
            </button>
            <button
              onClick={setCountTo30}
              className='btn btn-primary btn-square mx-2 text-2xl'
              disabled={pomodoro}
            >
              30
            </button>
            <button
              onClick={upOne}
              className='btn btn-secondary btn-square ml-2 text-2xl'
              disabled={pomodoro}
            >
              +1
            </button>
          </p>
          <div className='flex flex-col items-center justify-center'>
            <button
              onClick={autoDownCount}
              className='btn text-transform: uppercase w-full'
              disabled={pomodoro}
            >
              ↕️ Auto Count Up/Down
            </button>
            <span className='text-primary-500'>
              auto count direction: <span>{autoDown ? 'down' : 'up'}</span>
            </span>
            <button
              onClick={autoCount}
              className='btn text-transform: uppercase w-full'
              disabled={pomodoro}
            >
              🔄 Auto Count On/Off
            </button>
            <span className='text-primary-500'>
              auto count: <span>{auto ? 'on' : 'off'}</span>
            </span>
          </div>
          <div className='divider'></div>
          <div className='flex flex-col items-center justify-center'>
            <button
              className='btn btn-primary text-lg text-transform: uppercase w-full'
              onClick={controlPomodoro}
            >
              🍅 Pomodoro Start/End
            </button>
            <em className='text-sm'>
              Focus for 30min. Don&apos;t forget a small break after!
            </em>
          </div>
        </div>
      </div>
    </>
  );
}
