/* @flow */

import { stringify } from 'hjson'

export default function dump (data)
{
	return stringify(data)
}
