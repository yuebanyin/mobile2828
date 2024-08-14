/* eslint-disable */
import Long from 'long';
import { DataBuffer } from './databuffer';

class List extends Array {
  fixed = false;
}

export class BaseType {
  private _len: number = 0;
  private _value: any | null = null;
  private _fixed: boolean = false;
  private _type: string = 'none';
  constructor(len: number, value: any | null, t: string) {
    this._len = len;
    this._value = value;
    this._type = t;
    this._fixed = false;
  }

  /**
   * @description: 根据类型自动写入数据
   * @param {any} val
   * @param {DataBuffer} data
   * @return {*}
   */
  private writeDataByType(val: any, data: DataBuffer) {
    switch (this._type) {
      case 'bool':
        {
          data.setUint8(val);
        }
        break;
      case 'byte':
        {
          data.setUint8(val);
        }
        break;
      case 'char':
        {
          data.setInt8(val);
        }
        break;
      case 'word':
        {
          data.setUint16(val);
        }
        break;
      case 'dword':
      case 'uint':
        {
          data.setUint32(val);
        }
        break;
      case 'long':
      case 'int':
        {
          data.setInt32(val);
        }
        break;
      case 'ulonglong':
      case 'uscore':
        {
          data.setUint64(val);
        }
        break;
      case 'longlong':
      case 'score':
        {
          data.setInt64(val);
        }
        break;
      case 'double':
        {
          data.setFloat64(val);
        }
        break;
      case 'float':
        {
          data.setFloat32(val);
        }
        break;
      case 'cstring':
        {
          data.setString(val.toString(), this._len, 'GBK');
        }
        break;
      case 'wstring':
        {
          data.setString(val.toString(), this._len);
        }
        break;
      default:
        break;
    }
    return data.getSize();
  }

  /**
   * @description: 根据类型自动读取返回值
   * @param {DataBuffer} data
   * @return {*}
   */
  private readDataByType(data: DataBuffer): any {
    var val: any = null;
    switch (this._type) {
      case 'bool':
        {
          val = data.getUint8();
        }
        break;
      case 'byte':
        {
          val = data.getUint8();
        }
        break;
      case 'char':
        {
          val = data.getInt8();
        }
        break;
      case 'word':
        {
          val = data.getUint16();
        }
        break;
      case 'dword':
      case 'uint':
        {
          val = data.getUint32();
        }
        break;
      case 'long':
      case 'int':
        {
          val = data.getInt32();
        }
        break;
      case 'ulonglong':
      case 'uscore':
        {
          val = data.getUint64();
        }
        break;
      case 'longlong':
      case 'score':
        {
          val = data.getInt64();
        }
        break;
      case 'double':
        {
          val = data.getFloat64();
        }
        break;
      case 'float':
        {
          val = data.getFloat32();
        }
        break;
      case 'cstring':
        {
          let readlen = this._len;
          if (this._fixed == true) {
            readlen = data.getOffset();
            if (readlen === 0) {
              readlen = data.getSize();
            } else {
              readlen = data.getSize() - readlen;
            }
          }
          val = data.getString(readlen, 'GBK');
          //val = val.delNull()
        }
        break;
      case 'wstring':
        {
          let readlen = this._len;
          if (this._fixed == true) {
            readlen = data.getOffset();
            if (readlen === 0) {
              readlen = data.getSize();
            } else {
              readlen = data.getSize() - readlen;
            }
          }
          val = data.getString(readlen);
          //val = val.delNull()
        }
        break;
      default:
        break;
    }
    return val;
  }

  /**
   * @description: 写入数据
   * @param {DataBuffer} data
   * @return {*}
   */
  write(data: DataBuffer) {
    this.writeDataByType(this._value, data);
    return data.getSize();
  }

  /**
   * @description: 读取数据
   * @param {DataBuffer} data
   * @return {*}
   */
  read(data: DataBuffer) {
    this._value = this.readDataByType(data);
    return data.getSize();
  }

