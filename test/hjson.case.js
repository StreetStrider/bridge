/* @flow */
/* eslint max-nested-callbacks: [ 1, 4 ] */

import { expect } from 'chai'

import * as hjson from '../hjson'

describe('hjson', () =>
{
	describe('load', () =>
	{
		it('works', () =>
		{
			var data = hjson.load('{x:1}')
			expect(data).an('object')
			expect(data).property('x')
			expect(data.x).eq(1)
		})

		it('throws', () =>
		{
			expect(() =>
			{
				hjson.load('{x:1},')
			})
			.throw()
		})

		it('safe works', () =>
		{
			var data = hjson.load.maybe('{x:1},', { x: 2 })
			expect(data).an('object')
			expect(data).property('x')
			expect(data.x).eq(2)
		})
	})

	describe('dump', () =>
	{
		it('works', () =>
		{
			var data = hjson.dump({ x: 1 })
			expect(data).a('string')
			expect(data).eq('{\n  x: 1\n}')
		})

		it('throws', () =>
		{
			expect(() =>
			{
				var special = {}
				special.special = special
				hjson.dump(special)
			})
			.throw()
		})
	})
})
