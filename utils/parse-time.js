export default function parseTime(date, hour) {
  if(!date){
    return 
  }
  let time = date.split('+')[0].replace('T', ' ')
  if (hour) {
    return time
  } else {
    return time.split(' ')[0]
  }
}
