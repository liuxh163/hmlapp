let httpUrl = {
  "login":"/api/v1/user/login",           // 登录
  "sendSmsCode":"/api/v1/users/sendSms",  // 发送验证码
  "posts":"/api/v1/topics/:id/posts",     // 查询帖子列表
  "getPost":"/api/v1/posts",              // 查询指定帖子信息
  "getProducts":"/api/v1/products",       // 查询产品列表
  "modifyInfo":'/api/v1/users',           // 修改用户信息
  "getPersonalList":'/api/v1/servants',   // 获取服务人员列表
  "getCarousels":"/api/v1/carousels",     // 获取轮播图
  "getMine":"/api/v1/users/mine",         // 获取用户信息
  "upload":"/api/v1/upload",              // 上传文件
  "comments":"/api/v1/comments",          // 发表评论
  "getTags":"/api/v1/tags",               // 查询标签列表
  "thumbs":"/api/v1/thumbs",              // 点赞
  "getMinePosts":"/api/v1/posts/get/mine",//获取我的帖子
};
export {httpUrl}
