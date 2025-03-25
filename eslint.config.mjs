import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // your custom flat configs go here, for example:
  {
    files: ['**/*.vue'],
    rules: {
      'vue/html-indent': 'warn',
      'vue/html-self-closing': 'warn',
      'vue/block-order': [
        'error', {
          order: ['script', 'template', 'style'],
        },
      ],
      'vue/no-multiple-template-root': 'off',
    },
  },
  {
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    rules: {
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/member-delimiter-style': ['error',
        {
          multiline: {
            delimiter: 'comma',
            requireLast: true,
          },
          singleline: {
            delimiter: 'comma',
            requireLast: false,
          },
          multilineDetection: 'brackets',
        },
      ],
      '@stylistic/arrow-spacing': ['error', { before: true, after: true }],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/space-before-blocks': 'error',
    },
  },
)
