---
name: es-x-major-version-prep
description: Prepare eslint-plugin-es-x for a major version release from a broad instruction such as "prepare the major version upgrade" or "prepare the next major release". Use to split the release-prep work into PR-sized tasks: inspect release policy and repo state, schedule old Node.js support drops and old ESLint support drops as separate PRs, decide whether the yearly ECMAScript snapshot config update is needed, regenerate generated files for one coherent task, add a major Changesets entry through the generic Changesets skill, run verification, and summarize remaining follow-up PRs.
---

# ES-X Major Version Prep

## Checklist

Use this as the entry-point skill when the user gives a broad major-version-prep request.

1. Inspect the starting state:
   - `git status --short`
   - current branch
   - `package.json`
   - `.changeset/config.json`
   - README semantic versioning policy
2. Identify why this is a major release:
   - yearly ECMAScript/ECMA-402 snapshot config update
   - supported Node.js or ESLint range change
   - breaking config behavior change
   - packaging/API break
3. Split the work into separate PR-sized tasks. Do not combine Node.js support drops, ESLint support drops, and annual snapshot config updates unless the user explicitly asks for a combined PR.
4. For the Node.js support-drop PR, use `.agents/es-x-node-support-update/SKILL.md`.
5. For the ESLint support-drop PR, use `.agents/es-x-eslint-support-update/SKILL.md`.
6. For the annual snapshot config PR, use `.agents/es-x-snapshot-config-update/SKILL.md`.
7. For each PR-sized task, add or update that task's own major Changesets entry using `.agents/es-x-changeset/SKILL.md`.
8. For each PR-sized task, verify that task's own result using `.agents/es-x-release-verification/SKILL.md`.
9. Final response should state:
   - what changed
   - which major-prep task this PR covers
   - which related major-prep tasks should be separate follow-up PRs
   - which checks passed
   - any checks that could not run or failed for an unrelated dependency/tooling reason

## Guardrails

Do not run `changeset version`, `npm version`, publish commands, tag commands, or pushes unless the user explicitly asks for the actual release/versioning step.

Do not directly edit generated config/docs output when the generator can produce it. Prefer changing the source input and running `npm run update`.

Do not silently ignore unrelated dirty worktree files. Work around unrelated changes; mention blockers only if they prevent the major-prep task.

## Common ES Snapshot Path

For the annual ECMAScript snapshot major release, the usual concrete work is:

1. Keep it separate from the Node.js support-drop PR and the ESLint support-drop PR.
2. Update `LATEST_ES_YEAR` in `scripts/rules.ts`.
3. Run `npm run update`.
4. Confirm new `no-new-in-esYYYY` and `restrict-to-es{YYYY-1}` configs exist for both legacy and flat config surfaces.
5. Confirm `lib/index.ts` exposes the new config keys.
6. Confirm docs moved ESYYYY rules from `no-new-in-esnext*` to stable config links.
7. Add a `.changeset/*.md` entry with a `major` bump.
8. Run verification checks for this snapshot-config PR.
