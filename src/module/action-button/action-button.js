import {
  query,
  addClass,
  removeClass,
  prefixStyle
} from '@/util/dom'

class ActionButton {
  constructor(opts) {
    this._loadContent(opts.items)
    this.el = query('.actionsheet-container')
    this.cancelBtn = query('.actionsheet-cancel')
    this.modal = query('.actionsheet-modal')
    this.actionBottom = query('.actionsheet-bottom')
    this.itemsEl = query('.action-button-item')
    this.container = query('.action-button-container')
    this._initClick(opts)
  }

  show() {
    addClass(this.el, 'on')
    this.modal.style.opacity = 1
    this.actionBottom.style[prefixStyle('transform')] = 'translateY(0%)'
  }

  _initClick(opts) {
    this.cancelBtn.onclick = () => {
      this.hidden()
    }

    for (let i = 0; i < this.itemsEl.length; i++) {
      this.itemsEl[i].onclick = () => {
        opts.itemClick.call(this, {
          index: i,
          ...opts[i]
        })
        console.log(opts.autoHide)
        if(opts.autoHide){
          this.hidden()
        }
      }
    }
    if (opts.tapHidden) {
      this.actionBottom.onclick=function(e){
        e.stopPropagation()
      }
      this.el.onclick = this.cancelBtn.onclick
    }
  }

  hidden() {
    this.modal.style.opacity = 0
    this.actionBottom.style[prefixStyle('transform')] = 'translateY(100%)'
    let u = this

    function transitionFun() {
      removeClass(u.el, 'on')
      u.modal.removeEventListener('transitionend', transitionFun)
    }
    this.modal.addEventListener('transitionend', transitionFun, false)
  }

  _loadContent(items) {
    let htmlTpl = ''
    for (let i = 0; i < items.length; i++) {
      let item = items[i]
      htmlTpl += `<div class="action-button-item">
        <img src="${item.img}">
        <div class="action-button-text">${item.text}</div>
      </div>`
    }
    let element = document.createElement('div')
    element.className = 'actionsheet-container'
    element.innerHTML = `<div class="actionsheet-modal"></div>
      <div class="actionsheet-bottom">
        <div class="action-button-container clearfix">
        ${htmlTpl}
        </div>
        <div class="actionsheet-cancel">取消</div>
      </div>`
    document.body.appendChild(element)
  }
}
export default window.ActionButton = ActionButton
