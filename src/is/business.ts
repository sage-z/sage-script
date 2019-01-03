// /**
//  * 
//  * 业务检测
//  * @module
//  * @author 
//  * 
//  */

/**
 * 
 * @name isIdCard
 * @description 判断是否是中国身份证号码
 * @augments string
 * @returns Boolean
 *
 */
export function isIdCard( idCard: string) {
    if(idCard.length != 18 ){
        return false;
    }
    let a_idCard = idCard.split("");        // 得到身份证数组
    if(BrithById(idCard)&&TrueCodeById(a_idCard)){  // 进行18位身份证的基本验证和第18位的验证
        return true;
    }else {
        return false;
    }

    /**
     * 验证18位数身份证号码中的生日是否是有效生日
     *
     * @param idCard
     * @return
     */
    function BrithById(idCard18: any){
        const year = idCard18.substring(6,10);
        const month = idCard18.substring(10,12);
        const day = idCard18.substring(12,14);
        const temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));    // 这里用getFullYear()获取年份，避免千年虫问题
        if(temp_date.getFullYear()!=parseFloat(year) ||
            temp_date.getMonth()!=parseFloat(month)-1 ||
            temp_date.getDate()!=parseFloat(day)){
            return false;
        }else{
            return true;
        }
    }

    /**
     * 判断身份证号码为18位时最后的验证位是否正确
     *
     * @param a_idCard
     * @return
     */
    function TrueCodeById(a_idCard: any) {
        const ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];      // 身份证验证位值.10代表X
        const Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];  // 加权因子
        let sum = 0;               // 声明加权求和变量
        if (a_idCard[17].toLowerCase() == 'x') {
            a_idCard[17] = 10;          // 将最后位为x的验证码替换为10方便后续操作
        }
        for( let i = 0; i < 17; i++) {
            sum += Wi[i] * a_idCard[i];      // 加权求和
        }
        const valCodePosition = sum % 11;        // 得到验证码所位置
        if (a_idCard[17] == ValideCode[valCodePosition]) {
            return true;
        } else {
            return false;
        }
    }
}

/**
 * 
 * @name isBankId
 * @description 判断是否是中国银行账户
 * @augments string
 *
 */
export function isBankId(account: string){
    var reg=/^(\d{16}|\d{19})$/;
    if(account == ''){
        return false;
    } else {
        if(!reg.test(account)){
            return false;
        } else {
            return true;
        }
    }
}

/**
 * 
 * @name isChineseOnly
 * @description 判断是否是全中文
 * @augments string
 *
 */
export function isChineseOnly(target: string){
    var regu = "^[\u4e00-\u9fa5]+$";
    var re = new RegExp(regu);
    if (re.test(target)) {
        return true;
    }
    return false;
}

/**
 * 
 * @name isEmail
 * @description 验证电子邮箱的格式
 * @augments string
 *
 */
export function isEmail(email: string) {
    var strEmail=this.trim(email);
    if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)
    {
        return true;
    }else{
        return false;
    }
}
