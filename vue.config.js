const path = require("path");
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  outputDir: process.env.NODE_ENV === "production" ? "dist" : "devdist",
  lintOnSave: false,

  chainWebpack: config => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
    .use("svg-sprite-loader")
    .loader("svg-sprite-loader")
    .options({
      symbolId: "icon-[name]",
      include: ["./src/icons"]
    })
  },
  configureWebpack: config => {
    config.resolve = { //配置解析别名
        extensions: ['.js','.json','.vue'], //自动添加文件名后缀
        alias: {
            'vue': 'vue/dist/vue.js',
            '@': path.resolve(__dirname, './src'),
            // 'public': path.resolve(__dirname, './public'),
            '@c': path.resolve(__dirname, './src/components'),
            // 'common': path.resolve(__dirname, './src/common'),
            // 'api': path.resolve(__dirname, './src/api'),
            // 'views': path.resolve(__dirname, './src/views'),
            // 'data': path.resolve(__dirname, './src/data'),
        }
    }
  },
  productionSourceMap: false,
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      sass: {
        prependData: '@import "./src/styles/main.scss";'
      }
    },
    modules: false
  },
  parallel: require("os").cpus().length > 1,
  pwa: {},
  devServer: {
    open: false,
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hot: true,
    hotOnly: false,
    proxy: null,
    proxy: {
      '/api': {
        target:'https://wxdev.ccgx.video/cclive-admin/', // 你请求的第三方接口
        changeOrigin:true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite:{  // 路径重写，
          '^/api': ''  // 替换target中的请求地址，也就是说以后你在请求http://api.douban.com/v2/XXXXX这个地址的时候直接写成/api即可。
        }
      }
    },
    overlay: {
      warnings: true,
      errors: true
    },
    before: app => {}
  },
  pluginOptions: {}
};
