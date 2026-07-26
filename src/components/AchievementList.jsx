export default function AchievementList({
  achievements,
}) {
  if (achievements.length === 0)
    return null;

  return (
    <>
      <h3>🏅 Achievements</h3>

      <div className="achievement-list">
        {achievements.map(
          (item, index) => (
            <div
              key={index}
              className="achievement-badge"
            >
              {item}
            </div>
          )
        )}
      </div>
    </>
  );
}