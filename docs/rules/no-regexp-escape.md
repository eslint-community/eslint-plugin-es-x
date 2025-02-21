---
title: "es-x/no-regexp-escape"
description: "disallow `RegExp.escape` function"
since: "v8.5.0"
---

# es-x/no-regexp-escape
> disallow `RegExp.escape` function

- ✅ The following configurations enable this rule: [no-new-in-esnext]

This rule reports ES2025 [`RegExp.escape`](https://github.com/tc39/proposal-regex-escaping) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-regexp-escape: error */
RegExp.escape(s)
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-regexp-escape": [
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

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-regexp-escape.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-regexp-escape.js)

[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
