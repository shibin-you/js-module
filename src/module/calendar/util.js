export const getDate = (now) => {
  if (!now) {
    return
  }
  var t = new Date(now)
  return {
    year: t.getYear() + 1900,
    month: t.getMonth() + 1,
    date: t.getDate()
  }
}

export const getNowDate = () => getDate(Date.now())
// 是不是瑞年
export const isLeapYear = year => year % 400 == 0 || year % 4 == 0 && year % 100 != 0
// 获取当月有几天
export const getMonthDayCount = (year, month) => {
  let n
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      n = 31;
      break;
    case 2:
      n = isLeapYear(year) ? 29 : 28
      break;
    default:
      n = 30
  }
  return n
}
/**
获取某月一号是周几
**/
export const getFirstDayInWeak = (year, month) => new Date(year + '/' + month + '/' + '01').getDay()
