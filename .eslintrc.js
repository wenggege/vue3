module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    commonjs: true,
    amd: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    indent: 0,
    'space-before-function-paren': 0,
    '@typescript-eslint/no-explicit-any': ['off'],
    'vue/multi-word-component-names': 'off',
    'vue/no-v-for-template-key': 'off',
    'vue/no-v-model-argument': 'off'
  }
}
