"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isIdCard(idCard) {
    if (idCard.length != 18) {
        return false;
    }
    var a_idCard = idCard.split("");
    if (BrithById(idCard) && TrueCodeById(a_idCard)) {
        return true;
    }
    else {
        return false;
    }
    function BrithById(idCard18) {
        var year = idCard18.substring(6, 10);
        var month = idCard18.substring(10, 12);
        var day = idCard18.substring(12, 14);
        var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
        if (temp_date.getFullYear() != parseFloat(year) ||
            temp_date.getMonth() != parseFloat(month) - 1 ||
            temp_date.getDate() != parseFloat(day)) {
            return false;
        }
        else {
            return true;
        }
    }
    function TrueCodeById(a_idCard) {
        var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
        var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
        var sum = 0;
        if (a_idCard[17].toLowerCase() == 'x') {
            a_idCard[17] = 10;
        }
        for (var i = 0; i < 17; i++) {
            sum += Wi[i] * a_idCard[i];
        }
        var valCodePosition = sum % 11;
        if (a_idCard[17] == ValideCode[valCodePosition]) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.isIdCard = isIdCard;
function isBankId(account) {
    var reg = /^(\d{16}|\d{19})$/;
    if (account == '') {
        return false;
    }
    else {
        if (!reg.test(account)) {
            return false;
        }
        else {
            return true;
        }
    }
}
exports.isBankId = isBankId;
function isChineseOnly(target) {
    var regu = "^[\u4e00-\u9fa5]+$";
    var re = new RegExp(regu);
    if (re.test(target)) {
        return true;
    }
    return false;
}
exports.isChineseOnly = isChineseOnly;
function isEmail(email) {
    var strEmail = this.trim(email);
    if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) {
        return true;
    }
    else {
        return false;
    }
}
exports.isEmail = isEmail;
