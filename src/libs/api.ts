import axios from "axios";

export const addScore = async (name: string, score: number) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/add-scores`,
      {
        name,
        score,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding score:", error);
    throw error;
  }
};

export const getLeaderboard = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/leaderboard`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw error;
  }
};
