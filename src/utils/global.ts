/* eslint-disable */
import { Base64 } from './base64';
import { time } from './time';
import md5 from 'js-md5';

function CustomFunction() {
  /////////////////////////////////////////////////////////////////////////////////////////////
  //String扩展
  String.prototype.formatLogList = function (value) {
    var args = value;
    var index = 0;
    return this.replace(/\{(\d*)\}/g, function () {
      var val = args[index];
      index++;
      if (undefined === val) {
        return '';
      } else if (typeof val == 'function') {
        return val;
      }
      try {
        var str = JSON.stringify(val);
      } catch (e) {
        str = val;
      }
      return str;
    });
  };

  String.prototype.formatList = function (value) {
    var args = value;
    if (!!(value instanceof Object) || !!(value instanceof Array)) {
      args = arguments;
    }
    return this.replace(/\{(\d+)\}/g, function () {
      var val = args[arguments[1]];
      return val == null ? arguments[0] : val;
    });
  };

  String.prototype.splice = function (index, remove, str) {
    return this.slice(0, index) + str + this.slice(index + Math.abs(remove));
  };

  String.prototype.toBase64 = function () {
    return Base64.encode(this);
  };

  String.prototype.frombase64 = function () {
    return Base64.decode(this);
  };

  String.prototype.toMD5 = function (low: boolean = true) {
    let result = md5(this.valueOf());
    return low ? result : result.toUpperCase();
  };

  String.prototype.toFixedEx = function (fixed: number = 2) {
    console.log(this);
    try {
      const number = parseFloat(this.toString());
      return number.toFixedEx(fixed);
    } catch (error) {}
    return '';
  };

  Number.prototype.toFixedEx = function (fixed: number = 2) {
    const [s, e] = `${this}`.split('.');
    console.log({ s, e });
    let eArr = new Array(fixed).fill(0);
    if (e) {
      const ea = e.split('');
      eArr = [...ea];
      const c = Math.abs(ea.length - fixed);
      if (c) {
        for (let index = 0; index < c; index++) {
          eArr.push(0);
        }
      }
    }

    return fixed > 0 ? `${s}.${eArr.join('')}` : s;
  };

  Date.prototype.Format = function (fmt: string = 'yyyy-MM-dd hh:mm:ss') {
    return time.format(this, fmt);
  };

  window['clog'] = new (class {
    blog: boolean = true;
    setlog(blog) {
      this.blog = blog;
    }
    error(str, ...args) {
      if (arguments.length === 0) return;
      this.printLog('error', str, args);
    }
    warn(str, ...args) {
      if (arguments.length === 0) return;
      this.printLog('warn', str, args);
    }
    info(str, ...args) {
      if (arguments.length === 0) return;
      this.printLog('log', str, args);
    }
    private printLog(tag, fmt, arr) {
      if (!this.blog) return;
      if (fmt === null) {
        return;
      }
      if (arr === null) {
        return;
      }
      var msg = arr.length != 0 ? fmt.toString().formatLogList(arr) : fmt;
      var d = new Date();
      var ts = d.Format('hh:mm:ss.S');
      var logms = ' [' + tag + '] ' + ts + ' : ' + msg;
      console.log(logms);
    }
  })();
}
export default CustomFunction;
