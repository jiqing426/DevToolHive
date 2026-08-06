const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-CN', 'de', 'fr', 'it', 'es', 'ja'],
  },
  localePath: path.resolve('./public/locales'),
};
