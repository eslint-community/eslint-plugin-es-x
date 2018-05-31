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

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/lib/rules/no-accessor-properties.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.2.0/tests/lib/rules/no-accessor-properties.js)
