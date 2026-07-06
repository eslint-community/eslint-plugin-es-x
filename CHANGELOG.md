# eslint-plugin-es-x

## 10.0.0

### Major Changes

- Drop support for old ESLint versions. The peer dependency now supports `>=10.6.0`. ([#358](https://github.com/eslint-community/eslint-plugin-es-x/pull/358))

- Drop support for old Node.js versions. The package now supports Node.js `^22.23.0 || ^24.18.0 || >=26.4.0`. ([#357](https://github.com/eslint-community/eslint-plugin-es-x/pull/357))

- Drop legacy config support. Configs without the `flat/` prefix now expose flat config objects, and the `flat/`-prefixed config IDs remain available as flat config aliases. ([#360](https://github.com/eslint-community/eslint-plugin-es-x/pull/360))

- Update configs for the ES2026 ECMAScript and Intl API snapshots. ([#355](https://github.com/eslint-community/eslint-plugin-es-x/pull/355))

- Build publish output with tsdown, mark the package as ESM with `"type": "module"`, and provide both ESM and CommonJS package entry points. ([#361](https://github.com/eslint-community/eslint-plugin-es-x/pull/361))

## 9.7.0

### Minor Changes

- Add `es-x/no-atomics-pause` rule ([#251](https://github.com/eslint-community/eslint-plugin-es-x/pull/251))

- Add `es-x/no-iterator-zip` rule ([#352](https://github.com/eslint-community/eslint-plugin-es-x/pull/352))

- Add `es-x/no-iterator-zipkeyed` rule ([#352](https://github.com/eslint-community/eslint-plugin-es-x/pull/352))

- Add `no-joint-iteration` config ([#352](https://github.com/eslint-community/eslint-plugin-es-x/pull/352))

- Update ES2026 references to ES2027 in some documents and rules ([#347](https://github.com/eslint-community/eslint-plugin-es-x/pull/347))

## 9.6.0

### Minor Changes

- feat: add TypeScript type declarations ([#338](https://github.com/eslint-community/eslint-plugin-es-x/pull/338))

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

- chore: the published js files have been moved from `lib` to `dist`. ([#327](https://github.com/eslint-community/eslint-plugin-es-x/pull/327))

- Add `es-x/no-date-prototype-totemporalinstant` rule ([#332](https://github.com/eslint-community/eslint-plugin-es-x/pull/332))

- Add `es-x/no-nonstandard-temporal-duration-properties` rule ([#332](https://github.com/eslint-community/eslint-plugin-es-x/pull/332))

- Add `es-x/no-nonstandard-temporal-duration-prototype-properties` rule ([#332](https://github.com/eslint-community/eslint-plugin-es-x/pull/332))

- Add `es-x/no-nonstandard-temporal-instant-properties` rule ([#332](https://github.com/eslint-community/eslint-plugin-es-x/pull/332))

- Add `es-x/no-nonstandard-temporal-instant-prototype-properties` rule ([#332](https://github.com/eslint-community/eslint-plugin-es-x/pull/332))

- Add `es-x/no-nonstandard-temporal-now-properties` rule ([#332](https://github.com/eslint-community/eslint-plugin-es-x/pull/332))

- Add `es-x/no-nonstandard-temporal-plaindate-properties` rule ([#332](https://github.com/eslint-community/eslint-plugin-es-x/pull/332))

- Add `es-x/no-nonstandard-temporal-plaindate-prototype-properties` rule ([#332](https://github.com/eslint-community/eslint-plugin-es-x/pull/332))

- Add `es-x/no-nonstandard-temporal-plaindatetime-properties` rule ([#332](https://github.com/eslint-community/eslint-plugin-es-x/pull/332))

- Add `es-x/no-nonstandard-temporal-plaindatetime-prototype-properties` rule ([#332](https://github.com/eslint-community/eslint-plugin-es-x/pull/332))

- Add `es-x/no-nonstandard-temporal-plainmonthday-properties` rule ([#332](https://github.com/eslint-community/eslint-plugin-es-x/pull/332))

- Add `es-x/no-nonstandard-temporal-plainmonthday-prototype-properties` rule ([#332](https://github.com/eslint-community/eslint-plugin-es-x/pull/332))

- Add `es-x/no-nonstandard-temporal-plaintime-properties` rule ([#332](https://github.com/eslint-community/eslint-plugin-es-x/pull/332))

- Add `es-x/no-nonstandard-temporal-plaintime-prototype-properties` rule ([#332](https://github.com/eslint-community/eslint-plugin-es-x/pull/332))

- Add `es-x/no-nonstandard-temporal-plainyearmonth-properties` rule ([#332](https://github.com/eslint-community/eslint-plugin-es-x/pull/332))

- Add `es-x/no-nonstandard-temporal-plainyearmonth-prototype-properties` rule ([#332](https://github.com/eslint-community/eslint-plugin-es-x/pull/332))

- Add `es-x/no-nonstandard-temporal-properties` rule ([#332](https://github.com/eslint-community/eslint-plugin-es-x/pull/332))

- Add `es-x/no-nonstandard-temporal-zoneddatetime-properties` rule ([#332](https://github.com/eslint-community/eslint-plugin-es-x/pull/332))

- Add `es-x/no-nonstandard-temporal-zoneddatetime-prototype-properties` rule ([#332](https://github.com/eslint-community/eslint-plugin-es-x/pull/332))

- Add `no-temporal` config ([#332](https://github.com/eslint-community/eslint-plugin-es-x/pull/332))

- Add `es-x/no-temporal` rule ([#332](https://github.com/eslint-community/eslint-plugin-es-x/pull/332))

## 9.5.0

### Minor Changes

- Add `name` field to config to improve debugging experience ([#322](https://github.com/eslint-community/eslint-plugin-es-x/pull/322))

## 9.4.1

### Patch Changes

- Update URLs in rule definitions to use HTTPS ([#320](https://github.com/eslint-community/eslint-plugin-es-x/pull/320))

## 9.4.0

### Minor Changes

- Add `es-x/no-map-prototype-getorinsert` rule ([#311](https://github.com/eslint-community/eslint-plugin-es-x/pull/311))

- Add `es-x/no-map-prototype-getorinsertcomputed` rule ([#311](https://github.com/eslint-community/eslint-plugin-es-x/pull/311))

- Add `es-x/no-weakmap-prototype-getorinsert` rule ([#311](https://github.com/eslint-community/eslint-plugin-es-x/pull/311))

- Add `es-x/no-weakmap-prototype-getorinsertcomputed` rule ([#311](https://github.com/eslint-community/eslint-plugin-es-x/pull/311))

- Add `no-upsert` config ([#311](https://github.com/eslint-community/eslint-plugin-es-x/pull/311))

## 9.3.0

### Minor Changes

- Add `es-x/no-json-israwjson` rule ([#277](https://github.com/eslint-community/eslint-plugin-es-x/pull/277))

- Add `es-x/no-json-parse-reviver-context-parameter` rule ([#277](https://github.com/eslint-community/eslint-plugin-es-x/pull/277))

- Add `no-json-parse-with-source` config ([#277](https://github.com/eslint-community/eslint-plugin-es-x/pull/277))

- Add `es-x/no-json-rawjson` rule ([#277](https://github.com/eslint-community/eslint-plugin-es-x/pull/277))

## 9.2.0

### Minor Changes

- Add `es-x/no-intl-locale-prototype-firstdayofweek` rule ([#278](https://github.com/eslint-community/eslint-plugin-es-x/pull/278))

- Add `es-x/no-intl-locale-prototype-getcalendars` rule ([#278](https://github.com/eslint-community/eslint-plugin-es-x/pull/278))

- Add `es-x/no-intl-locale-prototype-getcollations` rule ([#278](https://github.com/eslint-community/eslint-plugin-es-x/pull/278))

- Add `es-x/no-intl-locale-prototype-gethourcycles` rule ([#278](https://github.com/eslint-community/eslint-plugin-es-x/pull/278))

- Add `es-x/no-intl-locale-prototype-getnumberingsystems` rule ([#278](https://github.com/eslint-community/eslint-plugin-es-x/pull/278))

- Add `es-x/no-intl-locale-prototype-gettextinfo` rule ([#278](https://github.com/eslint-community/eslint-plugin-es-x/pull/278))

- Add `es-x/no-intl-locale-prototype-gettimezones` rule ([#278](https://github.com/eslint-community/eslint-plugin-es-x/pull/278))

- Add `es-x/no-intl-locale-prototype-getweekinfo` rule ([#278](https://github.com/eslint-community/eslint-plugin-es-x/pull/278))

- Add `es-x/no-iterator-concat` rule ([#300](https://github.com/eslint-community/eslint-plugin-es-x/pull/300))

## 9.1.2

### Patch Changes

- ci: trusted publishing ([#297](https://github.com/eslint-community/eslint-plugin-es-x/pull/297))

## 9.1.1

### Patch Changes

- fix: generate provenance statements on release ([#293](https://github.com/eslint-community/eslint-plugin-es-x/pull/293))

## 9.1.0

### Minor Changes

- Add `no-arraybuffer-base64` config ([#249](https://github.com/eslint-community/eslint-plugin-es-x/pull/249))

- Add `es-x/no-uint8array-frombase64` rule ([#249](https://github.com/eslint-community/eslint-plugin-es-x/pull/249))

- Add `es-x/no-uint8array-fromhex` rule ([#249](https://github.com/eslint-community/eslint-plugin-es-x/pull/249))

- Add `es-x/no-uint8array-prototype-setfrombase64` rule ([#249](https://github.com/eslint-community/eslint-plugin-es-x/pull/249))

- Add `es-x/no-uint8array-prototype-setfromhex` rule ([#249](https://github.com/eslint-community/eslint-plugin-es-x/pull/249))

- Add `es-x/no-uint8array-prototype-tobase64` rule ([#249](https://github.com/eslint-community/eslint-plugin-es-x/pull/249))

- Add `es-x/no-uint8array-prototype-tohex` rule ([#249](https://github.com/eslint-community/eslint-plugin-es-x/pull/249))

- Add `es-x/no-math-sumprecise` rule ([#266](https://github.com/eslint-community/eslint-plugin-es-x/pull/266))

## 9.0.0

### Major Changes

- Drop support for old ESLint (now supports `>=9.29.0`). ([#272](https://github.com/eslint-community/eslint-plugin-es-x/pull/272))

- Drop support for old Node.js (now supports `^20.19.0 || >=22.12.0`). ([#271](https://github.com/eslint-community/eslint-plugin-es-x/pull/271))

- Update configs: `no-new-in-es2020`, and `restrict-to-es3` - `restrict-to-es2019`. ([#264](https://github.com/eslint-community/eslint-plugin-es-x/pull/264))

- Update `restrict-to-*` configs ([#265](https://github.com/eslint-community/eslint-plugin-es-x/pull/265))

### Minor Changes

- Add configs for es2025: (`no-new-in-es2025`, and `no-new-in-es2025-intl-api`) ([#265](https://github.com/eslint-community/eslint-plugin-es-x/pull/265))

- refactor: use eslint-type-tracer ([#267](https://github.com/eslint-community/eslint-plugin-es-x/pull/267))

- Add `no-string-matchall` config. ([#264](https://github.com/eslint-community/eslint-plugin-es-x/pull/264))

- Add `es-x/no-symbol-asyncdispose` rule ([#264](https://github.com/eslint-community/eslint-plugin-es-x/pull/264))

- Add `es-x/no-symbol-dispose` rule ([#264](https://github.com/eslint-community/eslint-plugin-es-x/pull/264))

- Add `es-x/no-symbol-matchall` rule ([#264](https://github.com/eslint-community/eslint-plugin-es-x/pull/264))

- Update `no-explicit-resource-management` config. ([#270](https://github.com/eslint-community/eslint-plugin-es-x/pull/270))
