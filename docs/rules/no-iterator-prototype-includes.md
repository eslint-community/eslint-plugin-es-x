---
title: "es-x/no-iterator-prototype-includes"
description: "disallow the `Iterator.prototype.includes` method"
---

# es-x/no-iterator-prototype-includes
> disallow the `Iterator.prototype.includes` method

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-new-in-esnext]

This rule reports ES2027 [`Iterator.prototype.includes`](https://github.com/tc39/proposal-iterator-includes) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-iterator-prototype-includes: error */
const result = [1, 2, 3].values().includes(2);
```

</eslint-playground>

✅ Examples of **correct** code for this rule:

<eslint-playground type="good">

```js
/*eslint es-x/no-iterator-prototype-includes: error */
const inArray = [1, 2, 3].includes(2);
const inString = "hello".includes("ell");
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-iterator-prototype-includes": [
      "error",
      {
        "aggressive": false,
        "allowTestedProperty": false
      }
    ]
  }
}
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings['es-x'].aggressive` setting.

### allowTestedProperty: boolean

Configure the allowTestedProperty mode for only this rule.
This is prior to the `settings['es-x'].allowTestedProperty` setting.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-iterator-prototype-includes.ts)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-iterator-prototype-includes.ts)

[no-new-in-esnext]: ../configs/index.md#no-new-in-esnext
