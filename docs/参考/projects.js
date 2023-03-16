// let path = require('path')
// let glob = require('glob')
// //配置pages多页面获取当前文件夹下的html和js
// function getEntry(globPath) {
//   let entries = {},
//     basename, tmp, pathname;

//   glob.sync(globPath).forEach(function(entry) {
//     basename = path.basename(entry, path.extname(entry));
//     tmp = entry.split('/').splice(-3);
//     pathname = basename; // 正确输出js和html的路径

//     entries[pathname] = {
//       entry: 'src/' + tmp[0] + '/' + tmp[1] + '/main.js',
//       template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[2],
//       title:  tmp[2],
//       filename: tmp[2]
//     };
//   });
//   return entries;
// }
let path = require('path')
let glob = require('glob')
//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
  let entries = {},
    basename, tmp, pathname;
  console.log(555,globPath);
  glob.sync(globPath).forEach(function(entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/').splice(-3);
    pathname = basename; // 正确输出js和html的路径
    console.log(entry,"pathname",pathname,"tmp",tmp);
    entries[pathname] = {
      entry: 'src/apps/' + tmp[1] + '/main.ts',
      template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[2],
      // template: tmp[0] + '/' + tmp[1] + '/' + tmp[2],
      title:  tmp[2],
      filename: tmp[2]
    };
  });
  return entries;
}
let pages = getEntry('./src/apps/**?/*.html');
// let pages = getEntry('./src/apps/**/main.js');

pages['index'] = {
  // page 的入口
  entry: 'src/main.js',
  // 模板来源
  template: 'public/index.html',
  // 在 dist/index.html 的输出
  filename: 'index.html',
  // 当使用 title 选项时，
  // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
  title: '公共首页',
  // 在这个页面中包含的块，默认情况下会包含
  // 提取出来的通用 chunk 和 vendor chunk。
  // chunks: ['chunk-vendors', 'chunk-common', 'index']
};

const config = {
  all: {
    pages: pages
  },
  musicpay: {
    pages: {
      index: {
        entry: "src/apps/musicpay/main.js",
        template: "src/apps/musicpay/musicpay.html",
        filename: "musicpay.html",
        title: 'mulean blog'
      }
    },
    outputDir: "dist/musicpay/"
  },
  reader: {
    pages: {
      index: {
        entry: "src/apps/reader/main.js",
        template: "src/apps/reader/reader.html",
        filename: "reader.html"
      }
    },
    outputDir: "dist/reader/"
  }
};

module.exports = config;