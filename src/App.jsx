import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Board from './Board.jsx'

function App() {
  const [position, setPosition] = useState({"id":0, "moveSide":"WHITE", "position":"q7/8/8/8/8/8/8/7Q"});
    /*
  useEffect(() => {
       fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
          .then((response) => response.json())
          .then((data) => {
             console.log(data);
             setPosts(data);
          });
    }, []);
*/

  const next = (()=>{
    return fetch("http://localhost:3000/random")
          .then(response => response.json());
  });

 
 const nextButton = (e) => {
    next().then((body) => setPosition(body));
 }

  useEffect(() => {
    let mounted = true;
    next()
      .then(body => {
        if(mounted) {
          setPosition(body)
        }
      })
    return () => mounted = false;
    }, []);

  return (
    <div className="grid">
      <Board whiteMove={`${position.moveSide == "WHITE" ? 1 : 0}`} position={position.position} />
        <div className="grid">
      <div className="place-self-center">
            <button className="btn btn-white w-3/12 lg:w-auto">White</button>
            <button className="btn btn-draw w-3/12 lg:w-auto">Draw</button>
            <button className="btn btn-black w-3/12 lg:w-auto">Black</button>
      </div>
            <button className="place-self-center btn btn-default w-11/12 lg:w-auto" onClick={nextButton}>Next</button>
        </div>
    </div>
  )
}

export default App
