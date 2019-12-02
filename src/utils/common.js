/*
 * @Author: yk1062008412
 * @Date: 2019-12-02 23:31:43
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-12-02 23:46:40
 * @Description: 常用方法
 */

export function dateFormat(date, type = 'datetime') {
  var fmt = 'yyyy-MM-dd HH:mm:ss';
  if (type === 'datetime') fmt = 'yyyy-MM-dd HH:mm:ss';
  if (type === 'date') fmt = 'yyyy-MM-dd';
  if (type === 'time') fmt = 'HH:mm:ss';
  const opt = {
    "M+": date.getMonth() + 1,                 //月份   
    "d+": date.getDate(),                    //日   
    "h+": date.getHours(),                   //小时   
    "m+": date.getMinutes(),                 //分   
    "s+": date.getSeconds(),                 //秒   
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
    "S": date.getMilliseconds()             //毫秒   
  };
  for (let k in opt) {
    let ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
};
  return fmt;
}