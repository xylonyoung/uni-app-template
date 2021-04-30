import numbro from 'numbro'
import { baseURL } from '@/settings'

export function numberFormat(num, mantissa = 2) {
  return numbro(num ?? 0).format({
    thousandSeparated: true,
    trimMantissa: true,
    mantissa,
  })
}

export function numberFormatCn(num) {
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
 * @param {Object | Array} obj
 * @param {String} prop
 * @returns {String | null}
 */
 export function getValue(obj, prop) {
  if (typeof obj !== 'object' || typeof prop !== 'string') return null

  const keys = prop.split('.')

  let result = obj

  for (const key of keys) {
    result = result?.[key]
    if (!result) break
  }

  return result ?? null
}