import { useEffect, useState } from 'react';
import type { WindowId, WindowState } from './desktop-data';
import { StartButton } from './StartButton';

type TaskbarProps = {
  windows: WindowState[];
  activeWindow: WindowId;
  onStart: () => void;
  onToggleWindow: (id: WindowId) => void;
};

function useClock() {
  const [time, setTime] = useState(() =>
    new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date())
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTime(new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date()));
    }, 30000);

    return () => window.clearInterval(interval);
  }, []);

  return time;
}

export function Taskbar({ windows, activeWindow, onStart, onToggleWindow }: TaskbarProps) {
  const time = useClock();
  const visibleWindows = windows.filter((window) => window.open);

  return (
    <footer className="xp-taskbar" aria-label="Taskbar">
      <StartButton onClick={onStart} />
      <div className="xp-taskbar-programs" role="list" aria-label="Open programs">
        {visibleWindows.map((window) => (
          <button
            key={window.id}
            type="button"
            className={`xp-taskbar-button ${activeWindow === window.id && !window.minimized ? 'is-active' : ''}`}
            onClick={() => onToggleWindow(window.id)}
            aria-label={`${window.minimized ? 'Restore' : 'Focus'} ${window.title}`}
          >
            <span aria-hidden="true">{window.icon}</span>
            <span className="xp-taskbar-title">{window.title}</span>
          </button>
        ))}
      </div>
      <div className="xp-clock" aria-label={`Current time ${time}`}>
        {time}
      </div>
    </footer>
  );
}
