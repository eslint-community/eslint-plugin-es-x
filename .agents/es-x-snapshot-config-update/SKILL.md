---
name: es-x-snapshot-config-update
description: Update eslint-plugin-es-x for a newly finalized yearly ECMAScript/ECMA-402 snapshot in its own dedicated PR. Use when preparing a major release that moves the latest snapshot year forward, updates scripts/rules.ts LATEST_ES_YEAR, regenerates no-new-in-esYYYY and restrict-to-esYYYY configs, refreshes generated docs/index files, adds task-specific release notes, and verifies this PR-sized task.
---

# ES-X Snapshot Config Update

## Workflow

Use this in the `eslint-plugin-es-x` repository when a yearly ECMAScript snapshot has become the latest stable snapshot. Keep this work separate from Node.js support drops and ESLint support drops unless the user explicitly asks for a combined PR.

1. Confirm the repo is clean enough to work with `git status --short`.
2. Inspect `scripts/rules.ts` and find `LATEST_ES_YEAR`.
3. Change `LATEST_ES_YEAR` to the new stable snapshot year. This is the one manual source edit.
4. Run `npm run update`.
5. Review generated changes:
   - New `lib/configs/no-new-in-esYYYY.js` and `lib/configs/flat/no-new-in-esYYYY.js`.
   - New `restrict-to-es{YYYY-1}` legacy and flat configs.
   - `no-new-in-esnext*` should now contain only post-YYYY rules; it may become empty for Intl API.
   - `lib/index.ts` should expose the new config keys and types.
   - `docs/configs/index.md`, `docs/rules/index.md`, and affected rule docs should link to the stable config names.
6. Add release notes for this snapshot-config PR through `.agents/es-x-changeset/SKILL.md`.
7. Verify this snapshot-config PR through `.agents/es-x-release-verification/SKILL.md`.

## Project Notes

Do not hand-edit generated config or docs files unless the generator is wrong. The source of truth is `scripts/rules.ts` plus rule metadata in `lib/rules/*`.

The README policy says major releases update configs when new ECMAScript snapshots are available. Proposal-specific configs stop showing the experimental warning once their category is no longer experimental.

When checking the diff, look for ESYYYY rules moving from `no-new-in-esnext` to `no-new-in-esYYYY`, and for older `restrict-to-*` configs extending or merging the new stable year.
