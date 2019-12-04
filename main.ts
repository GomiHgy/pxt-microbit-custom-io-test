//https://makecode.com/defining-blocks
//% color=250 weight=120 icon="\uf0eb" block="yin:bit Ex"
namespace yinbitEx {
    serial.redirect(
        SerialPin.P8,
        SerialPin.P2,
        BaudRate.BaudRate115200
    )

    //% blockId="cmd_clear" block="LEDを消す"
    export function clear(): void {
        serial.writeString("02FFFF00000003\n")
    }

    /**
         * Set LED to a given color (range 0-255 for r, g, b). 
         * You need to call ``show`` to make the changes visible.
         * @param pixeloffset position of the NeoPixel in the strip
         * @param rgb RGB color of the LED
         */
    //% blockId="cmd_set_color" block="%pixeloffset 番目のLEDを %rgb 色にする"
    export function setPixelColor(pixeloffset: number, rgb: number): void {
        let rgb_str = rgb.toString()
        serial.writeString("02" + toHexString4(pixeloffset) + toHexString6(rgb) + "03\n")
    }

    function toHexString6(value: number): string {
        let list = [0, 0, 0, 0, 0, 0]
        let _16進数リスト = "0123456789ABCDEF"
        list[0] = Math.idiv(value, 0x100000)
        list[1] = Math.idiv(value - list[0] * 0x100000, 0x10000)
        list[2] = Math.idiv(value - list[0] * 0x100000 - list[1] * 0x10000, 0x1000)
        list[3] = Math.idiv(value - list[0] * 0x100000 - list[1] * 0x10000 - list[2] * 0x1000, 0x100)
        list[4] = Math.idiv(value - list[0] * 0x100000 - list[1] * 0x10000 - list[2] * 0x1000 - list[3] * 0x100, 0x10)
        list[5] = value - list[0] * 0x100000 - list[1] * 0x10000 - list[2] * 0x1000 - list[3] * 0x100 - list[4] * 0x10
        return "" + _16進数リスト.charAt(list[0]) + _16進数リスト.charAt(list[1]) + _16進数リスト.charAt(list[2]) + _16進数リスト.charAt(list[3]) + _16進数リスト.charAt(list[4]) + _16進数リスト.charAt(list[5])
    }

    function toHexString4(value: number): string {
        let list = [0, 0, 0, 0]
        let _16進数リスト = "0123456789ABCDEF"
        list[0] = Math.idiv(value, 0x1000)
        list[1] = Math.idiv(value - list[0] * 0x1000, 0x100)
        list[2] = Math.idiv(value - list[0] * 0x1000 - list[1] * 0x100, 0x10)
        list[3] = value - list[0] * 0x1000 - list[1] * 0x100 - list[2] * 0x10
        return "" + _16進数リスト.charAt(list[0]) + _16進数リスト.charAt(list[1]) + _16進数リスト.charAt(list[2]) + _16進数リスト.charAt(list[3])
    }
}