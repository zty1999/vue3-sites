import cssVars from 'css-vars-ponyfill';
import { particlesCyanLine } from '@/assets/js/particles.js';
import particlesSnow from '@/assets/particlesjs-config.json';
import store from '@/store';

interface cssvarsObj {
  [varname: string]: string;
}

interface Themes {
  [theme: string]: {
    cssvars: cssvarsObj;
    particlesJson: any;
  };
}
/* ****
    themeColor    主题色
    particlesJson    粒子动画json文件地址
    linkColor    链接色/激活色

    */
const themes: Themes = {
  /* 主题名：主题内css样式属性声明
  blackCyan：{"--theme-color":"#000"} */
  base: {
    cssvars: {
      'theme-color': '#03dac6',
      'bg-color': '#f5f5f5',
      'nav-bg-color': '#ffffff',
      'heading-color': '#000',
      'text-color': '#1e1e1e',
      'text-color-secondary': '#3c3c3c',
      'text-active-color': '#03dac6',
      'text-tip-color': '#808080',
      'section-bg-color': '#ffffff',
      'article-bg-color': '#ffffff'
    },
    particlesJson: particlesSnow
  },
  blackCyan: {
    cssvars: {
      'theme-color': '#03dac6',
      'bg-color': '#1e1e1e',
      'nav-bg-color': '#1e1e1e',
      'heading-color': '#03dac6',
      'text-color': '#03dac6',
      'text-active-color': '#03dac6',
      'section-bg-color': '#1e1e1e',
      'article-bg-color': '#1e1e1e'
    },
    particlesJson: particlesCyanLine
  }
};

const families = {
  serif: `"Source Han Serif",serif`
};

/* 
params:
theme    主题名称    "blackCyan"
varObj   css样式属性声明对象  
*/
export const initThemes = (theme: string = 'base') => {
  
  store.commit("switchTheme", theme)
  let themeConfig = themes[theme];
  let cssvars = themeConfig.cssvars;
  const variables: any = {};
  Object.keys(cssvars).forEach((key: string) => {
    variables[`--sk-${key}`] = cssvars[key];
  });
  console.log(variables);

  cssVars({
    // Targets
    rootElement: document,
    shadowDOM: false,
    // Sources
    include: 'link[rel=stylesheet],style',
    exclude: '',
    variables: variables, // variables 自定义属性名/值对的集合
    // Options
    preserveStatic: true,
    preserveVars: false,
    silent: false,
    updateDOM: true,
    updateURLs: true,
    watch: false, // 当添加，删除或修改其或元素的禁用或href属性时，ponyfill将自行调用
    onlyLegacy: true, // false  默认将css变量编译为浏览器识别的css样式  true 当浏览器不支持css变量的时候将css变量编译为识别的css
    // Callbacks
    onBeforeSend: function (xhr, elm, url) {
      // ...
      console.log('onBeforeSend');
    },
    onError: function (message, elm, xhr, url) {
      // ...
      console.log('onError');
    },
    onWarning: function (message) {
      // ...
      console.log('onWarning');
    },
    onSuccess: function (cssText, elm, url) {
      // ...
      console.log('onSuccess');
    },
    onComplete: function (cssText, styleElms, cssVariables, benchmark) {
      // ...
      console.log('onComplete');
    },
    onFinally: function (hasChanged, hasNativeSupport, benchmark) {
      // ...
      console.log('onFinally');
    }
  });
  return themeConfig.particlesJson;
};

/* cssVars({
  // Options...
  // Default values
  // Targets
  rootElement: document,
  shadowDOM: false,

  // Sources
  include: 'link[rel=stylesheet],style',
  exclude: '',
  variables: {},

  // Options
  onlyLegacy: true,
  preserveStatic: true,
  preserveVars: false,
  silent: false,
  updateDOM: true,
  updateURLs: true,
  watch: false,

  // Callbacks
  onBeforeSend: function (xhr, elm, url) {
    // ...
    console.log('onBeforeSend');

  },
  onError: function (message, elm, xhr, url) {
    // ...
    console.log('onError');

  },
  onWarning: function (message) {
    // ...
    console.log('onWarning');

  },
  onSuccess: function (cssText, elm, url) {
    // ...
    console.log('onSuccess');

  },
  onComplete: function (cssText, styleElms, cssVariables, benchmark) {
    // ...
    console.log('onComplete');

  },
  onFinally: function (hasChanged, hasNativeSupport, benchmark) {
    // ...
    console.log('onFinally');

  }

}); */