  /**
   * @description: 转换到DataBuffer
   * @return {*}
   */
  toDataBuffer() {
    let data = new DataBuffer(this._len);
    this.writeDataByType(this._value, data);
    return data;
  }

  /**
   * @description: 设置值
   * @param {any} val
   * @return {*}
   */
  set value(val: any | null) {
    if (this._type === 'cstring' || this._type === 'wstring') {
      this._value = val?.toString();
    } else {
      this._value = val;
    }
  }

  /**
   * @description: 获取值
   * @return {*}
   */
  get value() {
    return this._value;
  }

  /**
   * @description: 获取对象类型
   * @return {*}
   */
  getType() {
    return this._type;
  }

  /**
   * @description: 判断是否为Long类型处理 int64 uint64
   * @return {*}
   */
  isLong() {
    if (this.value instanceof Long) {
      return true;
    }
    return false;
  }

  /**
   * @description: 转字符串
   * @return {*}
   */
  toString(): string {
    return this.value.toString();
  }

  /**
   * @description: 获取数据类型大小
   * @return {*}
   */
  size(): number {
    return this._len;
  }
}

export class BOOL extends BaseType {
  constructor(value: number = 0) {
    let val = false;
    if (value === void 0) {
      value = 0;
    }
    val = value === 0 ? false : true;
    super(1, val, 'bool');
  }
}

export class BYTE extends BaseType {
  constructor(value: number = 255) {
    if (value === void 0) {
      value = 255;
    }
    super(1, value, 'byte');
  }
}

export class CHAR extends BaseType {
  constructor(value: number = 0) {
    if (value === void 0) {
      value = 0;
    }
    super(1, value, 'char');
  }
}

export class WORD extends BaseType {
  constructor(value: number = 0) {
    if (value === void 0) {
      value = 0;
    }
    super(2, value, 'word');
  }
}

export class DWORD extends BaseType {
  constructor(value: number = 0) {
    if (value === void 0) {
      value = 0;
    }
    super(4, value, 'dword');
  }
}

export class SHORT extends BaseType {
  constructor(value: number = 0) {
    if (value === void 0) {
      value = 0;
    }
    super(2, value, 'short');
  }
}

export class INT extends BaseType {
  constructor(value: number = 0) {
    if (value === void 0) {
      value = 0;
    }
    super(4, value, 'int');
  }
}

export class UINT extends BaseType {
  constructor(value: number = 0) {
    if (value === void 0) {
      value = 0;
    }
    super(4, value, 'uint');
  }
}

export class LONG extends BaseType {
  constructor(value: number = 0) {
    if (value === void 0) {
      value = 0;
    }
    super(4, value, 'long');
  }
}
export class FLOAT extends BaseType {
  constructor(value: number = 0.0) {
    if (value === void 0) {
      value = 0.0;
    }
    super(4, value, 'float');
  }
}

export class DOUBLE extends BaseType {
  constructor(value: number = 0.0) {
    if (value === void 0) {
      value = 0.0;
    }
    super(8, value, 'double');
  }
}

/**
 * 目前都只是用number做处理基本上2^53=9007199254740992够用
 */
export class LONGLONG extends BaseType {
  constructor(value: number | Long = 0) {
    if (value === void 0) {
      value = 0;
    }
    super(8, value, 'longlong');
  }
}

/**
 * 目前都只是用number做处理基本上2^53=9007199254740992够用
 */
export class SCORE extends BaseType {
  constructor(value: number | Long = 0) {
    if (value === void 0) {
      value = 0;
    }
    super(8, value, 'score');
  }
}

export class ULONGLONG extends BaseType {
  constructor(value: number | Long = 0) {
    if (value === void 0) {
      value = 0;
    }
    super(8, value, 'ulonglong');
  }
}

export class USCORE extends BaseType {
  constructor(value: number | Long) {
    if (value === void 0) {
      value = 0;
    }
    super(8, value, 'uscore');
  }
}

export class CSTRING extends BaseType {
  constructor(len: number, value: string = '') {
    if (len === void 0) {
      len = 0;
    }
    if (value === void 0) {
      value = '';
    }
    super(len, value, 'cstring');
  }
}

