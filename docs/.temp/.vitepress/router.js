const Router = {
  service: ['use-service', 'use-service-loading'],
  chart: ['use-echart'],
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
        link: `${langPrefix}${hookName}/`,
        text: hookName,
      })),
    })),
  ];
}

module.exports = {
  getRouterConfig,
};
