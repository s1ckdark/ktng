module.exports = {
  "env": {
    "browser": true,
    "jquery": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-unused-vars": [
      0, { "varsIgnorePattern": "^h$" }
    ]
  },
  "globals": {
    "WebFont": true,
    "fnSendSns": true,
    "Kakao": true,
    "isMobile": true,
    "TweenMax": true,
    "TimelineMax": true,
    "Linear": true,
    "Power1": true,
    "Power4": true,
    "Elastic": true,
    "SplitText": true,
    "ScrollMagic": true,
    "controller": true,
    "jatracker": true,
    "playBgVideo": true,
    "pauseVideo": true,
    "lazyload": true,
  }
};