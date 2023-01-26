---
title: "es-x/no-array-prototype-reduce"
description: "disallow the `Array.prototype.reduce` method"
since: "[eslint-plugin-es] v5.0.0"
---

# es-x/no-array-prototype-reduce
> disallow the `Array.prototype.reduce` method

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es5` and `plugin:es-x/restrict-to-es3`

This rule reports ES5 `Array.prototype.reduce` method as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-array-prototype-reduce: [error, { aggressive: true }] */
foo.reduce((a, b) => a + b, 0)
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```yaml
rules:
  es-x/no-array-prototype-reduce: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings['es-x'].aggressive` setting.

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v5.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-array-prototype-reduce.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-array-prototype-reduce.js)
