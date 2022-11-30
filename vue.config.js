module.exports = {
  // transpileDependencies: true,
  lintOnSave:false,
  // 代理服务器
  devServer:{
    proxy:{
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn',
        // pathRewrite:{
        //   '^/api':''
        // }
      }
    }
  },
  productionSourceMap:false,
}
