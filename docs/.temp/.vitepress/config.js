const { getRouterConfig } = require('./router');
const { kebabCase } = require('lodash');
const { resolve } = require('path');

const base = process.env.NODE_ENV === 'production' ? '/use-vue' : '';

module.exports = {
  title: 'use-vue',
  description: 'vue hooks',
  alias: {
    'use-vue': resolve('./src/'),
  },
  base,
  themeConfig: {
    lang: 'zh-CN',
    lastUpdated: '最近更新',
    repo: 'fegg/use-vue',
    repoLabel: 'Github',
    prevLink: true,
    nextLink: true,
    locales: {
      '/': {
        lang: 'zh-CN',
        title: 'use-vue',
        description: 'use-vue',
        label: '中文',
        selectText: '语言',
        nav: [
          { text: '指南', link: '/' },
          { text: '文档', link: `/${kebabCase('useService')}/` },
        ],
        sidebar: getRouterConfig('/'),
      },
    },
  },
};
