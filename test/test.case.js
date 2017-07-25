/* @flow */

declare var describe: Function;
declare var it: Function;

import rootpath from 'rootpath'

import bridge from '../'

var fromroot = rootpath(__dirname, '../', '../..')
var fromfix  = fromroot.partial('fixt/')

describe('bridge', () =>
{
	it('dev', () =>
	{
		process.chdir(fromfix('dev'))

		var cfg = bridge()

		console.log(cfg._.main)
		console.log(cfg.get('main'))
	})
})