export class WSTRING extends BaseType {
  constructor(len: number, value: string = '') {
    if (len === void 0) {
      len = 0;
    }
    if (value === void 0) {
      value = '';
    }
    super(len * 2, value, 'wstring');
  }
}

/**
 * @description: 结算结构体大小
 * @param {*} obj 只计算Struct类中的属于BaseType类型的大小
 * @return {*}
 */
export function sizeOf(obj) {
  let length = 0;
  if (obj instanceof Struct) {
    for (const key in obj) {
      if (obj[key] instanceof BaseType) {
        length += obj[key].size();
      } else if (obj[key] instanceof Struct) {
        length += sizeOf(obj[key]);
      } else if (obj[key] instanceof DataBuffer) {
        length += obj[key].getSize();
      } else if (obj[key] instanceof Array) {
        for (const item in obj[key]) {
          length += sizeOf(obj[key][item]);
        }
      }
    }
  } else if (obj instanceof Array) {
    for (const key in obj) {
      length += sizeOf(obj[key]);
    }
  } else if (obj instanceof DataBuffer) {
    length += obj.getSize();
  } else if (obj instanceof BaseType) {
    length += obj.size();
  }
  return length;
}

/**
 * @description: 只辅助解析Struct类
 * @param {*} obj struct
 * @param {*} buffer
 * @return {*}
 */
export function ReadNetPacket(obj, buffer) {
  if (obj instanceof Struct) {
    for (const key in obj) {
      if (obj[key] instanceof Struct) {
        obj[key].readBuffer(buffer);
      } else if (obj[key] instanceof BaseType) {
        obj[key].read(buffer);
      } else if (obj[key] instanceof Array) {
        obj[key] = obj[key] as List;
        if (obj[key].fixed) {
          if (obj[key][0] instanceof Struct) {
            let readlen = buffer.getOffset();
            let surpluslen = buffer.getSize() - readlen;
            let item = surpluslen / sizeOf(obj[key][0]);
            let tmpname = obj[key][0].constructor;
            obj[key] = new List();
            obj[key].fixed = true;
            for (let index = 0; index < item; index++) {
              let tmp = new tmpname();
              ReadNetPacket(tmp, buffer);
              obj[key].push(tmp);
            }
          }
        } else {
          for (const item in obj[key]) {
            ReadNetPacket(obj[key][item], buffer);
          }
        }
      }
    }
  } else if (obj instanceof Array) {
    obj = obj as List;
    if (obj.fixed) {
      if (obj[0] instanceof Struct) {
        let readlen = buffer.getOffset();
        let surpluslen = buffer.getSize() - readlen;
        let item = surpluslen / sizeOf(obj[0]);
        let tmpname = (obj[0] as Struct).constructor;
        obj = new List();
        obj.fixed = true;
        for (let index = 0; index < item; index++) {
          let tmp = tmpname;
          ReadNetPacket(tmp, buffer);
          obj.push(tmp);
        }
      }
    } else {
      for (const key in obj) {
        ReadNetPacket(obj[key], buffer);
      }
    }
  } else if (obj instanceof BaseType) {
    obj.read(buffer);
  }
}

/**
 * @description: 只辅助解析Struct类列表
 * @param {*} obj
 * @param {*} buffer
 * @return {*}
 */
export function ReadNetPacketList<T>(ctor: new (len: number) => T, buffer): Array<T> {
  let list = new Array<T>();
  if (ctor.prototype instanceof Struct) {
    let netpakcet = new ctor(0);
    let item = buffer.getSize() / sizeOf(netpakcet);
    for (let index = 0; index < item; index++) {
      netpakcet = new ctor(0);
      ReadNetPacket(netpakcet, buffer);
      list.push(netpakcet);
    }
  }
  return list;
}

/**
 * @description: 根据Struct类型读取解析网络包
 * @param {function} ctor
 * @param {*} buffer
 * @return {*}
 */
