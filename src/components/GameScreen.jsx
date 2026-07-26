export default function GameScreen({
  score,
  combo,
  level,
  shake,
  pulse,
  question,
  timeLeft,
  getTimeLimit,
  handleAnswer,
}) {
  const currentLimit =
    getTimeLimit(score);

  const cardColors = {
    RED: "#ef4444",
    BLUE: "#3b82f6",
    GREEN: "#22c55e",
    YELLOW: "#eab308",
    PURPLE: "#a855f7",
    PINK: "#ec4899",
    CYAN: "#06b6d4",
    ORANGE: "#f97316",
  };

  return (
    <div className="container">
      <div
        className={`game-card ${
          shake ? "shake" : ""
        }`}
      >
        <div className="top-bar">
          <span>⭐ {score}</span>

          <span>🔥 x{combo}</span>

          <span>🚀 Lv {level}</span>
        </div>

        <div className="timer-container">
          <div
            className="timer-bar"
            style={{
              width: `${
                (timeLeft /
                  currentLimit) *
                100
              }%`,
            }}
          />
        </div>

        <p className="prompt">
          SELECT THE FONT COLOR
        </p>

        <div
          className={`stroop-word ${
            pulse ? "pulse" : ""
          }`}
          style={{
            color:
              question?.fontColor
                ?.value,
          }}
        >
          {question?.word?.name}
        </div>

        <div className="options-grid">
          {question?.options.map(
            (option) => (
              <button
                key={option.name}
                className="option-card"
                style={{
                  background:
                    cardColors[
                      option.name
                    ],
                }}
                onClick={() =>
                  handleAnswer(
                    option.name
                  )
                }
              >
                {option.name}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}