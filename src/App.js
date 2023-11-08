import { useState } from "react";
import StartUp from "./components/StartUp";
import Game from "./components/Game";
import ScoreBoard from "./components/ScoreBoard";
import GameName from "./components/GameName";
import MenuButton from "./components/MenuButton";
import useSound from "use-sound";
import mySound from "./sounds/piano.mp3";

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [playSound] = useSound(mySound);
  function onStartUp() {
    setIsStarted(true);
    playSound();
  }

  function handleExit() {
    window.close();
  }

  function handleRefresh() {
    setIsStarted(false);
  }

  const [score, setScore] = useState(0);

  return (
    <div className="app">
      {isStarted ? (
        <>
          <GameName />
          <MenuButton buttonText={"Refresh"} onClick={handleRefresh} />
          <ScoreBoard score={score} />
          <MenuButton buttonText={"End"} onClick={handleExit} />
          <Game setScore={setScore} />
        </>
      ) : (
        <StartUp handleStartUp={onStartUp} />
      )}
    </div>
  );
}
