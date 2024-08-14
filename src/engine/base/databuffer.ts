/* eslint-disable */
import Long from 'long';
import { Buffer } from 'buffer';
import { BaseType, ReadNetPacket, Struct, sizeOf } from './basetype';
const SOCKET_BUFFER_PACKET = 16384;
/**
 * 网络解析数据
 */
export class DataBuffer {
  public offset: number = 0; // 偏移游标
  public data: Uint8Array; // 数据Buffer
  public dtype: string = ''; // 数据创建模式
  constructor(len: number = 0, data: any = null) {
    this.offset = 0;
    if (data) {
      this.dtype = 'set';
      if (data instanceof DataBuffer) {
        this.data = data.getBufferData();
      } else if (data instanceof Uint8Array) {
        this.data = data;
      } else {
        this.data = new Uint8Array(data);
      }
    } else {
      this.dtype = 'new';
      if (len <= 0) {
        this.data = new Uint8Array(SOCKET_BUFFER_PACKET);
      } else {
        this.data = new Uint8Array(len);
      }
    }
  }

  /**
   * 收发数据大小
   * @returns
   */
  getSize(): number {
    if (this.dtype === 'set')
      return this.data == null ? 0 : this.data.byteLength;
    else return this.offset;
  }

  /**
   * 获取偏移位置
   * @returns
   */
  getOffset(): number {
    return this.offset;
  }

  /**
   * 复位数据指针，可以重头再读一次数据
   */
  resetOffSet() {
    this.offset = 0;
  }

  /**
   * @description: 是否读取完整
   * @return {*}
   */
  isEOF(): boolean {
    return this.offset == this.data.byteLength;
  }

  /**
   * 获取Buffer
   * @returns
   */
  getBufferData(): any {
    return this.data;
  }

  /**
   * Buffer是否为空
   * @returns
   */
  isNull(): boolean {
    return this.data == null;
  }
  /**
   * 读写数据
   */
  //------------------------------------------------------------------------------------------
  /**
   * 写入bool
   * @param value
   * @returns
   */
  setBool(value: boolean): boolean {
    if (this.isNull()) return false;
    this.data[this.offset++] = value ? 1 : 0;
    return true;
  }

  /**
   * 读取CHAR
   * @returns
   */
  getBool(): boolean {
    if (this.isNull()) return false;
    if (this.offset + 1 > this.data.byteLength) {
      console.log('over length');
      return false;
    }
    let buffer = new ArrayBuffer(1);
    let uint8Array = new Uint8Array(buffer);
    let int8Array = new Int8Array(buffer);
    uint8Array[0] = this.data[this.offset++];
    return int8Array[0] === 1 ? true : false;
  }

  /**
   * 写入CHAR
   * @param value
   * @returns
   */
  setInt8(value: number): boolean {
    if (this.isNull()) return false;
    this.data[this.offset++] = value;
    return true;
  }

  /**
   * 读取CHAR
   * @returns
   */
  getInt8(): number {
    if (this.isNull()) return 0;
    if (this.offset + 1 > this.data.byteLength) {
      console.log('over length');
      return 0;
    }
    let buffer = new ArrayBuffer(1);
    let uint8Array = new Uint8Array(buffer);
    let int8Array = new Int8Array(buffer);
    uint8Array[0] = this.data[this.offset++];
    return int8Array[0];
  }

  /**
   * 写入BYTE
   * @param value
   * @returns
   */
  setUint8(value: number): boolean {
    if (this.isNull()) return false;
    this.data[this.offset++] = value;
    return true;
  }

  /**
   * 读取BYTE
   * @returns
   */
  getUint8(): number {
    if (this.isNull()) return 0;
    if (this.offset + 1 > this.data.byteLength) {
      console.log('over length');
      return 0;
    }
    let buffer = new ArrayBuffer(1);
    let uint8Array = new Uint8Array(buffer);
    uint8Array[0] = this.data[this.offset++];
    return uint8Array[0];
  }

