import React,{useState,useEffect,useContext} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverip,authendpoints,headers,homendpoints } from "../../config/constants";
import { AppContext } from '../../context/appContext';
import { UserContext } from "../../context/userContext";
import { Navigate } from "react-router-dom";

function LoginPage(){
    const [uuid,setUuid] = useState('');
    const [password,setPassword] = useState('');
    const [activeErrors,setActiveErrors] = useState({})
    const isbtndisabled = uuid.length !==0 && password.length >8?'':'disabled'
    const {isAuth, setIsAuth } = useContext(AppContext);
    const {userD, setUserD} = useContext(UserContext);

    async function submitLogin(e){

        e.preventDefault()

 
        
        const data = new FormData();
   
        data.append('uuid',uuid);
        data.append('password',password);

        try {
            const response = await axios.post(authendpoints['login'], data,{headers:headers});
            console.log(response.data)
            localStorage.setItem('token',response.data.token)
            
            localStorage.setItem('user', JSON.stringify(response.data.data))
            
            setIsAuth(true)
            setUserD(response.data.data)
          } catch (error) {
 
            setActiveErrors(error.response.data.data)
       

  
            
  
      
          

     
          }
    
       
    }
    
    return (
        <>

        {
            isAuth===false?
     
     <div className="auth-box">
        <div className="top">
            AEUS CLOUD
        </div>
        <div className="mid">
            <div className="header">Login</div>
        <form onSubmit={(e)=>submitLogin(e)}>
   
            <div className="frm-group">
            <div class="form-floating has-validation">
  <input type="text" value={uuid} onChange={(e)=>setUuid(e.target.value)} class={  activeErrors.uuid?"form-control is-invalid":"form-control"} id="floatingPassword" placeholder="Password"/>
  <label for="floatingPassword">Email or Username</label>
  {
  activeErrors.uuid &&
            <span className="invalid-feedback" >{  activeErrors.uuid}</span>
  }
</div>
            </div>
        
            <div className="frm-group">
            <div class="form-floating">
  <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  class={  activeErrors.password?"form-control is-invalid":"form-control"} id="floatingPassword" placeholder="Password"/>
  <label for="floatingPassword">Password</label>
  {
  activeErrors.password &&
            <span className="invalid-feedback" >{  activeErrors.password}</span>
  }
  <small><Link to='/resetpassword'> Forgot Password?</Link></small>
</div>
            </div>

            <div className="btn-group">
               
                <button className={isbtndisabled} disabled={isbtndisabled==='disabled'?true:false} onClick={(e)=>submitLogin(e)}>Login</button>

            </div>
    
        </form>
        </div>
        <div className="bottom">
            <label htmlFor="">
            New to AEUS Cloud
            
            <Link to="/register">Get Started</Link>
            </label>
         </div>
     </div>  :
     <Navigate to="/"/>
     }
             </>
    )
}

export default LoginPage;