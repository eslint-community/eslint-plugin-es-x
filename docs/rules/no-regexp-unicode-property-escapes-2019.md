# es-x/no-regexp-unicode-property-escapes-2019
> disallow the new values of RegExp Unicode property escape sequences in ES2019

- ✅ The following configurations enable this rule: `plugin:es-x/no-new-in-es2019`, `plugin:es-x/restrict-to-es3`, `plugin:es-x/restrict-to-es5`, `plugin:es-x/restrict-to-es2015`, `plugin:es-x/restrict-to-es2016`, `plugin:es-x/restrict-to-es2017`, and `plugin:es-x/restrict-to-es2018`

This rule reports the new values of ES2018 [RegExp Unicode property escape sequences](https://github.com/tc39/proposal-regexp-unicode-property-escapes#readme) which were added in ES2019.

For example, the following patterns are valid in ES2019, but syntax error in ES2018 environments:

- `\p{Extended_Pictographic}`
- `\p{Script=Dogr}`
- `\p{Script=Dogra}`
- `\p{Script=Gong}`
- `\p{Script=Gunjala_Gondi}`
- `\p{Script=Hanifi_Rohingya}`
- `\p{Script=Maka}`
- `\p{Script=Makasar}`
- `\p{Script=Medefaidrin}`
- `\p{Script=Medf}`
- `\p{Script=Old_Sogdian}`
- `\p{Script=Rohg}`
- `\p{Script=Sogd}`
- `\p{Script=Sogdian}`
- `\p{Script=Sogo}`

## Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-regexp-unicode-property-escapes-2019: error */
const r1 = /\p{Extended_Pictographic}/u
const r2 = /\p{Script=Dogr}/u
" />

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/v5.0.0/lib/rules/no-regexp-unicode-property-escapes-2019.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/v5.0.0/tests/lib/rules/no-regexp-unicode-property-escapes-2019.js)
