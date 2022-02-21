import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

// 預設使用的語系
// let locale = 'zh';

function loadLocaleMessages() {
  const locales = require.context('../i18n', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages // zh/en/ja
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages() // 'en'
})