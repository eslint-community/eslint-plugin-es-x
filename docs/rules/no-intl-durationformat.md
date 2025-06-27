---
title: "es-x/no-intl-durationformat"
description: "disallow the `Intl.DurationFormat` object"
since: "v8.5.0"
---

# es-x/no-intl-durationformat
> disallow the `Intl.DurationFormat` object

- ✅ The following configurations enable this rule: [no-new-in-es2025-intl-api], [restrict-to-es-intl-api-1st-edition], [restrict-to-es2015-intl-api], [restrict-to-es2016-intl-api], [restrict-to-es2017-intl-api], [restrict-to-es2018-intl-api], [restrict-to-es2019-intl-api], [restrict-to-es2020-intl-api], [restrict-to-es2021-intl-api], [restrict-to-es2022-intl-api], [restrict-to-es2023-intl-api], and [restrict-to-es2024-intl-api]

This rule reports ES2025 Intl API `Intl.DurationFormat` object as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-intl-durationformat: error */
const df = new Intl.DurationFormat("fr-FR", { style: "long" });

df.format({
    hours: 1,
    minutes: 46,
    seconds: 40,
});
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-intl-durationformat": [
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

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-intl-durationformat.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-intl-durationformat.js)

[no-new-in-es2025-intl-api]: ../configs/index.md#no-new-in-es2025-intl-api
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
