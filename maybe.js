/* @flow */

export default function maybe (fn: Function)
{
	return function (data: any, defval: any = null)
	{
		try
		{
			return fn(data)
		}
		catch (e)
		{
			return defval
		}
	}
}
