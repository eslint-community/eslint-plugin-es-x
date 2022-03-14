# es-x/no-regexp-prototype-compile
> disallow the `RegExp.prototype.compile` method

This rule reports Annex B feature `RegExp.prototype.compile` method as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-regexp-prototype-compile: [error, { aggressive: true }] */
foo.compile()
" />

## 🔧 Options

This rule has an option.

```yml
rules:
  es-x/no-regexp-prototype-compile: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings['es-x'].aggressive` setting.

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/lib/rules/no-regexp-prototype-compile.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/tests/lib/rules/no-regexp-prototype-compile.js)
