---
title: "es-x/no-iterator-concat"
description: "disallow the `Iterator.concat` method"
since: "v9.2.0"
---

# es-x/no-iterator-concat
> disallow the `Iterator.concat` method

- ✅ The following configurations enable this rule: [no-new-in-esnext]

This rule reports ES2026 [`Iterator.concat` method](https://github.com/tc39/proposal-iterator-sequencing) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-iterator-concat: error */
Iterator.concat();
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-iterator-concat": [
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

This rule was introduced in v9.2.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-iterator-concat.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-iterator-concat.js)

[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
