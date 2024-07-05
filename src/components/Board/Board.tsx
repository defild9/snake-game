import React from "react";
import "./styles.css";

interface BoardProps {
  snake: number[][];
  food: number[];
  foodType: number;
}

const Board: React.FC<BoardProps> = ({ snake, food, foodType }) => {
  const size = 20;
  const renderCells = () => {
    const cells = [];

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        let cellType = "";

        if (snake.some((segment) => segment[0] === row && segment[1] === col)) {
          cellType = "snake";
        } else if (food[0] === row && food[1] === col) {
          if (foodType === 1) {
            cellType = "food1";
          } else if (foodType === 5) {
            cellType = "food5";
          } else if (foodType === 10) {
            cellType = "food10";
          }
        }

        cells.push(
          <div key={`${row}-${col}`} className={`cell ${cellType}`}></div>
        );
      }
    }

    return cells;
  };

  return <div className="board">{renderCells()}</div>;
};

export default Board;
