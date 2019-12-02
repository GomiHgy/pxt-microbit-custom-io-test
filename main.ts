//https://makecode.com/defining-blocks
//% color=250 weight=120 icon="\uf0eb" block="yin:bit Ex"
namespace yinbitEx {
    serial.redirect(
        SerialPin.P8,
        SerialPin.P2,
        BaudRate.BaudRate115200
    )

    //% blockId=cmd_send block="リセット"
    export function reset(): void {
        serial.writeString("02FFFF00000003\n")
    }
}