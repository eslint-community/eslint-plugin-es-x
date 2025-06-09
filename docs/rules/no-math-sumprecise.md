# es-x/no-math-sumprecise
> 

This rule reports ES2026 [`Math.sumPrecise` property](https://github.com/tc39/proposal-math-sum) as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-math-sumprecise: error */
Math.sumPrecise([1e20, 0.1, -1e20]);
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-math-sumprecise": [
      "error",
      {
        "allowTestedProperty": false
      }
    ]
  }
}
```

### allowTestedProperty: boolean

Configure the allowTestedProperty mode for only this rule.
This is prior to the `settings['es-x'].allowTestedProperty` setting.
