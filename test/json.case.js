/* @flow */
/* eslint max-nested-callbacks: [ 1, 4 ] */

import { expect } from 'chai'

import * as json from '../json'

describe('json', () =>
{
	describe('load', () =>
	{
		it('works', () =>
		{
			var data = json.load('{"x":1}')
			expect(data).an('object')
			expect(data).property('x')
			expect(data.x).eq(1)
		})

		it('throws', () =>
		{
			expect(() =>
			{
				json.load('{x:1}')
			})
			.throw()
		})

		it('safe works', () =>
		{
			var data = json.load.maybe('{x:1}', { x: 2 })
			expect(data).an('object')
			expect(data).property('x')
			expect(data.x).eq(2)
		})
	})

	describe('dump', () =>
	{
		it('works', () =>
		{
			var data = json.dump({ x: 1 })
			expect(data).a('string')
			expect(data).eq('{\n  "x": 1\n}')
		})

		it('throws', () =>
		{
			expect(() =>
			{
				var special = {}
				special.special = special
				json.dump(special)
			})
			.throw()
		})
	})
})
