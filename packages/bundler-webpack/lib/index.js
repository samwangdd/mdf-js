"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackDevMiddleware = _interopRequireDefault(require("webpack-dev-middleware"));

var _devServer = _interopRequireDefault(require("./devServer"));

var _chain = _interopRequireDefault(require("./compiler/chain"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BundlerWebpack {
  constructor(userConfig) {
    this.config = {};
    this.bundleImpl = _webpack.default;
    this.userConfig = userConfig;
  }
  /**
   * 通过用户配置 + 插件配置，生成 webpack 配置
   */


  generateConfig(opts) {
    const userConfig = this.userConfig = opts.changeUserConfig(this.userConfig);
    const chain = (0, _chain.default)(userConfig);
    opts.changeWebpackConfig(chain); // 用户的修改优先级最高

    if (userConfig.chainWebpack) {
      userConfig.chainWebpack(chain);
    }

    this.config = opts.changeBundleConfig(chain.toConfig());
  }

  build() {
    const bundleImpl = this.bundleImpl;
    const config = this.config;
    return new Promise((resolve, reject) => {
      const compiler = bundleImpl(config);
      compiler.run((err, stats) => {
        if (err || stats.hasErrors()) {
          try {
            console.log(stats.toString('errors-only'));
          } catch (e) {}

          return reject(new Error('build failed'));
        }

        resolve({
          stats
        });
      });
    });
  }
  /**
   * 启动本地构建模式
   */


  setupDev(isComplex) {
    const bundleImpl = this.bundleImpl;
    const serverOpts = (0, _devServer.default)(this.userConfig);
    const webpackCompiler = bundleImpl(this.config);
    let devMiddleware;

    if (isComplex) {
      devMiddleware = (0, _webpackDevMiddleware.default)(webpackCompiler, {
        publicPath: '/',
        headers: {
          'access-control-allow-origin': '*'
        }
      });
    }

    return {
      webpackCompiler,
      devMiddleware,
      serverOpts
    };
  }

  print(data) {
    console.dir(data, {
      depth: 3
    });
  }

}

exports.default = BundlerWebpack;