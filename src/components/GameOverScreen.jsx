import AchievementList from "./AchievementList";

export default function GameOverScreen({
  score,
  bestCombo,
  level,
  highScore,
  achievements,
  gamesPlayed,
  averageScore,
  newRecord,
  onRestart,
  dailyChallenge,
  challengeTarget,
}) {
  return (
    <div className="container">
      <div className="start-card">
        <h1>💀 Game Over</h1>

        {newRecord && (
          <h2 className="record-text">
            🎉 NEW HIGH SCORE!
          </h2>
        )}

        <h2>⭐ Score: {score}</h2>

        <h3>🔥 Best Combo: {bestCombo}</h3>

        <h3>🚀 Level Reached: {level}</h3>

        <h3>🏆 High Score: {highScore}</h3>

        <hr
          style={{
            margin: "20px 0",
            opacity: 0.3,
          }}
        />

        <h3>📊 Statistics</h3>

        <p>🎮 Games Played: {gamesPlayed}</p>

        <p>
          📈 Average Score: {averageScore}
        </p>

        <AchievementList
          achievements={achievements}
        />

        {dailyChallenge &&
          score >= challengeTarget && (
            <h2>
              🏆 Daily Challenge Completed
            </h2>
          )}

        <button
          className="start-btn"
          onClick={onRestart}
        >
          🔄 Play Again
        </button>
      </div>
    </div>
  );
}