/* @flow */

var assign = Object.assign

import rootpath from 'rootpath'
import find_root from 'find-root'

import read from './read'

var defaults =
{
	dir: 'cfg/',
}

export default function config (options: any)
{
	options = assign({}, defaults, options)

	var fromroot = rootpath(find_root(process.cwd()))
	var fromcfg  = fromroot.partial(options.dir)

	var cfg = {}

	cfg._ = {}

	cfg._.package = read(fromroot('package.json'))

	return cfg
}
