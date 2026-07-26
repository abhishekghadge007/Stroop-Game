import { ACHIEVEMENTS } from "../data/achievements";

export const getTimeLimit = (
  score
) => {
  if (score >= 40) return 1.2;
  if (score >= 25) return 1.5;
  if (score >= 15) return 2;
  if (score >= 5) return 2.5;
  return 3;
};

export const getLevel = (
  score
) => {
  return (
    Math.floor(score / 10) + 1
  );
};

export const getAchievements = (
  score
) => {
  return ACHIEVEMENTS
    .filter(
      (item) =>
        score >= item.score
    )
    .map(
      (item) => item.title
    );
};