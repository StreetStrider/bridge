/* @flow */

import { parse } from 'hjson'

export default function load (data)
{
	return parse(data)
}
