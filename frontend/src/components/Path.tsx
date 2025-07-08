const app_name = '143.198.178.41';
export function buildPath(route:string) : string
{
if (process.env.NODE_ENV != 'development')
{
return 'http://' + app_name + ':5000/' + route;
}
else
{
return 'http://localhost:5000/' + route;
}
}