import generateQuestion from "../utils/generateQuestion";

export default function useGameLogic({
  score,
  combo,
  bestCombo,
  highScore,
  gamesPlayed,
  totalScore,

  dailyChallenge,
  challengeTarget,


  setScore,
  setCombo,
  setBestCombo,

  setQuestion,
  setTimeLeft,

  setAchievements,

  setPulse,
  setShake,

  setStarted,
  setGameOver,

  setGamesPlayed,
  setTotalScore,

  setHighScore,
  setNewRecord,

  difficulty,

  correctAudio,
  wrongAudio,

  soundEnabled,
  vibrationEnabled,
}) {
  const getTimeLimit = (currentScore) => {

  let baseTime = 3;

  if (difficulty === "Easy") {
    baseTime = 4;
  }

  if (difficulty === "Medium") {
    baseTime = 3;
  }

  if (difficulty === "Hard") {
    baseTime = 2;
  }

  if (currentScore >= 40)
    return baseTime - 1;

  if (currentScore >= 25)
    return baseTime - 0.7;

  if (currentScore >= 15)
    return baseTime - 0.5;

  if (currentScore >= 5)
    return baseTime - 0.3;

  return baseTime;
};

  const nextQuestion = (newScore) => {
    setQuestion(generateQuestion(newScore, difficulty)
);
    setTimeLeft(getTimeLimit(newScore));
  };

  const checkAchievements = (newScore) => {
    const unlocked = [];

    if (newScore >= 10) {
      unlocked.push("🏅 Color Rookie");
    }

    if (newScore >= 25) {
      unlocked.push("🔥 Combo Master");
    }

    if (newScore >= 50) {
      unlocked.push("🧠 Stroop Genius");
    }

    if (newScore >= 100) {
      unlocked.push("👑 Color King");
    }

    setAchievements(unlocked);
  };

  const handleGameOver = () => {
    setStarted(false);
    setGameOver(true);

    const newGamesPlayed = gamesPlayed + 1;
    const newTotalScore = totalScore + score;

    setGamesPlayed(newGamesPlayed);
    setTotalScore(newTotalScore);

    if (score > highScore) {
      setNewRecord(true);
      setHighScore(score);
    }
  };

  const handleAnswer = (selected, question) => {
    if (!question) return;

    if (selected === question.correctAnswer) {
      if (soundEnabled) {
        correctAudio.current.currentTime = 0;
        correctAudio.current.play();
      }

      if (vibrationEnabled) {
        navigator.vibrate?.(50);
      }

      const newScore = score + 1;
const newCombo = combo + 1;

if (
  dailyChallenge &&
  newScore >= challengeTarget
) {
  alert(
    "🏆 Daily Challenge Complete!"
  );
}

setScore(newScore);
setCombo(newCombo);

      checkAchievements(newScore);

      if (newCombo > bestCombo) {
        setBestCombo(newCombo);
      }

      setPulse(true);

      setTimeout(() => {
        setPulse(false);
      }, 200);

      nextQuestion(newScore);
    } else {
      if (soundEnabled) {
        wrongAudio.current.currentTime = 0;
        wrongAudio.current.play();
      }

      if (vibrationEnabled) {
        navigator.vibrate?.([100, 50, 100]);
      }

      setShake(true);

      setTimeout(() => {
        setShake(false);
      }, 400);

      handleGameOver();
    }
  };

  return {
    getTimeLimit,
    handleAnswer,
    handleGameOver,
  };
}