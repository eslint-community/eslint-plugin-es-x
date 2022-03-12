# es/no-string-prototype-replaceall
> disallow the `String.prototype.replaceAll` method

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-es2021`, `plugin:es/restrict-to-es3`, `plugin:es/restrict-to-es5`, `plugin:es/restrict-to-es2015`, `plugin:es/restrict-to-es2016`, `plugin:es/restrict-to-es2017`, `plugin:es/restrict-to-es2018`, `plugin:es/restrict-to-es2019`, and `plugin:es/restrict-to-es2020`

This rule reports ES2021 [`String.prototype.replaceAll` method](https://github.com/tc39/proposal-string-replaceall) as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-string-prototype-replaceall: [error, { aggressive: true }] */
foo.replaceAll(&quot;a&quot;, &quot;b&quot;)
" />

## 🔧 Options

This rule has an option.

```yml
rules:
  es/no-string-prototype-replaceall: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings.es.aggressive` setting.

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-string-prototype-replaceall.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-string-prototype-replaceall.js)
