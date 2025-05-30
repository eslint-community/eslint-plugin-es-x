# es-x/no-nonstandard-disposablestack-prototype-properties
> 

This rule reports non-standard properties on DisposableStack instance as errors.

## 💡 Examples

⛔ Examples of **incorrect** code for this rule:

<eslint-playground type="bad">

```js
/*eslint es-x/no-nonstandard-disposablestack-prototype-properties: error */
const foo = new DisposableStack();
foo.unknown();
```

</eslint-playground>

## 🔧 Options

This rule has an option.

```jsonc
{
  "rules": {
    "es-x/no-nonstandard-disposablestack-prototype-properties": [
      "error",
      {
        "allow": [],
        "allowTestedProperty": false
      }
    ]
  }
}
```

### allow: string[]

An array of non-standard property names to allow.

### allowTestedProperty: boolean

Configure the allowTestedProperty mode for only this rule.
This is prior to the `settings['es-x'].allowTestedProperty` setting.
