import {
  BASE_COLORS,
  EXTRA_COLORS,
} from "../data/colors";

export default function generateQuestion(
  score,
  difficulty = "Medium"
) {
  let availableColors =
    BASE_COLORS;

  if (difficulty === "Easy") {
    availableColors =
      BASE_COLORS.slice(0, 4);
  }

  if (difficulty === "Medium") {
    availableColors =
      BASE_COLORS;
  }

  if (difficulty === "Hard") {
    availableColors = [
      ...BASE_COLORS,
      ...EXTRA_COLORS,
    ];
  }

  const word =
    availableColors[
      Math.floor(
        Math.random() *
          availableColors.length
      )
    ];

  let fontColor =
    availableColors[
      Math.floor(
        Math.random() *
          availableColors.length
      )
    ];

  while (
    fontColor.name === word.name
  ) {
    fontColor =
      availableColors[
        Math.floor(
          Math.random() *
            availableColors.length
        )
      ];
  }

  let options = [...availableColors]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  if (
    !options.some(
      (color) =>
        color.name ===
        fontColor.name
    )
  ) {
    options[0] = fontColor;
  }

  return {
    word,
    fontColor,
    options,
    correctAnswer:
      fontColor.name,
  };
}