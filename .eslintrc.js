module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
    "vue/setup-compiler-macros": true
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
  rules: {
    "no-console": "off",
  },
};
