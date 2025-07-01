import React, { useState } from 'react';
function Register(){
function goToLoginPage(): void{
    window.location.href = '/';
}

return(
	<div>
	<h1>REGISTER</h1>
	<p>Please Register</p>
		<div>
  			<label>Login: </label>
  			<input placeholder="Username" id="login"></input>

            <label>First Name: </label>
  			<input placeholder="First Name" type="text" id="first_name"></input>
            
            <br/>
            
            <label>Password: </label>
  			<input placeholder="Password" type="text" id="password"></input>

            <label>Last Name: </label>
  			<input placeholder="Last Name" type="text" id="last_name"></input>
		</div>
        <h5>Already have an account?</h5>
        <button type="button" id="Login" className="buttons"
                onClick={goToLoginPage}> Login </button>

	</div>
)

}
export default Register;
