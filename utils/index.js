import numbro from 'numbro'
import { baseURL } from '@/settings'

export function numberFormat(num = 0, mantissa = 2) {
  return numbro(num).format({
    thousandSeparated: true,
    trimMantissa: true,
    mantissa,
  })
}

export function numberFormatCn(num = 0) {
  if (num >= 10000) {
    return numberFormat(num / 10000) + '万'
  }
  return numberFormat(num)
}

export function getImage(name = '') {
  return `${baseURL}/uploads/images/${name}`
}

export function toCamelCase(str) {
  return str.replace(/\_|\-(\w)/g, function (match, p1, offset) {
    return offset > 0 ? p1.toUpperCase() : p1
  })
}

export function htmlFormat(htmlData = '') {
  const str = `src="${baseURL}/uploads`
  return htmlData.replace(/src="(.*?)uploads/g, str)
}

/**
 * get the value in Object or Array
 * key include "." to separate
 * @param {Object | Array} arg
 * @param {String} key
 * @returns {String | null}
 */
export function getValue(arg, key) {
  if (!arg) {
    return null
  }
  
  if (typeof key === 'string') {
    return getValue(arg, key.split('.'))
  }

  const result = arg?.[key[0]]

  if (key.length === 1) {
    return result ?? null
  } else {
    return getValue(result, key.slice(1))
  }
}
