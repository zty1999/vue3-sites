const config = require("./projects.js");
// npm run serve 就是all,否则是后接子系统名称
let projectName = (!process.env.PROJECT_NAME || process.env.PROJECT_NAME.length === 0)
  ? 'all' : process.env.PROJECT_NAME;
console.log('config', config[projectName], projectName);

module.exports = {
  ...config[projectName],
 
}

// var glob = require("glob");
// function getEntries(globPath) {
//   // 获取所有匹配文件的文件名数组
//   var files = glob.sync(globPath),
//     entries = {};

//   files.forEach(function(filepath) {
//     // 取倒数第二层(view下面的文件夹)做包名
//     var split = filepath.split("/");
//     var name = split[split.length - 2];

//     // 保存{'目录名': '目录路径'}
//     entries[name] = filepath;
//   });
//   return entries;
// }
// // 获取所有匹配src下目录的文件夹名字，其中文件夹里main.js为页面入口
// var pages = getEntries("src/**/main.js");

// module.exports = {
//   // pages 选项
//   pages: pages
// };


// 多项目开发

// let glob = require('glob')

// //配置pages多页面获取当前文件夹下的html和js
// function getEntry(globPath) {
//   let entries = {}, tmp, htmls = {};

//   // 读取src/apps/**/底下所有的html文件
//   glob.sync(globPath + 'html').forEach(function (entry) {
//     tmp = entry.split('/').splice(-3);
//     htmls[tmp[1]] = entry
//   })

//   // 读取src/apps/**/底下所有的js文件
//   glob.sync(globPath + 'js').forEach(function (entry) {
//     tmp = entry.split('/').splice(-3);
//     entries[tmp[1]] = {
//       entry,
//       template: htmls[tmp[1]] ? htmls[tmp[1]] : 'index.html', //  当前目录没有有html则以共用的public/index.html作为模板
//       filename: tmp[1] + '.html'   //  以文件夹名称.html作为访问地址
//     };
//   });
//   console.log(entries)
//   return entries;
// }
// let htmls = getEntry('./src/apps/**/*.');

// module.exports = {
//   publicPath: process.env.NODE_ENV === 'production'
//     ? '/production-sub-path/'
//     : '/',
//   pages: {
//     musicpay: {
//       // page 的入口
//       entry: "./src/apps/musicpay/main.js",
//       template: "./public/musicpay.html",
//       filename: "musicpay.html",
//       title: "musicpay",
//       chunks: ["chunk-vendors", "chunk-common", "musicpay"]
//     },
//     test: {
//       // page 的入口
//       entry: "./src/apps/testsystem/main.js",
//       // 模板来源
//       template: "./public/test.html",
//       // 在 dist/index.html 的输出
//       filename: "test.html",
//       // 当使用 title 选项时，
//       // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
//       title: "线上考试系统",
//       // 在这个页面中包含的块，默认情况下会包含
//       // 提取出来的通用 chunk 和 vendor chunk。
//       // chunks: ["chunk-vendors", "chunk-common", "test"]
//     },
//     music: {
//       // page 的入口
//       entry: "./src/apps/music/main.js",
//       // 模板来源
//       template: "./public/music.html",
//       // 在 dist/index.html 的输出
//       filename: "music.html",
//       // 当使用 title 选项时，
//       // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
//       title: "音乐app",
//       favicon: './public/favicon.ico'
//     },
//     reader: {
//       // page 的入口
//       entry: "./src/apps/reader/main.js",
//       // 模板来源
//       template: "./public/reader.html",
//       // 在 dist/index.html 的输出
//       filename: "reader.html",
//       // 当使用 title 选项时，
//       // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
//       title: "小说阅读",
//       favicon: './public/favicon.ico'
//     },
//     // 当使用只有入口的字符串格式时，
//     // 模板会被推导为 `public/subpage.html`
//     // 并且如果找不到的话，就回退到 `public/index.html`。
//     // 输出文件名会被推导为 `subpage.html`。
//     subpage: "./src/main.js"
//   },
//   // baseUrl: '/',
//   // devServer: {
//   //     proxy: {
//   //         '': {
//   //             target: 'http://192.168.0.108:8090',
//   //             changeOrigin: true,
//   //             ws: true,
//   //             pathRewrite: {

//   //             }
//   //         }
//   //     }
//   // }

//   // publicPath: './',           //  解决打包之后静态文件路径404的问题
//   // outputDir: 'output',        //  打包后的文件夹名称，默认dist
//   // devServer: {
//   //   open: true,             //  npm run serve 自动打开浏览器
//   //   index: '/test.html'    //  默认启动页面
//   // }
// }

























// const config = require("./projects.js");

// let projectName = (!process.env.PROJECT_NAME || process.env.PROJECT_NAME.length === 0)
//  ? 'all' : process.env.PROJECT_NAME;

// module.exports = {
//  ...config[projectName],
// }

