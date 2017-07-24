/* @flow */

import type { T_Rootpath as Rootpath } from 'rootpath'

type Path = string | string[]

var assign = Object.assign

import rootpath  from 'rootpath'
import find_root from 'find-root'
import merge     from 'lodash/merge'
import { get as getpath } from 'object-path'

import read from './read'

var defaults =
{
	dir:  'cfg/',
	file: 'cfg',
}

export default function bridge (options: any)
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
	_.all      = {}

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

	merge(_.all, _.package, _.release, _.merged)

	var cfg = merge({}, _.all)

	cfg._ = _

	cfg.get = function get (path: Path, defval: any)
	{
		return getpath(_.all, path, defval)
	}

	cfg.nsget = function nsget (ns: string, path: Path, defval: any)
	{
		return getpath(getpath(_, ns), path, defval)
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