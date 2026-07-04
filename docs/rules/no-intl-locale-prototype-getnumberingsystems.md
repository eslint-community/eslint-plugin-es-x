---
title: "es-x/no-intl-locale-prototype-getnumberingsystems"
description: "disallow the `Intl.Locale.prototype.getNumberingSystems` method"
since: "v9.2.0"
---

# es-x/no-intl-locale-prototype-getnumberingsystems
> disallow the `Intl.Locale.prototype.getNumberingSystems` method

- ✅ The following configurations enable this rule: [no-intl-locale-info], [no-new-in-es2026-intl-api], [restrict-to-es-intl-api-1st-edition], [restrict-to-es2015-intl-api], [restrict-to-es2016-intl-api], [restrict-to-es2017-intl-api], [restrict-to-es2018-intl-api], [restrict-to-es2019-intl-api], [restrict-to-es2020-intl-api], [restrict-to-es2021-intl-api], [restrict-to-es2022-intl-api], [restrict-to-es2023-intl-api], [restrict-to-es2024-intl-api], and [restrict-to-es2025-intl-api]

This rule reports ES2026 Intl API [`Intl.Locale.prototype.getNumberingSystems` method](https://github.com/tc39/proposal-intl-locale-info) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-intl-locale-prototype-getnumberingsystems: error */
const foo = new Intl.Locale();
foo.getNumberingSystems();
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-intl-locale-prototype-getnumberingsystems": [
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

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-intl-locale-prototype-getnumberingsystems.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-intl-locale-prototype-getnumberingsystems.js)

[no-intl-locale-info]: ../configs/index.md#no-intl-locale-info
[no-new-in-es2026-intl-api]: ../configs/index.md#no-new-in-es2026-intl-api
[restrict-to-es-intl-api-1st-edition]: ../configs/index.md#restrict-to-es-intl-api-1st-edition
[restrict-to-es2015-intl-api]: ../configs/index.md#restrict-to-es2015-intl-api
[restrict-to-es2016-intl-api]: ../configs/index.md#restrict-to-es2016-intl-api
[restrict-to-es2017-intl-api]: ../configs/index.md#restrict-to-es2017-intl-api
[restrict-to-es2018-intl-api]: ../configs/index.md#restrict-to-es2018-intl-api
[restrict-to-es2019-intl-api]: ../configs/index.md#restrict-to-es2019-intl-api
[restrict-to-es2020-intl-api]: ../configs/index.md#restrict-to-es2020-intl-api
[restrict-to-es2021-intl-api]: ../configs/index.md#restrict-to-es2021-intl-api
[restrict-to-es2022-intl-api]: ../configs/index.md#restrict-to-es2022-intl-api
[restrict-to-es2023-intl-api]: ../configs/index.md#restrict-to-es2023-intl-api
[restrict-to-es2024-intl-api]: ../configs/index.md#restrict-to-es2024-intl-api
[restrict-to-es2025-intl-api]: ../configs/index.md#restrict-to-es2025-intl-api
