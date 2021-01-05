export default function getValue(obj, key) {
  if (!obj) {
    return null
  }

  if (typeof key === 'string') {
    return getValue(obj, key.split('.'))
  }

  if (key.length === 1) {
    if (Object.prototype.hasOwnProperty.call(obj, key[0])) {
      return obj[key[0]] !== undefined ? obj[key[0]] : null
    } else {
      return null
    }
  }

  if (Object.prototype.hasOwnProperty.call(obj, key[0])) {
    return getValue(obj[key[0]], key.slice(1))
  }
}
