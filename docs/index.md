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
- Node.js `20.19.0`, `22.12.0` or newer.
- ESLint `9.29.0` or newer.
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

```js
{
    "plugins": { "es-x": pluginESx },
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

```js
{
    "plugins": { "es-x": pluginESx },
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

### The `allowTestedProperty` mode

This plugin has rules to report forbidden property accesses.
These rules report all forbidden property accesses by default, but if you want to allow existence-tested properties in your scripts, you can use the `allowTestedProperty` mode.

<eslint-playground type="good">

```ts
/*eslint es-x/no-string-prototype-trimstart-trimend: [error, { aggressive: true, allowTestedProperty: true }], es-x/no-string-prototype-trimleft-trimright: [error, { aggressive: true, allowTestedProperty: true }],  */
function trimEnd(str) {
    if (String.prototype.trimEnd) {
        return str.trimEnd();
    }
    if (String.prototype.trimRight) {
        return str.trimRight();
    }
    return str.replace(/\s+$/, "");
}
```

</eslint-playground>

If you configured the `allowTestedProperty` mode, this plugin will allow the use of tested properties.
For example:

```js
{
    "plugins": { "es-x": pluginESx },
    "rules": {
        "es-x/no-string-prototype-trimstart-trimend": "error",
        "es-x/no-string-prototype-trimleft-trimright": "error"
    },

    // `settings['es-x'].allowTestedProperty = true` means the allowTestedProperty mode.
    "settings": {
        "es-x": { "allowTestedProperty": true }
    }
}
```
