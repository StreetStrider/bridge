/* @flow */

import config from './config'

var c = config()

console.log(c)
console.log('port', c.$get('port'))
