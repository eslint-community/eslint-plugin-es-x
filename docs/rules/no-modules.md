---
title: "es-x/no-modules"
description: "disallow modules"
since: "[eslint-plugin-es] v1.0.0"
---

# es-x/no-modules
> disallow modules

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2015`, `plugin:es-x/restrict-to-es3`, and `plugin:es-x/restrict-to-es5`

This rule reports ES2015 modules as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-modules: error */
import x1 from &quot;x1&quot;
import {x2} from &quot;x2&quot;
import * as x3 from &quot;x3&quot;
export default function() {}
export { x1 } from &quot;x4&quot;
export { x2 }
" />

## 🚀 Version

This rule was introduced in [eslint-plugin-es] v1.0.0.

[eslint-plugin-es]: https://github.com/mysticatea/eslint-plugin-es

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/lib/rules/no-modules.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/tests/lib/rules/no-modules.js)
