import correctSound from "../assets/sounds/correct.wav";
import wrongSound from "../assets/sounds/wrong.wav";
import startSound from "../assets/sounds/start.wav";

export default function useSound() {
  const playCorrect = () => {
    new Audio(correctSound).play();
  };

  const playWrong = () => {
    new Audio(wrongSound).play();
  };

  const playStart = () => {
    new Audio(startSound).play();
  };

  return {
    playCorrect,
    playWrong,
    playStart,
  };
}