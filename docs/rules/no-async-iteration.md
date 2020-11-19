# es/no-async-iteration
> disallow async iteration

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-es2018`, `plugin:es/restrict-to-es3`, `plugin:es/restrict-to-es5`, `plugin:es/restrict-to-es2015`, `plugin:es/restrict-to-es2016`, and `plugin:es/restrict-to-es2017`

This rule reports ES2018 [async iteration](https://github.com/tc39/proposal-async-iteration#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-async-iteration: error */
async function* f1() {}
let f2 = async function*() {}
let obj = { async* f4() {} }
class A { async* f5() {} }

async function wrap() {
    for await (const x of xs) {}
}
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-async-iteration.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-async-iteration.js)