export function ReadNetStruct<T>(ctor: new (len: number) => T, buffer): T {
  if (ctor.prototype instanceof Struct) {
    let netpakcet = new ctor(0);
    ReadNetPacket(netpakcet, buffer);
    return netpakcet;
  }
  return null;
}

export function ReadBaseType<T>(ctor: new (len: number) => T, buffer, len: number = 0, fixed: boolean = false): T {
  if (ctor.prototype instanceof BaseType) {
    let obj = new ctor(len);
    let tmp = (obj as BaseType).getType();
    if (tmp === 'cstring' || tmp === 'wstring') {
      obj['_fixed'] = fixed;
      obj['read'].call(obj, buffer);
      return obj;
    } else {
      obj['read'].call(obj, buffer);
      return obj;
    }
  }
  return null;
}

/**
 * @description: 只辅助写Struct类
 * @param {*} obj struct
 * @return {*}
 */
export function WriteNetPacket(obj) {
  if (obj instanceof Struct) {
    let buffer = new DataBuffer(obj.size());
    for (const key in obj) {
      if (obj[key] instanceof Struct) {
        let tmp = obj[key].writeBuffer();
        if (tmp !== null) {
          buffer.setUint8Array(tmp.getBufferData(), tmp.getSize());
        }
      } else if (obj[key] instanceof BaseType) {
        obj[key].write(buffer);
      } else if (obj[key] instanceof DataBuffer) {
        
        buffer.setUint8Array(obj[key].getBufferData(), obj[key].getSize());
      } else if (obj[key] instanceof Array) {
       
        for (const item in obj[key]) {
          let tmp = WriteNetPacket(obj[key][item]);
          if (tmp !== null) {
            buffer.setUint8Array(tmp.getBufferData(), tmp.getSize());
          }
        }
      }
    }
    return buffer;
  } else if (obj instanceof Array) {
    let buffer = new DataBuffer();
    for (const key in obj) {
      let tmp = WriteNetPacket(obj[key]);
      if (tmp !== null) {
        buffer.setUint8Array(tmp.getBufferData(), tmp.getSize());
      } else {
        return null;
      }
    }
    return buffer;
  } else if (obj instanceof DataBuffer) {
    let buffer = new DataBuffer(obj.getSize(), obj);
    return buffer;
  } else if (obj instanceof BaseType) {
    let buffer = new DataBuffer(obj.size());
    obj.write(buffer);
    return buffer;
  }
  return null;
}

/**
 * @description: 所有网络包都继承这个类
 */
export class Struct {
  /**
   * @description: 解析buffer
   * @param {*} buffer DataBuffer
   * @return {*}
   */
  readBuffer(buffer) {
    ReadNetPacket(this, buffer);
  }

  size() {
    return sizeOf(this);
  }

  /**
   * @description: 转换成buffer
   * @return {DataBuffer}
   */
  writeBuffer() {
    return WriteNetPacket(this);
  }
}

/**
 * @description: 创建基础类数组
 * @param {*} ctor
 * @param {*} lentable
 * @param {*} len
 * @return {*}
 */
function createBaseTypeArray(ctor, lentable, len, fixed) {
  let depth = lentable[0];
  let tablelen = lentable.length;
  let entryLen = 0;
  let tmpT = new Array();
  if (tablelen == 1) {
    entryLen = lentable[0];
    for (let i = 0; i < entryLen; i++) {
      let obj = new ctor();
      let tmp = (obj as BaseType).getType();
      if (tmp === 'cstring' || tmp === 'wstring') {
        //只适合最后末尾读取
        obj['_len'] = tmp === 'wstring' ? len * 2 : len;
        obj['_fixed'] = fixed;
        return obj;
      }
      tmpT.push(obj);
    }
  } else {
    for (let i = 0; i < depth; i++) {
      let lenT = new Array();
      let index = 0;
      for (let m = 1; m < tablelen; m++) {
        lenT[index] = lentable[m];
      }
      tmpT.push(createBaseTypeArray(ctor, lenT, len, fixed));
    }
  }
  return tmpT;
}

/**
 * @description: 创建Struct数组
 * @param {*} ctor
 * @param {*} lentable
 * @return {*}
 */
