/* eslint-disable */
import i18n from 'i18next';
export namespace time {

    /**
     * @description: 获取当前时间以毫秒为单位
     * @param {boolean} sec 默认毫秒，传入true为秒
     * @param {boolean} floor 当sec为true时，默认获取秒数向下取整，传入false向上取整
     * @return {*}
     */
    export function getCurTime(sec: boolean = false, floor: boolean = true): number {
        const time: number = new Date().getTime()
        return sec ? getSec(time, floor) : time
    }

    /**
     * @description: 毫秒转秒
     * @param {number} millisecond
     * @param {boolean} floor 默认向下取整，传入false向上取整
     * @return {*}
     */
    export function getSec(millisecond: number, floor: boolean = true): number {
        return (floor ? Math.floor : Math.ceil)(millisecond / 1000)
    }

    /**
     * @description: 秒转毫秒
     * @param {number} second
     * @return {*}
     */
    export function getMSec(second: number): number {
        return second * 1000
    }

    /**
     * @description: 获取格式化后的字符串
     * @param {Date} date
     * @param {string} fmt
     * @return {*}
     */
    export function format(date: Date | number, fmt: string = "yyyy-MM-dd hh:mm:ss"): string {
        let _date: Date = new Date()
        if (date instanceof Date)
            _date = date
        else
            _date.setTime(date)
        const o = {
            "M+": _date.getMonth() + 1, //月
            "d+": _date.getDate(), //日
            "h+": _date.getHours(), //小时
            "m+": _date.getMinutes(), //分
            "s+": _date.getSeconds(), //秒
            "q+": Math.floor((_date.getMonth() + 3) / 3), //季度
            S: _date.getMilliseconds(), //毫秒
        }
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (_date.getFullYear() + "").substr(4 - RegExp.$1.length))
        for (const k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length))
        return fmt
    }

    /**
     * @description: 毫秒转yyyy-mm-dd hh:mm:ss
     * @param {number} timeStamp 毫秒数
     * @param {boolean} onlyTime 是否去掉年月日
     * @return {*}
     */
    export function formatDateTime(timeStamp: number, onlyTime: boolean = false, onlyDate: boolean = false) {
        const date: Date = new Date()
        timeStamp -= 8 * 60 * 60 * 1000
        date.setTime(timeStamp)
        const y: number = date.getFullYear()
        const m: number = date.getMonth() + 1
        const d: number = date.getDate()
        const h = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        // const ms = date.getMilliseconds()
        // if (y == 1970 && m == 1 && d == 1 && h == 0 && minute == 0) {
        //     if (second == 0)
        //         return ms + "ms"
        //     else if
        //         (second < 60) return second + "." + ms / 1000.0 + "s"
        // }
        const hStr = h < 10 ? "0" + h : h + ""
        const minuteStr = minute < 10 ? "0" + minute : minute + ""
        const secondStr = second < 10 ? "0" + second : second + ""
        const result: string = hStr + ":" + minuteStr + ":" + secondStr
        if (onlyTime) {
            return result
        }

        const mStr = m < 10 ? "0" + m : m + ""
        const dStr = d < 10 ? "0" + d : d + ""
        if(onlyDate){
            return y + "-" + mStr + "-" + dStr;
        }
        return y + "-" + mStr + "-" + dStr + " " + result
    }

    /**
     * @description: 日期字符串转时间戳(yyyy-mm-dd hh:mm:ss)
     * @param {string} time
     * @return {*}
     */
    export function getTimeStamp(time: string): number {
        time = time.replace(/-/g, "/")
        const timestamp: number = new Date(time).getTime()
        return timestamp
    }

    /**
     * @description: 时间戳转天数，不足一天按一天算
     * @param {number} time
     * @return {*}
     */
    export function formatDay(time: number): number {
        if (time == 0)
            return 0
        const unit_day: number = 60 * 60 * 24
        const days: number = Math.ceil(time / unit_day)
        return days
    }

    /**
     * @description: 时间转字符串00:00
     * @param {*} s
     * @return {*}
     */
    export function formatTime(s): string {
        const hours = Math.floor(s / 3600)
        const minutes = Math.floor(s / 60) % 60
        const seconds = s % 60

        if (hours < 1) {
            return (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
        } else {
            return (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds)
        }
    }

    export function formatMD(s:string):string {
        if (s && s.indexOf('-') > 0) {
            const [m, day] = s.split('-');
            return `${m}${i18n.t('yue')}${day}${i18n.t('ri')}`
        }
        return s;
    }
}