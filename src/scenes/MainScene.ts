import Phaser from "phaser"
import KeyProcessor from "../core/KeyProcessor"
import ImgHolder from "../core/ImgHolder"
import Bullet from "../core/Bullet"

interface GameStatus {
    score: number,
    speed: number,
    maxEnemy: number,
    gameOver: boolean
}

class MainScene extends Phaser.Scene {
    keyPrc: KeyProcessor
    imgs?: ImgHolder
    walls?: Phaser.Physics.Arcade.StaticGroup
    ballets?: Phaser.Physics.Arcade.Group
    chrs?: Phaser.Physics.Arcade.Group
    senkan?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    line?: Phaser.Physics.Arcade.Image
    st?: GameStatus
    labelScore?: Phaser.GameObjects.Text

    constructor() {
        super({ key: 'mainscene' })
        this.keyPrc = new KeyProcessor(this)
    }
    
    initStatus(): GameStatus {
        return {
            score: 0,
            speed: 20,
            maxEnemy: 1,
            gameOver: false
        }
    }

    init(data: any) {
        this.imgs = data.imgs
    }

    preload() {
        this.imgs!.loadMain(this)
        this.st = this.initStatus()
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
                                this.st!.score += 10
                                this.st!.maxEnemy = Math.floor(this.st!.score / 100) + 1
                                this.labelScore!.setText(`Score: ${this.st!.score}`)
                            }
                        })
                    }
                }
            })
        })
    }

    create() {
        this.add.image(400, 300, "sky")
        this.line = this.physics.add.image(400, 600, "line")
        this.senkan = this.physics.add.sprite(400, 550, 'senkan').setScale(0.7)

        this.walls!.create(-15, 300, "wall")
        this.walls!.create(815, 300, "wall")

        this.labelScore = this.add.text(16, 560, `Score: 0`, { fontSize: '15px', color: '#022', fontStyle: 'bold', fontFamily: 'メイリオ' })

        this.physics.add.collider(this.chrs!, this.walls!)
        this.physics.add.overlap(this.chrs!, this.line!, () => {
            this.gameover()
        })

        this.anims.create({
            key: 'senkan_death',
            frames: this.anims.generateFrameNumbers('senkan', { start: 0, end: 6 }),
            frameRate: 15
        })
    }

    gameover() {
        this.senkan?.anims.play('senkan_death')
        this.st!.gameOver = true
        this.time.delayedCall(1000 , () => {
            this.add.image(400, 300, 'gameover')
            this.add.text(385, 285, String(this.st!.score), { fontSize: '30px', fontStyle: 'bold', color: '#547EFF', fontFamily: 'メイリオ' }).setOrigin(0)
            this.add.image(280, 400, 'btn_retry').setInteractive().once('pointerup', () => {
                this.scene.restart()
            })
            this.add.image(520, 400, 'btn_title').setInteractive().once('pointerup', () => {
                this.scene.start('titlescene')
            })
        })
        this.physics.pause()
    }

    createEnemy() {
        const code = this.keyPrc.getRundomKeyCode()
        const enemy = this.chrs!.create(Phaser.Math.Between(30, 770), -13, code).setScale(0.3)
        enemy.setName(code)
        enemy.setBounce(1)
        enemy.setCollideWorldBounds(false, 1, 0)
        enemy.setVelocity(Phaser.Math.Between(-80, 80), this.st!.speed)
        enemy.allowGravity = false
        enemy.setVisible(true).setActive(true)
    }

    isTarget(enemy: Phaser.GameObjects.GameObject, keyCode: number, pressShift: boolean) {
        return parseInt(enemy.name) === this.keyPrc.downKeyCodeToAscii(keyCode, pressShift)
    }

    update() {
        if (this.st!.gameOver) {
            return
        }

        while (this.chrs!.countActive(true) < this.st!.maxEnemy) {
            this.createEnemy()
        }
    }
}

export default MainScene
