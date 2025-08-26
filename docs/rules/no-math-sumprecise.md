---
title: "es-x/no-math-sumprecise"
description: "disallow the `Math.sumPrecise` method"
since: "v9.1.0"
---

# es-x/no-math-sumprecise
> disallow the `Math.sumPrecise` method

- ✅ The following configurations enable this rule: [no-new-in-esnext]

This rule reports ES2026 [`Math.sumPrecise` property](https://github.com/tc39/proposal-math-sum) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-math-sumprecise: error */
Math.sumPrecise([1e20, 0.1, -1e20]);
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-math-sumprecise": [
      "error",
      {
        "allowTestedProperty": false
      }
    ]
  }
}
```

### allowTestedProperty: boolean

Configure the allowTestedProperty mode for only this rule.
This is prior to the `settings['es-x'].allowTestedProperty` setting.

## 🚀 Version

This rule was introduced in v9.1.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-math-sumprecise.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-math-sumprecise.js)

[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
