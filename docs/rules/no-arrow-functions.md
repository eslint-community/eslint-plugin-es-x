# disallow arrow function expressions (es/no-arrow-functions)

This rule reports ES2015 arrow functions as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
let a = () => 100
let b = () => { doSomething() }
```
