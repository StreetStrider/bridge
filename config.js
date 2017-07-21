/* @flow */

import type { T_Rootpath as Rootpath } from 'rootpath'

var assign = Object.assign

import rootpath  from 'rootpath'
import find_root from 'find-root'
import merge     from 'lodash/merge'
import { get }   from 'object-path'

import read from './read'

var defaults =
{
	dir:  'cfg/',
	file: 'cfg',
}

export default function config (options: any)
{
	options = assign({}, defaults, options)

	var fromroot = rootpath(find_root(process.cwd()))
	var fromcfg  = fromroot.partial(options.dir)

	var _ = {}

	_.package  = read(fromroot('package.json'))
	_.release  = read.maybe(fromroot('release.json'))
	_.main     = read.coalesce(candidates(fromcfg, options.file), {})
	_.instance = null
	_.dev      = null
	_.merged   = merge({}, _.main)

	if (_.release)
	{
		let instance = _.release.instance

		if (instance)
		{
			_.instance = read.coalesce(candidates(fromcfg, instance), {})
		}

		merge(_.merged, _.instance)
	}
	else
	{
		_.dev = read.coalesce(candidates(fromcfg, 'dev'), {})

		merge(_.merged, _.dev)
	}

	var cfg = {}

	cfg._ = _

	cfg.$get = function $get (path: string | string[], defval: any)
	{
		return get(_.main, path, defval)
	}

	return cfg
}

function candidates (dir: Rootpath, file: string)
{
	return [
		dir(file + '.hjson'),
		dir(file + '.json'),
		dir(file),
	]
}
