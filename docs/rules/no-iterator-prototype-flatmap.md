---
title: "es-x/no-iterator-prototype-flatmap"
description: "disallow the `Iterator.prototype.flatMap` method"
---

# es-x/no-iterator-prototype-flatmap
> disallow the `Iterator.prototype.flatMap` method

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-iterator-helpers] and [no-new-in-esnext]

This rule reports ES2025 [`Iterator.prototype.flatMap` method](https://github.com/tc39/proposal-iterator-helpers) as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-iterator-prototype-flatmap: [error, { aggressive: true }] */
Iterator.from([]).flatMap(a => a.b)
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```yml
rules:
  es-x/no-iterator-prototype-flatMap: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings['es-x'].aggressive` setting.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-iterator-prototype-flatmap.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-iterator-prototype-flatmap.js)

[no-iterator-helpers]: ../configs/index.md#no-iterator-helpers
[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
