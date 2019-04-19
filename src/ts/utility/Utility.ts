// import Color from './Color';

export default class Utility {
    
    // /**
    //  *
    //  * @type {Color}
    //  */
    // static hexToRgb(hexCode: string): any {
    //     return Color.hexToRgb(hexCode);
    // }

    // static rgbToHex(R: number, G: number, B: number): any {
    //     return Color.rgbToHex(R, G, B);
    // }

    /**
     *
     * @type {Ease}
     */
    static getCubicCurve(a: number, b: number, c: number, d: number): any {
        // @ts-ignore
        return CustomEase.create('custom', `M0,0 C${Number(a)},${Number(b)} ${Number(c)},${Number(d)} 1,1`);
    }

    /**
     *
     * @type {Animation}
     */
    static convFrameTime(fps: number, frame_time: number): number {
        return frame_time / fps;
    }

    /**
     *
     * @type {Offset}
     */
    static getOffset(type: string, elm: HTMLElement | null): number {
        if(elm) {
            const rect: any = elm.getBoundingClientRect();
            const st: number = window.pageYOffset || document.documentElement.scrollTop;
            if(type == 'top') {
                return rect.top + st;
            } else if(type == 'left') {
                return rect.left;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }

}