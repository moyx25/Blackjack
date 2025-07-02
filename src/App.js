import stand from './stand.png';
import hit from './hit.png';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() 
{
  const [choice, setChoice] = useState(true);
  const [value, setValue] = useState(0);
  const [count, setCount] = useState(0);
  const[symbol, setSymbol] = useState(0);
    // Esto actúa como el "loop"
  useEffect(() => {
    if (choice && value < 21) 
    {
      console.log("Jugando... valor actual:", value);
      // Aquí puedes hacer cualquier lógica que necesites mientras continúa
    } 
    else 
    {
      console.log("Juego terminado");
    }
  }, [choice, value]);

  const [cards, setCards] = useState([]);

  const handleHit = () => {
  const val = Math.floor(Math.random() * 13) + 1;
  const symb = Math.floor(Math.random() * 4);
  setValue(v => v + Math.min(val, 10));  // J, Q, K valen 10
  setCount(c => c + 1);
  setCards(prev => [...prev, { value: val, symbol: symb }]);
};
  

  const handleStand = () => { 
    setChoice(false); // Finaliza el juego
  };
  return (
      <div className='App'> 

      {cards.map((card, index) => (
          <CardImage 
            key={index} 
            value={card.value} 
            symbol={card.symbol} 
            pos={index * 25} 
          />
          ))}   
      {choice && value < 21 ? (
        <>
          <button onClick={handleHit}
          style={{
          background: 'none',
          border: 'none',
          position: 'absolute',
          top : '360px',
          left : '35%',
          width : '100px',
          height: '15px',
          cursor: 'pointer',    
          }}> 
          <img src = {hit}
          alt = "hit"
          style={{width: '70px', height : '70px'}}
          >
          </img>   
          </button>

          <button onClick={handleStand}
          style={{
          background: 'none',
          border: 'none',
          position: 'absolute',
          top : '363px',
          left : '28%',
          width : '100px',
          height: '18px',
          cursor: 'pointer',  
          }}>      
          <img src = {stand}
          alt = "stand"
          style={{width: '70px', height : '64px'}}
          >
          </img>        
          </button>  

            
        </>
      ) : (
        <p className = "App-end-text">        
          Game Over!
        </p>
      )}
    </div>
  ) 
}


function adjustForAces(total, aceCount) {
  while (total > 21 && aceCount > 0) {
    total -= 10;
    aceCount--;
  }
  return { total, aceCount };
}




