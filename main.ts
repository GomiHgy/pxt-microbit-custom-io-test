//https://makecode.com/defining-blocks
//% color=250 weight=120 icon="\uf0eb" block="yin:bit Ex"
namespace yinbitEx {
    serial.redirect(
        SerialPin.P8,
        SerialPin.P2,
        BaudRate.BaudRate115200
    )

    //% blockId=show_strings block="コメント %v"
    export function noaction(text: string): void {
    }

    //% blockId=cmd_send block="送る"
    export function send(): void {
        serial.writeString("02,FF,FF,00,00,00,03")
    }
}