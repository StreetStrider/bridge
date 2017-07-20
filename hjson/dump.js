/* @flow */

import { stringify } from 'hjson'

export default function dump (data: any): string
{
	return stringify(data)
}
