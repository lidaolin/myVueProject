module.exports = {
    // cli3 代理是从指定的target后面开始匹配的，不是任意位置；配置pathRewrite可以做替换
    devServer: {
      proxy: {
        '/api': {
          target: 'http://api.lidaolin.com',
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            "^/api": ""
          }
        }
      }
    },
    css: {
      // 是否使用css分离插件 ExtractTextPlugin
      extract: true,
      // 开启 CSS source maps?是否在构建样式地图，false将提高构建速度
      sourceMap: false,
      // css预设器配置项
      loaderOptions: {
        sass: {
          prependData: `
            @import "@/assets/css/index.scss";
          `
        }
      },
      // 启用 CSS modules for all css / pre-processor files.
      modules: false
    }
  }