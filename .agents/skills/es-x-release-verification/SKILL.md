---
name: es-x-release-verification
description: Verify eslint-plugin-es-x changes before handoff or release preparation. Use after rule, config, docs, generated file, Changesets, dependency, packaging, or support-range changes to run the relevant project checks, inspect consistency, and report caveats.
---

# ES-X Release Verification

## Checks

Run the checks that match the touched surface:

1. `git diff --check`
2. `npm test` for code, rule, config, test, generated file, dependency, or broad release-prep changes.
3. `npm run build` for `lib`, packaging, type declaration, or public API changes.
4. `npm run docs:build` when docs changed.

Run `npm run update` before verification if generated files may be stale.

## Review

Inspect the final diff for:

- Generated files are consistent with their source inputs.
- New or changed configs are listed in `lib/index.ts` when they are public.
- Legacy and flat config surfaces stay in sync.
- Rule docs and config docs link to existing config names.
- A `.changeset/*.md` entry exists when the change should appear in release notes.
- No unrelated generated artifacts such as `dist` or coverage output are accidentally included.

## Known Caveat

`npm run tsc` may fail because of third-party type definitions included by repo-level files even when `npm run build` passes. If this happens, report the exact dependency path and error separately from the verification result. Prefer `npm run build` as the publish-output type check because it uses `tsconfig.build.json` with `include: ["lib"]`.
