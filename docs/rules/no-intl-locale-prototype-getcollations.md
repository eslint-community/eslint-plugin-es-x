---
title: "es-x/no-intl-locale-prototype-getcollations"
description: "disallow the `Intl.Locale.prototype.getCollations` method"
since: "v9.2.0"
---

# es-x/no-intl-locale-prototype-getcollations
> disallow the `Intl.Locale.prototype.getCollations` method

- ✅ The following configurations enable this rule: [no-intl-locale-info] and [no-new-in-esnext-intl-api]

This rule reports ES2026 Intl API [`Intl.Locale.prototype.getCollations` method](https://github.com/tc39/proposal-intl-locale-info) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-intl-locale-prototype-getcollations: error */
const foo = new Intl.Locale();
foo.getCollations();
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-intl-locale-prototype-getcollations": [
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

## 🚀 Version

This rule was introduced in v9.2.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-intl-locale-prototype-getcollations.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-intl-locale-prototype-getcollations.js)

[no-intl-locale-info]: ../configs/index.md#no-intl-locale-info
[no-new-in-esnext-intl-api]: ../configs/index.md#no-new-in-esnext-intl-api