  /**
   * 写入SHORT
   * @param value
   * @returns
   */
  setInt16(value: number): boolean {
    if (this.isNull()) return false;
    let buffer = new ArrayBuffer(2);
    let uint8Array = new Uint8Array(buffer, 0, 2);
    let int16Array = new Int16Array(buffer);
    int16Array[0] = value;
    this.data[this.offset] = uint8Array[0];
    this.data[this.offset + 1] = uint8Array[1];
    this.offset += 2;
    return true;
  }

  /**
   * 读取SHORT
   * @returns
   */
  getInt16(): number {
    if (this.isNull()) return 0;
    if (this.offset + 2 > this.data.byteLength) {
      console.log('over length');
      return 0;
    }
    let buffer = new ArrayBuffer(2);
    let uint8Array = new Uint8Array(buffer, 0, 2);
    let int16Array = new Int16Array(buffer);
    uint8Array[0] = this.data[this.offset];
    uint8Array[1] = this.data[this.offset + 1];
    this.offset += 2;
    return int16Array[0];
  }

  /**
   * 写入UNSIGNED SHORT
   * @param value
   * @returns
   */
  setUint16(value: number): boolean {
    if (this.isNull()) return false;
    let buffer = new ArrayBuffer(2);
    let uint8Array = new Uint8Array(buffer, 0, 2);
    let uint16Array = new Uint16Array(buffer);
    uint16Array[0] = value;
    this.data[this.offset] = uint8Array[0];
    this.data[this.offset + 1] = uint8Array[1];
    this.offset += 2;
    return true;
  }

  /**
   * 读取UNSIGNED SHORT
   * @returns
   */
  getUint16(): number {
    if (this.isNull()) return 0;
    if (this.offset + 2 > this.data.byteLength) {
      console.log('over length');
      return 0;
    }
    let buffer = new ArrayBuffer(2);
    let uint8Array = new Uint8Array(buffer, 0, 2);
    let uint16Array = new Uint16Array(buffer);
    uint8Array[0] = this.data[this.offset];
    uint8Array[1] = this.data[this.offset + 1];
    this.offset += 2;
    return uint16Array[0];
  }

  /**
   * 写入INT
   * @param value
   * @returns
   */
  setInt32(value: number): boolean {
    if (this.isNull()) return false;
    let buffer = new ArrayBuffer(4);
    let uint8Array = new Uint8Array(buffer, 0, 4);
    let int32Array = new Int32Array(buffer);
    int32Array[0] = value;
    this.data[this.offset] = uint8Array[0];
    this.data[this.offset + 1] = uint8Array[1];
    this.data[this.offset + 2] = uint8Array[2];
    this.data[this.offset + 3] = uint8Array[3];
    this.offset += 4;
    return true;
  }

  /**
   * 读取INT
   * @returns
   */
  getInt32(): number {
    if (this.isNull()) return 0;
    if (this.offset + 4 > this.data.byteLength) {
      console.log('over length');
      return 0;
    }
    let buffer = new ArrayBuffer(4);
    let uint8Array = new Uint8Array(buffer, 0, 4);
    let int32Array = new Int32Array(buffer);
    uint8Array[0] = this.data[this.offset];
    uint8Array[1] = this.data[this.offset + 1];
    uint8Array[2] = this.data[this.offset + 2];
    uint8Array[3] = this.data[this.offset + 3];
    this.offset += 4;
    return int32Array[0];
  }

  /**
   * 写入UNSIGNED INT
   * @param value
   * @returns
   */
  setUint32(value: number): boolean {
    if (this.isNull()) return false;
    let buffer = new ArrayBuffer(4);
    let uint8Array = new Uint8Array(buffer, 0, 4);
    let uint32Array = new Uint32Array(buffer);
    uint32Array[0] = value;
    this.data[this.offset] = uint8Array[0];
    this.data[this.offset + 1] = uint8Array[1];
    this.data[this.offset + 2] = uint8Array[2];
    this.data[this.offset + 3] = uint8Array[3];
    this.offset += 4;
    return true;
  }

