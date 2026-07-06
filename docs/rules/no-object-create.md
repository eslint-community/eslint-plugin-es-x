---
title: "es-x/no-object-create"
description: "disallow the `Object.create` method"
since: "v5.0.0"
---

# es-x/no-object-create
> disallow the `Object.create` method

- ✅ The following configurations enable this rule: [no-new-in-es5] and [restrict-to-es3]

This rule reports ES5 `Object.create` method as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-object-create: error */
Object.create({})
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-object-create": [
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

This rule was introduced in v5.0.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-object-create.ts)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-object-create.ts)

[no-new-in-es5]: ../configs/index.md#no-new-in-es5
[restrict-to-es3]: ../configs/index.md#restrict-to-es3
