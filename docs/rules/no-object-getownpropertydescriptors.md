# disallow the `Object.getOwnPropertyDescriptors` method (es/no-object-getownpropertydescriptors)

This rule reports ES2017 `Object.getOwnPropertyDescriptors` method as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
const descriptors = Object.getOwnPropertyDescriptors(obj)
```

## 📚 References

- [Rule source](../../lib/rules/no-object-getownpropertydescriptors.js)
- [Test source](../../tests/lib/rules/no-object-getownpropertydescriptors.js)
