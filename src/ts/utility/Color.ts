export default class Color {

    // static hexToRgb(hexCode: string): any {
    //     if (hexCode.split('').length === 6 || hexCode.split('').length === 3) {
    //         return Color._convertRgb(hexCode.split(''))
    //     } else {
    //         throw new Error("You have to Set 3 characters or 6 character hex code.");
    //     }
    // }

    // static rgbToHex(R: number, G: number, B: number): any {
    //     let rgb = [Number(R).toString(16), Number(G).toString(16), Number(B).toString(16)],
    //         hex = "";

    //     for (let i = 0; i < 3; i++) {
    //         if (1 === rgb[i].length) {
    //             hex += "0" + rgb[i]
    //         } else {
    //             hex += String(rgb[i])
    //         }
    //     }

    //     return hex;
    // }

    // static _convertRgb(hexCodeArray: any[]):any {
    //     let res: any[] = [];
    //     let i;

    //     if ( 6 === hexCodeArray.length ) {
    //         for ( i = 0; i < 3; i++ ) {
    //             res.push( parseInt( String( Color._chunk( hexCodeArray )[i] ), 16 ) );
    //         }
    //     } else {
    //         for ( i = 0; i < 3; i++ ) {
    //             res.push( parseInt( String( hexCodeArray[i] + hexCodeArray[i] ), 16 ) );
    //         }
    //     }

    //     return res;
    // }

    // static _chunk(array: any[]): any {
    //     let n: number = 2;
    //     let len: any = Math.round.apply(array.length / n, 10);
    //     let ret: any[] = [];

    //     for (let i = 0; i < len; i++) {
    //         ret.push(array.slice(i * n, i * n + n)[0] + array.slice(i * n, i * n + n)[1])
    //     }

    //     return ret;
    // }

}