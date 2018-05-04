# disallow destructuring (es/no-destructuring)

This rule reports ES2015 destructuring assignments/bindings as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
let [a, b] = array
let {c, d} = obj
function f({a, b}, [c, d]) {}

;[a, b] = array
;({c, d} = obj)
```

## 📚 References

- [Rule source](../../lib/rules/no-destructuring.js)
- [Test source](../../tests/lib/rules/no-destructuring.js)
