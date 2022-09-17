import './style.css'

class Blackboard {
  constructor(
    public el = document.querySelector<HTMLCanvasElement>('#canvas')!,
    private app = el.getContext('2d')!,
    private width: number = el.width,
    private height: number = el.height,
    private btns: HTMLDivElement = document.createElement('div'),
    private bgColor = '#000',
    private lineColor = '#fff'
  ) {
    this.initCanvas()
    this.bindEvent()
    this.draw()
  }

  private initCanvas() {
    this.app.fillStyle = this.bgColor
    this.app.fillRect(0, 0, this.width, this.height)

    this.btns.classList.add('btns')
    this.el.insertAdjacentElement('afterend', this.btns)
  }

  // 事件绑定
  private bindEvent() {
    const callback = this.drawLine.bind(this)

    this.el.addEventListener('mousedown', () => {
      this.app.beginPath()
      this.app.strokeStyle = this.lineColor
      // this.el.addEventListener("mousemove", this.drawLine.bind(this));
      this.el.addEventListener('mousemove', callback)
    })

    // 鼠标松开事件要绑在 document 上，如果绑在 this.el 上，鼠标在黑板外松开就不会移除事件
    document.addEventListener('mouseup', () => {
      // 这样不能移除事件，因为使用 bind 后不是同一个事件
      // this.el.removeEventListener("mousemove", this.drawLine.bind(this));
      this.el.removeEventListener('mousemove', callback)
    })
  }

  private drawLine(event: MouseEvent) {
    this.app.lineTo(event.offsetX, event.offsetY)
    this.app.stroke()
  }

  public setBgColor(color: string) {
    this.bgColor = color
    this.app.fillStyle = color
    this.app.fillRect(0, 0, this.el.width, this.el.height)
    return this
  }

  public clear() {
    const el = document.createElement('button')
    el.innerText = '清屏'
    this.btns.insertAdjacentElement('afterbegin', el)

    el.addEventListener('click', () => {
      this.app.fillStyle = this.bgColor
      this.app.fillRect(0, 0, this.el.width, this.el.height)
    })
    return this // 返回 this 可以链式操作
  }

  public setLineColor() {
    const colors = ['#1abc9c', '#f1c40f', '#9b59b6', '#ecf0f1', 'red']
    const container = document.createElement('div')
    container.classList.add('color-container')
    colors.forEach(color => {
      const div = document.createElement('div')
      div.style.cssText = `width:20px;height:20px;background-color:${color}`
      container.insertAdjacentElement('beforeend', div)

      div.addEventListener('click', () => {
        this.lineColor = color
        this.app.lineWidth = 1
      })
    })
    this.btns.insertAdjacentElement('beforeend', container)
  }

  public erase() {
    const el = document.createElement('button')
    el.innerText = '橡皮'
    this.btns.insertAdjacentElement('afterbegin', el)

    el.addEventListener('click', () => {
      this.lineColor = this.bgColor
      this.app.lineWidth = 10
    })
  }

  public draw() {
    const el = document.createElement('button')
    el.innerText = '写字'
    this.btns.insertAdjacentElement('afterbegin', el)

    el.addEventListener('click', () => {
      this.lineColor = '#fff'
      this.app.lineWidth = 1
    })
  }

  public saveImg() {
    const button = document.createElement('button')
    button.innerText = '保存图片'
    this.btns.insertAdjacentElement('afterbegin', button)
    const img = document.createElement('img')
    button.addEventListener('click', () => {
      img.src = this.el.toDataURL('image/png')
      // img.classList.add('img')

      /**
       * 保存图片：
       * 1.通过 toDataURL 获得图片路径
       * 2.创建一个 a 标签,并设置a标签的 href 和 download 属性
       * 3.构造一个单击事件并通过 api 触发 a 标签的 click 事件完成下载
       * 4.优点：只使用浏览器提供的原生 API 就能实现我们的需求。
          缺点：无法被异步代码包裹，也就是包含 Ajax 请求的情况下代码不生效。
          缺点：对于分辨率过高的 canvas, 我们生成的 dataURL 过长，超过浏览器限制，可能会导致无法顺利下载，如出现此现象请参考下面介绍的方法。
       */
      const aEl = document.createElement('a')
      aEl.href = img.src
      aEl.download = 'canvas'
      const event = new MouseEvent('click') // 创建一个点击事件并对 a 标签进行触发
      aEl.dispatchEvent(event)
    })
    // this.btns.insertAdjacentElement('afterend', img)
  }
}

const instance = new Blackboard()

// instance.clear().setBgColor('#16a085') // 清屏后再改变背景色
instance.clear().setLineColor()
instance.erase()
instance.saveImg()
