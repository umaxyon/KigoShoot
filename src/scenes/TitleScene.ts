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

    create(data: any) {
        this.add.image(400, 300, "sky")
        this.add.image(400, 600, "line")
        this.add.image(400, 300, 'title')
        this.add.image(730, 585, "tag")

        this.add.image(280, 500, 'btn_easy').setInteractive().once('pointerup', () => {
            data.speed = 20
            this.scene.start('mainscene', data)
        })
        this.add.image(530, 500, 'btn_hard').setInteractive().once('pointerup', () => {
            data.speed = 100
            this.scene.start('mainscene', data)
        })
    }
}

export default TitleScene
