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
})
