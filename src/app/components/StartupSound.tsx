import { useEffect, useRef } from 'react';

const STARTUP_AUDIO_SRC = '/assets/startup.mp3';

export function StartupSound() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const playAudio = () => {
      void audio.play().catch(() => {
        // Browsers may block audible autoplay until the first user gesture.
      });
    };

    playAudio();

    const playAfterInteraction = () => {
      playAudio();
      window.removeEventListener('pointerdown', playAfterInteraction);
      window.removeEventListener('keydown', playAfterInteraction);
      window.removeEventListener('touchstart', playAfterInteraction);
    };

    window.addEventListener('pointerdown', playAfterInteraction, { once: true });
    window.addEventListener('keydown', playAfterInteraction, { once: true });
    window.addEventListener('touchstart', playAfterInteraction, { once: true });

    return () => {
      window.removeEventListener('pointerdown', playAfterInteraction);
      window.removeEventListener('keydown', playAfterInteraction);
      window.removeEventListener('touchstart', playAfterInteraction);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      className="xp-startup-sound"
      src={STARTUP_AUDIO_SRC}
      preload="auto"
      aria-hidden="true"
    />
  );
}
