/* @flow */

import type { T_Rootpath as Rootpath } from 'rootpath'

var assign = Object.assign

import rootpath from 'rootpath'
import find_root from 'find-root'

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

	cfg._.package = read(fromroot('package.json'))
	cfg._.release = read.maybe(fromroot('release.json'))
	cfg._.main    = read.coalesce(candidates(fromcfg, options.file), {})

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
