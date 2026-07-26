import { db } from "../firebase";

import { collection, addDoc, } from "firebase/firestore";

export async function saveScore(
  playerName,
  score,
  difficulty
) {
  try {
    await addDoc(
      collection(db, "leaderboard"),
      {
        name: playerName,
        score: score,
        difficulty: difficulty,
        createdAt: Date.now(),
      }
    );
  } catch (error) {
    console.error(error);
  }
}