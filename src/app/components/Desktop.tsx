import { type PointerEvent, useCallback, useMemo, useRef, useState } from 'react';
import { DesktopIcon } from './DesktopIcon';
import {
  desktopShortcuts,
  initialWindows,
  initialWindowPositions,
  profile,
  type WindowId,
  type WindowState
} from './desktop-data';
import { ExplorerWindow } from './ExplorerWindow';
import { AboutWindow, ContactWindow, GalleryWindow, PortfolioHome, SkillsWindow } from './ProgramWindow';
import { StartupSound } from './StartupSound';
import { SystemMonitor } from './SystemMonitor';
import { Taskbar } from './Taskbar';
import { WindowFrame } from './WindowFrame';

const windowClasses: Record<WindowId, string> = {
  portfolio: 'xp-window-portfolio',
  about: 'xp-window-about',
  projects: 'xp-window-projects',
  skills: 'xp-window-skills',
  contact: 'xp-window-contact',
  gallery: 'xp-window-gallery'
};

export function Desktop() {
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const [windows, setWindows] = useState<WindowState[]>(initialWindows);
  const [selectedIcon, setSelectedIcon] = useState<WindowId | null>(null);
  const [activeWindow, setActiveWindow] = useState<WindowId>('portfolio');
  const [zCounter, setZCounter] = useState(20);
  const [windowPositions, setWindowPositions] = useState(initialWindowPositions);

  const windowMap = useMemo(() => new Map(windows.map((window) => [window.id, window])), [windows]);
  const activeWindowTitle = windowMap.get(activeWindow)?.title ?? 'Desktop';

  const playClickSound = useCallback(() => {
    const audio = clickAudioRef.current;

    if (!audio) {
      return;
    }

    audio.currentTime = 0;
    void audio.play().catch(() => {
      // Some browsers may still block audio in edge cases; keep the UI responsive.
    });
  }, []);

  const focusWindow = (id: WindowId) => {
    setActiveWindow(id);
    const nextZIndex = zCounter + 1;
    setZCounter(nextZIndex);
    setWindows((current) =>
      current.map((window) =>
        window.id === id
          ? { ...window, open: true, minimized: false, zIndex: nextZIndex }
          : window
      )
    );
  };

  const openWindow = (id: WindowId) => {
    playClickSound();
    setSelectedIcon(id);
    focusWindow(id);
  };

  const minimizeWindow = (id: WindowId) => {
    setWindows((current) => current.map((window) => (window.id === id ? { ...window, minimized: true } : window)));
  };

  const maximizeWindow = (id: WindowId) => {
    focusWindow(id);
    setWindows((current) =>
      current.map((window) => (window.id === id ? { ...window, maximized: !window.maximized } : window))
    );
  };

  const closeWindow = (id: WindowId) => {
    setWindows((current) =>
      current.map((window) => (window.id === id ? { ...window, open: false, minimized: true, maximized: false } : window))
    );
  };

  const toggleTaskbarWindow = (id: WindowId) => {
    const window = windowMap.get(id);

    if (!window) {
      return;
    }

    if (window.minimized || activeWindow !== id) {
      playClickSound();
      focusWindow(id);
      return;
    }

    minimizeWindow(id);
  };

  const startWindowDrag = (id: WindowId, event: PointerEvent<HTMLDivElement>) => {
    const window = windowMap.get(id);

    if (!window || window.maximized || event.button !== 0) {
      return;
    }

    const dragHandle = event.currentTarget;
    const windowElement = dragHandle.closest('.xp-window') as HTMLElement | null;

    if (!windowElement) {
      return;
    }

    event.preventDefault();
    dragHandle.setPointerCapture?.(event.pointerId);

    const startX = event.clientX;
    const startY = event.clientY;
    const startPosition = windowPositions[id];
    const windowRect = windowElement.getBoundingClientRect();

    const handlePointerMove = (moveEvent: globalThis.PointerEvent) => {
      const maxX = Math.max(8, globalThis.window.innerWidth - windowRect.width - 8);
      const maxY = Math.max(8, globalThis.window.innerHeight - windowRect.height - 44);
      const nextX = Math.min(Math.max(8, startPosition.x + moveEvent.clientX - startX), maxX);
      const nextY = Math.min(Math.max(8, startPosition.y + moveEvent.clientY - startY), maxY);

      setWindowPositions((current) => ({
        ...current,
        [id]: { x: nextX, y: nextY }
      }));
    };

    const stopDrag = () => {
      dragHandle.releasePointerCapture?.(event.pointerId);
      globalThis.window.removeEventListener('pointermove', handlePointerMove);
      globalThis.window.removeEventListener('pointerup', stopDrag);
      globalThis.window.removeEventListener('pointercancel', stopDrag);
    };

    globalThis.window.addEventListener('pointermove', handlePointerMove);
    globalThis.window.addEventListener('pointerup', stopDrag);
    globalThis.window.addEventListener('pointercancel', stopDrag);
  };

  const renderWindowContent = (id: WindowId) => {
    switch (id) {
      case 'about':
        return <AboutWindow />;
      case 'projects':
        return <ExplorerWindow />;
      case 'skills':
        return <SkillsWindow />;
      case 'contact':
        return <ContactWindow />;
      case 'gallery':
        return <GalleryWindow />;
      case 'portfolio':
      default:
        return <PortfolioHome />;
    }
  };

  return (
    <main className="xp-desktop" aria-label={`${profile.asciiName} portfolio desktop`}>
      <StartupSound />
      <audio ref={clickAudioRef} src="/assets/click.mp3" preload="auto" />
      <div className="xp-wallpaper" aria-hidden="true" />

      <div className="xp-icon-grid" aria-label="Desktop shortcuts">
        {desktopShortcuts.map((shortcut) => (
          <DesktopIcon
            key={shortcut.id}
            shortcut={shortcut}
            selected={selectedIcon === shortcut.id}
            onSelect={() => setSelectedIcon(shortcut.id)}
            onOpen={() => openWindow(shortcut.id)}
          />
        ))}
      </div>

      <SystemMonitor currentFocus={activeWindowTitle} />

      {windows.map((window) => (
        <WindowFrame
          key={window.id}
          window={window}
          className={windowClasses[window.id]}
          position={windowPositions[window.id]}
          onFocus={() => focusWindow(window.id)}
          onDragStart={(event) => startWindowDrag(window.id, event)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => maximizeWindow(window.id)}
          onClose={() => closeWindow(window.id)}
        >
          {renderWindowContent(window.id)}
        </WindowFrame>
      ))}

      <Taskbar
        windows={windows}
        activeWindow={activeWindow}
        onStart={() => openWindow('portfolio')}
        onToggleWindow={toggleTaskbarWindow}
      />
    </main>
  );
}
