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
	it('exposes API', () =>
	{
		var cfg = bridge()

		expect(cfg).property('get')
		expect(cfg.get).a('function')

		expect(cfg).property('nsget')
		expect(cfg.nsget).a('function')

		expect(cfg).property('_')
		expect(cfg._).an('object')

		expect(cfg._).property('package')
		expect(cfg._).property('release')
		expect(cfg._).property('main')
		expect(cfg._).property('dev')
		expect(cfg._).property('instance')
		expect(cfg._).property('merged')
		expect(cfg._).property('all')

		expect(cfg).property('license')
		expect(cfg._.package).property('license')
		expect(cfg._.all).property('license')

		expect(cfg.license).eq(cfg._.package.license)
		expect(cfg.license).eq(cfg._.all.license)
	})

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
				override: 'package',
			},
			release: null,
			main:
			{
				main: true,
				override: 'main',
			},
			dev:
			{
				dev: true,
				override: 'dev',
			},
			instance: null,
			merged:
			{
				main: true,
				dev:  true,
				override: 'dev',
			},
			all:
			{
				name: 'dev',
				version: '0.0.0',
				private: true,
				main: true,
				dev: true,
				override: 'dev',
			}
		})
	})

	it('dev (no dev config)', () =>
	{
		process.chdir(fromfix('dev-no'))

		var cfg = bridge()

		expect(cfg._).deep.eq(
		{
			package:
			{
				name: 'dev-no',
				version: '0.0.0',
				private: true,
				override: 'package',
			},
			release: null,
			main:
			{
				main: true,
				override: 'main',
			},
			dev: {},
			instance: null,
			merged:
			{
				main: true,
				override: 'main',
			},
			all:
			{
				name: 'dev-no',
				version: '0.0.0',
				private: true,
				main: true,
				override: 'main',
			}
		})
	})

	it('battle', () =>
	{
		process.chdir(fromfix('battle'))

		var cfg = bridge()

		expect(cfg._).deep.eq(
		{
			package:
			{
				name: 'battle',
				version: '0.0.0',
				private: true,
				override: 'package',
			},
			release:
			{
				timestamp: '2017-06-22T00:00:00.000Z',
				version: '0.0.0',
				instance: 'battle',
				name: 'battle-battle',
				git:
				{
					rev: '555953b2129fddd2038e25bd98d7977ce06e1ebc',
					msg: 'msg',
					timestamp: '2017-06-22T00:00:00+00:00',
					author: 'Strider'
				}
			},
			main:
			{
				main: true,
				override: 'main',
			},
			dev: null,
			instance:
			{
				battle: true,
				override: 'battle',
			},
			merged:
			{
				main: true,
				battle: true,
				override: 'battle',
			},
			all:
			{
				name: 'battle-battle',
				version: '0.0.0',
				private: true,
				timestamp: '2017-06-22T00:00:00.000Z',
				instance: 'battle',
				git:
				{
					rev: '555953b2129fddd2038e25bd98d7977ce06e1ebc',
					msg: 'msg',
					timestamp: '2017-06-22T00:00:00+00:00',
					author: 'Strider'
				},
				main: true,
				battle: true,
				override: 'battle',
			}
		})
	})
})
