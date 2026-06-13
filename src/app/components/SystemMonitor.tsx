import { useEffect, useState } from 'react';
import { VisitCounter } from './VisitCounter';

const LAST_UPDATED = 'June 14, 2026';

type SystemMonitorProps = {
  currentFocus: string;
};

function formatLocalTime(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date);
}

export function SystemMonitor({ currentFocus }: SystemMonitorProps) {
  const [localTime, setLocalTime] = useState(() => formatLocalTime(new Date()));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLocalTime(formatLocalTime(new Date()));
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <aside className="xp-system-monitor" aria-label="System Monitor">
      <div className="xp-system-monitor-title">System Monitor</div>
      <dl className="xp-system-monitor-content">
        <div>
          <dt>Status</dt>
          <dd><span className="xp-status-light" aria-hidden="true" /> Online</dd>
        </div>
        <div>
          <dt>Visits</dt>
          <dd><VisitCounter /></dd>
        </div>
        <div>
          <dt>Local Time</dt>
          <dd>{localTime}</dd>
        </div>
        <div>
          <dt>Last Updated</dt>
          <dd>{LAST_UPDATED}</dd>
        </div>
        <div>
          <dt>Current Focus</dt>
          <dd>{currentFocus}</dd>
        </div>
      </dl>
    </aside>
  );
}
