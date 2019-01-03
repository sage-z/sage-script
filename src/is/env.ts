/**
 * 
 * 环境与能力检测
 * @module
 * @author 
 * 
 */

export default class Equipment {
  // a = 'asdfasf'
  private b = 'asdf'
  constructor() {
    this.init()
  }
  init(){
    this.b = '12313'
  }
  get bd() {
    return {
      b: this.b
    }
  }
  set bd(value) {
    console.log('setter: ' + value);
  }
}

export const e = new Equipment()

export const name = e.bd
// console.log(e.bd)
//  模块设计

//  判断是否在web环境
//  判断浏览器型号
//  判断浏览器版本
//  判断手机浏览器
//  判断是否在node环境
//  判断node版本


//  判断是否在微信中

//  判断js内核

//  判断视窗大小

//  判断是否在开发环境
//  判断是否在部署环境
//  判断是否在测试环境
 
// function isEquipment(){
//   let UA = navigator.userAgent,
//       isAndroid = /android|adr|linux/gi.test(UA),
//       isIOS = /iphone|ipod|ipad/gi.test(UA) && !isAndroid,
//       isBlackBerry = /BlackBerry/i.test(UA),
//       isWindowPhone = /IEMobile/i.test(UA),
//       isMobile = isAndroid || isIOS || isBlackBerry || isWindowPhone;
//   return{
//       isAndroid: isAndroid,
//       isIOS: isIOS,
//       isMobile: isMobile,
//       isWeixin: /MicroMessenger/gi.test(UA),
//       isQQ: /QQ/gi.test(UA),
//       isPC: !isMobile,
//       isWeibo: /WeiBo/gi.test(UA)
//   }
// }

// if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
//   //移动端
// } else {
//   //PC端
// }

// const userAgent = global.navigator.userAgent

// const inAndroid = /Android/i.test(userAgent)
// const inIOS = /iPhone|iPad|iPod/i.test(userAgent)
// const inMicroMessenger = /MicroMessenger/i.test(userAgent)
// const inWindowsWechat = /WindowsWechat/i.test(userAgent)


/**
 * 确定是否在标准浏览器环境中
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */

// if (typeof(window) === 'undefined') {
//   console.log('node.js');
// } else {
//   console.log('browser');
// }

export function standardBrowser() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

export function env() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

export function getVersion() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}