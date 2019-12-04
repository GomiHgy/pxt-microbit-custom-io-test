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

    //% blockId="cmd_set_color" block="%offset 番目のLEDを 赤 %r 緑 %g 青 %b 色で点灯する"
    //% inlineInputMode=inline
    export function setPixelColor(offset: number, r: number, g: number, b: number): void {
        serial.writeString("02" + toHexString4(offset) + toHexString2(r) + toHexString2(g) + toHexString2(b) + "03\n")
    }

    //% blockId="cmd_set_color_all" block="全てのLEDを 赤 %r 緑 %g 青 %b 色で点灯する"
    //% inlineInputMode=inline
    export function setPixelColorAll(offset: number, r: number, g: number, b: number): void {
        serial.writeString("02FFFF" + toHexString2(r) + toHexString2(g) + toHexString2(b) + "03\n")
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

    function toHexString2(value: number): string {
        let list = [0, 0]
        let _16進数リスト = "0123456789ABCDEF"
        list[0] = Math.idiv(value, 0x10)
        list[1] = value - list[0] * 0x10
        return "" + _16進数リスト.charAt(list[0]) + _16進数リスト.charAt(list[1])
    }
}