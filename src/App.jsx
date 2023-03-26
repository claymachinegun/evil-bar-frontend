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
    <div >
      <h1>{position.id}</h1>
      <Board whiteMove={`${position.moveSide == "WHITE" ? 1 : 0}`} position={position.position} />
      <button className="bg-blue-800 text-white" onClick={nextButton} >UPDATE</button>
    </div>
  )
}

export default App
