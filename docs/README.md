# Guide

[![npm version](https://img.shields.io/npm/v/eslint-plugin-es-x.svg)](https://www.npmjs.com/package/eslint-plugin-es-x)
[![Downloads/month](https://img.shields.io/npm/dm/eslint-plugin-es-x.svg)](http://www.npmtrends.com/eslint-plugin-es-x)
[![Build Status](https://github.com/eslint-community/eslint-plugin-es-x/workflows/CI/badge.svg)](https://github.com/eslint-community/eslint-plugin-es-x/actions)

ESLint rules which disallow each ECMAScript syntax.

> Forked from [eslint-plugin-es](https://github.com/mysticatea/eslint-plugin-es). As the original repository seems no longer maintained.

## 🏁 Goal

[Espree](https://github.com/eslint/espree#readme), the default parser of [ESLint](https://eslint.org/), has supported `ecmaVersion` option.
However, the error messages of new syntax are not readable (e.g., "unexpected token" or something like).

When we use this plugin along with the latest `ecmaVersion` option value, it tells us the readable error message for the new syntax, such as "ES2020 BigInt is forbidden."
Plus, this plugin lets us disable each syntactic feature individually.

## 💿 Installation

Use [npm](https://www.npmjs.com/) or a compatible tool.

```console
npm install --save-dev eslint eslint-plugin-es-x
```

::: tip Requirements
- Node.js `14.18.0` or newer, except `15.x`.
- ESLint `6.x` or newer.
:::

## 📖 Usage

Configure your `.eslintrc.*` file.

For example, to enable only Rest/Spread Properties in ES2018, as similar to legacy `experimentalObjectRestSpread` option:

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

This plugin provides the following configs.

| Config ID | Description |
|:----------|:------------|
| `plugin:es-x/restrict-to-es2021` | disallow new stuff that ES2021 doesn't include.
| `plugin:es-x/restrict-to-es2020` | disallow new stuff that ES2020 doesn't include.
| `plugin:es-x/restrict-to-es2019` | disallow new stuff that ES2019 doesn't include.
| `plugin:es-x/restrict-to-es2018` | disallow new stuff that ES2018 doesn't include.
| `plugin:es-x/restrict-to-es2017` | disallow new stuff that ES2017 doesn't include.
| `plugin:es-x/restrict-to-es2016` | disallow new stuff that ES2016 doesn't include.
| `plugin:es-x/restrict-to-es2015` | disallow new stuff that ES2015 doesn't include.
| `plugin:es-x/restrict-to-es5` | disallow new stuff that ES5 doesn't include.
| `plugin:es-x/restrict-to-es3` | disallow new stuff that ES3 doesn't include.
| `plugin:es-x/no-new-in-es2022` | disallow the new stuff in ES2022.
| `plugin:es-x/no-new-in-es2021` | disallow the new stuff in ES2021.
| `plugin:es-x/no-new-in-es2020` | disallow the new stuff in ES2020.
| `plugin:es-x/no-new-in-es2019` | disallow the new stuff in ES2019.
| `plugin:es-x/no-new-in-es2018` | disallow the new stuff in ES2018.
| `plugin:es-x/no-new-in-es2017` | disallow the new stuff in ES2017.
| `plugin:es-x/no-new-in-es2016` | disallow the new stuff in ES2016.
| `plugin:es-x/no-new-in-es2015` | disallow the new stuff in ES2015.
| `plugin:es-x/no-new-in-es5` | disallow the new stuff in ES5.
| `plugin:es-x/no-new-in-esnext` | disallow the new stuff to be planned for the next yearly ECMAScript snapshot.<br>⚠️ This config will be changed in the minor versions of this plugin.

For example:

```json
{
    "parserOptions": {
        "ecmaVersion": 2021
    },
    "extends": [
        "eslint:recommended",
        "plugin:es-x/restrict-to-es2018"
    ],
    "rules": {
        "es-x/no-rest-spread-properties": "off"
    }
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
