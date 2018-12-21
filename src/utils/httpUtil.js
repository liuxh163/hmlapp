import wepy from 'wepy'

Promise.prototype.finally = function (callback) {
  const P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => {
      throw reason
    })
  );
};

export default function request(config = {}) {
  return new Promise(function (resolve, reject) {
    let options = config;

    // 替换项目请求的域名
    options.url = wepy.$instance.globalData.BASE_URL + options.url;

    const token = wepy.getStorageSync('t_token');
    let contentType = options.method ? options.method === "GET" ? "application/json" : "application/x-www-form-urlencoded" : "application/json";
    options.header = {
      'Content-Type': contentType,
      'Wd-Token': `${token}`
    };
    let showLoading = true;
    if (options.showLoading != undefined) {
      showLoading = options.showLoading;
    }
    let loadingMask = true;
    if (options.loadingMask != undefined){
      loadingMask = options.loadingMask;
    }
    if (showLoading) {
      wx.showLoading({
        title: options.loadingMsg ? options.loadingMsg : "加载中",
        mask:loadingMask,
      });
    }

    wepy.request(options).then(r => {
      if (r.statusCode === 200) {
        wepy.$instance.globalData.AuthErrorCount = 0;
        wx.hideLoading();
        resolve(r);
      } else {
        if (r.statusCode === 401 && wepy.$instance.globalData.AuthErrorCount < 3) {
          // token失效，需要重新登录
          console.log("AuthErrorCount：" + wepy.$instance.globalData.AuthErrorCount);
          wepy.$instance.globalData.AuthErrorCount++;
          wepy.$instance.globalData.isReLogin = true;
          wepy.$instance.checkOpenID();
        } else {
          wx.hideLoading();
          reject(r);
        }
      }
    });
  })
}
