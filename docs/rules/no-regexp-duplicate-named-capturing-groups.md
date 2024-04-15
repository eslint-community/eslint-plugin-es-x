---
title: "es-x/no-regexp-duplicate-named-capturing-groups"
description: "disallow RegExp duplicate named capturing groups"
---

# es-x/no-regexp-duplicate-named-capturing-groups
> disallow RegExp duplicate named capturing groups

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>

This rule reports ES2025 [RegExp duplicate named capture groups](https://github.com/tc39/proposal-duplicate-named-capturing-groups) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-regexp-duplicate-named-capturing-groups: error */
const r1 = /(?<year>\d{4})-\d{2}|\d{2}-(?<year>\d{4})/
const r2 = /(?<x>a)|(?<x>b)/
```

</eslint-playground>

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-regexp-duplicate-named-capturing-groups.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-regexp-duplicate-named-capturing-groups.js)
