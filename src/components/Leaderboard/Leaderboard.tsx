import React from "react";
import { useAppSelector } from "../../store/store";

const Leaderboard: React.FC = () => {
  const leaderboard = useAppSelector((state) => state.game.leaderboard);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map(
          (record: { name: string; score: number }, index: number) => (
            <li key={index}>
              {record.name}: {record.score} points
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Leaderboard;
