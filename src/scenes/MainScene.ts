import Phaser from "phaser"
import KeyProcessor from "../core/KeyProcessor"
import ImgHolder from "../core/ImgHolder"
import Bullet from "../core/Bullet"

interface GameStatus {
    score: number,
    speed: number,
    maxEnemy: number
}

class MainScene extends Phaser.Scene {
    keyPrc: KeyProcessor
    imgs: ImgHolder
    walls?: Phaser.Physics.Arcade.StaticGroup
    ballets?: Phaser.Physics.Arcade.Group
    chrs?: Phaser.Physics.Arcade.Group
    senkan?: Phaser.Physics.Arcade.Image
    st: GameStatus
    labelScore?: Phaser.GameObjects.Text

    constructor() {
        super({ key: 'mainscene' })
        this.keyPrc = new KeyProcessor(this)
        this.imgs = new ImgHolder(this)
        this.st = this.initStatus()
    }
    
    initStatus(): GameStatus {
        return {
            score: 0,
            speed: 20,
            maxEnemy: 1
        }
    }

    preload() {
        this.imgs.load()
        this.walls = this.physics.add.staticGroup()
        this.chrs = this.physics.add.group()
        this.ballets = this.physics.add.group({ classType: Bullet, runChildUpdate: true })

        this.keyPrc.attachEvent().addListner((keyCode: number, pressShift: boolean) => {

            this.chrs?.children.iterate(enemy => {
                if (this.isTarget(enemy, keyCode, pressShift)) {
                    const bullet = this.ballets?.get().setActive(true).setVisible(true)
                    if (bullet) {
                        bullet.fire(this.senkan, enemy)
                        this.physics.add.overlap(enemy, bullet, (enemy: any, bullet: any) => {
                            if (enemy.active === true && bullet.active === true) {
                                enemy.destroy()
                                this.st.score += 10
                                this.labelScore!.setText(`Score: ${this.st.score}`)
                            }
                        })
                    }
                }
            })
        })
    }

    create() {
        this.add.image(400, 300, "sky")
        this.add.image(400, 600, "line")
        this.senkan = this.physics.add.image(400, 550, 'senkan').setScale(0.7)

        this.walls!.create(-15, 300, "wall")
        this.walls!.create(815, 300, "wall")

        this.labelScore = this.add.text(16, 560, `Score: 0`, { fontSize: '15px', color: '#022', fontStyle: 'bold', fontFamily: 'メイリオ' })

        this.physics.add.collider(this.chrs!, this.walls!)
    }

    createEnemy() {
        const code = this.keyPrc.getRundomKeyCode()
        const enemy = this.chrs!.create(Phaser.Math.Between(30, 770), -13, code).setScale(0.3)
        enemy.setName(code)
        enemy.setBounce(1)
        enemy.setCollideWorldBounds(false, 1, 0)
        enemy.setVelocity(Phaser.Math.Between(-80, 80), this.st.speed)
        enemy.allowGravity = false
        enemy.setVisible(true).setActive(true)
    }

    isTarget(enemy: Phaser.GameObjects.GameObject, keyCode: number, pressShift: boolean) {
        return parseInt(enemy.name) === this.keyPrc.downKeyCodeToAscii(keyCode, pressShift)
    }

    update() {
        while (this.chrs!.countActive(true) < this.st.maxEnemy) {
            this.createEnemy()
        }
    }
}

export default MainScene
