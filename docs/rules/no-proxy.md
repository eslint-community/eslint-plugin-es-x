# disallow the `Proxy` class (es/no-proxy)

This rule reports ES2015 `Proxy` class as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
let p = new Proxy(obj, hooks)
```
