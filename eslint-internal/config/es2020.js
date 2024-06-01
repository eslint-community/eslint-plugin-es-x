/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = [
    ...require("./_base.js"),
    ...require("./_override-2015.js"),
    ...require("./_override-2016.js"),
    ...require("./_override-2017.js"),
    ...require("./_override-2018.js"),
    ...require("./_override-2019.js"),
    ...require("./_override-2020.js"),
    ...require("./_override-vue.js"),
    ...require("./_override-mocha.js"),
    ...require("./_override-special.js"),
]
