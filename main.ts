//% color=190 weight=100 icon="\uf1ec" block="Basic Blocks"
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
        serial.writeString("FF,")
    }
}