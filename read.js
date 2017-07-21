/* @flow */

import { readFileSync as readfs } from 'fs'

import load from './hjson/load'

export default function read (path: string)
{
	return load(readfs(path, 'utf-8'))
}
