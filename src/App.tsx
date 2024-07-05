import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "./store/store";
import { setPlayerName } from "./store/reducers/gameReducer";
import Game from "./components/Game/Game";

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playerName = useAppSelector((state) => state.game.playerName);
  const dispatch = useAppDispatch();

  const handleStartGame = () => {
    if (playerName.trim()) {
      setIsPlaying(true);
    }
  };

  return (
    <div>
      <h1>Snake Game</h1>
      {!isPlaying ? (
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => dispatch(setPlayerName(e.target.value))}
          />
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      ) : (
        <Game />
      )}
    </div>
  );
};

export default App;
