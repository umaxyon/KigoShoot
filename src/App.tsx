import { useEffect } from 'react'
import './App.css'
import Phaser from "phaser";
import MainScene from "./scenes/MainScene";
import TitleScene from './scenes/TitleScene';
import ImgHolder from './core/ImgHolder';


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
          gravity: { y: 0 },
        },
      },
      scene: [TitleScene, MainScene],
    };
    const game = new Phaser.Game(config);
    game.scene.start('titlescene', { imgs: new ImgHolder() })
  }, [0])

  return <div id="phaser-game" />
}

export default App
