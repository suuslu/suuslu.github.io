import { useState, type KeyboardEvent } from 'react';
import type { DesktopShortcut } from './desktop-data';

type DesktopIconProps = {
  shortcut: DesktopShortcut;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
};

export function DesktopIcon({ shortcut, selected, onSelect, onOpen }: DesktopIconProps) {
  const [iconFailed, setIconFailed] = useState(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen();
    }
  };

  return (
    <button
      type="button"
      className={`xp-desktop-icon ${selected ? 'is-selected' : ''}`}
      onClick={onSelect}
      onDoubleClick={onOpen}
      onKeyDown={handleKeyDown}
      aria-label={shortcut.ariaLabel}
    >
      <span className="xp-desktop-icon-glyph" aria-hidden="true">
        {!iconFailed ? (
          <img src={shortcut.iconSrc} alt="" onError={() => setIconFailed(true)} />
        ) : (
          shortcut.icon
        )}
      </span>
      <span className="xp-desktop-icon-label">{shortcut.label}</span>
    </button>
  );
}
