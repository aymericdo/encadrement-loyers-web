import pluginVue from 'eslint-plugin-vue'
export default [
  ...pluginVue.configs['flat/strongly-recommended'],
  { ignores: ['.gitignore', 'src/shadcn/ui/**', '**/dist'] },
  {
    files: ['**/*.{js,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      "no-console": "off",
      "vue/require-default-prop": 'off',
    },
  }
]
