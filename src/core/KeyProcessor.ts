import Phaser from "phaser"
import MainScene from "../scenes/MainScene"


const KEY_SHIFT = 16
const WITH_SHIFT_KEYS = [
    '!', '"', '#', '$', '%', '&', "'", '(', ')', '=', '~', '|', '`', '{', '+', '*', '}', '<', '>', '?', '_',
]
const NON_SHIFT_KEYS = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '^', '\\','@', '[', ';', ':', ']', ',', '.', '/',
]

export type KeyListner = (key: string, pressShift: boolean) => void

class KeyProcessor {
    private shiftPress: boolean = false
    private listners: KeyListner[] = [] 

    constructor(private scene: MainScene) {}

    addListner(fn: KeyListner) {
        this.listners.push(fn)
    }

    attachEvent() {
        this.scene.input.keyboard.on('keydown', (e: any) => {
            if (e.keyCode === KEY_SHIFT) {
                this.shiftPress = true
            }

            this.listners.forEach(lsn => {
                if (e.keyCode !== KEY_SHIFT) lsn(e.key, this.shiftPress)
            });
        })

        this.scene.input.keyboard.on('keyup', (e: any) => {
            if (e.keyCode === KEY_SHIFT) {
                this.shiftPress = false
            }
        })
        return this
    }

    getRundomKey() {
        const keys = (Phaser.Math.RND.pick([1, 2]) == 1)? WITH_SHIFT_KEYS: NON_SHIFT_KEYS
        return keys[Phaser.Math.RND.integerInRange(0, keys.length - 1)]
    }
}

export default KeyProcessor
