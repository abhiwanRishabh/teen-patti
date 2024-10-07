import './App.css'
import { Route, Switch, } from 'react-router-dom';
import SplashScreen from './components/screens/SplashScreen'
import Home from './pages/Home.jsx';
import { useEffect } from 'react';
import Game from './pages/Game.jsx';
import HomeLayout from './components/layout/HomeLayout.jsx';
import { GameSound } from './utils/sound.js';

export const gameSound = new GameSound();

function App() {

  useEffect(() => {
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      img.setAttribute("draggable", false);
    });
  }, []);

  return (
    <div className={`w-full h-screen bgImg`} >
      {/* <Routes> */}
      <Switch>
        <Route exact path='/' >
          <HomeLayout>
            <SplashScreen />
          </HomeLayout>
        </Route>

        <Route exact path='/home' >
          <HomeLayout>
            <Home />
          </HomeLayout>
        </Route>

        <Route exact path='/game' >
          <Game />
        </Route>
        {/* </Routes> */}
      </Switch>
    </div>
  )
}

export default App
