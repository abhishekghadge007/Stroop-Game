import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "../firebase";

export default function LeaderboardScreen({
  onBack,
}) {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const q = query(
        collection(db, "Leaderboard"),
        orderBy("score", "desc"),
        limit(10)
      );

      const snapshot =
        await getDocs(q);

      const leaderboard =
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      setScores(leaderboard);
    };

    fetchScores();
  }, []);

  return (
    <div className="container">
      <div className="start-card">
        <h1>🏆 Leaderboard</h1>

        {scores.length === 0 ? (
          <p>No scores yet.</p>
        ) : (
          scores.map(
            (player, index) => (
              <div
                key={player.id}
                style={{
                  margin: "10px 0",
                  padding: "10px",
                  border:
                    "1px solid #ccc",
                  borderRadius: "10px",
                }}
              >
                <b>
                  #{index + 1}
                </b>{" "}
                {player.name}

                <br />

                Score:
                {" "}
                {player.score}

                <br />

                Difficulty:
                {" "}
                {player.difficulty}
              </div>
            )
          )
        )}

        <button
          className="start-btn"
          onClick={onBack}
        >
          ⬅ Back
        </button>
      </div>
    </div>
  );
}