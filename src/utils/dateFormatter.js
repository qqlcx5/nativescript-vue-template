/**
 * 日期格式化工具函数
 */

/**
 * 格式化日期
 * @param {Date|string|number} date - 日期对象、时间戳或日期字符串
 * @param {string} format - 格式字符串，默认为 'YYYY-MM-DD'
 * @returns {string} 格式化后的日期字符串
 */
export const formatDate = (date, format = 'YYYY-MM-DD') => {
  if (!date) return '';

  // 转换为Date对象
  const dateObj = new Date(date);

  // 检查日期是否有效
  if (isNaN(dateObj.getTime())) return '';

  // 获取年、月、日、时、分、秒
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const seconds = dateObj.getSeconds();

  // 替换格式字符串
  return format
    .replace(/YYYY/g, year.toString())
    .replace(/MM/g, month.toString().padStart(2, '0'))
    .replace(/DD/g, day.toString().padStart(2, '0'))
    .replace(/HH/g, hours.toString().padStart(2, '0'))
    .replace(/mm/g, minutes.toString().padStart(2, '0'))
    .replace(/ss/g, seconds.toString().padStart(2, '0'));
};

/**
 * 格式化相对时间（如：刚刚、5分钟前、2小时前等）
 * @param {Date|string|number} date - 日期对象、时间戳或日期字符串
 * @returns {string} 相对时间字符串
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';

  // 转换为Date对象
  const dateObj = new Date(date);

  // 检查日期是否有效
  if (isNaN(dateObj.getTime())) return '';

  // 计算时间差（毫秒）
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  // 返回相对时间
  if (diffSeconds < 60) {
    return '刚刚';
  } else if (diffMinutes < 60) {
    return `${diffMinutes}分钟前`;
  } else if (diffHours < 24) {
    return `${diffHours}小时前`;
  } else if (diffDays < 30) {
    return `${diffDays}天前`;
  } else if (diffMonths < 12) {
    return `${diffMonths}个月前`;
  } else {
    return `${diffYears}年前`;
  }
};

/**
 * 获取当前日期的字符串表示
 * @param {string} format - 格式字符串，默认为 'YYYY-MM-DD'
 * @returns {string} 当前日期的字符串表示
 */
export const getCurrentDate = (format = 'YYYY-MM-DD') => {
  return formatDate(new Date(), format);
};

/**
 * 获取当前时间的字符串表示
 * @param {string} format - 格式字符串，默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns {string} 当前时间的字符串表示
 */
export const getCurrentDateTime = (format = 'YYYY-MM-DD HH:mm:ss') => {
  return formatDate(new Date(), format);
};

/**
 * 检查是否为同一天
 * @param {Date|string|number} date1 - 第一个日期
 * @param {Date|string|number} date2 - 第二个日期，默认为当前日期
 * @returns {boolean} 是否为同一天
 */
export const isSameDay = (date1, date2 = new Date()) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

/**
 * 添加天数到日期
 * @param {Date|string|number} date - 原始日期
 * @param {number} days - 要添加的天数
 * @returns {Date} 新的日期对象
 */
export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};