module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'       
  },
  module: {
    loaders: [
    { test: /\.js$/, loader: 'jsx-loader?harmony' },
       { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // 用 ! 来连接多个人 loader
       { test: /\.css$/, loader: 'style-loader!css-loader' },
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} // 内联 base64 URLs, 限定 <=8k 的图片, 其他的用 URL
      ]
    },
    resolve: {
    // 现在可以写 require('file') 代替 require('file.coffee')
    extensions: ['', '.js', '.json', '.coffee'] 
  },
  externals: {
    "react" : "React",
    "jquery" : "jQuery",
    "lodash": "_",
  }
};