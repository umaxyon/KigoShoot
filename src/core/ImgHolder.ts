import MainScene from "../scenes/MainScene"
import TitleScene from "../scenes/TitleScene"

import imgSky from "./assets/sky.png"
import imgWall from "./assets/wall.png"
import imgLine from "./assets/line.png"
import imgRed from "./assets/red.png"
import imgBullet from "./assets/star.png"
import imgSenkan from "./assets/senkan_sp.png"
import imgTitle from "./assets/title.png"
import imgBtnEasy from "./assets/start_easy.png"
import imgBtnHard from "./assets/start_hard.png"
import imgGameOver from "./assets/gameover.png"
import imgBtnTitle from "./assets/btn_title.png"
import imgBtnRetry from "./assets/btn_retry.png"
import imgTag from "./assets/tag.png"


import chr33 from "./assets/char/33.png"
import chr34 from "./assets/char/34.png"
import chr35 from "./assets/char/35.png"
import chr36 from "./assets/char/36.png"
import chr37 from "./assets/char/37.png"
import chr38 from "./assets/char/38.png"
import chr39 from "./assets/char/39.png"
import chr40 from "./assets/char/40.png"
import chr41 from "./assets/char/41.png"
import chr42 from "./assets/char/42.png"
import chr43 from "./assets/char/43.png"
import chr44 from "./assets/char/44.png"
import chr45 from "./assets/char/45.png"
import chr46 from "./assets/char/46.png"
import chr47 from "./assets/char/47.png"
import chr48 from "./assets/char/48.png"
import chr49 from "./assets/char/49.png"
import chr50 from "./assets/char/50.png"
import chr51 from "./assets/char/51.png"
import chr52 from "./assets/char/52.png"
import chr53 from "./assets/char/53.png"
import chr54 from "./assets/char/54.png"
import chr55 from "./assets/char/55.png"
import chr56 from "./assets/char/56.png"
import chr57 from "./assets/char/57.png"
import chr58 from "./assets/char/58.png"
import chr59 from "./assets/char/59.png"
import chr60 from "./assets/char/60.png"
import chr61 from "./assets/char/61.png"
import chr62 from "./assets/char/62.png"
import chr63 from "./assets/char/63.png"
import chr64 from "./assets/char/64.png"
import chr91 from "./assets/char/91.png"
import chr92 from "./assets/char/92.png"
import chr93 from "./assets/char/93.png"
import chr94 from "./assets/char/94.png"
import chr95 from "./assets/char/95.png"
import chr96 from "./assets/char/96.png"
import chr123 from "./assets/char/123.png"
import chr124 from "./assets/char/124.png"
import chr125 from "./assets/char/125.png"
import chr126 from "./assets/char/126.png"


class ImgHolder {
    imgs: {[key: string]: string}

    constructor() {
        this.imgs = {
            "sky": imgSky,
            "wall": imgWall,
            "red": imgRed,
            "line": imgLine,
            "33": chr33,
            "34": chr34,
            "35": chr35,
            "36": chr36,
            "37": chr37,
            "38": chr38,
            "39": chr39,
            "40": chr40,
            "41": chr41,
            "42": chr42,
            "43": chr43,
            "44": chr44,
            "45": chr45,
            "46": chr46,
            "47": chr47,
            "48": chr48,
            "49": chr49,
            "50": chr50,
            "51": chr51,
            "52": chr52,
            "53": chr53,
            "54": chr54,
            "55": chr55,
            "56": chr56,
            "57": chr57,
            "58": chr58,
            "59": chr59,
            "60": chr60,
            "61": chr61,
            "62": chr62,
            "63": chr63,
            "64": chr64,
            "91": chr91,
            "92": chr92,
            "93": chr93,
            "94": chr94,
            "95": chr95,
            "96": chr96,
            "123": chr123,
            "124": chr124,
            "125": chr125,
            "126": chr126,
            "bullet": imgBullet,
            "gameover": imgGameOver,
            "btn_title": imgBtnTitle,
            "btn_retry": imgBtnRetry,
            "tag": imgTag
        }
    }
    
    loadMain(scene: MainScene) {
        Object.keys(this.imgs).forEach(key => {
            scene.load.image(key, this.imgs[key])
        })
        scene.load.spritesheet('senkan', imgSenkan, { frameWidth: 180, frameHeight: 140 })
    }

    loadTitle(scene: TitleScene) {
        scene.load.image('sky', imgSky)
        scene.load.image('line', imgLine)
        scene.load.image('title', imgTitle)
        scene.load.image('tag', imgTag)
        scene.load.image('btn_easy', imgBtnEasy)
        scene.load.image('btn_hard', imgBtnHard)
    }
}
export default ImgHolder
