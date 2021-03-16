# es/no-function-prototype-bind
> disallow the `Function.prototype.bind` method

- ✅ The following configurations enable this rule: `plugin:es/no-new-in-es5` and `plugin:es/restrict-to-es3`

This rule reports ES5 `Function.prototype.bind` method as errors.

This rule is silent by default because it's hard to know types. You need to configure [the aggressive mode](../#the-aggressive-mode) or TypeScript in order to enable this rule.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad" code="/*eslint es/no-function-prototype-bind: [error, { aggressive: true }] */
foo.bind(this);

var foo = (function() {
    return this.bar
}).bind(this)
" />

## 🔧 Options

This rule has an option.

```yml
rules:
  es/no-function-prototype-bind: [error, { aggressive: false }]
```

### aggressive: boolean

Configure the aggressive mode for only this rule.
This is prior to the `settings.es.aggressive` setting.

## 📚 References

- [Rule source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/lib/rules/no-function-prototype-bind.js)
- [Test source](https://github.com/mysticatea/eslint-plugin-es/blob/v4.1.0/tests/lib/rules/no-function-prototype-bind.js)
