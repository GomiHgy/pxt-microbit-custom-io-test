namespace yinbitEx {
    serial.redirect(
        SerialPin.P8,
        SerialPin.P2,
        BaudRate.BaudRate115200
    )

    //% blockId=show_strings block="コメント %v"
    export function noaction(text: string): void {
    }

    //% blockId=show_strings block="送る"
    export function send(): void {
        serial.writeString("FF,")
    }
}