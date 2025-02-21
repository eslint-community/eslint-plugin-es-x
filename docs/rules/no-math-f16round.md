---
title: "es-x/no-math-f16round"
description: "disallow the `Math.f16round` method"
since: "v8.5.0"
---

# es-x/no-math-f16round
> disallow the `Math.f16round` method

- ✅ The following configurations enable this rule: [no-float16array] and [no-new-in-esnext]

This rule reports ES2025 [`Math.f16round` method](https://github.com/tc39/proposal-float16array) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-math-f16round: error */
const n = Math.f16round(value)
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-math-f16round": [
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

This rule was introduced in v8.5.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-math-f16round.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-math-f16round.js)

[no-float16array]: ../configs/index.md#no-float16array
[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