function createStructArray(ctor, lentable, fixed = false) {
  let tmpT = new List();
  tmpT.fixed = fixed;
  if (fixed) {
    tmpT.push(new ctor(0));
    return tmpT;
  }
  let depth = lentable[0];
  let tablelen = lentable.length;
  let entryLen = 0;
  if (tablelen == 1) {
    entryLen = lentable[0];
    for (let i = 0; i < entryLen; i++) {
      tmpT.push(new ctor(0));
    }
  } else {
    for (let i = 0; i < depth; i++) {
      let lenT = new Array();
      let index = 0;
      for (let m = 1; m < tablelen; m++) {
        lenT[index] = lentable[m];
      }
      tmpT.push(createStructArray(ctor, lenT));
    }
  }
  return tmpT;
}

export function CreateObject<T>(ctor: new (len: number) => T, len: number = 0, fixed = false): T {
  if (ctor.prototype instanceof Struct || ctor.prototype instanceof BaseType) {
    if (ctor.prototype instanceof Struct) {
      return new ctor(0);
    } else if (ctor.prototype instanceof BaseType) {
      let obj = new ctor(0);
      let tmp = (obj as BaseType).getType();
      if (tmp === 'cstring' || tmp === 'wstring') {
        //只适合最后末尾读取
        obj['_len'] = tmp === 'wstring' ? len * 2 : len;
        obj['_fixed'] = fixed;
        return obj;
      } else {
        return obj;
      }
    }
    return null;
  } else {
    throw new Error('The created type is not supported');
    return null;
  }
}

export function CreateArray<T>(ctor: new (len: number) => T, lentable = null, len: number = 0, fixed = false): Array<T> {
  if (ctor.prototype instanceof Struct || ctor.prototype instanceof BaseType) {
    if (lentable !== null && lentable.length == 1) {
      //创建数组
      if (ctor.prototype instanceof Struct) {
        return createStructArray(ctor, lentable, fixed);
      } else if (ctor.prototype instanceof BaseType) {
        return createBaseTypeArray(ctor, lentable, len, fixed);
      }
    }
    return null;
  } else {
    throw new Error('The created type is not supported');
    return null;
  }
}

export function CreateArray2<T>(ctor: new (len: number) => T, lentable = null, len: number = 0, fixed = false): Array<Array<T>> {
  if (ctor.prototype instanceof Struct || ctor.prototype instanceof BaseType) {
    if (lentable !== null && lentable.length == 2) {
      //创建数组
      if (ctor.prototype instanceof Struct) {
        return createStructArray(ctor, lentable, fixed);
      } else if (ctor.prototype instanceof BaseType) {
        return createBaseTypeArray(ctor, lentable, len, fixed);
      }
    }
    return null;
  } else {
    throw new Error('The created type is not supported');
    return null;
  }
}

export function CreateArray3<T>(ctor: new (len: number) => T, lentable = null, len: number = 0, fixed = false): Array<Array<Array<T>>> {
  if (ctor.prototype instanceof Struct || ctor.prototype instanceof BaseType) {
    if (lentable !== null && lentable.length == 3) {
      //创建数组
      if (ctor.prototype instanceof Struct) {
        return createStructArray(ctor, lentable, fixed);
      } else if (ctor.prototype instanceof BaseType) {
        return createBaseTypeArray(ctor, lentable, len, fixed);
      }
    }
    return null;
  } else {
    throw new Error('The created type is not supported');
    return null;
  }
}

/**
 * @description: 创建不定长的网络数组---夹在中间的变量不允许为不定长数组 ---只允许最后末尾变量创建使用 ---最大长度由外部调用进行过滤处理
 * @param {*} ctor 类名
 * @return {*}
 */
export function CreateNoFixedArray<T>(ctor: new (len: number) => T): Array<T> {
  if (ctor.prototype instanceof Struct || ctor.prototype instanceof BaseType) {
    return createStructArray(ctor, [], true);
  } else {
    throw new Error('The created type is not supported');
    return null;
  }
}
