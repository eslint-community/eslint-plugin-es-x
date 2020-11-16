# Guide

[![npm version](https://img.shields.io/npm/v/eslint-plugin-es.svg)](https://www.npmjs.com/package/eslint-plugin-es)
[![Downloads/month](https://img.shields.io/npm/dm/eslint-plugin-es.svg)](http://www.npmtrends.com/eslint-plugin-es)
[![Build Status](https://github.com/mysticatea/eslint-plugin-es/workflows/CI/badge.svg)](https://github.com/mysticatea/eslint-plugin-es/actions)
[![Coverage Status](https://codecov.io/gh/mysticatea/eslint-plugin-es/branch/master/graph/badge.svg)](https://codecov.io/gh/mysticatea/eslint-plugin-es)
[![Dependency Status](https://david-dm.org/mysticatea/eslint-plugin-es.svg)](https://david-dm.org/mysticatea/eslint-plugin-es)

ESLint rules which disallow each ECMAScript syntax.

## 🏁 Goal

[Espree](https://github.com/eslint/espree#readme), the default parser of [ESLint](https://eslint.org/), has supported `ecmaVersion` option.
However, the error messages of new syntax are not readable (e.g., "unexpected token" or something like).

When we use this plugin along with the latest `ecmaVersion` option value, it tells us the readable error message for the new syntax, such as "ES2020 BigInt is forbidden."
Plus, this plugin lets us disable each syntactic feature individually.

## 💿 Installation

Use [npm](https://www.npmjs.com/) or a compatible tool.

```console
npm install --save-dev eslint eslint-plugin-es
```

::: tip Requirements
- Node.js `8.10.0` or newer.
- ESLint `4.19.1` or newer.
:::

## 📖 Usage

Configure your `.eslintrc.*` file.

For example, to enable only Rest/Spread Properties in ES2018, as similar to legacy `experimentalObjectRestSpread` option:

```json
{
    "plugins": ["es"],
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "es/no-async-iteration": "error",
        "es/no-malformed-template-literals": "error",
        "es/no-regexp-lookbehind-assertions": "error",
        "es/no-regexp-named-capture-groups": "error",
        "es/no-regexp-s-flag": "error",
        "es/no-regexp-unicode-property-escapes": "error"
    }
}
```

### Presets

This plugin provides the following configs.

| Config ID | Description |
|:----------|:------------|
| `plugin:es/no-new-in-es2020` | disallow the new stuff in ES2020.
| `plugin:es/no-new-in-es2019` | disallow the new stuff in ES2019.
| `plugin:es/no-new-in-es2018` | disallow the new stuff in ES2018.
| `plugin:es/no-new-in-es2017` | disallow the new stuff in ES2017.
| `plugin:es/no-new-in-es2016` | disallow the new stuff in ES2016.
| `plugin:es/no-new-in-es2015` | disallow the new stuff in ES2015.
| `plugin:es/no-new-in-es5` | disallow the new stuff in ES5.
| `plugin:es/restrict-to-es2019` | disallow new stuff that ES2019 doesn't include.
| `plugin:es/restrict-to-es2018` | disallow new stuff that ES2018 doesn't include.
| `plugin:es/restrict-to-es2017` | disallow new stuff that ES2017 doesn't include.
| `plugin:es/restrict-to-es2016` | disallow new stuff that ES2016 doesn't include.
| `plugin:es/restrict-to-es2015` | disallow new stuff that ES2015 doesn't include.
| `plugin:es/restrict-to-es5` | disallow new stuff that ES5 doesn't include.
| `plugin:es/restrict-to-es3` | disallow new stuff that ES3 doesn't include.

For example:

```json
{
    "plugins": ["es"],
    "parserOptions": {
        "ecmaVersion": 2021
    },
    "extends": [
        "eslint:recommended",
        "plugin:es/restrict-to-es2018"
    ],
    "rules": {
        "es/no-rest-spread-properties": "off"
    }
}
```
