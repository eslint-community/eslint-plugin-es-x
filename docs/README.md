# Guide

[![npm version](https://img.shields.io/npm/v/eslint-plugin-es.svg)](https://www.npmjs.com/package/eslint-plugin-es)
[![Downloads/month](https://img.shields.io/npm/dm/eslint-plugin-es.svg)](http://www.npmtrends.com/eslint-plugin-es)
[![Build Status](https://github.com/mysticatea/eslint-plugin-es/workflows/CI/badge.svg)](https://github.com/mysticatea/eslint-plugin-es/actions)
[![Coverage Status](https://codecov.io/gh/mysticatea/eslint-plugin-es/branch/master/graph/badge.svg)](https://codecov.io/gh/mysticatea/eslint-plugin-es)
[![Dependency Status](https://david-dm.org/mysticatea/eslint-plugin-es.svg)](https://david-dm.org/mysticatea/eslint-plugin-es)

ESLint rules which disallow each ECMAScript syntax.

## 🏁 Goal

[Espree](https://github.com/eslint/espree#readme), the default parser of [ESLint](https://eslint.org/), has supported `ecmaVersion` option.
However, it doesn't support to enable each syntactic feature individually.
This plugin lets us disable each syntactic feature individually.
So we can enable arbitrary syntactic features with the combination of `ecmaVersion` and this plugin.

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
| `plugin:es/no-2019` | enable all rules which disallow ES2019 syntax.
| `plugin:es/no-2018` | enable all rules which disallow ES2018 syntax.
| `plugin:es/no-2017` | enable all rules which disallow ES2017 syntax.
| `plugin:es/no-2016` | enable all rules which disallow ES2016 syntax.
| `plugin:es/no-2015` | enable all rules which disallow ES2015 syntax.
| `plugin:es/no-5` | enable all rules which disallow ES5 syntax.

For example:

```json
{
    "plugins": ["es"],
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "extends": [
        "eslint:recommended",
        "plugin:es/no-2018"
    ],
    "rules": {
        "es/no-rest-spread-properties": "off"
    }
}
```
