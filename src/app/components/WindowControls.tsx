type WindowControlsProps = {
  title: string;
  maximized: boolean;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
};

export function WindowControls({ title, maximized, onMinimize, onMaximize, onClose }: WindowControlsProps) {
  return (
    <div className="xp-window-controls" aria-label={`${title} window controls`}>
      <button type="button" className="xp-control xp-minimize" onClick={onMinimize} aria-label={`Minimize ${title}`}>
        _
      </button>
      <button
        type="button"
        className="xp-control xp-maximize"
        onClick={onMaximize}
        aria-label={maximized ? `Restore ${title}` : `Maximize ${title}`}
      >
        □
      </button>
      <button type="button" className="xp-control xp-close" onClick={onClose} aria-label={`Close ${title}`}>
        ×
      </button>
    </div>
  );
}
