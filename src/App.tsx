import React, { useEffect, useState } from 'react';
import "nes.css/css/nes.min.css";
import './App.css';
import Mapper from './Mapper';
import Countdown, {  CountdownApi } from 'react-countdown';

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [date, setDate] = useState<number|undefined>();
  const [score, setScore] = useState(0);
  const [completeMessage, setCompleteMessage] = useState('');
  const [countdownApi, setCountdownApi] = useState<CountdownApi>();

  function start() {
    setDate(Date.now() + 30000);
    setIsStarted(true);
  }

  function restart() {
    setScore(0);
    setCompleteMessage('')
    setIsCompleted(false);
    countdownApi?.stop();
    countdownApi?.start();
  }

  function complete() {
    setIsCompleted(true);
    if (score === 1000) {
      setCompleteMessage("Perfect!");
    } else if (score >= 700) {
      setCompleteMessage("Excellent!");
    } else if (score >= 500) {
      setCompleteMessage("Awesome!");
    } else {
      setCompleteMessage("Try harder next time.");
    }
  }

  useEffect(() => {
    if (score === 1000) {
      countdownApi?.pause();
      complete();
    }
  });

  return (
    <div className={`App ${isStarted ? "start" : "ready"} ${isCompleted ? "complete" : ""}`}  onDragStart={(e) => e.preventDefault()}>
      <div className="background-img"></div>
      <div className="map-container">
        <Mapper
          disabled={!isStarted || isCompleted}
          score={score => setScore(score * 100)}
        />
        {isStarted && <div>
          <Countdown
            ref={countdown => setCountdownApi(countdown?.getApi())}
            date={date}
            renderer={({ seconds, formatted }) => {
              return <div className={`timer nes-text ${seconds <= 5 ? "is-error" : "is-warning"}`}>
                {formatted.minutes}:{formatted.seconds}
              </div>;
            }}
            onComplete={complete}
          />
          <div className="score nes-text is-success"><i className="nes-icon trophy"></i> {score}</div>
        </div>}
      </div>
      <div className="overlay">
        <div className="overlay-content">
          <div className="nes-container with-title is-centered is-rounded is-dark">
            <p className="title">Raymond's Ward Safety</p>
            <div className="description nes-text is-disabled">
              {isCompleted && <div>
                  <p>You've got <span className="nes-text is-success">{score}</span> points.</p>
                  <p>{completeMessage}</p>
                  <button type="button" className="nes-btn is-warning start" onClick={restart}>TRY AGAIN</button>
                </div>}
              {!isCompleted && <div>
                <p>There are 10 problems in the picture.</p>
                <p>Can you spot them in 30 seconds?</p>
                <button type="button" className="nes-btn is-warning start" onClick={start}>START</button>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
