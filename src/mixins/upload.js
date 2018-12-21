import wepy from 'wepy'

export default class upload extends wepy.mixin {
  upload(options) {
    let url = options.url,
      path = options.path,
      name = options.name,
      extra = options.extra,
      success = options.success,
      progress = options.progress,
      fail = options.fail;
    if (path.indexOf("http") == 0){
      let data = {
        rows:{
          filepath:path,
        }
      };
      success && success(data)
      return;
    }
    const uploadTask = wx.uploadFile({
      url: url,
      filePath: path,
      name: name,
      formData: extra,
      success: function (res) {
        console.log("upload success res");

        let data = res.data;
        try {
          data = JSON.parse(res.data);
          console.log(data)
        } catch (e) {
          console.error(data);
          throw(e)
        }

        if (res.statusCode == 200 && data.isSuccess == "true" && data.rows && data.rows.filepath) {
          success && success(data)
        } else {
          fail && fail(data)
        }

      },
      fail: function (res) {
        console.error("upload fail res",res);
        fail && fail(res)
      }
    });

    uploadTask.onProgressUpdate((res) => {
      // console.log('上传进度', res.progress);
      // console.log('已经上传的数据长度', res.totalBytesSent);
      // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend);
      progress && progress(res)
    })
  }

  uploadFiles(options){
    let uploadPromise = options.uploadPromise,
      success = options.success,
      fail = options.fail;

    const promises = options.paths.map(path =>{
      return uploadPromise && uploadPromise({
        url: options.url,
        path: path,
        name: options.name,
        extra: {
          source:options.source
        },
      })
    });

    wx.showLoading({
      title: '正在上传图片...',
      mask:true,
    });

    Promise.all(promises).then(datas =>{
      //所有上传完成后
      console.log("upload complete");
      wx.hideLoading();

      success && success(datas);
    }).catch(err =>{
      console.error("catch err",err);
      wx.hideLoading();
      wx.showToast({
        title: '图片上传失败，请重试',
        icon: 'none'
      });

      fail && fail(err);
    })
  }
}
