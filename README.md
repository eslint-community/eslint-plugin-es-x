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

### Configs

This plugin provides the following configs.

| Config ID | Description |
|:----------|:------------|
| `plugin:es/no-2018` | enable all ES2018 rules.
| `plugin:es/no-2017` | enable all ES2017 rules.
| `plugin:es/no-2016` | enable all ES2016 rules.
| `plugin:es/no-2015` | enable all ES2015 rules.
| `plugin:es/no-5` | enable all ES5 rules.

### Rules

This plugin provides the following rules.

- 🔧 mark means that the `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fix) can automatically fix some of the problems reported by the rule.

<!--RULE_TABLE_BEGIN-->
#### ES2018

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es/no-async-iteration](docs/rules/no-async-iteration.md) | disallow async iteration. |  |
| [es/no-malformed-template-literals](docs/rules/no-malformed-template-literals.md) | disallow template literals with invalid escape sequences. |  |
| [es/no-regexp-lookbehind-assertions](docs/rules/no-regexp-lookbehind-assertions.md) | disallow RegExp lookbehind assertions. |  |
| [es/no-regexp-named-capture-groups](docs/rules/no-regexp-named-capture-groups.md) | disallow RegExp named capture groups. |  |
| [es/no-regexp-s-flag](docs/rules/no-regexp-s-flag.md) | disallow RegExp `s` flag. |  |
| [es/no-regexp-unicode-property-escapes](docs/rules/no-regexp-unicode-property-escapes.md) | disallow RegExp Unicode property escape sequences. |  |
| [es/no-rest-spread-properties](docs/rules/no-rest-spread-properties.md) | disallow rest/spread properties. |  |

#### ES2017

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es/no-async-functions](docs/rules/no-async-functions.md) | disallow async function declarations. |  |
| [es/no-atomics](docs/rules/no-atomics.md) | disallow the `Atomics` class. |  |
| [es/no-object-entries](docs/rules/no-object-entries.md) | disallow the `Object.entries` method. |  |
| [es/no-object-getownpropertydescriptors](docs/rules/no-object-getownpropertydescriptors.md) | disallow the `Object.getOwnPropertyDescriptors` method. |  |
| [es/no-object-values](docs/rules/no-object-values.md) | disallow the `Object.values` method. |  |
| [es/no-shared-array-buffer](docs/rules/no-shared-array-buffer.md) | disallow the `SharedArrayBuffer` class. |  |
| [es/no-trailing-function-commas](docs/rules/no-trailing-function-commas.md) | disallow trailing commas in parameter/argument lists. |  |

#### ES2016

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es/no-exponential-operators](docs/rules/no-exponential-operators.md) | disallow exponential operators. |  |

#### ES2015

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es/no-array-from](docs/rules/no-array-from.md) | disallow the `Array.from` method. |  |
| [es/no-array-of](docs/rules/no-array-of.md) | disallow the `Array.of` method. |  |
| [es/no-arrow-functions](docs/rules/no-arrow-functions.md) | disallow arrow function expressions. | 🔧 |
| [es/no-binary-numeric-literals](docs/rules/no-binary-numeric-literals.md) | disallow binary numeric literals. |  |
| [es/no-block-scoped-functions](docs/rules/no-block-scoped-functions.md) | disallow block-scoped function declarations. |  |
| [es/no-block-scoped-variables](docs/rules/no-block-scoped-variables.md) | disallow block-scoped variable declarations. |  |
| [es/no-classes](docs/rules/no-classes.md) | disallow class declarations. |  |
| [es/no-computed-properties](docs/rules/no-computed-properties.md) | disallow computed properties. |  |
| [es/no-default-parameters](docs/rules/no-default-parameters.md) | disallow default parameters. |  |
| [es/no-destructuring](docs/rules/no-destructuring.md) | disallow destructuring. |  |
| [es/no-for-of-loops](docs/rules/no-for-of-loops.md) | disallow `for-of` statements. |  |
| [es/no-generators](docs/rules/no-generators.md) | disallow generator function declarations. |  |
| [es/no-map](docs/rules/no-map.md) | disallow the `Map` class. |  |
| [es/no-math-acosh](docs/rules/no-math-acosh.md) | disallow the `Math.acosh` method. |  |
| [es/no-math-asinh](docs/rules/no-math-asinh.md) | disallow the `Math.asinh` method. |  |
| [es/no-math-atanh](docs/rules/no-math-atanh.md) | disallow the `Math.atanh` method. |  |
| [es/no-math-cbrt](docs/rules/no-math-cbrt.md) | disallow the `Math.cbrt` method. |  |
| [es/no-math-clz32](docs/rules/no-math-clz32.md) | disallow the `Math.clz32` method. |  |
| [es/no-math-cosh](docs/rules/no-math-cosh.md) | disallow the `Math.cosh` method. |  |
| [es/no-math-expm1](docs/rules/no-math-expm1.md) | disallow the `Math.expm1` method. |  |
| [es/no-math-fround](docs/rules/no-math-fround.md) | disallow the `Math.fround` method. |  |
| [es/no-math-hypot](docs/rules/no-math-hypot.md) | disallow the `Math.hypot` method. |  |
| [es/no-math-imul](docs/rules/no-math-imul.md) | disallow the `Math.imul` method. |  |
| [es/no-math-log10](docs/rules/no-math-log10.md) | disallow the `Math.log10` method. |  |
| [es/no-math-log1p](docs/rules/no-math-log1p.md) | disallow the `Math.log1p` method. |  |
| [es/no-math-log2](docs/rules/no-math-log2.md) | disallow the `Math.log2` method. |  |
| [es/no-math-sign](docs/rules/no-math-sign.md) | disallow the `Math.sign` method. |  |
| [es/no-math-sinh](docs/rules/no-math-sinh.md) | disallow the `Math.sinh` method. |  |
| [es/no-math-tanh](docs/rules/no-math-tanh.md) | disallow the `Math.tanh` method. |  |
| [es/no-math-trunc](docs/rules/no-math-trunc.md) | disallow the `Math.trunc` method. |  |
| [es/no-modules](docs/rules/no-modules.md) | disallow modules. |  |
| [es/no-new-target](docs/rules/no-new-target.md) | disallow `new.target` meta property. |  |
| [es/no-number-epsilon](docs/rules/no-number-epsilon.md) | disallow the `Number.EPSILON` property. |  |
| [es/no-number-isfinite](docs/rules/no-number-isfinite.md) | disallow the `Number.isFinite` method. |  |
| [es/no-number-isinteger](docs/rules/no-number-isinteger.md) | disallow the `Number.isInteger` method. |  |
| [es/no-number-isnan](docs/rules/no-number-isnan.md) | disallow the `Number.isNaN` method. |  |
| [es/no-number-issafeinteger](docs/rules/no-number-issafeinteger.md) | disallow the `Number.isSafeInteger` method. |  |
| [es/no-number-maxsafeinteger](docs/rules/no-number-maxsafeinteger.md) | disallow the `Number.MAX_SAFE_INTEGER` property. |  |
| [es/no-number-minsafeinteger](docs/rules/no-number-minsafeinteger.md) | disallow the `Number.MIN_SAFE_INTEGER` property. |  |
| [es/no-number-parsefloat](docs/rules/no-number-parsefloat.md) | disallow the `Number.parseFloat` method. |  |
| [es/no-number-parseint](docs/rules/no-number-parseint.md) | disallow the `Number.parseInt` method. |  |
| [es/no-object-assign](docs/rules/no-object-assign.md) | disallow the `Object.assign` method. |  |
| [es/no-object-getownpropertysymbols](docs/rules/no-object-getownpropertysymbols.md) | disallow the `Object.getOwnPropertySymbols` method. |  |
| [es/no-object-is](docs/rules/no-object-is.md) | disallow the `Object.is` method. |  |
| [es/no-object-setprototypeof](docs/rules/no-object-setprototypeof.md) | disallow the `Object.setPrototypeOf` method. |  |
| [es/no-object-super-properties](docs/rules/no-object-super-properties.md) | disallow `super` property accesses in object literals. |  |
| [es/no-octal-numeric-literals](docs/rules/no-octal-numeric-literals.md) | disallow octal numeric literals. |  |
| [es/no-promise](docs/rules/no-promise.md) | disallow the `Promise` class. |  |
| [es/no-property-shorthands](docs/rules/no-property-shorthands.md) | disallow property shorthands. |  |
| [es/no-proxy](docs/rules/no-proxy.md) | disallow the `Proxy` class. |  |
| [es/no-reflect](docs/rules/no-reflect.md) | disallow the `Reflect` class. |  |
| [es/no-regexp-u-flag](docs/rules/no-regexp-u-flag.md) | disallow RegExp `u` flag. |  |
| [es/no-regexp-y-flag](docs/rules/no-regexp-y-flag.md) | disallow RegExp `y` flag. |  |
| [es/no-rest-parameters](docs/rules/no-rest-parameters.md) | disallow rest parameters. |  |
| [es/no-set](docs/rules/no-set.md) | disallow the `Set` class. |  |
| [es/no-spread-elements](docs/rules/no-spread-elements.md) | disallow spread elements. |  |
| [es/no-string-fromcodepoint](docs/rules/no-string-fromcodepoint.md) | disallow the `String.fromCodePoint` method. |  |
| [es/no-string-raw](docs/rules/no-string-raw.md) | disallow the `String.raw` method. |  |
| [es/no-subclassing-builtins](docs/rules/no-subclassing-builtins.md) | disallow the subclassing of the built-in classes. |  |
| [es/no-symbol](docs/rules/no-symbol.md) | disallow the `Symbol` class. |  |
| [es/no-template-literals](docs/rules/no-template-literals.md) | disallow template literals. | 🔧 |
| [es/no-typed-arrays](docs/rules/no-typed-arrays.md) | disallow ES2015 typed arrays. |  |
| [es/no-unicode-codepoint-escapes](docs/rules/no-unicode-codepoint-escapes.md) | disallow Unicode code point escape sequences. | 🔧 |
| [es/no-weak-map](docs/rules/no-weak-map.md) | disallow the `WeakMap` class. |  |
| [es/no-weak-set](docs/rules/no-weak-set.md) | disallow the `WeakSet` class. |  |

#### ES5

| Rule ID | Description |    |
|:--------|:------------|:--:|
| [es/no-accessor-properties](docs/rules/no-accessor-properties.md) | disallow accessor properties. |  |
| [es/no-keyword-properties](docs/rules/no-keyword-properties.md) | disallow reserved words as property names. |  |
| [es/no-trailing-commas](docs/rules/no-trailing-commas.md) | disallow trailing commas in array/object literals. |  |

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
