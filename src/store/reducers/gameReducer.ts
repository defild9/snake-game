import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addScore, getLeaderboard } from "../../libs/api";
import { AppDispatch } from "../store";

interface GameState {
  playerName: string;
  points: number;
  snake: number[][];
  food: number[];
  foodType: number;
  direction: string;
  speed: number;
  isPaused: boolean;
  isGameOver: boolean;
  leaderboard: { name: string; score: number }[];
}

const initialState: GameState = {
  playerName: "",
  points: 0,
  snake: [[10, 10]],
  food: [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)],
  foodType: 1,
  direction: "RIGHT",
  speed: 200,
  isPaused: false,
  isGameOver: false,
  leaderboard: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setPlayerName(state, action: PayloadAction<string>) {
      state.playerName = action.payload;
    },
    setPoints(state, action: PayloadAction<number>) {
      state.points = action.payload;
    },
    setSnake(state, action: PayloadAction<number[][]>) {
      state.snake = action.payload;
    },
    setFood(state, action: PayloadAction<number[]>) {
      state.food = action.payload;
    },
    setFoodType(state, action: PayloadAction<number>) {
      state.foodType = action.payload;
    },
    setDirection(state, action: PayloadAction<string>) {
      state.direction = action.payload;
    },
    setSpeed(state, action: PayloadAction<number>) {
      state.speed = action.payload;
    },
    setIsPaused(state, action: PayloadAction<boolean>) {
      state.isPaused = action.payload;
    },
    setIsGameOver(state, action: PayloadAction<boolean>) {
      state.isGameOver = action.payload;
    },
    setLeaderboard(
      state,
      action: PayloadAction<{ name: string; score: number }[]>
    ) {
      state.leaderboard = action.payload;
    },
  },
});

export const {
  setPlayerName,
  setPoints,
  setSnake,
  setFood,
  setFoodType,
  setDirection,
  setSpeed,
  setIsPaused,
  setIsGameOver,
  setLeaderboard,
} = gameSlice.actions;

export const fetchLeaderboard = () => async (dispatch: AppDispatch) => {
  try {
    const leaderboard = await getLeaderboard();
    dispatch(setLeaderboard(leaderboard));
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
  }
};

export const saveScore =
  (name: string, score: number) => async (dispatch: AppDispatch) => {
    try {
      await addScore(name, score);
      dispatch(fetchLeaderboard());
    } catch (error) {
      console.error("Error saving score:", error);
    }
  };

export default gameSlice.reducer;
