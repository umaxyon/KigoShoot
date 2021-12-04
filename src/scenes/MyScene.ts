import Phaser from "phaser"

class MyScene extends Phaser.Scene {
    private shiftPress: boolean = false

    constructor() {
        super({ key: 'myscene' });
    }
    
    preload() {
        this.load.setBaseURL("https://labs.phaser.io");

        this.load.image("sky", "assets/skies/space3.png");
        this.load.image("logo", "assets/sprites/phaser3-logo.png");
        this.load.image("red", "assets/particles/red.png");
    }
    
    create() {
        this.add.image(400, 300, "sky");

        const particles = this.add.particles("red");

        const emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: "ADD",
        });
        
        const logo = this.physics.add.image(400, 100, "logo");

        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        emitter.startFollow(logo);


        this.input.keyboard.on('keydown', (e: any) => {
            if (e.keyCode === 16) {  // 16 <- Shift
                this.shiftPress = true
            } else {
                console.log(`${e.keyCode}  shift=${this.shiftPress}`)
            }
        })

        this.input.keyboard.on('keyup', (e: any) => {
            if (e.keyCode === 16) {  // 16 <- Shift
                this.shiftPress = false
            }
        })
    }
}

export default MyScene
