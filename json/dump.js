/* @flow */

var stringify = JSON.stringify

export default function dump (data)
{
	return stringify(data, null, '  ')
}
