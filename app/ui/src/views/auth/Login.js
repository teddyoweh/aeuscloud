import React from "react";
import { Link } from "react-router-dom";


function LoginPage(){
    
    return (
     <div className="auth-box">
        <div className="top">
            AEUS CLOUD
        </div>
        <div className="mid">
            <div className="header">Login</div>
        <form action="">
   
            <div className="frm-group">
            <div class="form-floating">
  <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
  <label for="floatingPassword">Email or Username</label>
</div>
            </div>
        
            <div className="frm-group">
            <div class="form-floating">
  <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
  <label for="floatingPassword">Password</label>
  <small><Link to='/resetpassword'> Forgot Password?</Link></small>
</div>
            </div>

            <div className="btn-group">
                <button>Login</button>
            </div>
    
        </form>
        </div>
        <div className="bottom">
            <label htmlFor="">
            New to AEUS Cloud
            
            <Link to="/register">Get Started</Link>
            </label>
         </div>
     </div>
    )
}

export default LoginPage;