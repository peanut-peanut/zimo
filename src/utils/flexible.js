(function flexible(window, document) {
  const docEl = document.documentElement;
  const dpr = window.devicePixelRatio || 1;

  // 设置body的字体大小
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = '16px';
    } else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize);
    }
  }
  setBodyFontSize();

  // 设置1rem = viewWidth / 10
  function setRemUnit() {
    // 限制最大宽度为1920px
    const maxWidth = 1920;
    const clientWidth = docEl.clientWidth;
    const width = clientWidth > maxWidth ? maxWidth : clientWidth;
    const rem = width / 10;
    docEl.style.fontSize = rem + 'px';
    
    // 注意：program页面的最大宽度限制通过CSS类选择器实现
  }

  setRemUnit();

  // 当页面大小变化时，更新rem
  window.addEventListener('resize', setRemUnit);
  window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
      setRemUnit();
    }
  });

  // 检测0.5px的支持，如果支持则给html添加hairlines类名
  if (dpr >= 2) {
    const fakeBody = document.createElement('body');
    const testElement = document.createElement('div');
    testElement.style.border = '.5px solid transparent';
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines');
    }
    docEl.removeChild(fakeBody);
  }
})(window, document);