# es-x/no-string-prototype-substr
> disallow the `String.prototype.substr` method

This rule reports Annex B feature `String.prototype.substr` method as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es-x/no-string-prototype-substr: [error, { aggressive: true }] */
foo.substr()
" />

## 🔧 Options

This rule has an option.

```yml
rules:
  es-x/no-string-prototype-substr: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings['es-x'].aggressive` setting.

## 📚 References

- [Rule source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/lib/rules/no-string-prototype-substr.js)
- [Test source](https://github.com/ota-meshi/eslint-plugin-es-x/blob/master/tests/lib/rules/no-string-prototype-substr.js)
