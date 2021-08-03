import numbro from 'numbro'
import { baseURL } from '@/config'
import { get } from 'lodash'

/**
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns {string}
 */
export function getQueryDateRange(startDate, endDate) {
  const tomorrow = getTomorrow(endDate).toISOString()
  return `entity.getCreatedTime() >= datetime.get('${startDate.toISOString()}') && entity.getCreatedTime() < datetime.get('${tomorrow}')`

  function getTomorrow(date) {
    const today = new Date(date)
    return new Date(today.setDate(today.getDate() + 1))
  }
}

/**
 * @param {(Number|String)} num
 * @returns {string}
 * https://numbrojs.com/format.html
 */
export function numberFormat(num, option) {
  if (!num ?? isNaN(num)) return '0'

  const options = {
    thousandSeparated: true,
    trimMantissa: true,
    mantissa: 2,
    ...option
  }
  return numbro(num).format(options)
}

/**
 * @param {String} relativeURL
 * @returns {String}
 */
export function buildFullPath(relativeURL) {
  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
}

/**
 * @param {String} image
 * @returns {String}
 */
 export function getImage(image) {
  const name = image?.__toString ?? image
  if (/^http|^data:image/.test(name)) {
    return name
  }

  return buildFullPath(`/uploads/images/${name}`)
}

/**
 * @param {String} htmlData
 * @returns {String}
 */
export function htmlFormat(htmlData) {
  if (!htmlData) return
  const str = `src="${baseURL}/uploads`
  return htmlData.replace(/src="(.*?)uploads/g, str)
}

/**
 * @param {Object} object
 * @param {String} path
 * @returns {String}
 * https://www.lodashjs.com/docs/lodash.get
 */
export function getValue(object, path) {
  return get(object, path, null)
}
