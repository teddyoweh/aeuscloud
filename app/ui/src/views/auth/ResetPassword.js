import React from "react";
import { Link } from "react-router-dom";


function ResetPasswordPage(){
    return (
     <div className="auth-box">
        <div className="top">
            AEUS CLOUD
        </div>
        <div className="mid">
            <div className="header">Reset Password</div>
        <form action="">
   
            <div className="frm-group">
            <div class="form-floating">
  <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
  <label for="floatingPassword">Email or Username</label>
</div>
            </div>
       

            <div className="btn-group">
                <button>Send Link</button>
            </div>
    
        </form>
        </div>
        <div className="bottom">
            <label htmlFor="">
            Remember Password?
            
            <Link to="/login">Login</Link>
            </label>
         </div>
     </div>
    )
}

export default ResetPasswordPage;