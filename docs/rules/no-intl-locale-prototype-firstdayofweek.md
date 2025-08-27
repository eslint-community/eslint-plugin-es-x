---
title: "es-x/no-intl-locale-prototype-firstdayofweek"
description: "disallow the `Intl.Locale.prototype.firstDayOfWeek` property"
---

# es-x/no-intl-locale-prototype-firstdayofweek
> disallow the `Intl.Locale.prototype.firstDayOfWeek` property

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-intl-locale-info] and [no-new-in-esnext-intl-api]

This rule reports ES2026 Intl API [`Intl.Locale.prototype.firstDayOfWeek` property](https://github.com/tc39/proposal-intl-locale-info) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-intl-locale-prototype-firstdayofweek: error */
const foo = new Intl.Locale();
foo.firstDayOfWeek;
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-intl-locale-prototype-firstdayofweek": [
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

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-intl-locale-prototype-firstdayofweek.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-intl-locale-prototype-firstdayofweek.js)

[no-intl-locale-info]: ../configs/index.md#no-intl-locale-info
[no-new-in-esnext-intl-api]: ../configs/index.md#no-new-in-esnext-intl-api
