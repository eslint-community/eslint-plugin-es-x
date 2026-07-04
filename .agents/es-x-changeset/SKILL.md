---
name: es-x-changeset
description: Add or update Changesets entries for eslint-plugin-es-x. Use when a change needs release notes or a version bump, including patch fixes, minor feature/rule additions, major config changes, support-range changes, and packaging/API changes.
---

# ES-X Changeset

## Workflow

Use Changesets for release notes and version bumps. Do not directly edit `package.json` version for normal release preparation.

1. Check `.changeset/config.json` for the package name and base branch.
2. Choose the bump type from the actual change:
   - `patch` for bug fixes, documentation-only release notes, or small compatibility fixes.
   - `minor` for new rules, new configs, or backward-compatible features.
   - `major` for breaking config behavior, support-range drops, or packaging/API breaks.
3. Add a concise `.changeset/*.md` file:

```md
---
"eslint-plugin-es-x": <patch|minor|major>
---

Describe the user-visible change.
```

4. Keep the body release-note suitable and concrete.
5. Mention multiple independent changes only when they belong to the same user-visible release item; otherwise prefer separate changesets.
6. Leave `CHANGELOG.md`, `package.json`, and `package-lock.json` untouched unless the user explicitly asks to run the versioning step; the release workflow runs `changeset version`.

## Common Wording

For a new rule:

```md
Add `es-x/no-example-feature` rule
```

For a support-range drop:

```md
Drop support for old ESLint versions. The peer dependency now supports `>=X.Y.Z`.
```
