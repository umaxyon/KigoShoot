import { useEffect } from 'react'
import './App.css'
import Phaser from "phaser";
import MyScene from "./scenes/MyScene";


function App() {
  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: "phaser-game",
      width: 800,
      height: 600,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 200 },
        },
      },
      scene: MyScene,
    };
    new Phaser.Game(config);
  }, [0])

  return <div id="phaser-game" />
}

export default App
