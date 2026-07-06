/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = [
    ...require("./_base.cjs"),
    ...require("./_override-2015.cjs"),
    ...require("./_override-2016.cjs"),
    ...require("./_override-2017.cjs"),
    ...require("./_override-2018.cjs"),
    ...require("./_override-2019.cjs"),
    ...require("./_override-2020.cjs"),
    ...require("./_override-vue.cjs"),
    ...require("./_override-mocha.cjs"),
    ...require("./_override-special.cjs"),
]
