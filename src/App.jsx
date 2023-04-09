import React, { useState, useEffect } from "react";
import Board from "./Board.jsx";

function App() {
  const [position, setPosition] = useState({
    pos: { id: 0, moveSide: "WHITE", position: "q7/8/8/8/8/8/8/7Q" },
    checkResults: { correct: 1, realEval: 0 },
    showResults: 0,
  });

  const next = () => {
    return fetch("http://localhost:3000/api/random", {
      cache: "no-cache",
    }).then((response) => response.json());
  };

  const btnAction = (evaluation) => {
    fetch("http://localhost:3000/api/check", {
      method: "POST",
      body: JSON.stringify({
        id: position.pos.id,
        eval: evaluation,
      }),
    })
      .then((response) => response.json())
      .then((body) => {
        setPosition({
          ...position,
          checkResults: body,
          showResults: 1,
        });
      });
  };

  const nextButton = (e) => {
    next().then((body) =>
      setPosition({ ...position, showResults: 0, pos: body })
    );
  };

  useEffect(() => {
    let mounted = true;
    next().then((body) => {
      if (mounted) {
        setPosition({ ...position, showResults: 0, pos: body });
      }
    });
    return () => {
      mounted = false;
      return 1;
    };
  }, []);

  return (
    <div className="grid">
      <Board
        whiteMove={position.pos.moveSide === "WHITE" ? 1 : 0}
        position={position.pos.position}
      />
      <div className="grid">
        {position.showResults === 1 ? (
          <div
            className={`place-self-center border px-4 py-3 rounded relative w-11/12 lg:w-auto ${
              position.checkResults.correct === 1
                ? "bg-green-100 border-green-400 text-green-700"
                : "bg-red-100 border-red-400 text-red-700"
            }`}
          >
            <strong className="place-self-center">
              {position.checkResults.correct === 1 ? "Correct!" : "Wrong!"}
            </strong>
            <p>It is {position.checkResults.realEval}</p>
          </div>
        ) : (
          <div className="place-self-center">
            <button
              className="btn btn-white w-3/12 lg:w-auto"
              onClick={(e) => btnAction(1)}
            >
              White
            </button>
            <button
              className="btn btn-draw w-3/12 lg:w-auto"
              onClick={(e) => btnAction(0)}
            >
              Draw
            </button>
            <button
              className="btn btn-black w-3/12 lg:w-auto"
              onClick={(e) => btnAction(-1)}
            >
              Black
            </button>
          </div>
        )}
        <button
          className="place-self-center btn btn-default w-11/12 lg:w-auto"
          onClick={nextButton}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
