'use strict';

module.exports = {
  rules: {
    'no-assert-ok-find': require('./rules/no-assert-ok-find'),
    'no-async': require('./rules/no-async'),
    'no-focused-tests': require('./rules/no-focused-tests'),
    'no-for-of': require('./rules/no-for-of'),
    'no-handlebar-interpolation': require('./rules/no-handlebar-interpolation'),
    'no-missing-tests': require('./rules/no-missing-tests'),
    'no-modifying-immutable-properties': require('./rules/no-modifying-immutable-properties'),
    'no-restricted-files': require('./rules/no-restricted-files'),
    'no-test-expect-assertion-count': require('./rules/no-test-expect-assertion-count'),
    'no-test-return-value': require('./rules/no-test-return-value'),
    'no-translation-key-interpolation': require('./rules/no-translation-key-interpolation'),
    'require-await-function': require('./rules/require-await-function'),
    'use-call-count-test-assert': require('./rules/use-call-count-test-assert'),
    'use-ember-find': require('./rules/use-ember-find'),
  },
  configs: {
    base: require('./config/base'),
    ember: require('./config/ember'),
    react: require('./config/react'),
    typescript: require('./config/typescript'),
  },
  utils: {
    filenames: require('./utils/filenames'),
  },
};
