/* @flow */

import bridge from './'

var c = bridge()

console.log(c)
console.log('port', c.get('port'))
console.log('port ns', c.nsget('merged', 'port'))
