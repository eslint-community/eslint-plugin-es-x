---
title: "es-x/no-intl-durationformat"
description: "disallow the `Intl.DurationFormat` object"
---

# es-x/no-intl-durationformat
> disallow the `Intl.DurationFormat` object

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
- ✅ The following configurations enable this rule: [no-new-in-esnext-intl-api]

This rule reports ES2026 Intl API `Intl.DurationFormat` object as errors.

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

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-intl-durationformat.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-intl-durationformat.js)

[no-new-in-esnext-intl-api]: ../configs/index.md#no-new-in-esnext-intl-api
