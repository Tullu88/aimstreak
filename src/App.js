import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [startTime, setStartTime] = useState();
  const [diff, setDiff] = useState();
  const [gate, setGate] = useState(false);
  const [left, setLeft] = useState(Math.floor(Math.random() * 1000));
  const [top, setTop] = useState(Math.floor(Math.random() * 1000));
  const [endGame, setEndGame] = useState();
  const [reduce, setReduce] = useState();
  const [newGame, setNewGame] = useState();
  var goodCount = 0;
  var totalCount = 0;
  const [diffArray, setDiffArray] = useState([]);
  const [goodClicks, setGoodClicks] = useState();
  const [totalClicks, setTotalClicks] = useState();
  const [accuracy, setAccuracy] = useState();
  const [gameEnd, setGameEnd] = useState(true);
  const [count, setCount] = useState(0);
  var newDiff;

  const divStyle = {
    height: 20,
    width: 20,
    top: top,
    left: left,
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 10
  };

  useEffect(() => {
    document.addEventListener('click', calculateAccuracy);
    
      return () => { 
        console.log('remove');
        document.addEventListener('click', calculateAccuracy);
      
    };
  }, [gameEnd]);

  function calculateAccuracy (e) {
      if (e.target.matches('div.square')) {

        goodCount++;
        setGoodClicks(goodCount);

        totalCount++;
        setTotalClicks(totalCount);

      } else {

        totalCount++;
        setTotalClicks(totalCount);
      }
  }

 

  const handleClick = () => {
    setCount(count + 1);
    console.log(count);
    newDiff = (Date.now() - startTime);
    console.log('newDiff: ' + newDiff);
    

    setDiff(newDiff);
    console.log('diff: ' + diff)

    
    //console.log("diffArray: " + diffArray)

    if (newDiff !== undefined) {
    
      respawn();
    
    console.log(diffArray);
  }
    setStartTime(Date.now());
    console.log('good: ' + goodClicks + ' total: ' + totalClicks)
    //console.log(diffArray);
  }

  useEffect(() => {
    if (diff !== undefined) {
      setDiffArray(oldArray => [...oldArray, diff]);
      setTimeout(()=>{
        console.log("diffArray: " + diffArray)
      },250)
    }
  }, [count]);


  const gameReset = () => {
      
      setGameEnd(true);
      console.log('good2: ' + goodClicks + ' total2: ' + totalClicks)
      setAccuracy((goodClicks / totalClicks) * 100);
      //console.log(parseInt(accuracyValue));
      setEndGame(diffArray);
      setDiffArray([]);
      outputResults();
      setNewGame(true);
      setGate(!gate);
      return;
  }

  const outputResults = () => {
    const sum = diffArray.reduce((i,b) => i + b);
    const average = sum / diffArray.length;
    //console.log(reduce);
    setReduce(Math.trunc(average));
  }

  const startClick = () => {
    setGate(!gate);
    setGameEnd(false);
    if (newGame === true) {
      setDiffArray([]);
      setDiff();
      setReduce();
      setGoodClicks();
      setTotalClicks();
    }
    setNewGame(false);
    setStartTime(Date.now());
    setEndGame();
  }

  const respawn = (e) => {
    //console.log();
    setLeft(Math.random() * 1000);
    setTop(Math.random() * 700);

    if (diffArray !== undefined && diffArray.length === 5){
        gameReset();
      
    } 
  }

  return (
    <div className="App">
      <button onClick={startClick} className='button' disabled={gate}>{gate ? 'Stop' : 'Start'}</button>
        <div className ={endGame ? `results` : `no-results`}>
          <div className='average'>{reduce && <div>Average speed: {reduce}/ms</div>}
            <div className='accuracy'>{endGame && <div>{"Accuracy: " + Math.trunc(accuracy) + '%'}</div>}</div>
            <div className='endGame'>{endGame && endGame.map(e => <div key={e}>{e + '/ms '}</div>)}</div>
          </div>
        </div>
        <div style={{position:'absolute'}}>{gate && diff && <div>{diff}/ms</div>}</div>
        {/* <div>{diffArray && <div>{diffArray.map(e => e +'/ms ')}</div>}</div> */}
        
        {gate && <div className='square' onClick={handleClick} style={divStyle}></div>}
    </div>
  );
}

export default App;
