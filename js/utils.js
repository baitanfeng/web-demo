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