"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports._runtimePluginKeys = void 0;

var _path = require("path");

var _utils = require("@mdfjs/utils");

/**
 * @file 运行时的插件处理
 */
const _runtimePluginKeys = ['appElement', 'beforeRender', 'render', 'mdfInfo', 'appOpts'];
exports._runtimePluginKeys = _runtimePluginKeys;

function _default(api) {
  const Mustache = api.Mustache,
        paths = api.paths;
  api.addRuntimePluginKey(_runtimePluginKeys);
  api.addRuntimePlugin(() => require.resolve('./enhance')); // 这个事件需要最后执行，否则插件的 runtimePlugin 都无法生效

  api.onCodeGenerate(function () {
    const tpl = api.getFile((0, _path.join)(__dirname, 'plugin.tpl'));
    const pluginConfig = getPluginConfig(api);
    const validKeys = api.runtimeKeys;
    const plugins = api.invokePlugin({
      key: 'addRuntimePlugin',
      type: api.PluginType.add
    });
    const data = {
      validKeys,
      runtimePath: (0, _path.dirname)(require.resolve('@mdfjs/runtime/package.json')),
      plugins: plugins,
      config: JSON.stringify(pluginConfig, null, 2)
    }; // 项目 app 配置文件，为了兼容 node 先这么写

    if (api.isExist(`${paths.absSrcPath}/app.ts`)) {
      data.projectPlugin = {
        path: `${paths.absSrcPath}/app.ts`
      };
    } else if (api.isExist(`${paths.absSrcPath}/client/app.ts`)) {
      data.projectPlugin = {
        path: `${paths.absSrcPath}/client/app.ts`
      };
    }

    const content = Mustache.render(tpl, data);
    api.writeFile(`${paths.absTmpPath}/plugins/plugin.ts`, (0, _utils.prettierFormat)(content));
  }, true); // 需要把实例化后的 plugin 对象导出给用户使用
  // 注意不要放在 onCodeGenerate 里面不然会添加多次

  api.addRuntimeExports(function () {
    return {
      specifiers: ['plugin'],
      source: `./plugins/plugin`
    };
  });
}
/**
 * 将 describe 过的插件配置导出到运行时
 */


function getPluginConfig(api) {
  const userConfig = api.getConfig();
  const pluginConfigs = api.service.pluginConfigs;
  const config = Object.create(null);
  Object.keys(pluginConfigs).forEach(key => {
    config[key] = userConfig[key];
  });
  return config;
}