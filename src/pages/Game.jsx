import { useEffect, useRef, useState } from "react";
import RotateScreen from "../components/screens/RotateScreen";
import {
  enterFullScreen,
  // exitFullScreen
} from "../utils/fullScreen";
import GameBoard from "./gameBoard/GameBoard";



const Game = () => {
  const [orientation, setOrientation] = useState(
    window.screen.orientation.type
  );

  // fullscreen mode
  const gameContainerRef = useRef(null);

  const startFullScreen = () => {
    enterFullScreen(gameContainerRef.current);
  };

  // const endFullScreen = () => {
  //   exitFullScreen();
  // };

  useEffect(() => {
    const checkOrientation = () => {
      const currentOrientation = window.screen.orientation.type;
      setOrientation(currentOrientation);

      if (currentOrientation.startsWith("portrait")) {
        // alert('Please rotate your device to landscape mode for the best experience.');
      }
    };

    window.addEventListener("orientationchange", checkOrientation);

    checkOrientation();

    return () => {
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, [orientation]);

  useEffect(() => {
    // startFullScreen();
  }, []);

  return (
    <div ref={gameContainerRef}>
      {/* Game Board */}
      {orientation.startsWith("portrait") ? (
        <RotateScreen></RotateScreen>
      ) : (
        <GameBoard />
      )}
    </div>
  );
};

export default Game;
