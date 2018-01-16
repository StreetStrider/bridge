/* @flow */

import rootpath from '@streetstrider/rootpath'
import { expect } from 'chai'

import bridge from '../'

var fromroot = rootpath()

describe('bridge#get,nsget', () =>
{
	process.chdir(fromroot('test/fixt/get'))

	var cfg = bridge()

	it('get', () =>
	{
		expect(cfg.get('name')).eq('get')
		expect(cfg.get('version')).eq('0.0.0')
		expect(cfg.get('override')).eq('dev')
		expect(cfg.get('main')).eq(true)
		expect(cfg.get('dev')).eq(true)

		expect(cfg.get('dev2')).eq(null)
		expect(cfg.get('dev2', false)).eq(false)
	})

	it('nsget', () =>
	{
		expect(cfg.nsget('package', 'name')).eq('get')
		expect(cfg.nsget('main', 'name')).eq(null)
		expect(cfg.nsget('main', 'name', ':name')).eq(':name')

		expect(cfg.nsget('package', 'override')).eq('package')
		expect(cfg.nsget('main', 'override')).eq('main')
		expect(cfg.nsget('merged', 'override')).eq('dev')
		expect(cfg.nsget('all', 'override')).eq('dev')
	})
})
