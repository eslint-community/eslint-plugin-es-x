---
title: "es-x/no-object-map-groupby"
description: "disallow the `{Object,Map}.groupBy()` function (array grouping)"
since: "v7.5.0"
---

# es-x/no-object-map-groupby
> disallow the `{Object,Map}.groupBy()` function (array grouping)

- 🚫 This rule was deprecated and replaced by [es-x/no-object-groupby](./no-object-groupby.md),[es-x/no-map-groupby](./no-map-groupby.md) rules.

This rule reports ES2024 `Object.groupBy()` and `Map.groupBy()` (Array grouping) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-object-map-groupby: error */
Object.groupBy(array, (num, index) => {
  return num % 2 === 0 ? 'even': 'odd';
});

Map.groupBy(array, (num, index) => {
  return num % 2 === 0 ? even: odd;
});
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v7.5.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-object-map-groupby.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-object-map-groupby.js)
