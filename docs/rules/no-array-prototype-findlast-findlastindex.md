---
title: "es-x/no-array-prototype-findlast-findlastindex"
description: "disallow the `Array.prototype.{findLast,findLastIndex}` methods"
since: "v5.3.0"
---

# es-x/no-array-prototype-findlast-findlastindex
> disallow the `Array.prototype.{findLast,findLastIndex}` methods

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2023`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, `plugin:es-x/restrict-to-es2016`, `plugin:es-x/restrict-to-es2017`, `plugin:es-x/restrict-to-es2018`, `plugin:es-x/restrict-to-es2019`, `plugin:es-x/restrict-to-es2020`, `plugin:es-x/restrict-to-es2021`, and `plugin:es-x/restrict-to-es2022`

This rule reports ES2023 [`Array.prototype.{findLast,findLastIndex}` methods](https://github.com/tc39/proposal-array-find-from-last) as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-array-prototype-findlast-findlastindex: [error, { aggressive: true }] */
array.findLast(e => test(e))
array.findLastIndex(e => test(e))
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```yaml
rules:
  es-x/no-array-prototype-findlast-findlastindex: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings['es-x'].aggressive` setting.

## 🚀 Version

This rule was introduced in v5.3.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-array-prototype-findlast-findlastindex.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-array-prototype-findlast-findlastindex.js)
