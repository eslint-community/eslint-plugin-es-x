---
name: es-x-node-support-update
description: Update eslint-plugin-es-x Node.js support in its own dedicated PR. Use during major release preparation or support policy changes to check the current Node.js release schedule, keep the intended non-EOL Node.js lines with explicit major-line ranges, and update package engines, public documentation requirements, Node.js CI matrix entries, lockfile root metadata, release notes, and verification without changing the ESLint peer dependency.
---

# ES-X Node.js Support Update

## Workflow

Use this when dropping old Node.js support. Keep this work separate from ESLint support drops and annual ECMAScript snapshot config updates unless the user explicitly asks for a combined PR.

1. Inspect current Node.js support declarations:
   - `package.json` `engines.node`
   - `docs/index.md` Requirements Node.js line
   - `.github/workflows/ci.yml` Node.js matrix entries
   - top-level `package-lock.json` `engines.node`
2. Check current Node.js EOL status and releases before choosing the new support range:
   - Prefer the official schedule data at `https://raw.githubusercontent.com/nodejs/Release/main/schedule.json`.
   - Use the current date to exclude Node.js majors whose `end` date has passed.
   - Use official release data, such as `https://nodejs.org/dist/index.json`, to find the latest release for each retained non-EOL major.
   - Include Current and LTS Node.js majors when they are not EOL; do not restrict the choice to LTS unless the user explicitly asks.
3. Choose the non-EOL Node.js major lines that should remain supported after the drop, then build `package.json` `engines.node` from those lines:
   - For each retained line except the newest retained major, use a caret range from the first patch release of that line's latest required major/minor line, such as `^22.18.0`.
   - For the newest retained major, use an open lower-bound range from the first patch release of that line's latest required major/minor line, such as `>=24.7.0`.
   - Join multiple ranges with ` || `. For example, if Node.js 22 and 24 remain supported, use a range shaped like `^22.18.0 || >=24.7.0`, not `>=22.18.0`.
   - Do not add any other upper bound unless the project already has one or the user explicitly asks for one.
4. Update CI:
   - Remove jobs for Node.js majors and minor lines outside the new supported range, even if those older majors are not EOL.
   - Keep one minimum-supported Node.js job for each retained major line, such as `22.18.0` and `24.7.0` when the new range is `^22.18.0 || >=24.7.0`.
   - Keep platform coverage on a normal supported Node.js version.
   - Do not change ESLint matrix versions except where a Node.js job must be moved to a supported Node.js version.
5. Update user-facing support documentation:
   - Keep `docs/index.md` Requirements in sync with `package.json` `engines.node`.
   - Preserve the existing prose format: ``- Node.js `X.Y.Z`, `A.B.C` or newer.``.
   - For multiple supported Node.js ranges, list the lower-bound version from each range rather than pasting the raw semver expression.
6. Refresh lockfile root metadata with `npm install --package-lock-only` if `package-lock.json` does not update automatically.
7. Add release notes through `.agents/es-x-changeset/SKILL.md`.
8. Verify through `.agents/es-x-release-verification/SKILL.md`.

## Current Major-Prep Pattern

For any major-prep Node.js support PR:

- Check the official Node.js release schedule and release index.
- Build the engine range from the retained non-EOL Node.js lines. Use caret ranges for retained older majors and an open lower-bound range for the newest retained major, such as `^22.18.0 || >=24.7.0`.
- Keep `docs/index.md` Requirements synchronized with the same minimum versions while preserving its prose format.
- Remove CI coverage for Node.js versions outside that range.
- Keep the ESLint support range unchanged in this PR.
