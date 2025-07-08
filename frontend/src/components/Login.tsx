import React, { useState } from 'react';

 const app_name = '143.198.178.41'; //change to your app name
 function buildPath(route:string) : string
{
if (process.env.NODE_ENV != 'development')
{
return 'http://' + app_name + ':5000/'+  route;
}
else
{
return 'http://localhost:5000/' + route;
}

}

function Login()
{
    const [message, setMessage] = useState('');
    const [loginName, setLoginName] = React.useState('');
    const [loginPassword, setPassword] = React.useState('');
function handleSetLoginName(e: any): void
    {
        setLoginName(e.target.value);
    }

    function handleSetPassword(e: any): void
    {
        setPassword(e.target.value);
    }
async function doLogin(event:any) : Promise<void>
{
event.preventDefault();
var obj = {login:loginName,password:loginPassword};
var js = JSON.stringify(obj);
try
{

const response = await fetch(buildPath('api/login'),
{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
var res = JSON.parse(await response.text());
if( res.id <= 0 )
{
setMessage('User/Password combination incorrect');
}
else
{
var user =
{firstName:res.firstName,lastName:res.lastName,id:res.id}
localStorage.setItem('user_data', JSON.stringify(user));
setMessage('');
window.location.href = '/cards';
}
}
catch(error:any)
{
alert(error.toString());
return;
}
};
    function goToRegisterPage(): void{
        window.location.href = '/register';
    }

    return(
        <div id="loginDiv">
            <span id="inner-title">PLEASE LOG IN</span><br />
            Login: <input
                type="text"
                id="loginName"
                placeholder="Username"
                onChange={handleSetLoginName}
            /><br />
            Password: <input
                type="password"
                id="loginPassword"
                placeholder="Password"
                onChange={handleSetPassword}
            /><br />
            <input
                type="submit"
                id="loginButton"
                className="buttons"
                value="Do It"
                onClick={doLogin}
            />
            <span id="loginResult">Output: {message}</span>
            <br/>
            <br/>
            <h5>Don't have an account?</h5>
            <button type="button" id="Register" className="buttons"
                onClick={goToRegisterPage}> Register </button>
        </div>
    );
};

export default Login;