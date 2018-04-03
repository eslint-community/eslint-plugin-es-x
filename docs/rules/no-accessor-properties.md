# disallow accessor properties (es/no-accessor-properties)

This rule reports ES5 accessor properties as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
var a = {
    get a() {},
    set a(value) {}
}
class A {
    get a() {}
    set a(value) {}
}
```
