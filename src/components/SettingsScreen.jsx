export default function SettingsScreen({
  soundEnabled,
  setSoundEnabled,
  vibrationEnabled,
  setVibrationEnabled,
  darkMode,
  setDarkMode,
  onBack,
}) {
  return (
    <div className="container">
      <div className="start-card">
        <h1>⚙️ Settings</h1>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "15px 0",
          }}
        >
          <span>🔊 Sound</span>

          <button
            onClick={() =>
              setSoundEnabled(
                !soundEnabled
              )
            }
          >
            {soundEnabled
              ? "ON"
              : "OFF"}
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "15px 0",
          }}
        >
          <span>📳 Vibration</span>

          <button
            onClick={() =>
              setVibrationEnabled(
                !vibrationEnabled
              )
            }
          >
            {vibrationEnabled
              ? "ON"
              : "OFF"}
          </button>
        </div>

        <button
          className="start-btn"
          onClick={onBack}
        >
          Back
        </button>
        <div className="setting-item">
  <span>
    🌙 Dark Mode
  </span>

  <button
    onClick={() =>
      setDarkMode(
        !darkMode
      )
    }
  >
    {darkMode
      ? "ON"
      : "OFF"}
  </button>
</div>
      </div>
    </div>
  );
}