type StartButtonProps = {
  onClick: () => void;
};

export function StartButton({ onClick }: StartButtonProps) {
  return (
    <button type="button" className="xp-start-button" onClick={onClick} aria-label="Open portfolio start menu">
      <span className="xp-start-mark" aria-hidden="true">
        ◆
      </span>
      <span>Start</span>
    </button>
  );
}
