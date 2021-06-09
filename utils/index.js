import numbro from 'numbro'
import { baseURL } from '@/settings'
import timeFormat from 'uview-ui/libs/function/timeFormat'

export function getQueryDateRange({ startDate, endDate }) {
  const tomorrow = timeFormat(getTomorrow(endDate))
  return `entity.getCreatedTime() >= datetime.get('${startDate}') && entity.getCreatedTime() <= datetime.get('${tomorrow}')`

  function getTomorrow(date) {
    const today = new Date(date)
    return new Date(today.setDate(today.getDate() + 1))
  }
}

export function numberFormat(num, option) {
  const options = {
    thousandSeparated: true,
    trimMantissa: true,
    mantissa: 2,
    ...option
  }
  return numbro(num ?? 0).format(options)
}

export function buildFullPath(relativeURL) {
  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
}

export function getImage(name) {
  return buildFullPath(`/uploads/images/${name}`)
}

export function htmlFormat(htmlData) {
  if (!htmlData) return
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
export function getValue(arg, prop) {
  if (typeof arg !== 'object' || typeof prop !== 'string') return null

  const keys = prop.split('.')

  let result = arg

  for (const key of keys) {
    result = result?.[key]
    if (!result) break
  }

  return result ?? null
}
