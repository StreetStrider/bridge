/* @flow */

declare var describe: Function;
declare var it: Function;

import bridge from '../'

describe('bridge', () =>
{
	it('dev', () =>
	{
		var cfg = bridge()

		console.log(cfg)
	})
})
