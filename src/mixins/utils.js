import wepy from 'wepy'

export default class utils extends wepy.mixin {
  // 正则验证手机号格式
  checkPhoneNumber(phoneNumber,isShowToast = true) {
    if (!phoneNumber) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return false;
    }
    let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!reg.test(phoneNumber)) {
      if (isShowToast) {
        wx.showToast({
          title: '手机号格式不正确',
          icon: 'none'
        });
      }
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

  //格式化数据，小数部分不做处理，对整数部分进行千分位格式化的处理，如果有符号，正常保留
  formatCurrency(num) {
    if (num) {
      //将num中的$,去掉，将num变成一个纯粹的数据格式字符串
      num = num.toString().replace(/\$|\,/g, '');
      //如果num不是数字，则将num置0，并返回
      if ('' == num || isNaN(num)) {
        return 'Not a Number ! ';
      }
      //如果num是负数，则获取她的符号
      var sign = num.indexOf('-') > 0 ? '-' : '';
      //如果存在小数点，则获取数字的小数部分
      var cents = num.indexOf('.') > 0 ? num.substr(num.indexOf('.')) : '';
      cents = cents.length > 1 ? cents : '';//注意：这里如果是使用change方法不断的调用，小数是输入不了的
      //获取数字的整数数部分
      num = num.indexOf('.') > 0 ? num.substring(0, (num.indexOf('.'))) : num;
      //如果没有小数点，整数部分不能以0开头
      if ('' == cents) {
        if (num.length > 1 && '0' == num.substr(0, 1)) {
          return 'Not a Number ! ';
        }
      }
      //如果有小数点，且整数的部分的长度大于1，则整数部分不能以0开头
      else {
        if (num.length > 1 && '0' == num.substr(0, 1)) {
          return 'Not a Number ! ';
        }
      }
      //针对整数部分进行格式化处理，这是此方法的核心，也是稍难理解的一个地方，逆向的来思考或者采用简单的事例来实现就容易多了
      /*
        也可以这样想象，现在有一串数字字符串在你面前，如果让你给他家千分位的逗号的话，你是怎么来思考和操作的?
        字符串长度为0/1/2/3时都不用添加
        字符串长度大于3的时候，从右往左数，有三位字符就加一个逗号，然后继续往前数，直到不到往前数少于三位字符为止
       */
      for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
      }
      //将数据（符号、整数部分、小数部分）整体组合返回
      return (sign + num + cents);
    }
  }

  formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    return [year, month, day].map(this.formatNumber).join('-')
  }

  formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }

  // px转rpx
  px2rpx(px){
    return px * 2 + 'rpx';
  }
}
