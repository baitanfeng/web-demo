export const toString = Object.prototype.toString;

export function addURLParam(url, name, value) {
  url += url.indexOf('?') === -1 ? '?' : '&';
  url += `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
  return url;
}

export function isCallable(fn) {
  return (
    typeof fn === 'function' ||
    toString.call(fn) === '[object Function]'
  );
}

export function defaultToString(v) {
  if (v === null) {
    return 'NULL';
  }
  if (v === undefined) {
    return 'UNDEFINED';
  }
  return v.toString();
}

export function is32BitChar(c) {
  return c.codePointAt(0) > 0xFFFF;
}

export function codePointLength(text) {
  const result = text.match(/[\s\S]/gu);
  return result ? result.length : 0;
}

export function hasRegExpU() {
  try {
    const pattern = new RegExp('', 'u');
    return true;
  } catch (ex) {
    return false;
  }
}

export function toUint32(value) {
  return Math.floor(Math.abs(Number(value))) % Math.pow(2, 32);
}

export function isArrayIndex(key) {
  const numericKey = toUint32(key);
  return String(numericKey) === key && numericKey < (Math.pow(2, 32) - 1);
}

/**
 * 转换（四舍五入/截取）数字到指定小数位数的字符串
 * 
 * @param {Number} value 需转换的数字
 * @param {Number} len 小数点后数字的个数，如果忽略此参数，则默认为 0
 * @param {Boolean} isRound 是否四舍五入，如果忽略此参数，则默认为 true
 * 
 * @returns {String} 给定数字的字符串
 */
export const toFixed = (value, len = 0, isRound = true) => {
  const val = Number.parseFloat(value);

  // 处理无效情况
  if (Number.isNaN(val)) return value;
  if (!Number.isInteger(len) || len < 0 || len > 100) return value;
  if (typeof isRound !== 'boolean') return value;

  // 四舍五入
  if (isRound) {
    return val.toFixed(len);
  }

  // 以下为截取的处理逻辑

  // 处理特殊情况
  if (len === 0) {
    return `${Math[val >= 0 ? 'floor' : 'ceil'](val)}`;
  }

  return val.toString().replace(/(-?\d+)?(\.)?(\d+)?/, (match, p1, p2, p3) => {
    if (p2 === undefined) {
      return `${p1}.${'0'.repeat(len)}`;
    } else {
      return `${p1}${p2}${p3.substring(0, len).padEnd(len, '0')}`;
    }
  });
}