  /**
   * 读取UNSIGNED INT
   * @returns
   */
  getUint32(): number {
    if (this.isNull()) return 0;
    if (this.offset + 4 > this.data.byteLength) {
      console.log('over length');
      return 0;
    }
    let buffer = new ArrayBuffer(4);
    let uint8Array = new Uint8Array(buffer, 0, 4);
    let uint32Array = new Uint32Array(buffer);
    uint8Array[0] = this.data[this.offset];
    uint8Array[1] = this.data[this.offset + 1];
    uint8Array[2] = this.data[this.offset + 2];
    uint8Array[3] = this.data[this.offset + 3];
    this.offset += 4;
    return uint32Array[0];
  }

  /**
   * 写入Float32
   * @param value
   * @returns
   */
  setFloat32(value: number): boolean {
    if (this.isNull()) return false;
    let buffer = new ArrayBuffer(4);
    let uint8Array = new Uint8Array(buffer, 0, 4);
    let float32Array = new Float32Array(buffer);
    float32Array[0] = value;
    this.data[this.offset] = uint8Array[0];
    this.data[this.offset + 1] = uint8Array[1];
    this.data[this.offset + 2] = uint8Array[2];
    this.data[this.offset + 3] = uint8Array[3];
    this.offset += 4;
    return true;
  }

  /**
   * 读取Float32
   * @returns
   */
  getFloat32(): number {
    if (this.isNull()) return 0;
    if (this.offset + 4 > this.data.byteLength) {
      console.log('over length');
      return 0;
    }
    let buffer = new ArrayBuffer(4);
    let uint8Array = new Uint8Array(buffer, 0, 4);
    let float32Array = new Float32Array(buffer);
    uint8Array[0] = this.data[this.offset];
    uint8Array[1] = this.data[this.offset + 1];
    uint8Array[2] = this.data[this.offset + 2];
    uint8Array[3] = this.data[this.offset + 3];
    this.offset += 4;
    return float32Array[0];
  }

  /**
   * 写入Float64
   * @param value
   * @returns
   */
  setFloat64(value: number): boolean {
    if (this.isNull()) return false;
    let buffer = new ArrayBuffer(8);
    let uint8Array = new Uint8Array(buffer, 0, 8);
    let float64Array = new Float64Array(buffer);
    float64Array[0] = value;
    this.data[this.offset] = uint8Array[0];
    this.data[this.offset + 1] = uint8Array[1];
    this.data[this.offset + 2] = uint8Array[2];
    this.data[this.offset + 3] = uint8Array[3];
    this.data[this.offset + 4] = uint8Array[4];
    this.data[this.offset + 5] = uint8Array[5];
    this.data[this.offset + 6] = uint8Array[6];
    this.data[this.offset + 7] = uint8Array[7];
    this.offset += 8;
    return true;
  }

  /**
   * 读取Float64
   * @returns
   */
  getFloat64(): number {
    if (this.isNull()) return 0;
    if (this.offset + 8 > this.data.byteLength) {
      console.log('over length');
      return 0;
    }
    let buffer = new ArrayBuffer(8);
    let uint8Array = new Uint8Array(buffer, 0, 8);
    let float64Array = new Float64Array(buffer);
    uint8Array[0] = this.data[this.offset];
    uint8Array[1] = this.data[this.offset + 1];
    uint8Array[2] = this.data[this.offset + 2];
    uint8Array[3] = this.data[this.offset + 3];
    uint8Array[4] = this.data[this.offset + 4];
    uint8Array[5] = this.data[this.offset + 5];
    uint8Array[6] = this.data[this.offset + 6];
    uint8Array[7] = this.data[this.offset + 7];
    this.offset += 8;
    return float64Array[0];
  }

  /**
   * 写入LONGLONG
   * @param value
   */
  setInt64(value: string | number | Long): boolean {
    if (this.isNull()) return false;
    let i64: any;
    if (Long.isLong(value)) {
      i64 = value;
    } else {
      i64 = Long.fromValue(value);
    }
    let low = i64.getLowBits();
    let high = i64.getHighBits();
    let buffer = new ArrayBuffer(8);
    let uint8Array = new Uint8Array(buffer, 0, 8);
    let int32Array = new Int32Array(buffer, 0, 2);
    int32Array[0] = low;
    int32Array[1] = high;
    this.data[this.offset] = uint8Array[0];
    this.data[this.offset + 1] = uint8Array[1];
    this.data[this.offset + 2] = uint8Array[2];
    this.data[this.offset + 3] = uint8Array[3];
    this.data[this.offset + 4] = uint8Array[4];
    this.data[this.offset + 5] = uint8Array[5];
    this.data[this.offset + 6] = uint8Array[6];
    this.data[this.offset + 7] = uint8Array[7];
    this.offset += 8;
    return true;
  }

