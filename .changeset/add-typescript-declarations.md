---
"eslint-plugin-es-x": minor
---

feat: add TypeScript type declarations

Converts `lib/index.js` to `lib/index.ts` so that `tsc` automatically
generates `dist/index.d.ts` during `npm run build`. The public API
surface is typed as:

- `meta: { name: string; version: string }`
- `configs`: each of the 128 config names exposed as a literal key —
  flat configs typed as `Linter.Config`, legacy configs as
  `Linter.LegacyConfig`
- `rules: Record<string, Rule.RuleModule>`

IDE autocomplete works on `plugin.configs['flat/...']` and invalid
config keys are type errors. The declaration stays in sync
automatically — no separate `.d.ts` to maintain.

Closes #280
