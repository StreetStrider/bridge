/* @flow */

import { readFileSync as readfs } from 'fs'

import load from './hjson/load'

export default function read (path: string)
{
	return load(readfs(path, 'utf-8'))
}

read.maybe = function (path: string, defval: any = null)
{
	return coalesce([ path ], defval)
}

var coalesce = read.coalesce = function (paths: string[], defval: any = null)
{
	for (let path of paths)
	{
		try
		{
			return read(path)
		}
		catch (e)
		{
			if (e.code === 'ENOENT')
			{
				continue
			}
			else
			{
				throw e
			}
		}
	}

	return defval
}
