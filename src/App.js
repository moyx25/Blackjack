import Confetti from 'react-confetti';
import stand from './stand.png';
import hit from './hit.png';
import reset from './reset.png';
import win from './youwon.png';
import loss from './youlost.png';
import draw from './draw.png';
import './App.css';
import React, { useState, useEffect, useRef} from 'react';


function App() 
{
  const luigiSoundRef = useRef(null);
  const audioCache = useRef({});

useEffect(() => {
  const sounds = {
    win: '/sound effects/Luigi Oh Yeah.mp3',
    lose: '/sound effects/Luigi Oh No.mp3',
  };

  for (const [key, src] of Object.entries(sounds)) {
    const audio = new Audio(src);
    audio.load(); // precarga el audio
    audioCache.current[key] = audio;
  }
}, []);

  const playSound = (src) => {
  if (luigiSoundRef.current) {
    luigiSoundRef.current.pause();
    luigiSoundRef.current.currentTime = 0;
  }

  // Usa el audio cacheado si existe
  const cached = Object.values(audioCache.current).find(a => a.src.includes(src));
  const sound = cached ? cached.cloneNode() : new Audio(src);

  luigiSoundRef.current = sound;
  sound.play().catch(e => console.log("Sound blocked:", e));
};
  // Game control
  const [gameStarted, setGameStarted] = useState(false);
  //Const for user
  const [choice, setChoice] = useState(true);
  const [value, setValue] = useState(0);
  const [count, setCount] = useState(0);
  
  //Const for dealer
  const [dealerCards, setDealerCards] = useState([]);
  const [dealerValue, setDealerValue] = useState(0);
  const [dealerCount, setDealerCount] = useState(0);
  const [cards, setCards] = useState([]);

  //Const for dealer turn finished
  const [dealerFinished, setDealerFinished] = useState(false);

  //Const for confetti
  const [showConfetti, setShowConfetti] = useState(false);

  //Starting cards for the user
  useEffect(() => {
    let initialNumberCards = 0;
    while (initialNumberCards < 1)
    {
      let val = Math.floor(Math.random() * 13) + 1;
      let symb = Math.floor(Math.random() * 4);
      setValue(v => v + Math.min(val, 10));  
      setCount(c => c + 1);
      setCards(prev => [...prev, { value: val, symbol: symb }]);
      initialNumberCards = initialNumberCards + 1
     
    }
  }, []);

  //Starting card for the dealer
  useEffect(() => {
    let val = Math.floor(Math.random() * 13) + 1;
    let symb = Math.floor(Math.random() * 4);
    setDealerValue(v => v + Math.min(val, 10));  
    setDealerCount(c => c + 1);
    setDealerCards(prev => [...prev, { value: val, symbol: symb }]);
  }, []);

//Adjustment for A value

//User
useEffect(() => {
  let total = 0;
  let aceCount = 0;

  for (const card of cards) {
    if (card.value === 1) {
      total += 11;
      aceCount += 1;
    } else {
      total += Math.min(card.value, 10);
    }
  }

  while (total > 21 && aceCount > 0) {
    total -= 10;
    aceCount--;
  }

  setValue(total);
}, [cards]);

// Dealer
useEffect(() => {
  let total = 0;
  let aceCount = 0;

  for (const card of dealerCards) {
    if (card.value === 1) {
      total += 11;
      aceCount += 1;
    } else {
      total += Math.min(card.value, 10);
    }
  }

  while (total > 21 && aceCount > 0) {
    total -= 10;
    aceCount--;
  }

  setDealerValue(total);
}, [dealerCards]);

// Luigi Casino background music effect
useEffect(() => {
  const luigiMusic = new Audio('/music/LuigiCasinoMusic.mp3');
  luigiMusic.loop = true; // Loops music
  luigiMusic.volume = 0.5; //Volume Level

  // start the music on the first user click anywhere
  const playAudio = () => {
    luigiMusic.play().catch((e) => {
      console.log("Still blocked even after click:", e);
    });
    window.removeEventListener("click", playAudio);
  };

  window.addEventListener("click", playAudio);

  // cleanup on unmount
  return () => {
    luigiMusic.pause();
    luigiMusic.currentTime = 0; //Restart song from start
    window.removeEventListener("click", playAudio);
  };
}, []);
  
// Luigi voice lines

useEffect(() => {
  if (!dealerFinished || choice) return;

  const playerBusted = value > 21;
  const playerBlackjack = value === 21;
  const dealerBusted = dealerValue > 21;
  const dealerWins = dealerValue > value && dealerValue <= 21;
  const playerWins = value > dealerValue && value <= 21;

  const src =
    playerBusted || dealerWins
      ? '/sound effects/Luigi Oh No.mp3'
      : (playerBlackjack || playerWins || dealerBusted)
      ? '/sound effects/Luigi Oh Yeah.mp3'
      : null;

  if (src) {
    playSound (src);
  }

  //Confetti
  if (playerWins || playerBlackjack || dealerBusted) {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  } else {
    setShowConfetti(false);
  }
}, [dealerFinished, value, dealerValue, choice]);

// Card SFX
useEffect(() => {
  const cardSound = new Audio('/sound effects/CardSFX.mp3');
  cardSound.play().catch(() => {});
}, [count, dealerCount]);

//DraW SFX

useEffect(() => {
  if (!dealerFinished || choice) return;

  const isDraw = value === dealerValue;

  if (isDraw) {
    playSound('/sound effects/Luigi Okey-Dokey.mp3');
  }
}, [dealerFinished, value, dealerValue, choice]);

  
//Hit bottom action
  const handleHit = () => 
{
  let val = Math.floor(Math.random() * 13) + 1;
  let symb = Math.floor(Math.random() * 4);
  setCount(c => c + 1);
  setCards(prev => [...prev, { value: val, symbol: symb }]);
};
  
//Reset buttom
const handleReset = () => {
 if (luigiSoundRef.current) {
  luigiSoundRef.current.pause();
  luigiSoundRef.current.currentTime = 0;
}
  setChoice(true);
  setValue(0);
  setCount(0);
  setDealerCards([]);
  setDealerValue(0);
  setDealerCount(0);
  setCards([]);
  setDealerFinished(false);  

  let val1 = Math.floor(Math.random() * 13) + 1;
  let symb1 = Math.floor(Math.random() * 4);
  let val2 = Math.floor(Math.random() * 13) + 1;
  let symb2 = Math.floor(Math.random() * 4);

  setCount(2);
  setCards([
    { value: val1, symbol: symb1 },
    { value: val2, symbol: symb2 }
  ]);

  // Repartir carta al dealer
  let dealerVal = Math.floor(Math.random() * 13) + 1;
  let dealerSymb = Math.floor(Math.random() * 4);
  setDealerCount(1);
  setDealerCards([{ value: dealerVal, symbol: dealerSymb }]);
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Stand bottom 
const handleStand = async () => {
  setChoice(false);

  if (value > 21) {
    playSound('/sound effects/Luigi Oh No.mp3');
    setDealerFinished(true);
    return;
  }

  let dealerHand = [...dealerCards];
  let total = 0;
  let aceCount = 0;

  for (const card of dealerHand) {
    if (card.value === 1) {
      total += 11;
      aceCount++;
    } else {
      total += Math.min(card.value, 10);
    }
  }

  while (total < value && total < 21) {
    await delay(1200);
    let val = Math.floor(Math.random() * 13) + 1;
    let symb = Math.floor(Math.random() * 4);
    dealerHand.push({ value: val, symbol: symb });

    if (val === 1) {
      total += 11;
      aceCount++;
    } else {
      total += Math.min(val, 10);
    }

    // Ajustar A's si es necesario
    while (total > 21 && aceCount > 0) {
      total -= 10;
      aceCount--;
    }

    setDealerCards([...dealerHand]);
    setDealerCount(dealerHand.length);
  }

  // Ajustar por última vez por si ya no entra al loop
  while (total > 21 && aceCount > 0) {
    total -= 10;
    aceCount--;
  }

  setDealerValue(total);
  setDealerFinished(true);
};


//Detect when user goes above 21
useEffect(() => {
  if ((value >= 21) && choice) {
    handleStand();
  }
}, [value, choice]);

function renderGame() {
  return (

      <div className='App'>
        {showConfetti && <Confetti />}
      <div className="white-box-container">
        <div className="white-box"></div>
        <div className="white-box"></div>
      </div>
      <div className="card-container">
      {cards.map((card, index) => (  //Return for user
     
          <CardImage 
            key={index} 
            value={card.value} 
            symbol={card.symbol} 
            pos={index * 25} 
          />
          
          ))}
        </div>
      {choice
      ? dealerCards.length > 0 && (  //Initial return for dealer
        <div className="card-container">
      <CardImageDealer
        value={dealerCards[0].value}
        symbol={dealerCards[0].symbol}
        pos={0}
      />
      </div>
      )
       : dealerCards.map((card, index) => ( //Return dealer for the rest of the game
        <div className="card-container">
      <CardImageDealer
        key={`dealer-${index}`}
        value={card.value}
        symbol={card.symbol}
        pos={index * 25}
      />
      </div>
    ))}
      {choice && value < 21 ? (
        <>
          <button onClick={handleHit} //Handle buttom         
          className={'App-hit-bottom'}>
          <img src = {hit}
          alt = "hit"
          style={{width: '70px', height : '70px'}}>
          </img>   
          </button>

          <button onClick={handleStand} //Stand buttom
          className={'App-stand-bottom'}>     
          <img src = {stand}
          alt = "stand"
          style={{width: '70px', height : '64px'}}>
          </img>        
          </button>        
        </>
      ) : dealerFinished ?(
        <>
        {value === 21 && dealerValue === 21 ?(
        <img
        src = {draw}
        alt = 'draw'
        className={'App-result-text'}
        />
        ): value === 21 ?(
        <img
        src = {win}
        alt = 'youwon'
        className={'App-result-text'}
        />
      ) : dealerValue === 21?(
      <img
        src = {loss}
        alt = 'youlost'
        className={'App-result-text'}
        />   
        ): value > dealerValue && value < 21?(
        <img
        src = {win}
        alt = 'youwon'
        className={'App-result-text'}
        />
      ) : value < dealerValue && dealerValue < 21?(
        <img
        src = {loss}
        alt = 'youlost'
        className={'App-result-text'}
        />     
      ): dealerValue > 21?(
      <img
        src = {win}
        alt = 'youwon'
        className={'App-result-text'}
        />        
      ): dealerValue === value?(
      <img
        src = {draw}
        alt = 'draw'
        className={'App-result-text'}
        />   
      ):( 
        <img
        src = {loss}
        alt = 'youlost'
        className={'App-result-text'}/> 
      )}
      <button onClick={handleReset}  //Reset buttom
          className={'App-reset-bottom'}>
          <img src = {reset}
          alt = "reset"
          style={{width: '70px', height : '64 px'}}>
          </img>
          </button>   
      </>    
      ) : null}
    </div>
  );
}

//Return for the images of the cards and buttoms
return (
  <>
    {!gameStarted ? (
      <div className="App">
        <div className="App-welcome-screen">
        <h1>Welcome to Blackjack!</h1>
        <button onClick={() => setGameStarted(true)} className="App-start-button">
          Start Game
        </button>
      </div>
      </div>
    ) : (
      renderGame()
    )}
  </>
);
}

//Card selection 
//All the card and values with their respective images
//Surely there was a way to make it way shorter lol

function CardImage({value, symbol, pos})
{
    const gameOver = value > 21 || !value;
    const position = 640 + pos;
   if (value === 1 && symbol === 0)
   {
    return(
      <img
      src = "cards/Aclubs.jpg"
      alt = "Aclubs"
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
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
      className={"App-card-user"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
}


//Selection Card for the dealer
//I did a different section because they need to be located at a different height linked to App-cards-dealer
 function CardImageDealer({value,symbol,pos})
 {
    const position = 640 + pos;
   if (value === 1 && symbol === 0)
   {
    return(
      <img
      src = "cards/Aclubs.jpg"
      alt = "Aclubs"
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
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
      className={"App-card-dealer"}
      style={{
      left: `${position}px`,
      }}
      />
    )
   }
 }
 export default App;