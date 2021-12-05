import Phaser from "phaser"
import ImgHolder from "../core/ImgHolder"


class TitleScene extends Phaser.Scene {
    imgs?: ImgHolder

    constructor() {
        super({ key: 'titlescene' })
    }

    init(data: any) {
        this.imgs = data.imgs
    }

    preload() {
        this.imgs!.loadTitle(this)
    }

    create() {
        this.add.image(400, 300, "sky")
        this.add.image(400, 600, "line")
        this.add.image(400, 300, 'title')
        const btnStart = this.add.image(400, 500, 'start').setInteractive()

        btnStart.once('pointerup', () => {
            this.scene.start('mainscene')
        })
    }
}

export default TitleScene
