import React from "react";

function BPiece(props) {
  const value = props.kind.toUpperCase();
  let color = "n";
  if (value === props.kind) {
    color = "w";
  } else {
    color = "b";
  }

  return <img className="w-fill" src={`pieces/${color}${value}.svg`} />;
}

function BCell(props) {
  return (
    <div
      className={`inline-block w-10 h-10 lg:w-14 lg:h-14 ${
        props.shade === 1 ? "bg-sky-800" : "bg-sky-100"
      }`}
    >
      {props.piece ? <BPiece kind={props.piece} /> : <span />}
    </div>
  );
}

function Board(props) {
  const whiteMove = props.whiteMove;
  const pos = props.position;

  let piecesOnBoard = pos.split("/");
  if (whiteMove == 0) {
    piecesOnBoard = piecesOnBoard.reverse();
  }

  piecesOnBoard = piecesOnBoard.map((x) => {
    return x.split("").flatMap((z) => {
      if (z.charAt(0) >= "0" && z.charAt(0) <= "9") {
        return Array(z.charAt(0) - "0").fill("");
      } else {
        return z;
      }
    });
  });

  const rows = [];

  for (let i = 0; i < 8; i++) {
    const squares = [];
    for (let j = 0; j < 8; j++) {
      squares.push(
        <BCell
          shade={(i + j) % 2 == whiteMove ? 1 : 0}
          piece={piecesOnBoard[i][j]}
        ></BCell>
      );
    }
    rows.push(<div className="h-10 lg:h-14">{squares}</div>);
  }

  return <div className="place-self-center p-4">{rows}</div>;
}

export default Board;
