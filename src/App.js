/*eslint-disable*/

import React, { useEffect, useState } from "react";
import red from "./images/red.png";
import green from "./images/green.png";
import blue from "./images/blue.png";
import orange from "./images/orange.png";
import purple from "./images/purple.png";
import yellow from "./images/yellow.png";
import blank from "./images/blank.png";
import ScoreBoard from "./components/ScoreBoard";

const WIDTH = 8;
const COLORS = [red, green, blue, orange, purple, yellow];

export default function App() {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForColumnOfThree();
      checkForRowOfFour();
      checkForRowOfThree();
      moveIntoSquareBelow();

      setCurrentColorArrangement([...currentColorArrangement]);
    }, 1000);

    return () => clearInterval(timer);
  }, [
    checkForRowOfThree,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForColumnOfFour,
    moveIntoSquareBelow,
    currentColorArrangement,
  ]);

  function createBoard() {
    const randomColorArrangement = [];
    for (let i = 0; i < WIDTH * WIDTH; i++) {
      const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      randomColorArrangement.push(randomColor);
    }

    setCurrentColorArrangement(randomColorArrangement);
  }

  function checkForColumnOfThree() {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + WIDTH, i + WIDTH * 2];
      const decidedColor = currentColorArrangement[i];

      if (
        columnOfThree.every(
          (square) => currentColorArrangement[square] === decidedColor
        )
      ) {
        columnOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  }

  function checkForColumnOfFour() {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + WIDTH, i + WIDTH * 2, i + WIDTH * 3];
      const decidedColor = currentColorArrangement[i];

      if (
        columnOfFour.every(
          (square) => currentColorArrangement[square] === decidedColor
        )
      ) {
        columnOfFour.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  }

  function checkForRowOfThree() {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      if (notValid.includes(i)) continue;
      if (
        rowOfThree.every(
          (square) => currentColorArrangement[square] === decidedColor
        )
      ) {
        rowOfThree.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  }

  function checkForRowOfFour() {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];

      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (square) => currentColorArrangement[square] === decidedColor
        )
      ) {
        rowOfFour.forEach(
          (square) => (currentColorArrangement[square] = blank)
        );
        return true;
      }
    }
  }

  function moveIntoSquareBelow() {
    const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];

    for (let i = 0; i < 64 - WIDTH; i++) {
      const isFirstRow = firstRow.includes(i);
      if (isFirstRow && currentColorArrangement[i] === blank) {
        currentColorArrangement[i] =
          COLORS[Math.floor(Math.random() * COLORS.length)];
      }
      if (currentColorArrangement[i + WIDTH] === blank) {
        currentColorArrangement[i + WIDTH] = currentColorArrangement[i];
        currentColorArrangement[i] = blank;
      }
    }
  }

  function dragStart(e) {
    console.log(e.target);
    setSquareBeingDragged(e.target);
  }

  function dragDrop(e) {
    console.log("Drag Drop");
    setSquareBeingReplaced(e.target);
  }

  function dragEnd() {
    console.log("Drag End");
    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data_id")
    );
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute("data_id")
    );

    currentColorArrangement[squareBeingReplacedId] =
      squareBeingDragged.getAttribute("src");

    currentColorArrangement[squareBeingDraggedId] =
      squareBeingReplaced.getAttribute("src");

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + WIDTH,
      squareBeingDraggedId - WIDTH,
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);

    const isAColumnOfFour = checkForColumnOfFour();
    const isARowOfFour = checkForRowOfFour();
    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfThree = checkForRowOfThree();
    let scoreInc = 0;
    if (
      squareBeingReplacedId &&
      validMove &&
      (isAColumnOfFour || isAColumnOfThree || isARowOfFour || isARowOfThree)
    ) {
      if (isAColumnOfFour || isARowOfFour) {
        scoreInc = 4;
      } else {
        scoreInc = 3;
      }
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
      setScore((prevScore) => prevScore + scoreInc);
    } else {
      currentColorArrangement[squareBeingDraggedId] =
        squareBeingDragged.getAttribute("src");
      currentColorArrangement[squareBeingReplacedId] =
        squareBeingReplaced.getAttribute("src");

      setCurrentColorArrangement([...currentColorArrangement]);
    }
  }

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img
            src={candyColor}
            key={index}
            alt={candyColor}
            data_id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
      <ScoreBoard score={score} />
    </div>
  );
}
