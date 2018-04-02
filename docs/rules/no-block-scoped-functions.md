# disallow block-scoped function declarations (es/no-block-scoped-functions)

This rule reports ES2015 block-scoped function declarations as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
if (a) {
    function f() {}
} else {
    function g() {}
}
```
