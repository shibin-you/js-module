import {
  getMonthDayCount,
  getDate,
  getFirstDayInWeak
} from './util'
import {
  query,
  addClass,
  removeClass,
  prefixStyle,
  getAttr
} from '@/util/dom'
class Calendar {
  constructor(opts) {
    this.opts = opts

    this._loadDom()
  }
  show() {
    addClass(this.el, 'on')
    this.modal.style.opacity = 1;
    this.calendarBottom.style[prefixStyle('transform')] = 'translateY(0%)';
  }
  hide() {
    this.modal.style.opacity = 0
    this.calendarBottom.style[prefixStyle('transform')] = 'translateY(100%)'
    let u = this

    function transitionFun() {
      removeClass(u.el, 'on')
      u.modal.removeEventListener('transitionend', transitionFun)
    }
    this.modal.addEventListener('transitionend', transitionFun, false)
  }
  _loadDom() {
    //
    let start = getDate(this.opts.start)
    let end = getDate(this.opts.end)
    let monthTpl = ''
    // 获取一共有几个月
    let yearCount = end.year - start.year
    if (yearCount < 0) {
      throw new Error('End should not be less than start')
    }
    let monthCount = yearCount * 12 + (end.month - start.month)
    for (let i = 0; i <= monthCount; i++) {
      let year = start.year + parseInt((i + start.month) / 12)
      let month = (i + start.month) % 12 || 12
      let emptyDateCount = getFirstDayInWeak(year, month)
      let dateTpl = ""
      for (let j = 0; j < emptyDateCount; j++) {
        dateTpl += '<li></li>'
      }
      let dayCount = getMonthDayCount(year, month)
      let elClassName = ''
      for (let k = 0; k < dayCount; k++) {
        let date = k + 1
        let special = this._resolveSpecial({
          year: year,
          month: month,
          date: date
        })
        let elClassName = ''
        if (special.isSpecial) {
          elClassName = 'calendar-special'
        }
        if (start.year === year && start.month === month && start.date > date) {
          elClassName += ' calendar-date-invalid';
        } else if (end.year === year && end.month === month && end.date < date) {
          elClassName += ' calendar-date-invalid';
        } else {
          elClassName += ' calendar-date-current'
        }
        dateTpl += `<li class="calendar-date-item ${elClassName}"  data-date="${year}/${month}/${date}">
             <p class="calendar-day">${date}</p>
             ${special.tpl}
             </li>`
      }
      monthTpl += `
      <div class="calendar-month">${year}年${month}月</div>
    <ul class="calendar-date clearfix">
    ${dateTpl}
    </ul>
      `
    }
    this.el = document.createElement('div')
    this.el.className = 'calendar'
    this.el.innerHTML = `<div class="calendar-bottom">
        <div class="calendar-header">
          <div class="calendar-header-title">选择日期</div>
          <div class='calendar-cancel'>取消</div>
        </div>
        <ul class="calendar-weakday clearfix">
          <li>日</li>
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li>
        </ul>
        <div class="calendar-body">
    ${monthTpl}
      </div>
        </div>
      <div class="calendar-modal"></div>
      `
    document.body.appendChild(this.el)
    this.modal = query('.calendar-modal')
    this.el = query('.calendar')
    this.modal = query('.calendar-modal')
    this.calendarBottom = query('.calendar-bottom')
    this.cancelBtn = query('.calendar-cancel')

    this.cancelBtn.onclick = () => {
      this.hide()
    }
    this._addItemClick()
  }
  _addItemClick() {
    let u = this
    let items = document.getElementsByClassName('calendar-date-current')
    for (let i = 0; i < items.length; i++) {
      items[i].onclick = function() {

        let prevEl = query('.calendar-date-current.calendar-on')
        if (prevEl) {
          removeClass(prevEl, 'calendar-on')
        }

        addClass(this, 'calendar-on')
        let date = getDate(getAttr(this, 'date'))
        if (typeof u.opts.itemClick === 'function') {
          u.opts.itemClick.call(u, date)
        }
        if(u.opts.autoHide){
          u.hide()
        }
      }
    }
  }
  _resolveSpecial(date) {
    let specialDates = this.opts.specialDates;
    if(!specialDates){
      return ''
    }
    let tpl = ''
    for (let i = 0; i < specialDates.length; i++) {
      let specialDate = getDate(specialDates[i].date)
      if (specialDate.year === date.year && specialDate.month === date.month && specialDate.date === date.date) {
        tpl = `<p class='calendar-note'>${specialDates[i].text}</p>`
        return {
          tpl: tpl,
          isSpecial: true
        }
      }
    }
    return {
      tpl: tpl
    }
  }
}

export default window.Calendar = Calendar
