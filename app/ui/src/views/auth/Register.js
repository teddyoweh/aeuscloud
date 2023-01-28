import React,{useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverip,authendpoints } from "../../config/constants";


function RegisterPage(){
    const [firstname,setFirstname] =useState('')
    const [lastname,setLastname] =useState('')
    const [email,setEmail]  = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    async function submitRegister(e){
        e.preventDefault()
        const data ={
            'firstname':firstname,
            'lastname':lastname,
            'email':email,
            'username':username,
            'password':password
            

        }
        console.log(data)
        try {
            const response = await axios.post(authendpoints['register'], data);
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
    

    }
    return (
     <div className="auth-box">
        <div className="top">
            AEUS CLOUD
        </div>
        <div className="mid">
            <div className="header">Get Started</div>
        <form onSubmit={(e)=>submitRegister(e)}>
        <div className="frm-group">
        <div class="form-floating">
  <input type="text" value={firstname} onChange={e=>setFirstname(e.target.value)} class="form-control" id="floatingInput" placeholder="name@example.com"/>
  <label for="floatingInput">First Name</label>
</div>
 
 
            </div>
            <div className="frm-group">
            <div class="form-floating">
  <input type="text" value={lastname} onChange={e=>setLastname(e.target.value)} class="form-control" id="floatingPassword" placeholder="Password"/>
  <label for="floatingPassword">Last Name</label>
</div>
            </div>
            <div className="frm-group">
            <div class="form-floating">
  <input type="text" value={username} onChange={e=>setUsername(e.target.value)} class="form-control" id="floatingPassword" placeholder="Password"/>
  <label for="floatingPassword">Username</label>
</div>
            </div>
            <div className="frm-group">
            <div class="form-floating">
  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} class="form-control" id="floatingPassword" placeholder="Password"/>
  <label for="floatingPassword">Email</label>
</div>
            </div>
            <div className="frm-group">
            <div class="form-floating">
  <input type="password" value={password} onChange={e=>setPassword(e.target.value)} class="form-control" id="floatingPassword" placeholder="Password"/>
  <label for="floatingPassword">Password</label>
</div>
            </div>

            <div className="btn-group">
                <button onClick={(e)=>submitRegister(e)}>Sign Up</button>
            </div>
    
        </form>
        </div>
        <div className="bottom">
            <label htmlFor="">
            Already a user?
            <Link to="/login">Login</Link>
            
            </label>
         </div>
     </div>
    )
}

export default RegisterPage;