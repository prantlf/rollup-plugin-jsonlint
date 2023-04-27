## [2.0.1](https://github.com/prantlf/rollup-plugin-jsonlint/compare/v2.0.0...v2.0.1) (2023-04-27)


### Bug Fixes

* Upgrade dependencies ([da091d3](https://github.com/prantlf/rollup-plugin-jsonlint/commit/da091d354524244e597117036e73cc5d86d204d5))

# [14.0.0](https://github.com/prantlf/jsonlint/compare/v13.1.0...v14.0.0) (2023-03-05)

### Features

* Upgrade jsonlint to get better JSON Schema support ([2e45007](https://github.com/prantlf/jsonlint/commit/2e450078d14b06b1627e47e04a39b07722c81104))

### BREAKING CHANGES

* The default environment recognises only JSON Schema drafts 06 and 07 automatically. Not 0
4 any more. The environment for JSON Schema drafts 04 has to be selected explicitly. Also, JSON Schema drafts
06 and 07 are handled by AJV@8 instead of AJV@6. It shouldn't make any difference, but the implementation is n
ew and could perform a stricter validation.

# [1.0.0](https://github.com/prantlf/jsonlint/compare/v0.0.2...v1.0.0) (2022-10-30)

### Bug Fixes

* Upgrade dependencies, support Rollup 3 ([a6ec4a7](https://github.com/prantlf/jsonlint/commit/a6ec4a7ae64909a1ec8483e065ddff0b951e9e3c))

# [0.0.2](https://github.com/prantlf/jsonlint/compare/v0.0.1...v0.0.2) (2022-05-04)

### Bug Fixes

* Upgrade dependnecies ([f8f777c](https://github.com/prantlf/jsonlint/commit/f8f777c55ae27e3f17b7d68359733f737989a019))

# 0.0.1 (2019-12-28)

### Features

* Support CJSON/JSON5 in addition to the standard JSON ([6d37bac](https://github.com/prantlf/rollup-plugin-jsonlint/commit/6d37bac995edcc0639be6c0f2d9c85a61a5434a0))

This is the first version released that extends the [original plugin](https://github.com/rollup/plugins/tree/master/packages/json#rollupplugin-json).