  /**
   * 读取LONGLONG 返回Long类型处理
   * @returns
   */
  getInt64(): number | Long {
    if (this.isNull()) return 0;
    if (this.offset + 8 > this.data.byteLength) {
      console.log('over length');
      return 0;
    }
    let buffer = new ArrayBuffer(8);
    let uint8Array = new Uint8Array(buffer, 0, 8);
    let int32Array = new Int32Array(buffer, 0, 2);
    uint8Array[0] = this.data[this.offset];
    uint8Array[1] = this.data[this.offset + 1];
    uint8Array[2] = this.data[this.offset + 2];
    uint8Array[3] = this.data[this.offset + 3];
    uint8Array[4] = this.data[this.offset + 4];
    uint8Array[5] = this.data[this.offset + 5];
    uint8Array[6] = this.data[this.offset + 6];
    uint8Array[7] = this.data[this.offset + 7];
    this.offset += 8;
    let i64 = new Long(int32Array[0], int32Array[1], false);
    if (i64.compare(Number.MAX_VALUE) <= 0) {
      return i64.toNumber();
    }
    console.log('LONGLONG已经用到，需要特殊处理.........');
    return i64;
  }

  /**
   * 写入UNSIGNED LONGLONG
   * @param value
   */
  setUint64(value: string | Long): boolean {
    if (this.isNull()) return false;
    let i64: any;
    if (Long.isLong(value)) {
      i64 = value;
    } else {
      i64 = Long.fromString(value, true);
    }
    let low = i64.getLowBits();
    let high = i64.getHighBits();
    let buffer = new ArrayBuffer(8);
    let uint8Array = new Uint8Array(buffer, 0, 8);
    let uint32Array = new Uint32Array(buffer, 0, 2);
    uint32Array[0] = low;
    uint32Array[1] = high;
    this.data[this.offset] = uint8Array[0];
    this.data[this.offset + 1] = uint8Array[1];
    this.data[this.offset + 2] = uint8Array[2];
    this.data[this.offset + 3] = uint8Array[3];
    this.data[this.offset + 4] = uint8Array[4];
    this.data[this.offset + 5] = uint8Array[5];
    this.data[this.offset + 6] = uint8Array[6];
    this.data[this.offset + 7] = uint8Array[7];
    this.offset += 8;
    return true;
  }

  /**
   * 读取UNSIGNED LONGLONG 返回Long类型处理
   * @returns
   */
  getUint64(): number | Long {
    if (this.isNull()) return 0;
    if (this.offset + 8 > this.data.byteLength) {
      console.log('over length');
      return 0;
    }
    let buffer = new ArrayBuffer(8);
    let uint8Array = new Uint8Array(buffer, 0, 8);
    let uint32Array = new Uint32Array(buffer, 0, 2);
    uint8Array[0] = this.data[this.offset];
    uint8Array[1] = this.data[this.offset + 1];
    uint8Array[2] = this.data[this.offset + 2];
    uint8Array[3] = this.data[this.offset + 3];
    uint8Array[4] = this.data[this.offset + 4];
    uint8Array[5] = this.data[this.offset + 5];
    uint8Array[6] = this.data[this.offset + 6];
    uint8Array[7] = this.data[this.offset + 7];
    this.offset += 8;
    let i64 = new Long(uint32Array[0], uint32Array[1], true);
    return i64;
  }

  /**
   * 写入二进制数据流
   * @param arr
   * @param len
   */
  setUint8Array(arr: any, len: number) {
    for (let i = 0; i < len; i++) {
      this.data[this.offset + i] = arr[i];
    }
    this.offset += len;
  }

