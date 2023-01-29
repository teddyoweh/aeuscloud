import React,{useState,useEffect,useContext} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverip,authendpoints,headers } from "../../config/constants";
import { AppContext } from '../../context/appContext';
import { Navigate } from "react-router-dom";



function RegisterPage(){
    const [firstname,setFirstname] =useState('')
    const [lastname,setLastname] =useState('')
    const [email,setEmail]  = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [activeErrors,setActiveErrors] = useState({})
    const [activeSuccess,setActiveSuccess] = useState('')
    const [success,setSuccess] = useState(false)
    const {isAuth, setIsAuth } = useContext(AppContext);
    const isbtndisabled = email.length !==0 && password.length >8 && username.length !==0 && firstname.length !==0 && lastname.length !==0 ?'':'disabled'

    async function submitRegister(e){
        
        e.preventDefault()

        const data2 ={
            'firstname':firstname,
            'lastname':lastname,
            'email':email,
            'username':username,
            'password':password
            

        }
        const data = new FormData();
        data.append('firstname',firstname);
        data.append('lastname',lastname);
        data.append('email',email);
        data.append('username',username);
        data.append('password',password);

        try {
            const response = await axios.post(authendpoints['register'], data,{headers:headers});
            console.log(response.data)
            setActiveErrors({})
            setActiveSuccess(response.data.status);
            setSuccess(true)
            
          } catch (error) {
            console.log(error)
            setActiveErrors(error.response.data.data)
       

 
            // for (let index = 0; index < Object.keys(error.response.data.data).length; index++) {
            //     const lilkeys =  Object.keys(error.response.data.data)
    
            //     const erro = error.response.data.data[lilkeys[index]]
                
            //     setActiveErrors1({ ...activeErrors1, [lilkeys[index]]: erro})
            //     setActiveErrors({[lilkeys[index]]: erro})


          
            // }
            
  
      
          

     
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
            <div className="header">Get Started</div>
        <form onSubmit={(e)=>submitRegister(e)}>
            {success===true &&
            <div class="alert alert-success" role="alert">
          <i class='bx bx-check-circle'></i> {activeSuccess}
          </div>}
        <div className="frm-group">
 
        <div class="form-floating has-validation">
  <input type="text" value={firstname} onChange={e=>setFirstname(e.target.value)} class={  activeErrors.firstname?"form-control is-invalid":"form-control"} id="floatingInput" placeholder="name@example.com"/>
  <label for="floatingInput">First Name</label>
  {
  activeErrors.firstname &&
            <span className="invalid-feedback" >{  activeErrors.firstname}</span>
  }
</div>

 
 
            </div>
            <div className="frm-group">
            <div class="form-floating has-validation">
  <input type="text" value={lastname} onChange={e=>setLastname(e.target.value)} class={  activeErrors.lastname?"form-control is-invalid":"form-control"} id="floatingPassword" placeholder="Password"/>
  <label for="floatingPassword">Last Name</label>
  {
    activeErrors.lastname 
 &&
            <span className="invalid-feedback" >{  activeErrors.lastname}</span>
  }
</div>
            </div>
            <div className="frm-group">
            <div class="form-floating has-validation">
  <input type="text" value={username} onChange={e=>setUsername(e.target.value)} class={  activeErrors.username?"form-control is-invalid":"form-control"} id="floatingPassword" placeholder="Password"/>
  <label for="floatingPassword">Username</label>
  {
  activeErrors.username &&
            <span className="invalid-feedback" >{  activeErrors.username}</span>
  }
</div>
            </div>
            <div className="frm-group">
            <div class="form-floating has-validation">
  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} class={  activeErrors.email?"form-control is-invalid":"form-control"} id="floatingPassword" placeholder="Password"/>
  <label for="floatingPassword">Email</label>
  {
  activeErrors.email &&
            <span className="invalid-feedback" >{  activeErrors.email}</span>
  }
</div>
            </div>
            <div className="frm-group">
            <div class="form-floating has-validation">
  <input type="password" value={password} onChange={e=>setPassword(e.target.value)} class={  activeErrors.password?"form-control is-invalid":"form-control"} id="floatingPassword" placeholder="Password"/>
  <label for="floatingPassword">Password</label>
  {
  activeErrors.password &&
            <span className="invalid-feedback" >{  activeErrors.password}</span>
  }
</div>
            </div>

            <div className="btn-group">
                <button className={isbtndisabled} disabled={isbtndisabled=='disabled'?true:false} onClick={(e)=>submitRegister(e)}>Sign Up</button>
            </div>
    
        </form>
        </div>
        <div className="bottom">
            <label htmlFor="">
            Already a user?
            <Link to="/login">Login</Link>
            
            </label>
         </div>
     </div> :
     <Navigate to="/"/>
     }
             </>
    )
}

export default RegisterPage;