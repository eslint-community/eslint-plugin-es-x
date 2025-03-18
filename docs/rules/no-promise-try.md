---
title: "es-x/no-promise-try"
description: "disallow `Promise.try` function"
since: "v8.1.0"
---

# es-x/no-promise-try
> disallow `Promise.try` function

- ✅ The following configurations enable this rule: [no-new-in-esnext]

This rule reports ES2025 [`Promise.try`](https://github.com/tc39/proposal-promise-try) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-promise-try: error */
const p = Promise.try(f)
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-promise-try": [
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

This rule was introduced in v8.1.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-promise-try.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-promise-try.js)

[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
