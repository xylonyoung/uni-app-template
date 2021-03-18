import numbro from 'numbro'
import timeFormat from 'uview-ui/libs/function/timeFormat'
import { baseURL } from '@/settings'
export function numberFormat(num) {
  if (!num) return 0
  return numbro(num).format({
    thousandSeparated: true,
    trimMantissa: true,
    mantissa: 2
  })
}
export function numberFormatCn(num) {
  if (!num) return 0
  if (num >= 10000) {
    return numberFormat(num / 10000) + '万'
  }
  return numberFormat(num)
}
export function getImage(name) {
  if (!name) return ''
  return `${baseURL}/uploads/images/${name}`
}
export function parseTime(date, type) {
  if (!date) return ''
  if (type) {
    return timeFormat(date, type)
  } else {
    return timeFormat(date, 'yyyy-mm-dd hh:MM')
  }
}
export function productDescription(description) {
  if (!description) return ''
  const str = 'src="' + baseURL
  return description.replace(/src="/g, str)
}
