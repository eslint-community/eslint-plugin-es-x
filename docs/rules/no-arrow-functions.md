# disallow arrow function expressions (es/no-arrow-functions)

- 🔧 The `--fix` option on the [command line](http://eslint.org/docs/user-guide/command-line-interface#fix) can automatically fix some of the problems reported by this rule.

This rule reports ES2015 arrow functions as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
let a = () => 100
let b = () => { doSomething() }
```

👌 Examples of **correct** code for this rule:

```js
let a = function() { return 100 }
let b = function() { doSomething() }
```
