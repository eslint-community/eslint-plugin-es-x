# disallow arrow function expressions (es/no-arrow-functions)

- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

This rule reports ES2015 arrow functions as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-arrow-functions: error */
let a = () =&gt; 100
let b = () =&gt; { doSomething() }
" />

👌 Examples of **correct** code for this rule:

<eslint-playground type="good" code="/*eslint es/no-arrow-functions: error */
let a = function() { return 100 }
let b = function() { doSomething() }
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.2/lib/rules/no-arrow-functions.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v1.3.2/tests/lib/rules/no-arrow-functions.js)
