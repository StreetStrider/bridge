/* @flow */

declare var describe: Function;
declare var it: Function;

import rootpath from 'rootpath'
import { expect } from 'chai'

import bridge from '../'

var fromroot = rootpath(__dirname, '../', '../..')
var fromfix  = fromroot.partial('fixt/')

describe('bridge', () =>
{
	it('dev', () =>
	{
		process.chdir(fromfix('dev'))

		var cfg = bridge()

		expect(cfg._).deep.eq(
		{
			package:
			{
				name: 'dev',
				version: '0.0.0',
				private: true,
			},
			release: null,
			main:
			{
				main: true,
			},
			dev:
			{
				dev: true,
			},
			instance: null,
			merged:
			{
				main: true,
				dev:  true,
			},
			all:
			{
				name: 'dev',
				version: '0.0.0',
				private: true,
				main: true,
				dev: true,
			}
		})
	})
})
