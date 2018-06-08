# Getting Started

## 💿 Installation

Use [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/).

```console
npm install --save-dev eslint eslint-plugin-es
```

::: tip Requirements
- Node.js `6.5.0` or newer.
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
