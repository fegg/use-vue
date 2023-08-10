const { kebabCase } = require('lodash');

const Router = {
  Service: ['useService'],
};

function getRouterConfig(langPrefix = '/') {
  return [
    {
      text: '介绍',
      link: `${langPrefix}`,
    },
    ...Object.entries(Router).map(([text, children]) => ({
      text,
      children: children.map(hookName => ({
        link: `${langPrefix}${kebabCase(hookName)}/`,
        text: hookName,
      })),
    })),
  ];
}

module.exports = {
  getRouterConfig,
};
