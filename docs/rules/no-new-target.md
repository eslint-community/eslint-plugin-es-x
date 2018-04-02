# disallow `new.target` meta property (es/no-new-target)

This rule reports ES2015 `new.target` meta property as errors.

## Examples

⛔ Examples of **incorrect** code for this rule:

```js
class A {
    constructor() {
        doSomething(new.target)
    }
}
```
