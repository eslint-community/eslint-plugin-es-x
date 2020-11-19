# es/no-trailing-function-commas
> disallow trailing commas in parameter/argument lists

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-es2017`, `plugin:es/restrict-to-es3`, `plugin:es/restrict-to-es5`, `plugin:es/restrict-to-es2015`, and `plugin:es/restrict-to-es2016`
- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

This rule reports ES2017 [trailing commas in parameter/argument lists](https://github.com/tc39/proposal-trailing-function-commas#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-trailing-function-commas: error */
async function f1(a,) {}
let f2 = async function(a,) {}
let f3 = async (a,) =&gt; {}
let obj = { async f4(a,) {} }
class A { async f5(a,) {} }

foo(a,)
new F(a,)
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-trailing-function-commas.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-trailing-function-commas.js)
