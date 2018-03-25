/**
 * 
 * 环境与能力检测
 * @module
 * @author 
 * 
 */

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
export function standardBrowser() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}
