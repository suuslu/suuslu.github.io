import { WindowControls } from './WindowControls';
import { useState, type PointerEvent } from 'react';

type TitleBarProps = {
  icon: string;
  iconSrc?: string;
  title: string;
  maximized: boolean;
  onFocus: () => void;
  onDragStart: (event: PointerEvent<HTMLDivElement>) => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
};

export function TitleBar({
  icon,
  iconSrc,
  title,
  maximized,
  onFocus,
  onDragStart,
  onMinimize,
  onMaximize,
  onClose
}: TitleBarProps) {
  const [iconFailed, setIconFailed] = useState(false);

  return (
    <div
      className="xp-titlebar"
      onMouseDown={onFocus}
      onPointerDown={(event) => {
        if ((event.target as HTMLElement).closest('button')) {
          return;
        }

        onFocus();
        onDragStart(event);
      }}
    >
      <div className="xp-titlebar-label">
        <span className="xp-titlebar-icon" aria-hidden="true">
          {iconSrc && !iconFailed ? <img src={iconSrc} alt="" onError={() => setIconFailed(true)} /> : icon}
        </span>
        <span>{title}</span>
      </div>
      <WindowControls
        title={title}
        maximized={maximized}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onClose={onClose}
      />
    </div>
  );
}