function CardImage({value, symbol, pos})
{
    const gameOver = value > 21 || !value;
    const position = 600 + pos;
   if (value === 1 && symbol === 0)
   {
    return(
      <img
      src = "cards/Aclubs.jpg"
      alt = "Aclubs"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 2 && symbol === 0)
   {
      return(
      <img
      src = "/cards/2clubs.png"
      alt = "2clubs"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 3 && symbol === 0)
   {
      return(
      <img
      src = "/cards/3clubs.png"
      alt = "3clubs"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 4 && symbol === 0)
   {
    return(
      <img
      src = "/cards/4clubs.png"
      alt = "4clubs"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 5 && symbol === 0)
   {
    return(
      <img
      src = "/cards/5clubs.png"
      alt = "5clubs"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 6 && symbol === 0)
   {
    return(
      <img
      src = "/cards/6clubs.png"
      alt = "6clubs"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 7 && symbol === 0)
   {
    return(
      <img
      src = "/cards/7clubs.png"
      alt = "7clubs"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 8 && symbol === 0)
   {
    return(
      <img
      src = "/cards/8clubs.png"
      alt = "8clubs"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 9 && symbol === 0)
   {
    return(
      <img
      src = "/cards/9clubs.png"
      alt = "9clubs"
      className={"App-cards-user"}
      style={{
      left:`${position}px`,
      }}
      />
    )
   }
   else if (value === 10 && symbol === 0)
   {
    return(
      <img
      src = "/cards/10clubs.png"
      alt = "10clubs"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 11 && symbol === 0)
   {
    return(
      <img
      src = "/cards/Jclubs.png"
      alt = "Jclubs"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 12 && symbol === 0)
   {
    return(
      <img
      src = "/cards/Qclubs.png"
      alt = "Qclubs"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 13 && symbol === 0)
   {
    return(    
      <img
      src = "/cards/Kclubs.png"
      alt = "Kclubs"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 1 && symbol === 1)
   {
    return(
      <img
      src = "/cards/Adiamonds.jpg"
      alt = "Adiamonds"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 2 && symbol === 1)
   {
    return(
      <img
      src = "/cards/2diamonds.png"
      alt = "2diamonds"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 3 && symbol === 1)
   {
    return(
      <img
      src = "/cards/3diamonds.png"
      alt = "3diamonds"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 4 && symbol === 1)
   {
    return(
      <img
      src = "/cards/4diamonds.png"
      alt = "4diamonds"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 5 && symbol === 1)
   {
    return(
      <img
      src = "/cards/5diamonds.png"
      alt = "5diamonds"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 6 && symbol === 1)
   {
    return(
      <img
      src = "/cards/6diamonds.png"
      alt = "6diamonds"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 7 && symbol === 1)
   {
    return(
      <img
      src = "/cards/7diamonds.png"
      alt = "7diamonds"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 8 && symbol === 1)
   {
    return(
      <img
      src = "/cards/8diamonds.png"
      alt = "8diamonds"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 9 && symbol === 1)
   {
    return(
      <img
      src = "/cards/9diamonds.png"
      alt = "9diamonds"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 10 && symbol === 1)
   {
    return(
      <img
      src = "/cards/10diamonds.png"
      alt = "10diamonds"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 11 && symbol === 1)
   {
    return(
      <img
      src = "/cards/Jdiamonds.png"
      alt = "Jdiamonds"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 12 && symbol === 1)
   {
    return(
      <img
      src = "/cards/Qdiamonds.png"
      alt = "Qdiamonds"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 13 && symbol === 1)
   {
    return(
      <img
      src = "/cards/Kdiamonds.png"
      alt = "Kdiamonds"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 1 && symbol === 2)
   {
    return(
      <img
      src = "/cards/Ahearts.jpg"
      alt = "Ahearts"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 2 && symbol === 2)
   {
    return(
      <img
      src = "/cards/2hearts.png"
      alt = "2hearts"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 3 && symbol === 2)
   {
    return(
      <img
      src = "/cards/3hearts.png"
      alt = "3hearts"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 4 && symbol === 2)
   {
    return(
      <img
      src = "/cards/4hearts.png"
      alt = "4hearts"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 5 && symbol === 2)
   {
    return(
      <img
      src = "/cards/5hearts.png"
      alt = "5hearts"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 6 && symbol === 2)
   {
    return(
      <img
      src = "/cards/6hearts.png"
      alt = "6hearts"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 7 && symbol === 2)
   {
    return(
      <img
      src = "/cards/7hearts.png"
      alt = "7hearts"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 8 && symbol === 2)
   {
    return(
      <img
      src = "/cards/8hearts.png"
      alt = "8hearts"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 9 && symbol === 2)
   {
    return(
      <img
      src = "/cards/9hearts.png"
      alt = "9hearts"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 10 && symbol === 2)
   {
    return(
      <img
      src = "/cards/10hearts.png"
      alt = "10hearts"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 11 && symbol === 2)
   {
    return(
      <img
      src = "/cards/Jhearts.png"
      alt = "Jhearts"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 12 && symbol === 2)
   {
    return(
      <img
      src = "/cards/Qhearts.png"
      alt = "Qhearts"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 13 && symbol === 2)
   {
    return(
      <img
      src = "/cards/Khearts.png"
      alt = "Khearts"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 1 && symbol === 3)
   {
    return(
      <img
      src = "/cards/Aspades.jpg"
      alt = "Aspades"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 2 && symbol === 3)
   {
    return(
      <img
      src = "/cards/2spades.png"
      alt = "2spades"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 3 && symbol === 3)
   {
    return(
      <img
      src = "/cards/3spades.png"
      alt = "3spades"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 4 && symbol === 3)
   {
    return(
      <img
      src = "/cards/4spades.png"
      alt = "4spades"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 5 && symbol === 3)
   {
    return(
      <img
      src = "/cards/5spades.png"
      alt = "5spades"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 6 && symbol === 3)
   {
    return(
      <img
      src = "/cards/6spades.png"
      alt = "6spades"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 7 && symbol === 3)
   {
    return(
      <img
      src = "/cards/7spades.png"
      alt = "7spades"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 8 && symbol === 3)
   {
    return(
      <img
      src = "/cards/8spades.png"
      alt = "8spades"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 9 && symbol === 3)
   {
    return(
      <img
      src = "/cards/9spades.png"
      alt = "9spades"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 10 && symbol === 3)
   {
    return(
      <img
      src = "/cards/10spades.png"
      alt = "10spades"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 11 && symbol === 3)
   {
    return(
      <img
      src = "/cards/Jspades.png"
      alt = "Jspades"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 12 && symbol === 3)
   {
    return(
      <img
      src = "/cards/Qspades.png"
      alt = "Qspades"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
   else if (value === 13 && symbol === 3)
   {
    return(
      <img 
      src = "/cards/Kspades.png"
      alt = "Kspades"
      className={"App-cards-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
}
export default App;
