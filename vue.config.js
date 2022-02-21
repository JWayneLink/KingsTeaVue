module.exports = {
  "pluginOptions": {
    "i18n": {
      "locale": "en",
      "fallbackLocale": "en",
      "localeDir": "src",
      "enableInSFC": true
    }
  },
  "configureWebpack": {
    "devtool": "source-map"
  },
  "productionSourceMap": false,
  "transpileDependencies": [
    "vuetify"
  ]
}