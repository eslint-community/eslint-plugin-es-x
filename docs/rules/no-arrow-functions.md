# es/no-arrow-functions
> disallow arrow function expressions

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-es2015`, `plugin:es/restrict-to-es3`, and `plugin:es/restrict-to-es5`
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

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-arrow-functions.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-arrow-functions.js)
