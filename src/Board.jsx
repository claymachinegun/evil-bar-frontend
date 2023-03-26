import { useState } from 'react'


function BPiece(props) {
    var value = props.kind.toUpperCase();
    var color = "n";
    if(value === props.kind) {
        color = "w";
    } else {
        color = "b";
    }
    
    return (
        <img className="w-14" src={`pieces/${color}${value}.svg`}/>
    );
}

function BCell(props) {

    return (
        <div className={`inline-block w-14 h-14 ${props.shade == 1 ? "bg-sky-800" : "bg-sky-100"}`}>
        {props.piece && <BPiece kind={`${props.piece}`}/> }
        </div>
    );
}

function Board() {
  const [count, setCount] = useState(0)

  const whiteMove=0;

  const position = "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R";

  var pos = position;
  var piecesOnBoard = pos.split("/");
  if(whiteMove == 0){
    piecesOnBoard = piecesOnBoard.reverse();
  }
  
    piecesOnBoard = piecesOnBoard.map((x)=>{
    return x.split("").flatMap((z)=> {
        if(z.charAt(0) >= '0' && z.charAt(0) <= '9') {
            return Array(z.charAt(0) - '0').fill("");
        } else {
            return z;
        }
    });
  });

  let rows = [];
  
  for(var i = 0; i < 8; i++) {
    let squares = [];
    for(var j = 0; j < 8; j++){
        squares.push(<BCell shade={(i+j)%2 == whiteMove ? 1 : 0 } piece={piecesOnBoard[i][j]}></BCell>);
    }
    rows.push(<div className="h-14">{squares}</div>);
  }

  return (
    <div className="grid">
        <div className="place-self-center p-4">
            {rows}
        </div>

        <div className="place-self-center">
        <button className="btn btn-white">White</button>
        <button className="btn btn-draw">Draw</button>
        <button className="btn btn-black">Black</button>
        <button className="btn btn-default">Next</button>
        </div>
    </div>
  );
}

export default Board
