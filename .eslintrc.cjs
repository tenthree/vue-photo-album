require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-standard-with-typescript',
    // '@vue/eslint-config-prettier/skip-formatting'
    '@vue/eslint-config-prettier'
  ]
}
