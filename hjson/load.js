/* @flow */

import { parse } from 'hjson'

export default function load (data: string): any
{
	return parse(data)
}
