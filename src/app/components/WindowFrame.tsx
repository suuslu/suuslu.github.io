import type { PointerEvent, ReactNode } from 'react';
import type { WindowState } from './desktop-data';
import { TitleBar } from './TitleBar';

type WindowFrameProps = {
  window: WindowState;
  className?: string;
  position: { x: number; y: number };
  children: ReactNode;
  onFocus: () => void;
  onDragStart: (event: PointerEvent<HTMLDivElement>) => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
};

export function WindowFrame({
  window,
  className = '',
  position,
  children,
  onFocus,
  onDragStart,
  onMinimize,
  onMaximize,
  onClose
}: WindowFrameProps) {
  if (!window.open || window.minimized) {
    return null;
  }

  return (
    <section
      className={`xp-window ${window.maximized ? 'is-maximized' : ''} ${className}`}
      style={{
        zIndex: window.zIndex,
        ...(window.maximized ? {} : { left: position.x, top: position.y })
      }}
      aria-label={window.title}
      onMouseDown={onFocus}
    >
      <TitleBar
        icon={window.icon}
        iconSrc={window.iconSrc}
        title={window.title}
        maximized={window.maximized}
        onFocus={onFocus}
        onDragStart={onDragStart}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onClose={onClose}
      />
      <nav className="xp-menubar" aria-label={`${window.title} menu`}>
        {['File', 'Edit', 'View', 'Favorites', 'Help'].map((item) => (
          <button key={item} type="button">
            {item}
          </button>
        ))}
      </nav>
      <div className="xp-window-body">{children}</div>
    </section>
  );
}
