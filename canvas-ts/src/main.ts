const el = document.querySelector<HTMLCanvasElement>('#canvas')!
// 转换成 canvas 对象
const app = el.getContext('2d')!

// 画矩形
/* app.fillStyle = '#00'
app.fillRect(0, 0, 300, 300)
app.fillStyle = '#f1c40f'
app.fillRect(el.width / 2 - 50, el.height / 2 - 50, 100, 100) */

// 画线条
/* app.strokeStyle = 'red'
app.lineWidth = 30
app.lineJoin = 'round' // 圆角
app.strokeRect(50, 50, 200, 200) */

// 画圆
/* app.fillStyle = 'red'
app.lineWidth = 20
app.arc(100, 100, 50, 0, 2 * Math.PI)
app.stroke() */

// 画三角形
/* app.beginPath()
app.strokeStyle = 'red'
app.fillStyle = 'red'
app.lineWidth = 10
app.moveTo(el.width / 2, 10)
app.lineTo(el.width, 250)
app.lineTo(10, 250)
app.closePath()
app.fill()
// app.stroke() */

// 线性渐变
/* const gradient = app.createLinearGradient(0, 0, 300, 300)
gradient.addColorStop(0, '#16a085')
gradient.addColorStop(0.5, '#e67e22')
gradient.addColorStop(1, '#9b59b6')
// app.fillStyle = gradient
app.strokeStyle = gradient
app.lineWidth = 50
app.lineJoin = 'round'
app.strokeRect(50, 50, 200, 200)
// app.fillRect(0, 0, 300, 300) */

// 文字处理
/* app.fillStyle = '#34495e'
app.fillRect(0, 0, el.width, el.height)
app.font = '60px SourceHanSansSc-Normal'
app.fillStyle = 'white'
app.strokeStyle = 'white'
app.textBaseline = 'middle'
app.fillText('hello', 50, 100)
app.strokeText('hello', 50, 150) */

// 图片贴图
/* const img = document.createElement('img')
img.src = '../images/th.jfif'
img.onload = () => {
  // alert(3);
  // 插入到body中
  // document.body.insertAdjacentElement('afterbegin', img)
  const pattern = app.createPattern(img, 'repeat')!
  app.fillStyle = pattern
  app.fillRect(0, 0, 300, 300)
} */

// 图片绘制
/* app.fillStyle = '#000'
app.fillRect(0, 0, el.width, el.height)
const img = document.createElement('img')
img.src = '../images/th.jfif'
img.onload = () => {
  el.width = img.naturalWidth * scale(img, el)
  el.height = img.naturalHeight * scale(img, el)
  app.drawImage(img, 0, 0, el.width, el.height)
}

function scale(img: HTMLImageElement, el: HTMLCanvasElement) {
  return Math.min(el.width / img.naturalWidth, el.height / img.naturalHeight)
} */

// 绘制随机色块
/* app.fillStyle = '#000'
app.fillRect(0, 0, 300, 300)

// for (let i = 0; i < 2000; i++) {
//   app.fillStyle = 'white'
//   app.fillRect(Math.random() * el.width, Math.random() * el.height, 2, 2)
// }

for (let i = 0; i < 20; i++) {
  app.beginPath()
  app.fillStyle = ['#1abc9c', '#27ae60', '#2980b9', '#8e44ad', '#e67e22', '#e74c3c'].sort(() =>
    Math.floor(Math.random() * 3) ? 1 : -1
  )[0]

  app.arc(Math.random() * (el.width / 2), Math.random() * (el.height / 2), 20 + Math.random() * 50, 0, 2 * Math.PI)
  app.fill()
} */
