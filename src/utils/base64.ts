export class Base64 {
    /**
     * @description: base64编码
     * @param {*} input
     * @return {*}
     */
    static encode(input) {
        const uint8 : Uint8Array = Base64.encodeToUni8Array(input);
        return Base64.uint8ArrayToString(uint8);
    }

    /**
     * @description: base64解码
     * @param {*} input
     * @return {*}
     */
    static decode(input) {
        const uint8 : Uint8Array = Base64.decodeToUnit8Array(input);
        return Base64.uint8ArrayToString(uint8);
    }

    /**
     * @description: 字节数组加密成base64字符串
     * @param {Uint8Array} u8Arr 字节数组
     * @return {*}
     */
    static encodeUint8Array(u8Arr : Uint8Array) : string {
        const CHUNK_SIZE : number = 0x8000;
        let index : number = 0;
        const { length } = u8Arr;
        let result : string = '';
        while (index < length) {
            const slice : Uint8Array = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length));
            result += String.fromCharCode.apply(null, (slice as unknown) as number[]);
            index += CHUNK_SIZE;
        }
        result = btoa(result);
        return result;
    }

    /**
     * @description: 图片数据转base64
     * @param {Uint8Array} buffer
     * @param {string} ext
     * @return {*}
     */
    static encodeImageBuffer(buffer : Uint8Array | ArrayBuffer, ext : string) : string {
        const u8Arr : Uint8Array = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
        // web image base64图片格式: "data:image/png;base64," + b64encoded;
        return `data:image/${ext};base64,${Base64.encodeUint8Array(u8Arr)}`;
    }

    /**
     * @description: 字符串加密成base64字节数组
     * @param {string} str
     * @return {*}
     */
    static encodeToUni8Array(str : string) : Uint8Array {
        const uint8 : Uint8Array = Base64.toUint8Array(str);
        const dataBase64 : string = Base64.encodeUint8Array(uint8);
        return Base64.toUint8Array(dataBase64);
    }

    /**
     * @description: base64字符串解码成字节数组
     * @param {string} str base64编码的字符串
     * @return {*}
     */
    static decodeToUnit8Array(str : string) : Uint8Array {
        const padding : string = '='.repeat((4 - (str.length % 4)) % 4);
        // eslint-disable-next-line no-useless-escape
        const base64 : string = (str + padding).replace(/\-/g, '+').replace(/_/g, '/');
        const rawData : string = window.atob(base64);
        const outputArray : Uint8Array = new Uint8Array(rawData.length);
        // eslint-disable-next-line no-plusplus
        for (let i : number = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
        return outputArray;
    }

    /**
     * @description: 解码图片base64字符串成字节数组
     * @param {string} str
     * @return {*}
     */
    static decodeImageToUnit8Array(str : string) : Uint8Array {
        const index = str.indexOf(';base64,');
        const newstr = str.substring(index + 8);
        return Base64.decodeToUnit8Array(newstr);
    }

    /**
     * @description: Uint8Array转字符串
     * @param {Uint8Array} uArr
     * @return {*}
     */
    static uint8ArrayToString(uArr : Uint8Array | ArrayBuffer) : string {
        const buf : Uint8Array = uArr instanceof Uint8Array ? uArr : new Uint8Array(uArr);
        return new TextDecoder('utf-8').decode(buf);
    }

    /**
     * @description: 字符串转Uint8Array
     * @param {string} str
     * @return {*}
     */
    static toUint8Array(str : string) : Uint8Array {
        return new TextEncoder().encode(str);
    }

    /**
     * @description: base64字节数组解码成字符串
     * @param {Uint8Array} u8Arr
     * @return {*}
     */
    static decodeUnit8Array(u8Arr : Uint8Array) : string {
        const dataBase64 : string = Base64.uint8ArrayToString(u8Arr);
        const newu8Arr = Base64.decodeToUnit8Array(dataBase64);
        return Base64.uint8ArrayToString(newu8Arr);
    }
}
