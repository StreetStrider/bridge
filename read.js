/* @flow */

import { readFileSync as readfs } from 'fs'

import load from './hjson/load'

export default function read (path: string)
{
	return load(readfs(path, 'utf-8'))
}

read.maybe = function (path: string, defval: any = null)
{
	try
	{
		return read(path)
	}
	catch (e)
	{
		if (e.code === 'ENOENT')
		{
			return defval
		}
		else
		{
			throw e
		}
	}
}
