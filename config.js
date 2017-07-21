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

	var cfg = {}

	cfg._ = {}

	cfg._.package  = read(fromroot('package.json'))
	cfg._.release  = read.maybe(fromroot('release.json'))
	cfg._.main     = read.coalesce(candidates(fromcfg, options.file), {})
	cfg._.instance = null
	cfg._.dev      = null
	cfg._.merged   = {}

	if (cfg._.release)
	{
		let release  = cfg._.release
		let instance = release.instance

		if (instance)
		{
			cfg._.instance = read.coalesce(candidates(fromcfg, instance), {})
		}

		merge(cfg._.merged, cfg._.instance)
	}
	else
	{
		cfg._.dev = read.coalesce(candidates(fromcfg, 'dev'), {})

		merge(cfg._.merged, cfg._.dev)
	}

	cfg.$get = function $get (path: string | string[], defval: any)
	{
		return get(cfg._.main, path, defval)
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
