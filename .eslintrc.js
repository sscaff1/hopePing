module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "globals": {
    "fetch": true,
  },
  "plugins": [
    "react",
    "react-native"
  ],
  "rules": {
    "no-return-assign": 0,
    "prefer-default-export": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "class-methods-use-this": 0,
    "forbid-prop-types": [0],
  }
};
