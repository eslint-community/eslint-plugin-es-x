# disallow computed properties (es/no-computed-properties)

This rule reports ES2015 computed properties as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const obj = {
    [a]: 1,
    [b]() {},
    get [c]() {}
    set [c](value) {}
}
class A {
    [a]() {}
}
```
