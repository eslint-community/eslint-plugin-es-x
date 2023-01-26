---
title: "es-x/no-promise-prototype-finally"
description: "disallow the `Promise.prototype.finally` method"
since: "[eslint-plugin-es] v5.0.0"
---

# es-x/no-promise-prototype-finally
> disallow the `Promise.prototype.finally` method

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2018`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, `plugin:es-x/restrict-to-es2016`, and `plugin:es-x/restrict-to-es2017`

This rule reports ES2018 [`Promise.prototype.finally` method](https://github.com/tc39/proposal-promise-finally) as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-promise-prototype-finally: [error, { aggressive: true }] */
doSomethingAsync().finally(dispose)
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```yaml
rules:
  es-x/no-promise-prototype-finally: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings['es-x'].aggressive` setting.

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v5.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-promise-prototype-finally.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-promise-prototype-finally.js)
