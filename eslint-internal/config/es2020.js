/**
 * @author Toru Nagashima
 * See LICENSE file in root directory for full license.
 */
"use strict"

module.exports = {
    extends: [
        require.resolve("./_base.js"),
        require.resolve("./_override-2015.js"),
        require.resolve("./_override-2016.js"),
        require.resolve("./_override-2017.js"),
        require.resolve("./_override-2018.js"),
        require.resolve("./_override-2019.js"),
        require.resolve("./_override-2020.js"),
        require.resolve("./_override-ts.js"),
        require.resolve("./_override-vue.js"),
        require.resolve("./_override-mocha.js"),
        require.resolve("./_override-special.js"),
    ],
}
