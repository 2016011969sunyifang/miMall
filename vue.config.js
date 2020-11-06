module.exports = {
  // 默认加载
  devServer: {
    host: 'localhost',
    // 项目端口
    port: 8080,
    // 代理访问a代理成b再由b访问a
    proxy: {
      '/api': {
        // 代理网址
        target: 'http://mall-pre.springboot.cn',
        // 是否将主机头原点更改为url地址
        changeOrigin: true,
        // 转发地址
        //如果有很多种接口 这一种就可以解决了而不是写很多拦截搞了一个虚拟地址api
        // 之后再把api设置成空只转发后面的部分
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  // 项目是否在域名的根目录
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? './'
  //   : '/',
  // 输出文件夹名字
  // outputDir:'dist',
  // 输出页面的名称
  // indexPath:'index2.html',
  //eslint开关
  // lintOnSave:false,
  //通俗意思就是是否展示源码
  productionSourceMap: false,
  //真正的按需加载 删除预加载
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
  }
}