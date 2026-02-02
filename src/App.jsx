import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import "./App.css";

const phrases = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Last chance!",
  "Surely not?",
  "You might regret this!",
  "Give it another thought!",
  "Are you absolutely certain?",
  "This could be a mistake!",
  "Have a heart!",
  "Don't be so cold!",
  "Change of heart?",
  "Wouldn't you reconsider?",
  "Is that your final answer?",
  "You're breaking my heart ;(",
];

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const yesButtonSize = noCount * 20 + 16;

  function handleNoClick() {
    setNoCount(noCount + 1);
    const audio = new Audio("https://www.myinstants.com/media/sounds/punch-gaming-sound-effect-hd_RzlG1GE.mp3");
    audio.play();
  }

  function getNoButtonText() {
    return phrases[Math.min(noCount, phrases.length - 1)];
  }

  function handleYesClick() {
    setYesPressed(true);
    const audio = new Audio("https://www.myinstants.com/media/sounds/i-love-you_1.mp3");
    audio.play();
    confetti({
      particleCount: 150,
      spread: 60,
      origin: { y: 0.6 },
    });
  }

  return (
    <div className="valentine-container">
      {yesPressed ? (
        <>
          <img
            src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
            alt="bears kissing"
            className="valentine-img"
          />
          <div className="text-4xl font-bold my-4">Yay!!!</div>
        </>
      ) : (
        <>
          <img
            src="https://media.tenor.com/VIChDQ6ejRQAAAAi/jumping-bear-hearts-no-png.gif"
            alt="bear with hearts"
            className="valentine-img"
          />
          <h1 className="text-4xl my-4">Will you be my Valentine, Bubu?</h1>
          <div className="button-container">
            <button
              className="yes-button"
              style={{ fontSize: yesButtonSize }}
              onClick={handleYesClick}
            >
              Yes
            </button>
            <button onClick={handleNoClick} className="no-button">
              {noCount === 0 ? "No" : getNoButtonText()}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
