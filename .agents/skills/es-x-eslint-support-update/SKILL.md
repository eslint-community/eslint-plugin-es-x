---
name: es-x-eslint-support-update
description: Update eslint-plugin-es-x ESLint peer support in its own dedicated PR. Use during major release preparation or support policy changes to check the latest stable ESLint version and drop support for older ESLint major/minor lines by raising the minimum peer dependency without changing the Node.js engine range, updating peerDependencies, public documentation requirements, ESLint CI matrix entries, lockfile root metadata, release notes, and verification.
---

# ES-X ESLint Support Update

## Workflow

Use this when dropping old ESLint support. Keep this work separate from Node.js support drops and annual ECMAScript snapshot config updates unless the user explicitly asks for a combined PR.

1. Inspect current ESLint support declarations:
   - `package.json` `peerDependencies.eslint`
   - `docs/index.md` Requirements ESLint line
   - `.github/workflows/ci.yml` ESLint matrix entries
   - top-level `package-lock.json` `peerDependencies.eslint`
2. Check the latest stable ESLint version from npm before choosing the new support range:
   - Run `npm view eslint version`.
   - Treat the returned `latest` dist-tag version as the supported ESLint line.
   - Use both the major and minor numbers from that version when setting the minimum supported version.
   - Ignore prerelease or `next` dist-tags unless the user explicitly asks to support a prerelease.
3. Update `package.json` `peerDependencies.eslint` by raising the minimum supported ESLint version to the first patch release of the latest stable major/minor line. For example, if `npm view eslint version` returns `10.3.2`, use `>=10.3.0`. Do not add an upper bound unless the project already has one or the user explicitly asks for one.
4. Update CI:
   - Remove jobs for every older ESLint major/minor line.
   - Keep one minimum-supported job for the latest stable ESLint major/minor line, such as `10.3.0` when the latest stable version is `10.3.x`.
   - Keep platform coverage on a normal supported ESLint version.
   - Do not change Node.js engine support except where an ESLint job must run on an already supported Node.js version.
5. Update user-facing support documentation:
   - Keep `docs/index.md` Requirements in sync with `package.json` `peerDependencies.eslint`.
   - Preserve the existing prose format: ``- ESLint `X.Y.Z` or newer.``.
   - Use the minimum version from `peerDependencies.eslint` rather than pasting the raw semver expression.
6. Refresh lockfile root metadata with `npm install --package-lock-only` if `package-lock.json` does not update automatically.
7. Add release notes through `.agents/es-x-changeset/SKILL.md`.
8. Verify through `.agents/es-x-release-verification/SKILL.md`.

## Current Major-Prep Pattern

For any major-prep ESLint support PR:

- Check `npm view eslint version`.
- Set the minimum supported ESLint version to the first patch release of the latest stable major/minor line, such as `>=10.3.0`.
- Keep `docs/index.md` Requirements synchronized with the same minimum version while preserving its prose format.
- Remove CI coverage for every older ESLint major/minor line.
- Keep the Node.js support range unchanged in this PR.
