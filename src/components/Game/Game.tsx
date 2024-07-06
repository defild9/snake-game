import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/store";
import {
  setPoints,
  setSnake,
  setFood,
  setFoodType,
  setDirection,
  setSpeed,
  setIsPaused,
  setIsGameOver,
  fetchLeaderboard,
  saveScore,
  setPlayerName,
} from "../../store/reducers/gameReducer";
import Board from "../Board/Board";
import Leaderboard from "../Leaderboard/Leaderboard";

const getRandomPosition = () => {
  return [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];
};

const foodTypes = [1, 5, 10];

const Game: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    playerName,
    points,
    snake,
    food,
    foodType,
    direction,
    speed,
    isPaused,
    isGameOver,
  } = useAppSelector((state) => state.game);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === " ") {
      dispatch(setIsPaused(!isPaused));
    }
    if (!isPaused && !isGameOver) {
      switch (e.key) {
        case "ArrowUp":
          dispatch(setDirection("UP"));
          break;
        case "ArrowDown":
          dispatch(setDirection("DOWN"));
          break;
        case "ArrowLeft":
          dispatch(setDirection("LEFT"));
          break;
        case "ArrowRight":
          dispatch(setDirection("RIGHT"));
          break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isPaused, isGameOver]);

  useEffect(() => {
    if (isPaused || isGameOver) return;

    const moveSnake = () => {
      const newSnake = [...snake];
      const head = [...newSnake[0]];

      switch (direction) {
        case "UP":
          head[0] -= 1;
          break;
        case "DOWN":
          head[0] += 1;
          break;
        case "LEFT":
          head[1] -= 1;
          break;
        case "RIGHT":
          head[1] += 1;
          break;
      }

      newSnake.unshift(head);

      if (head[0] === food[0] && head[1] === food[1]) {
        dispatch(setPoints(points + foodType));
        dispatch(setFood(getRandomPosition()));
        const nextFoodTypeIndex =
          (foodTypes.indexOf(foodType) + 1) % foodTypes.length;
        dispatch(setFoodType(foodTypes[nextFoodTypeIndex]));
      } else {
        newSnake.pop();
      }

      if (
        head[0] < 0 ||
        head[0] >= 20 ||
        head[1] < 0 ||
        head[1] >= 20 ||
        newSnake
          .slice(1)
          .some((segment) => segment[0] === head[0] && segment[1] === head[1])
      ) {
        dispatch(setIsGameOver(true));
        dispatch(saveScore(playerName, points));
        return;
      }

      dispatch(setSnake(newSnake));

      if (points > 0 && points % 50 === 0) {
        const newSpeed = Math.max(speed - 20, 50);
        dispatch(setSpeed(newSpeed));
      }
    };

    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [
    snake,
    direction,
    speed,
    points,
    food,
    foodType,
    isPaused,
    isGameOver,
    dispatch,
    playerName,
  ]);

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  const handleRestart = () => {
    dispatch(setPoints(0));
    dispatch(setSnake([[10, 10]]));
    dispatch(setFood(getRandomPosition()));
    dispatch(setFoodType(foodTypes[0]));
    dispatch(setDirection("RIGHT"));
    dispatch(setSpeed(200));
    dispatch(setIsPaused(false));
    dispatch(setIsGameOver(false));
    dispatch(setPlayerName(playerName));
  };

  return (
    <div>
      <h2>{playerName}</h2>
      <h3>Points: {points}</h3>
      {!isGameOver && (
        <button onClick={() => dispatch(setIsPaused(!isPaused))}>
          {isPaused ? "Resume" : "Pause"}
        </button>
      )}

      <Board snake={snake} food={food} foodType={foodType} />
      {isGameOver && (
        <div>
          <h3>Game Over!</h3>
          <button onClick={handleRestart}>Start Again</button>
          <Leaderboard />
        </div>
      )}
    </div>
  );
};

export default Game;
