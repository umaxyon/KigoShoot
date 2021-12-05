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
        
        const btnStart = this.add.image(400, 500, 'btn_start').setInteractive()

        btnStart.once('pointerup', () => {
            this.scene.start('mainscene', data)
        })
    }
}

export default TitleScene
