---
title: "es-x/no-hashbang"
description: "disallow Hashbang comments"
since: "v5.3.0"
---

# es-x/no-hashbang
> disallow Hashbang comments

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-esnext`

This rule reports ES2023 [Hashbang comment](https://github.com/tc39/proposal-hashbang) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
#!/usr/bin/env node
/*eslint es-x/no-hashbang: error */
```

</eslint-playground>

## 🚀 Version

This rule was introduced in v5.3.0.

## 📚 References

- [Rule source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/lib/rules/no-hashbang.js)
- [Test source](https://github.com/eslint-community/eslint-plugin-es-x/blob/master/tests/lib/rules/no-hashbang.js)
