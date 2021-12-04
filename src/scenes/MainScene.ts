import Phaser from "phaser"
import KeyProcessor from "../core/KeyProcessor"
import ImgHolder from "../core/ImgHolder"

class MainScene extends Phaser.Scene {
    keyPrc: KeyProcessor
    imgs: ImgHolder
    chrGroup?: Phaser.Physics.Arcade.Group

    constructor() {
        super({ key: 'mainscene' })
        this.keyPrc = new KeyProcessor(this)
        this.imgs = new ImgHolder(this)
    }
    
    preload() {
        this.imgs.load()
        this.chrGroup = this.physics.add.group()

        this.keyPrc.attachEvent().addListner((keyCode: number, pressShift: boolean) => {
            const asciiCode = this.keyPrc.downKeyCodeToAscii(keyCode, pressShift)
            console.log(`${keyCode}: ${String.fromCharCode(asciiCode)}`)
        })
    }
    
    create() {
        this.add.image(400, 300, "sky");
        this.add.image(400, 600, "line")
        this.add.image(400, 550, 'senkan').setScale(0.7)


        while (this.chrGroup!.countActive(true) < 4) {
            this.createEnemy()
        }

        // const particles = this.add.particles("red");

        // const emitter = particles.createEmitter({
        //     speed: 100,
        //     scale: { start: 1, end: 0 },
        //     blendMode: "ADD",
        // });
        
        // const logo = this.physics.add.image(400, 100, "logo");

        // logo.setVelocity(100, 200);
        // logo.setBounce(1, 1);
        // logo.setCollideWorldBounds(true);

        // emitter.startFollow(logo);
    }

    createEnemy() {
        const code = this.keyPrc.getRundomKeyCode()
        const enemy = this.chrGroup!.create(Phaser.Math.Between(0, 800), -18, code).setScale(0.3);
        enemy.setName(code)
        enemy.setBounce(1)
        enemy.setCollideWorldBounds(false, 1, 0)
        enemy.setVelocity(Phaser.Math.Between(-80, 80), 25)
        enemy.allowGravity = false
    }
}

export default MainScene
