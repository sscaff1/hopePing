module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "installedESLint": true,
    "plugins": [
        "react",
        "react-native",
        "jsx-a11y",
        "import"
    ],
    "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "no-use-before-define": 0, // stick to the common practice of defining styles after the component
      "react/forbid-prop-types": [0] // allows generic propTypes
    }
};
