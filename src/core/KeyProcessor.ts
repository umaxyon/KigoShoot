import Phaser from "phaser"
import MyScene from "../scenes/MyScene"


const KEY_SHIFT = 16

export type KeyListner = (keyCode: number, pressShift: boolean) => void

class KeyProcessor {
    private shiftPress: boolean = false
    private listners: KeyListner[] = [] 

    constructor(private scene: MyScene) {}

    addListner(fn: KeyListner) {
        this.listners.push(fn)
    }

    attachEvent() {
        this.scene.input.keyboard.on('keydown', (e: any) => {
            if (e.keyCode === KEY_SHIFT) {
                this.shiftPress = true
            }

            this.listners.forEach(lsn => {
                if (e.keyCode !== KEY_SHIFT) lsn(e.keyCode, this.shiftPress)
            });
        })

        this.scene.input.keyboard.on('keyup', (e: any) => {
            if (e.keyCode === KEY_SHIFT) {
                this.shiftPress = false
            }
        })
        return this
    }
}

export default KeyProcessor
