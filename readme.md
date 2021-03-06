# bridge

<p align='center'>
  <a href='https://travis-ci.org/StreetStrider/bridge'>
    <img alt='Travis' src='https://img.shields.io/travis/StreetStrider/bridge.svg?style=flat-square'>
  </a>

  <a href='https://coveralls.io/github/StreetStrider/bridge?branch=master'>
    <img alt='Coverage' src='https://img.shields.io/coveralls/github/StreetStrider/bridge.svg?style=flat-square' />
  </a>


  <a href='https://www.npmjs.org/package/@streetstrider/bridge'>
    <img alt='npm|bridge' src='http://img.shields.io/badge/npm-@streetstrider/bridge-CB3837.svg?style=flat-square'>
  </a>

  <a href='#license'>
    <img alt='ISC licensed' src='http://img.shields.io/badge/license-ISC-brightgreen.svg?style=flat-square'>
  </a>
</p>


**bridge** is a simple Node.js config loader with some conventions.


## how it works

```js
import bridge from '@streetstrider/bridge'

var cfg = bridge(options)
```

**bridge** will find package root from process.cwd() then load configs following next principles:

**1**. Load `package.json` and mount it to `cfg._.package`.

**2**. Load `release.json` (if present) and mount it to `cfg._.release`. This file is produced by [metalbox](https://github.com/StrangeTransistor/metalbox).

**3**. bridge understands both JSON and HJSON files, with preference to HJSON. When resolving user config `foo`, bridge will look for `foo.hjson`, `foo.json` and `foo` respectively.

**4**. Load **main config** from one of `cfg/{cfg.hjson,cfg.json,cfg}` and mount it to `cfg._.main`.

**5**. Determine in which mode bridge is running.

**5A**. If `release.json` is present, bridge is running in a production mode. In that case load **instance config** (if present) from one of `cfg/{<instance>.hjson,<instance>.json,<instance>}` and mount it to `cfg._.instance`. Actual instance is determined by `release.json` `instance` field.

**5B**. If no `release.json` is present, bridge is running in dev mode. In that case load **dev config** (if present) from one of `cfg/{dev.hjson,dev.json,dev}` and mount it to `cfg._.dev`.

**5C**. Both instance and dev configs are meant to share the same structure (or schema) as main config. That allows to merge them to main config. Such kind of merging open way for flexible config management both in dev and production. Having `release.json`, instance configs and gitignored dev config we can completely get rid of crappy ENV variables and other like solutions.

**5D**. Update main config recursively ([`lodash.merge`](https://lodash.com/docs/4.17.4#merge)) with instance/dev config and mount it to `cfg._.merged`.

**6**. After all configs are all set, create one unite config for short access and conveniece. Merge `cfg._.package`, `cfg._.release` and `cfg._.merged` and mount it to `cfg._.all`.

**6A**. Having all `package`, `release`, `instance`, `dev`, `merged` and `all` configs separately allows to precise options picking. `all` and `merged` are recommended in the majority of the cases.

**6B**. Make `all` config accessible directly on `cfg`, i.e merge it to the `cfg` itself. If you have `port` option in your `cfg.hjson` it will be accessible via `cfg._.main.port`, `cfg._.merged.port`, `cfg._.all.port` or simply `cfg.port`. The last form is OK but can lead to conflicts in rare cases when you're not fully understand your own config schema. In that cases use precision namespaces (`merged` is the good way).

**7**. bridge will also expose some helper functions ontop of it (like `cfg.get`). If that conflicts with your config schema, just access underlying `merged` or `all` namespaces directly or use helpers on its own to access such conflicting names.


## helpers API

`cfg.get(path: string | string[], defval: any)` — retrieve option from `all` by string / dotpath / array path ([object-path#get](https://www.npmjs.com/package/object-path)). If option is not present `defval` is used (or undefined by default).

`cfg.nsget(namespace: string, path: string | string[], defval: any)` — retrieve option from certain namespace.
Namespaces:
* `package`
* `release`
* `main`
* `instance`
* `dev`
* `merged`
* `all`

## options

* `dir: string = 'cfg/'` — directory where config's family live (main/instance/dev configs). Path may be relative to package's root.
* `file: string = 'cfg'` — main config file. bridge will always look up for `{<file>.hjson,<file>.json,<file>}`.

## license
ISC, © 2019, Strider.
