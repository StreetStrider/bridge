/* @flow */

var stringify = JSON.stringify

export default function dump (data: any): string
{
	return stringify(data, null, '  ')
}
