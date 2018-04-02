# disallow template literals with invalid escape sequences (es/no-malformed-template-literals)

This rule reports ES2018 [template literals with invalid escape sequences](https://github.com/tc39/proposal-template-literal-revision#readme) as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
tag`\unicode`
```
