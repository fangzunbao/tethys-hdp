import { pinyin } from 'pinyin-pro';

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

/**
 * 创建树型数据
 * @param data
 * @param id
 * @param list
 * @returns
 */
export const getTreeList = (data, id, list) => {
  for (const item of data) {
    if (item.parent === id) {
      list.push(item);
    }
  }
  for (const item of list) {
    item.children = [];
    getTreeList(data, item.id, item.children);
  }
  return list;
};

/**
 * 生成指定字符串的拼音首字母
 * @param value 
 * @returns 
 */
export const createPinyin = (value: string) => {
  return pinyin(value, { pattern: 'initial', type: 'string' })
    .replace(/\s*/g, '')
    .toLocaleUpperCase();
};
