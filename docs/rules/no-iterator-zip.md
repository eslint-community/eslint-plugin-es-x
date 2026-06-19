---
title: "es-x/no-iterator-zip"
description: "disallow the `Iterator.zip` method"
---

# es-x/no-iterator-zip
> disallow the `Iterator.zip` method

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-joint-iteration] and [no-new-in-esnext]

This rule reports ES2027 [`Iterator.zip` method](https://github.com/tc39/proposal-joint-iteration) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-iterator-zip: error */
Iterator.zip([
    [1, 2],
    [3, 4],
]);
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-iterator-zip": [
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

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-iterator-zip.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-iterator-zip.js)

[no-joint-iteration]: ../configs/index.md#no-joint-iteration
[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
