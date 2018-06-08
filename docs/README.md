# Introduction

[![npm version](https://img.shields.io/npm/v/eslint-plugin-es.svg)](https://www.npmjs.com/package/eslint-plugin-es)
[![Downloads/month](https://img.shields.io/npm/dm/eslint-plugin-es.svg)](http://www.npmtrends.com/eslint-plugin-es)
[![Build Status](https://travis-ci.org/mysticatea/eslint-plugin-es.svg?branch=master)](https://travis-ci.org/mysticatea/eslint-plugin-es)
[![Coverage Status](https://codecov.io/gh/mysticatea/eslint-plugin-es/branch/master/graph/badge.svg)](https://codecov.io/gh/mysticatea/eslint-plugin-es)
[![Dependency Status](https://david-dm.org/mysticatea/eslint-plugin-es.svg)](https://david-dm.org/mysticatea/eslint-plugin-es)

ESLint rules which disallow each ECMAScript syntax.

## 🏁 Goal

[Espree](https://github.com/eslint/espree#readme), the default parser of [ESLint](https://eslint.org/), has supported `ecmaVersion` option.
However, it doesn't support to enable each syntactic feature individually.
This plugin lets us disable each syntactic feature individually.
So we can enable arbitrary syntactic features with the combination of `ecmaVersion` and this plugin.
