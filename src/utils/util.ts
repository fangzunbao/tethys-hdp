/**
 * 创建一个15位的唯一ID
 * @returns 唯一ID
 */
export const createUniqueId = () => {
  const date = new Date();
  const year = date.getFullYear() + '';
  let dayOfMonth = date.getDate() + '';
  let dayOfWeek = date.getDay() + '';
  dayOfMonth = dayOfMonth.length > 1 ? dayOfMonth : '0' + dayOfMonth;
  dayOfWeek = dayOfWeek.length > 1 ? dayOfWeek : '0' + dayOfWeek;
  let random = (Math.random() * 1000000).toFixed(0) + '';
  if (random.length < 6) {
    for (let i = 0; i < 6 - random.length; i++) {
      random = random + '0';
    }
  }
  return year + dayOfMonth + dayOfWeek + random;
};
