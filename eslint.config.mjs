// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylistic,

  {
    rules: {
      // disable the interface-only rule entirely
      '@typescript-eslint/consistent-type-definitions': 'off',
    },
  }
);
