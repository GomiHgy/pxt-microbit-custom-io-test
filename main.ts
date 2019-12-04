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
    export function setPixelColorAll(r: number, g: number, b: number): void {
        serial.writeString("02FFFF" + toHexString2(r) + toHexString2(g) + toHexString2(b) + "03\n")
    }

    /**
     * Converts a hue saturation luminosity value into a RGB color
     * @param h hue from 0 to 360
     * @param s saturation from 0 to 99
     * @param l luminosity from 0 to 99
     */
    //% blockId=cmd_set_color_hsv_all 色相="全てのLEDを 色相 %h 度 彩度 %g ％ 明度 %b ％で点灯する"
    export function setPixelColorHSV(h: number, s: number, l: number): void {
        h = Math.round(h);
        s = Math.round(s);
        l = Math.round(l);

        h = h % 360;
        s = Math.clamp(0, 99, s);
        l = Math.clamp(0, 99, l);
        let c = Math.idiv((((100 - Math.abs(2 * l - 100)) * s) << 8), 10000); //chroma, [0,255]
        let h1 = Math.idiv(h, 60);//[0,6]
        let h2 = Math.idiv((h - h1 * 60) * 256, 60);//[0,255]
        let temp = Math.abs((((h1 % 2) << 8) + h2) - 256);
        let x = (c * (256 - (temp))) >> 8;//[0,255], second largest component of this color
        let r$: number;
        let g$: number;
        let b$: number;
        if (h1 == 0) {
            r$ = c; g$ = x; b$ = 0;
        } else if (h1 == 1) {
            r$ = x; g$ = c; b$ = 0;
        } else if (h1 == 2) {
            r$ = 0; g$ = c; b$ = x;
        } else if (h1 == 3) {
            r$ = 0; g$ = x; b$ = c;
        } else if (h1 == 4) {
            r$ = x; g$ = 0; b$ = c;
        } else if (h1 == 5) {
            r$ = c; g$ = 0; b$ = x;
        }
        let m = Math.idiv((Math.idiv((l * 2 << 8), 100) - c), 2);
        let r = r$ + m;
        let g = g$ + m;
        let b = b$ + m;
        setPixelColorAll(r, g, b);
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