import Phaser from "phaser"
import KeyProcessor from "../core/KeyProcessor"
import ImgHolder from "../core/ImgHolder"
import Bullet from "../core/Bullet"

class MainScene extends Phaser.Scene {
    keyPrc: KeyProcessor
    imgs: ImgHolder
    walls?: Phaser.Physics.Arcade.StaticGroup
    ballets?: Phaser.Physics.Arcade.Group
    chrs?: Phaser.Physics.Arcade.Group
    senkan?: Phaser.Physics.Arcade.Image

    constructor() {
        super({ key: 'mainscene' })
        this.keyPrc = new KeyProcessor(this)
        this.imgs = new ImgHolder(this)
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
                        this.physics.add.overlap(enemy, bullet, this.hitCallback)
                    }
                }
            })
        })
    }
    
    hitCallback(enemy: any, bullet: any) {
        if (enemy.active === true && bullet.active === true) {
            enemy.destroy()
        }
    }

    create() {
        this.add.image(400, 300, "sky")
        this.add.image(400, 600, "line")
        this.senkan = this.physics.add.image(400, 550, 'senkan').setScale(0.7)

        this.walls!.create(-15, 300, "wall")
        this.walls!.create(815, 300, "wall")

        this.physics.add.collider(this.chrs!, this.walls!)
    }

    createEnemy() {
        const code = this.keyPrc.getRundomKeyCode()
        const enemy = this.chrs!.create(Phaser.Math.Between(30, 770), 5, code).setScale(0.3)
        enemy.setName(code)
        enemy.setBounce(1)
        enemy.setCollideWorldBounds(false, 1, 0)
        enemy.setVelocity(Phaser.Math.Between(-80, 80), 25)
        enemy.allowGravity = false
        enemy.setVisible(true).setActive(true)
    }

    isTarget(enemy: Phaser.GameObjects.GameObject, keyCode: number, pressShift: boolean) {
        return parseInt(enemy.name) === this.keyPrc.downKeyCodeToAscii(keyCode, pressShift)
    }

    update() {
        while (this.chrs!.countActive(true) < 4) {
            this.createEnemy()
        }
    }
}

export default MainScene
