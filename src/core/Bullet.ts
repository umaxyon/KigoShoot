import Phaser from "phaser"
import MainScene from "../scenes/MainScene"


class Bullet extends Phaser.GameObjects.Image {
    speed
    born
    direction
    xSpeed
    ySpeed
    emitter?: Phaser.GameObjects.Particles.ParticleEmitter

    constructor(scene: MainScene) {
        super(scene, 0, 0, 'bullet')
        this.speed = 5
        this.born = 0
        this.direction = 0
        this.xSpeed = 0
        this.ySpeed = 0
    }

    fire(shooter: any, target: any) {
        this.setPosition(shooter.x, shooter.y)
        this.direction = Math.atan( (target.x - this.x) / (target.y - this.y))
    
        // Calculate X and y velocity of bullet to moves it from shooter to target
        if (target.y >= this.y) {
            this.xSpeed = this.speed * Math.sin(this.direction)
            this.ySpeed = this.speed * Math.cos(this.direction)
        } else {
            this.xSpeed = -this.speed * Math.sin(this.direction)
            this.ySpeed = -this.speed * Math.cos(this.direction)
        }
    
        this.rotation = shooter.rotation
        this.born = 0

        this.emitter = this.createEmitter()
        this.emitter.setPosition(shooter.x, shooter.y).startFollow(this)
    }
    
    hitCallback(enemy: any) {
        if (enemy.active === true && this.active === true) {
            enemy.setActive(false).setVisible(false)
            this.setActive(false).setVisible(false)
        }
    }

    createEmitter() {
        return this.scene.add.particles("red").createEmitter({
            speed: 20,
            scale: { start: 0.5, end: 0 },
            blendMode: "ADD"
        })
    }

    update(time: any, delta: any) {
        this.x += this.xSpeed * delta
        this.y += this.ySpeed * delta
        this.born += delta;
        if (this.born > 1800) {
            this.setActive(false)
            this.setVisible(false)
        }
    }

    deactive() {
        this.setActive(false).setVisible(false)
        this.emitter?.setVisible(false)
    }
}

export default Bullet
