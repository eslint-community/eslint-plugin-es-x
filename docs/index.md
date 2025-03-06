# Guide

[![npm version](https://img.shields.io/npm/v/eslint-plugin-es-x.svg)](https://www.npmjs.com/package/eslint-plugin-es-x)
[![Downloads/month](https://img.shields.io/npm/dm/eslint-plugin-es-x.svg)](http://www.npmtrends.com/eslint-plugin-es-x)
[![Build Status](https://github.com/eslint-community/eslint-plugin-es-x/actions/workflows/ci.yml/badge.svg)](https://github.com/eslint-community/eslint-plugin-es-x/actions)

ESLint rules which disallow each ECMAScript syntax.

> Forked from [eslint-plugin-es](https://github.com/mysticatea/eslint-plugin-es). As the original repository seems no longer maintained.

## 🏁 Goal

[Espree](https://github.com/eslint/espree#readme), the default parser of [ESLint](https://eslint.org/), has supported `ecmaVersion` option.
However, the error messages of new syntax are not readable (e.g., "unexpected token" or something like).

When we use this plugin along with the latest `ecmaVersion` option value, it tells us the readable error message for the new syntax, such as "ES2020 BigInt is forbidden."
Plus, this plugin lets us disable each syntactic feature individually.

## 💿 Installation

Use [npm](https://www.npmjs.com/) or a compatible tool.

```bash
npm install --save-dev eslint eslint-plugin-es-x
```

::: tip Requirements
- Node.js `14.18.0` or newer, except `15.x`.
- ESLint `8.x` or newer.
:::

## 📖 Usage

Configure your `eslint.config.js` file.

For example, to enable only Rest/Spread Properties in ES2018:

```js
import pluginESx from "eslint-plugin-es-x"
export default [
    {
        plugins: { "es-x": pluginESx },
        languageOptions: {
            ecmaVersion: 2018
        },
        rules: {
            "es-x/no-async-iteration": "error",
            "es-x/no-malformed-template-literals": "error",
            "es-x/no-regexp-lookbehind-assertions": "error",
            "es-x/no-regexp-named-capture-groups": "error",
            "es-x/no-regexp-s-flag": "error",
            "es-x/no-regexp-unicode-property-escapes": "error"
        }
    }
]
```

If you use legacy config, configure your `.eslintrc.*` file:

```json
{
    "plugins": ["es-x"],
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "es-x/no-async-iteration": "error",
        "es-x/no-malformed-template-literals": "error",
        "es-x/no-regexp-lookbehind-assertions": "error",
        "es-x/no-regexp-named-capture-groups": "error",
        "es-x/no-regexp-s-flag": "error",
        "es-x/no-regexp-unicode-property-escapes": "error"
    }
}
```

### Presets

See the [Available Configs](./configs/index.md) documentation.

For example:

```js
import pluginESx from "eslint-plugin-es-x"
export default [
    pluginESx.configs['flat/restrict-to-es2018'],
]
```

If you use legacy config:

```json
{
    "extends": [
        "plugin:es-x/restrict-to-es2018"
    ]
}
```

### The `aggressive` mode

This plugin never reports prototype methods by default. Because it's hard to know the type of objects, it will cause false positives.

If you configured the `aggressive` mode, this plugin reports prototype methods even if the rules couldn't know the type of objects.
For example:

```json
{
    "plugins": ["es-x"],
    "rules": {
        "es-x/no-string-prototype-codepointat": "error"
    },

    // `settings['es-x'].aggressive = true` means the aggressive mode.
    "settings": {
        "es-x": { "aggressive": true }
    }
}
```

If using this plugin and TypeScript, this plugin reports prototype methods by default because we can easily know types.
For example:

```json
{
    "plugins": ["es-x"],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.json"
    },
    "rules": {
        "es-x/no-string-prototype-codepointat": "error"
    },
    
    // If you configured the `aggressive` mode, this plugin reports prototype methods on `any` types as well.
    // "settings": {
    //     "es-x": { "aggressive": true }
    // }
}
```
