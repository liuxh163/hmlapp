import wepy from 'wepy'

export default class utils extends wepy.mixin {
  // 正则验证手机号格式
  checkPhoneNumber(phoneNumber) {
    if (!phoneNumber) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return false;
    }
    let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!reg.test(phoneNumber)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      });
      return false;
    }
    return true;
  }

  // 把数组中的数据转换为逗号拼接的string
  convertArrayByComma(array) {
    let arrayString = "";
    if (array) {
      array.forEach(function (value, index, array) {
        arrayString += value + ",";
      });
    }
    let reg = /,$/gi;
    arrayString = arrayString.replace(reg, "");
    return arrayString;
  }

  // 把一个方法转化为promise对象
  promisify(fn) {
    return function (obj = {}) {
      return new Promise((resolve, reject) => {
        obj.success = function (res) {
          resolve(res)
        };

        obj.fail = function (res) {
          reject(res)
        };

        fn(obj)
      })
    }
  }
}