  /**
   * 获取二进制数据流
   * @param len
   * @returns
   */
  getUint8Array(len: number): Uint8Array {
    if (this.offset + len > this.data.byteLength) {
      console.log('over length');
      return null;
    }
    let val = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      val[i] += this.data[this.offset + i];
    }
    this.offset += len;
    return val;
  }

  /**
   * 获取二进制数据流
   * @param len
   * @returns
   */
  getDataBuffer(len: number): DataBuffer {
    if (this.offset + len > this.data.byteLength) {
      console.log('over length');
      return null;
    }
    let val = this.data.slice(this.offset, len + this.offset);
    this.offset += len;
    return new DataBuffer(0, val);
  }

  /**
   * 获取自定长度Buf
   * @param len
   * @returns
   */
  getBuffer(len: number): Uint8Array {
    if (this.offset + len > this.data.byteLength) {
      console.log('over length');
      return null;
    }
    let val = this.data.slice(this.offset, len + this.offset);
    this.offset += len;
    return val;
  }

  /**
   * 写入字符串
   * @param str
   * @param len
   * @param stype
   */
  setString(val: string, len: number, stype: string | null = null) {
    if (stype === 'UCS-2' || stype === null) {
      let arr = new ArrayBuffer(len);
      let u16 = new Uint16Array(arr);
      for (let i = 0; i < val.length; i++) {
        u16[i] = val.charCodeAt(i);
      }
      this.setUint8Array(new Uint8Array(arr), len);
    } else {
      var arr = [];
      for (let i = 0, j = val.length > len ? len : val.length; i < j; ++i) {
        arr.push(val.charCodeAt(i));
      }
      if (arr.length < len) {
        for (let i = arr.length - 1; i < len; i++) {
          arr.push(0);
        }
      }
      this.setUint8Array(new Uint8Array(arr), len);
    }
  }

  /**
   * 获取字符串
   * @param len
   * @param stype
   * @returns
   */
  getString(len: number, stype: string | null = null): string {
    let buffer = this.getBuffer(len);
    let str: string = '';
    if (buffer == null) return str;
    if (stype == null) {
      const buf = Buffer.from(buffer);
      const u16 = new Uint16Array(
        buf.buffer,
        buf.byteOffset,
        buf.byteLength / Uint16Array.BYTES_PER_ELEMENT
      );
      let str: string = '';
      for (let index = 0; index < u16.length; index++) {
        const value = u16[index];
        if (value == 0) {
          break;
        }
        str += String.fromCharCode(value);
      }
      return str;
    } else {
      for (let index = 0; index < buffer.length; index++) {
        const value = buffer[index];
        if (value == 0) {
          break;
        }
        str += String.fromCharCode(value);
      }
      return str;
    }
  }

  /**
   * @description: 转到基础类型 或 Struct
   * @param {function} ctor
   * @param {*} buffer
   * @param {number} len
   * @param {boolean} fixed
   * @return {*}
   */
  toStruct<T>(
    ctor: new (len: number) => T,
    len: number = 0,
    fixed: boolean = false
  ): T {
    if (ctor.prototype instanceof Struct) {
      let netpakcet = new ctor(0);
      ReadNetPacket(netpakcet, this);
      return netpakcet;
    } else if (ctor.prototype instanceof BaseType) {
      let obj = new ctor(len);
      let tmp = (obj as BaseType).getType();
      if (tmp === 'cstring' || tmp === 'wstring') {
        obj['_fixed'] = fixed;
        obj['read'].call(obj, this);
        return obj;
      } else {
        obj['read'].call(obj, this);
        return obj;
      }
    }
    return null;
  }

  /**
   * @description: 读取网络列表
   * @param {function} ctor
   * @return {*}
   */
  toStructList<T>(ctor: new (len: number) => T): Array<T> {
    let list = new Array<T>();
    if (ctor.prototype instanceof Struct) {
      let netpakcet = new ctor(0);
      let item = (this.getSize() - this.getOffset()) / sizeOf(netpakcet);
      for (let index = 0; index < item; index++) {
        if (this.isEOF()) break;
        netpakcet = new ctor(0);
        ReadNetPacket(netpakcet, this);
        list.push(netpakcet);
      }
    }
    return list;
  }
}
