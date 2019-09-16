module.exports = {
  "env": {
      "browser": true,
      "es6": true
  },
  "parser": "babel-eslint",
  "extends": "airbnb",
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "plugins": [
      "react"
  ],
  "rules": {
    "indent": ["error", 2], 
    // 'semi': ["error", "always"], 
    "import/no-named-as-default": 0,
    "react/prop-types": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "semi": 1,
    "import/extensions": 0,
    "import/no-extraneous-dependencies": 0,
    "class-methods-use-this": 0,
    "global-require": [0],
    "max-len": [0, 200],
    "function-paren-newline": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "no-underscore-dangle": 0,
    "no-nested-ternary": 0,
    "array-callback-return": 0,
    "consistent-return": 0,
    "import/no-dynamic-require": 0,
    "object-curly-newline": 0,
    "no-unused-vars": 1,
    "arrow-body-style": 1,
    "jsx-a11y/no-noninteractive-tabindex": 0,
    "no-debugger": 1,
    "jsx-a11y/media-has-caption": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "no-restricted-syntax": 0,
    "linebreak-style": 0,
    "camelcase": 0,
    "no-cond-assign": 0,
    "no-plusplus": 0,
    "no-mixed-operators": 0,
    "no-confusing-arrow": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/no-autofocus": 0,
    "import/no-unresolved": 0,
    "no-param-reassign": 0,
    // "indent": 1,
    "quotes": 0,
    "func-names": 0,
    "prefer-arrow-callback": 0,
    "no-new": 0,
    "no-bitwise": 0,
    "prefer-destructuring": 0,
    "no-multiple-empty-lines": [1, {"max": 2}],
    "no-undef": 0,
    "react/destructuring-assignment": 0,
  }
};
