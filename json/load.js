/* @flow */

var parse = JSON.parse

import maybe from '../maybe'

export default function load (data: string): any
{
	return parse(data)
}

load.maybe = maybe(load)
