# disallow `super` property accesses in object literals (es/no-object-super-properties)

This rule reports ES2015 `super` property accesses in object literals as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
let a = {
    __proto__: obj,
    f1() { super.a },
    f2() { super.f() }
}
```
