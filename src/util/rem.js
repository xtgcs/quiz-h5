
// (function (doc, win) {
//   let docEl = doc.documentElement
//   let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
//   let recalc = function () {
//     var clientWidth = docEl.clientWidth
//     if (!clientWidth) return
//     if (clientWidth > 414) clientWidth = 414
//     docEl.style.fontSize = 32 * (clientWidth / 750) + 'px'
//   }
//   if (!doc.addEventListener) return
//   win.addEventListener(resizeEvt, recalc, false)
//   doc.addEventListener('DOMContentLoaded', recalc, false)
// })(document, window)

(function flexible (window, document) {
  var docEl = document.documentElement
  var dpr = window.devicePixelRatio || 1

  // adjust body font size
  function setBodyFontSize () {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    }
    else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 10
  function setRemUnit () {
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))