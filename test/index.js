function deepClone (source, map = new WeakMap()) {
  if (!isObject(source)) return source;

  const target = Array.isArray(source) ? [] : {};

  // 解决递归可能会引起的循环引用问题
  if (map.has(source)) {
    return map.get(source);
  }
  map.set(source, target);

  // for/while 的效率比 for...in 高
  if (Array.isArray(source)) {
    const len = source.length;
    for (let i = 0; i < len; i++) {
      target[i] = deepClone(source[i], map);
    }
  } else {
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        target[key] = deepClone(source[key], map);
      }
    }
  }

  return target;
}