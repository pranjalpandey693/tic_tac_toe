import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Square({value,onsclick}) {
  
  return <button style={{padding:'50px'}} className='square' 
        onClick={onsclick}
  >{value}</button>
}

 function Board({xisNext,squares,onplay}) {

  function hadleclick(i){
    if(squares[i]|| calculatewinner(squares)){
      return;
    }
const nextsqure = squares.slice()
if(xisNext){
nextsqure[i]="X" }
else 
nextsqure[i]="O"

onplay(nextsqure)
  }

  const winner = calculatewinner(squares)
  let status;
  if(winner){
    status = "Winner:" + winner;
  }
  else {
    status = "Next player" + (xisNext ? "X" : "O")
  }
  return (
    <>
    <div className='status'>{status}</div>
    <div className='board-row'>
      <Square value={squares[0]}  onsclick={()=>hadleclick(0)}/>
      <Square value={squares[1]} onsclick={()=>hadleclick(1)} />
      <Square value={squares[2]} onsclick={()=>hadleclick(2)} />
    </div>
    <div className='board-row'>
      <Square value={squares[3]} onsclick={()=>hadleclick(3)} />
      <Square value={squares[4]} onsclick={()=>hadleclick(4)} />
      <Square value={squares[5]} onsclick={()=>hadleclick(5)} />
    </div>
    <div className='board-row'>
      <Square value={squares[6]} onsclick={()=>hadleclick(6)} />
      <Square value={squares[7]} onsclick={()=>hadleclick(7)} />
      <Square value={squares[8]} onsclick={()=>hadleclick(8)} />
    </div>
   
    </>
  )
} 


function calculatewinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for(let i=0;i<lines.length;i++){
    const[a,b,c]= lines[i];
    if(squares[a]&& squares[a]===squares[b] && squares[a]===squares[c])
    return squares[a];
}
  
return null;
}

export default function Game() {

  const [ history, sethistory] = useState([Array(9).fill(null)])
  const [curentmove,setcurrentmove] = useState(0)
const xisNext = curentmove % 2 === 0
  const currentsquares = history[curentmove]
  

  function hadleplay(nextsqure){
    const nexthistory =[...history.slice(0,curentmove+1),nextsqure]
    sethistory(nexthistory);
    setcurrentmove(nexthistory.length-1);


  }
    function jumpto(nextmove){
      setcurrentmove(nextmove)


    }

    const moves = history.map((squares,move) => {
      let description
      if(move>0){
        description = 'Go to move #' + move;
      }
      else {
        description = 'Go to game start';
      }
      return ( 
        <li key={move}>
          <button onClick={()=> jumpto(move)}>{description}</button>
        </li>
      )
    })


  return(
    <>
    <div className='game'>
      <div className='game-board'>
        <Board xisNext={xisNext} squares={currentsquares} onplay={hadleplay} />
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
    </>
  )
}