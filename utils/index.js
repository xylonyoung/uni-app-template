import numbro from 'numbro'
import { baseURL } from '@/settings'

export function numberFormat(num = 0) {
  return numbro(num).format({
    thousandSeparated: true,
    trimMantissa: true,
    mantissa: 2,
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
  return str.replace(/\_|\-(\w)/g, function (match, letter, offset) {
    return offset > 0 ? letter.toUpperCase() : letter
  })
}
export function htmlFormat(htmlData = '') {
  const str = `src="${baseURL}/uploads`
  return htmlData.replace(/src="(.*?)uploads/g, str)
}
