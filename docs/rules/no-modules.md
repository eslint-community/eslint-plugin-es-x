# disallow modules (es/no-modules)

This rule reports ES2015 modules as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
import x1 from "x1"
import {x2} from "x2"
import * as x3 from "x3"
export default { a: 1 }
export default function() {}
export { x4 } from "x4"
export { x5 }
```

## 📚 References

- [Rule source](../../lib/rules/no-modules.js)
- [Test source](../../tests/lib/rules/no-modules.js)
