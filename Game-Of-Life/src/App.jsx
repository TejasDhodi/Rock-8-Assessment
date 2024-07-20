import React, { useState, useCallback, useRef, useEffect } from "react";
import Modal from "./Components/Modal";

const numRows = 30;
const numCols = 30;

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

const generateRandomGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0)));
  }
  return rows;
};

const App = () => {
  const [grid, setGrid] = useState(generateEmptyGrid);
  const [running, setRunning] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    console.log("Game Started!");
    setShowModal(false);
  }

  const runningRef = useRef(running);
  runningRef.current = running;

  const neighbors = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
  ];

  const startGame = () => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  }

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;

    setGrid((g) => {
      const newGrid = g.map((row, i) =>
        row.map((col, j) => {
          let neighborsCount = 0;
          neighbors.forEach(([x, y]) => {
            const newI = i + x;
            const newJ = j + y;
            if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
              neighborsCount += g[newI][newJ];
            }
          });

          if (g[i][j] === 1 && (neighborsCount < 2 || neighborsCount > 3)) {
            return 0;
          }
          if (g[i][j] === 0 && neighborsCount === 3) {
            return 1;
          }
          return g[i][j];
        })
      );
      return newGrid;
    });

    setTimeout(() => {
      // Check if the grid is empty
      const isEmpty = grid.every((row) => row.every((cell) => cell === 0));
      if (isEmpty) {
        setRunning(false);
      } else {
        runSimulation();
      }
    }, 100);
  }, [grid]);

  useEffect(() => {
    if (running) {
      runSimulation();
    }
  }, [running, runSimulation]);

  useEffect(() => {
    setShowModal(true);
  }, [])

  return (
    <div>

      <div className="title">
        <h1>Game Of Life</h1>
      </div>
      <div className="grid"
        style={{ gridTemplateColumns: `repeat(${numCols}, 20px)` }}
      >
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => {
                const newGrid = grid.map((row, rowIndex) =>
                  row.map((cell, colIndex) => {
                    if (i === rowIndex && j === colIndex) {
                      return cell ? 0 : 1;
                    }
                    return cell;
                  })
                );
                setGrid(newGrid);
              }}
              className={`cell ${grid[i][j] ? "alive" : "dead"}`}
            />
          ))
        )}
      </div>

      <div className="gameControls">
        <button className={running? 'red' :'green'} onClick={() => startGame()}> {running ? "Stop" : "Start"} </button>
        <button onClick={() => setGrid(generateRandomGrid())}>Random</button>
        <button onClick={() => setGrid(generateEmptyGrid())}>Clear</button>
      </div>

      <Modal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default App;
