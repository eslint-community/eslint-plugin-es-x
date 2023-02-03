---
title: "es-x/no-array-prototype-toreversed"
description: "disallow the `Array.prototype.toReversed` method"
---

# es-x/no-array-prototype-toreversed
> disallow the `Array.prototype.toReversed` method

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-esnext`

This rule reports ES2023 [`Array.prototype.toReversed` methods](https://github.com/tc39/proposal-change-array-by-copy) as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-array-prototype-toreversed: [error, { aggressive: true }] */
array.toReversed()
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```yaml
rules:
  es-x/no-array-prototype-toreversed: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings['es-x'].aggressive` setting.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-array-prototype-toreversed.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-array-prototype-toreversed.js)
