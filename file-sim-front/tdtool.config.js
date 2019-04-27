const path = require('path');
const pkg = require('./package.json');
const webpack = require('webpack');
const Config = require('tdtool').Config;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const isDebug = process.env.NODE_ENV !== 'production';
const dllPath = path.resolve(process.cwd(), 'node_modules/td-react-vendor', isDebug ? 'dll-dev' : 'dll');
const vendor1 = new webpack.DllReferencePlugin({
  manifest: require(path.join(dllPath, 'vendor1.js.json')),
  name: 'vendor1_library'
});
const vendor2 = new webpack.DllReferencePlugin({
  manifest: require(path.join(dllPath, 'vendor2.js.json')),
  name: 'vendor2_library'
});
const CopyWebpackPlugin = require('copy-webpack-plugin');

const clientConfig = new Config({
  entry: {
    [pkg.name]: './src/main'
  },
  alias: {
    utils: path.resolve(process.cwd(), 'src/utils')
  },
  sourceMap: true,
  devtool: "source-map",
  filename: isDebug ? '[name].js?[hash]' : '[name].js',
  minimize: !isDebug,
  extends: [['react', {
    plugins: [
      ["import", { libraryName: "td-ui", style: true }]  // 引入td-ui组件
    ]
  }], ['less', {
    extractCss: {
      filename: isDebug ? '[name].css?[hash]' : '[name].css',
      allChunks: true
    },
    happypack: true  // 启动多线程编译，加快编译速度
  }]],
  env: {
    __DEV__: isDebug
  },
  template: isDebug ? './index.html' : false,
  devServer: {
    inline: true,
    historyApiFallback: true,
    hot: true,
    disableHostCheck: true,
    proxy: {
      '**': 'http://localhost:5000'    // 接口代理，默认转接到TDIM上，实际项目中转到指定后台
    }
  }
});

clientConfig.add('plugin.vendor1', vendor1);
clientConfig.add('plugin.vendor2', vendor2);

if (!isDebug) {
  const releasePath = path.resolve(__dirname, '../../resources/static');
  clientConfig.add('output.path', path.join(releasePath, pkg.name));
  clientConfig.add('output.chunkFilename', '[name].[chunkhash].chunk.js');
  clientConfig.add(
    'plugin.CleanWebpackPlugin',
    new CleanWebpackPlugin(
      [pkg.name],
      {
        root: releasePath,                      //根目录
        verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
        dry:      false        　　　　　　　　　　//启用删除文件
      }
    )
  );
  clientConfig.add('plugin.copydll', new CopyWebpackPlugin([{ from: 'node_modules/td-react-vendor/dll', to: '../dll' }]));
} else {
  clientConfig.add('plugin.copydll', new CopyWebpackPlugin([{ from: 'node_modules/td-react-vendor/dll-dev', to: 'dll'}]));
}

clientConfig.add('output.publicPath', '/');
module.exports = clientConfig.resolve();
