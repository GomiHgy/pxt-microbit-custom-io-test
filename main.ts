//% color=250 weight=100 icon="\uf0ed" block="yin:bit Ex"
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