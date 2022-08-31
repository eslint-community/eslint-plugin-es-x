---
title: "es-x/no-hashbang"
description: "disallow Hashbang comments"
---

# es-x/no-hashbang
> disallow Hashbang comments

- ❗ <badge text="This rule has not been released yet." vertical="middle" type="error"> ***This rule has not been released yet.*** </badge>
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

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/lib/rules/no-hashbang.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/tests/lib/rules/no-hashbang.js)
