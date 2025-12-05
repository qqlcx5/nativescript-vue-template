/**
 * 节流和防抖工具函数
 */

/**
 * 节流函数 - 在指定时间内只执行一次函数
 * @param {Function} func - 要节流的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {Function} 节流后的函数
 */
export const throttle = (func, delay) => {
  let lastCallTime = 0;
  let timeoutId = null;

  return function(...args) {
    const now = Date.now();
    const remainingTime = delay - (now - lastCallTime);

    // 如果已经过了延迟时间，立即执行
    if (remainingTime <= 0 || remainingTime > delay) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastCallTime = now;
      func.apply(this, args);
    } else if (!timeoutId) {
      // 否则设置定时器
      timeoutId = setTimeout(() => {
        lastCallTime = Date.now();
        timeoutId = null;
        func.apply(this, args);
      }, remainingTime);
    }
  };
};

/**
 * 防抖函数 - 在指定时间内如果再次调用则重新计时
 * @param {Function} func - 要防抖的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @param {boolean} immediate - 是否立即执行第一次调用
 * @returns {Function} 防抖后的函数
 */
export const debounce = (func, delay, immediate = false) => {
  let timeoutId = null;
  let result = undefined;

  return function(...args) {
    const later = () => {
      timeoutId = null;
      if (!immediate) {
        result = func.apply(this, args);
      }
    };

    const callNow = immediate && !timeoutId;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(later, delay);

    if (callNow) {
      result = func.apply(this, args);
    }

    return result;
  };
};

/**
 * 节流函数 - 使用 requestAnimationFrame 实现
 * 适用于动画和视觉更新
 * @param {Function} func - 要节流的函数
 * @returns {Function} 节流后的函数
 */
export const rafThrottle = (func) => {
  let ticking = false;

  return function(...args) {
    if (!ticking) {
      requestAnimationFrame(() => {
        func.apply(this, args);
        ticking = false;
      });
      ticking = true;
    }
  };
};