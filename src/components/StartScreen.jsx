export default function StartScreen({
  highScore,
  startGame,
  openSettings,
  dailyChallenge,
  setDailyChallenge,
  difficulty,
  setDifficulty,
  openLeaderboard,
  playerName,
  setPlayerName,
}) {
  return (
    <div className="container">
      <div className="start-card">

        <img
          src="/icon-1.png"
          alt="Stroop Rush"
          className="game-logo"
        />

        <h1>🧠 Stroop Rush</h1>

        <p className="subtitle">
          Select the FONT COLOR,
          not the word.
        </p>

        <h2>
          🏆 High Score: {highScore}
        </h2>

        <input
          type="text"
          placeholder="Enter Your Name"
          value={playerName}
          onChange={(e) =>
            setPlayerName(e.target.value)
          }
          className="name-input"
        />

        <h3>🎮 Difficulty</h3>

        <div className="difficulty-row">
          <button
            className="start-btn"
            onClick={() =>
              setDifficulty("Easy")
            }
          >
            🟢 Easy
          </button>

          <button
            className="start-btn"
            onClick={() =>
              setDifficulty("Medium")
            }
          >
            🟡 Medium
          </button>

          <button
            className="start-btn"
            onClick={() =>
              setDifficulty("Hard")
            }
          >
            🔴 Hard
          </button>
        </div>

        <p>
          Current Mode:
          <b> {difficulty}</b>
        </p>

        <button
          className="start-btn"
          onClick={startGame}
        >
          ▶️ Start Game
        </button>

       <div className="bottom-buttons">
  <button
    className="start-btn small-btn"
    onClick={() =>
      setDailyChallenge(
        !dailyChallenge
      )
    }
  >
    <div>🎯</div>
    <small>
      {dailyChallenge
        ? "Challenge ON"
        : "Challenge"}
    </small>
  </button>

  <button
    className="start-btn small-btn"
    onClick={openSettings}
  >
    <div>⚙️</div>
    <small>Settings</small>
  </button>

  <button
    className="start-btn small-btn"
    onClick={openLeaderboard}
  >
    <div>🏆</div>
    <small>Leaderboard</small>
  </button>
</div>
        </div>
      </div>
  );
}