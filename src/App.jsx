import { useState, useEffect, useRef } from "react";
import "./App.css";

import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import GameOverScreen from "./components/GameOverScreen";

import generateQuestion from "./utils/generateQuestion";
import useLocalStorage from "./hooks/useLocalStorage";
import useGameLogic from "./hooks/useGameLogic";

import correctSound from "./assets/sounds/correct.wav";
import wrongSound from "./assets/sounds/wrong.wav";
import startSound from "./assets/sounds/start.wav";
import SettingsScreen from "./components/SettingsScreen";
import LeaderboardScreen from "./components/LeaderboardScreen";
import { saveScore } from "./utils/saveScore";

export default function App() {
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);

  const [question, setQuestion] = useState(null);

  const [countdown, setCountdown] = useState(null);

  const [pulse, setPulse] = useState(false);
  const [shake, setShake] = useState(false);

  const [timeLeft, setTimeLeft] = useState(3);

  const [newRecord, setNewRecord] = useState(false);

  const [achievements, setAchievements] =
    useState([]);

  const [highScore, setHighScore] =
    useLocalStorage(
      "stroopHighScore",
      0
    );

  const [gamesPlayed, setGamesPlayed] =
    useLocalStorage(
      "gamesPlayed",
      0
    );

  const [totalScore, setTotalScore] =
    useLocalStorage(
      "totalScore",
      0
    );

  const correctAudio = useRef(
    new Audio(correctSound)
  );

  const wrongAudio = useRef(
    new Audio(wrongSound)
  );

  const startAudio = useRef(
    new Audio(startSound)
  );

  const [showSettings, setShowSettings] =
  useState(false);

  const [soundEnabled, setSoundEnabled] =
  useLocalStorage(
    "soundEnabled",
    true
  );

const [
  vibrationEnabled,
  setVibrationEnabled,
] = useLocalStorage(
  "vibrationEnabled",
  true
);

const [darkMode, setDarkMode] =
  useLocalStorage(
    "darkMode",
    false
  );

const [dailyChallenge, setDailyChallenge] =
  useState(false);
  const challengeTarget = 20;

const [difficulty, setDifficulty] =
  useState("Medium");

  const [playerName, setPlayerName] = useState("");

  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const level =
    Math.floor(score / 10) + 1;

  const averageScore =
    gamesPlayed > 0
      ? (
          totalScore /
          gamesPlayed
        ).toFixed(1)
      : 0;

useEffect(() => {
  if (darkMode) {
    document.body.classList.add(
      "dark-mode"
    );
  } else {
    document.body.classList.remove(
      "dark-mode"
    );
  }
}, [darkMode]);


  const {
    getTimeLimit,
    handleAnswer,
    handleGameOver,
  } = useGameLogic({
    score,
    combo,
    bestCombo,
    highScore,
    gamesPlayed,
    totalScore,

    dailyChallenge,
    challengeTarget: 20,

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
  });

  useEffect(() => {
    if (!started || gameOver)
      return;

    const interval =
      setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 0.1) {
            handleGameOver();
            return 0;
          }

          return +(
            prev - 0.1
          ).toFixed(1);
        });
      }, 100);

    return () =>
      clearInterval(interval);
  }, [
    started,
    gameOver,
    handleGameOver,
  ]);

  useEffect(() => {
    if (countdown === null)
      return;

    if (countdown === 0) {
      setStarted(true);

      setQuestion(generateQuestion(0,difficulty)
);

      if (difficulty === "Easy")
  setTimeLeft(4);

if (difficulty === "Medium")
  setTimeLeft(3);

if (difficulty === "Hard")
  setTimeLeft(2);

      setCountdown(null);

      return;
    }

    const timer = setTimeout(
      () => {
        setCountdown(
          (prev) => prev - 1
        );
      },
      1000
    );

    return () =>
      clearTimeout(timer);
}, [countdown, difficulty]);

useEffect(() => {
  if (
    gameOver &&
    score > 0 &&
    playerName
  ) {
    saveScore(
      playerName,
      score,
      difficulty
    );
  }
}, [
  gameOver,
  score,
  playerName,
  difficulty,
]);

  const startGame = () => {
   if (soundEnabled) {
  startAudio.current.currentTime = 0;

  startAudio.current.play();
}

    setStarted(false);
    setGameOver(false);

    setScore(0);
    setCombo(0);
    setBestCombo(0);

    setAchievements([]);

    setNewRecord(false);

    setCountdown(3);
  };

  if (countdown !== null) {
    return (
      <div className="countdown-screen">
        <div className="countdown-number">
          {countdown}
        </div>
      </div>
    );
  }

if (showSettings) {
  return (
    <SettingsScreen
  soundEnabled={soundEnabled}
  setSoundEnabled={setSoundEnabled}

  vibrationEnabled={vibrationEnabled}
  setVibrationEnabled={
    setVibrationEnabled
  }

  darkMode={darkMode}
  setDarkMode={setDarkMode}

  onBack={() =>
    setShowSettings(false)
  }
/>
  );
} 

if (showLeaderboard) {
  return (
    <LeaderboardScreen
      onBack={() =>
        setShowLeaderboard(false)
      }
    />
  );
}

 if (!started && !gameOver) {
  return (
   <StartScreen
  highScore={highScore}
  startGame={startGame}
  openSettings={() =>
    setShowSettings(true)
  }
  openLeaderboard={() =>
    setShowLeaderboard(true)
  }
  dailyChallenge={dailyChallenge}
  setDailyChallenge={setDailyChallenge}
  difficulty={difficulty}
  setDifficulty={setDifficulty}
  playerName={playerName}
  setPlayerName={setPlayerName}
/>

  );
}



if (gameOver) {
    return (
      <GameOverScreen
  score={score}
  bestCombo={bestCombo}
  level={level}
  highScore={highScore}
  achievements={achievements}
  gamesPlayed={gamesPlayed}
  averageScore={averageScore}
  newRecord={newRecord}
  onRestart={startGame}
  dailyChallenge={dailyChallenge}
  challengeTarget={challengeTarget}
/>
    );
  }

  return (
    <GameScreen
  score={score}
  combo={combo}
  level={level}
  shake={shake}
  pulse={pulse}
  question={question}
  timeLeft={timeLeft}
  getTimeLimit={getTimeLimit}
  handleAnswer={(selected) =>
    handleAnswer(
      selected,
      question
    )
  }
/>
  );
}