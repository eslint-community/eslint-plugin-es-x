# es/no-logical-assignment-operators
> disallow logical assignment operators

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-esnext`
- 🔧 The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

This rule reports ES2021 [logical assignment operators](https://github.com/tc39/proposal-logical-assignment) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-logical-assignment-operators: error */
x ||= y
x &&= y
x ??= y
" />

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-logical-assignment-operators.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-logical-assignment-operators.js)
