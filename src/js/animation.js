/**
 * 为了让display none兼容transition opacity渐变的函数
 */
export const show = (
  elem, {
    delay = 0,
    opacity = 1,
  } = {}
) => {
  if (!elem) {
    return false;
  }
  elem.classList.remove('none');
  setTimeout(() => {
    elem.style.opacity = opacity;
  }, delay);
  return true;
};

/**
 * 为了让display none兼容transition opacity渐变的函数
 */
export const hide = (
  elem, {
    duration = 300,
    delay = 0,
  } = {}
) => {
  if (!elem || elem.classList.contains('none')) {
    return false;
  }
  setTimeout(() => {
    // TODO: 渐变时长放在js里控制更优雅
    elem.style.opacity = 0;
    setTimeout(() => {
      elem.classList.add('none');
    }, duration);
  }, delay);
  return true;
};

/**
 * 检查到用户输入非法时，给input添加warning类
 */
export const warn = (elem, duration = 1000) => {
  if (!elem) return;
  elem.classList.add('warning');
  setTimeout(() => {
    elem.classList.remove('warning');
  }, duration);
};
