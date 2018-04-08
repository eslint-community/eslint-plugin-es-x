# eslint-plugin-es

[![npm version](https://img.shields.io/npm/v/eslint-plugin-es.svg)](https://www.npmjs.com/package/eslint-plugin-es)
[![Downloads/month](https://img.shields.io/npm/dm/eslint-plugin-es.svg)](http://www.npmtrends.com/eslint-plugin-es)
[![Build Status](https://travis-ci.org/mysticatea/eslint-plugin-es.svg?branch=master)](https://travis-ci.org/mysticatea/eslint-plugin-es)
[![Coverage Status](https://codecov.io/gh/mysticatea/eslint-plugin-es/branch/master/graph/badge.svg)](https://codecov.io/gh/mysticatea/eslint-plugin-es)
[![Dependency Status](https://david-dm.org/mysticatea/eslint-plugin-es.svg)](https://david-dm.org/mysticatea/eslint-plugin-es)

ESLint plugin about ECMAScript syntactic features.

## 🏁 Goal

[Espree](https://github.com/eslint/espree#readme), the default parser of [ESLint](https://eslint.org/), has supported `ecmaVersion` option.
However, it doesn't support to enable each syntactic feature individually.

This plugin lets us disable each syntactic feature individually.
So we can enable arbitrary syntactic features with the combination of `ecmaVersion` and this plugin.

## 💿 Installation

Use [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/).

```console
npm install --save-dev eslint eslint-plugin-es
```

### Requirements

- Node.js `6.5.0` or newer.
- ESLint `4.19.1` or newer.

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

### Rules

This plugin provides the following rules.

- 🔧 mark means that the `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fix) can automatically fix some of the problems reported by the rule.

<!--RULE_TABLE_BEGIN-->
#### ES2018

| Rule ID | Description |
|:--------|:------------|
| [es/no-async-iteration](docs/rules/no-async-iteration.md) | disallow async iteration. |
| [es/no-malformed-template-literals](docs/rules/no-malformed-template-literals.md) | disallow template literals with invalid escape sequences. |
| [es/no-regexp-lookbehind-assertions](docs/rules/no-regexp-lookbehind-assertions.md) | disallow RegExp lookbehind assertions. |
| [es/no-regexp-named-capture-groups](docs/rules/no-regexp-named-capture-groups.md) | disallow RegExp named capture groups. |
| [es/no-regexp-s-flag](docs/rules/no-regexp-s-flag.md) | disallow RegExp `s` flag. |
| [es/no-regexp-unicode-property-escapes](docs/rules/no-regexp-unicode-property-escapes.md) | disallow RegExp Unicode property escape sequences. |
| [es/no-rest-spread-properties](docs/rules/no-rest-spread-properties.md) | disallow rest/spread properties. |

#### ES2017

| Rule ID | Description |
|:--------|:------------|
| [es/no-async-functions](docs/rules/no-async-functions.md) | disallow async function declarations. |
| [es/no-trailing-function-commas](docs/rules/no-trailing-function-commas.md) | disallow trailing commas in parameter/argument lists. |

#### ES2016

| Rule ID | Description |
|:--------|:------------|
| [es/no-exponential-operators](docs/rules/no-exponential-operators.md) | disallow exponential operators. |

#### ES2015

| Rule ID | Description |
|:--------|:------------|
| [es/no-arrow-functions](docs/rules/no-arrow-functions.md) | disallow arrow function expressions. |
| [es/no-binary-numeric-literals](docs/rules/no-binary-numeric-literals.md) | disallow binary numeric literals. |
| [es/no-block-scoped-functions](docs/rules/no-block-scoped-functions.md) | disallow block-scoped function declarations. |
| [es/no-block-scoped-variables](docs/rules/no-block-scoped-variables.md) | disallow block-scoped variable declarations. |
| [es/no-classes](docs/rules/no-classes.md) | disallow class declarations. |
| [es/no-computed-properties](docs/rules/no-computed-properties.md) | disallow computed properties. |
| [es/no-default-parameters](docs/rules/no-default-parameters.md) | disallow default parameters. |
| [es/no-destructuring](docs/rules/no-destructuring.md) | disallow destructuring. |
| [es/no-for-of-loops](docs/rules/no-for-of-loops.md) | disallow `for-of` statements. |
| [es/no-generators](docs/rules/no-generators.md) | disallow generator function declarations. |
| [es/no-modules](docs/rules/no-modules.md) | disallow modules. |
| [es/no-new-target](docs/rules/no-new-target.md) | disallow `new.target` meta property. |
| [es/no-object-super-properties](docs/rules/no-object-super-properties.md) | disallow `super` property accesses in object literals. |
| [es/no-octal-numeric-literals](docs/rules/no-octal-numeric-literals.md) | disallow octal numeric literals. |
| [es/no-property-shorthands](docs/rules/no-property-shorthands.md) | disallow property shorthands. |
| [es/no-regexp-u-flag](docs/rules/no-regexp-u-flag.md) | disallow RegExp `u` flag. |
| [es/no-regexp-y-flag](docs/rules/no-regexp-y-flag.md) | disallow RegExp `y` flag. |
| [es/no-rest-parameters](docs/rules/no-rest-parameters.md) | disallow rest parameters. |
| [es/no-spread-elements](docs/rules/no-spread-elements.md) | disallow spread elements. |
| [es/no-template-literals](docs/rules/no-template-literals.md) | disallow template literals. |
| [es/no-unicode-codepoint-escapes](docs/rules/no-unicode-codepoint-escapes.md) | disallow Unicode code point escape sequences. |

#### ES5

| Rule ID | Description |
|:--------|:------------|
| [es/no-accessor-properties](docs/rules/no-accessor-properties.md) | disallow accessor properties. |
| [es/no-keyword-properties](docs/rules/no-keyword-properties.md) | disallow reserved words as property names. |
| [es/no-trailing-commas](docs/rules/no-trailing-commas.md) | disallow trailing commas in array/object literals. |

<!--RULE_TABLE_END-->

## 🚥 Semantic Versioning Policy

This plugin follows [semantic versioning](http://semver.org/) and [ESLint's semantic versioning policy](https://github.com/eslint/eslint#semantic-versioning-policy).

## 📰 Changelog

See [releases](https://github.com/mysticatea/eslint-plugin-es/releases).

## ❤️ Contributing

Welcome contributing!

Please use GitHub's Issues/PRs.

### Development Tools

- `npm test` runs tests and measures coverage.
- `npm run clean` removes the coverage result of `npm test` command.
- `npm run coverage` shows the coverage result of the last `npm test` command.
- `npm run watch` runs tests on each file change.
