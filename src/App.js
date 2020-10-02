import React, { useState, useEffect } from "react";
import "./App.css";

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function App() {
  const [player, setPlayer] = useState("X");
  const [moves, setMoves] = useState(Array.from({ length: 9 }));
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);

  useEffect(() => {
    if (
      winConditions.some((row) => {
        const map = row.map((i) => moves[i]);
        return (
          map.every((move) => move === "X") || map.every((move) => move === "O")
        );
      })
    ) {
      setWinner(player === "X" ? "O" : "X");
    } else if (moves.every((move) => move != null)) {
      setDraw(true);
    }
  }, [moves, player]);

  return (
    <div className="container">
      <div className="game-board">
        {moves.map((_, index) => (
          <div
            key={index}
            className="box"
            onClick={() => {
              if (!winner) {
                setMoves((state) => {
                  if (!state[index]) {
                    state[index] = player;
                  }
                  return state;
                });
                setPlayer((prevState) => (prevState === "X" ? "O" : "X"));
              }
            }}
          >
            {moves[index]}
          </div>
        ))}
        {!draw && winner && <p>Winner: {winner}</p>}
        {draw && <p>Draw!</p>}
        {(winner || draw) && (
          <button
            style={{ textAlign: "center" }}
            onClick={() => {
              setMoves(Array.from({ length: 9 }));
              setWinner(null);
              setDraw(false);
            }}
          >
            RESET
          </button>
        )}
      </div>
    </div>
  );
}
