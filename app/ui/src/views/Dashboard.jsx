import React,{useEffect, useState,useContext} from 'react';
import { SidebarComponent,NavbarComponent } from '../components';
import { datatypes } from './Data';
import { MultiSelect } from "react-multi-select-component";
import CreatableSelect from 'react-select/creatable';
import { serverip,homendpoints,headers,dataendpoints } from "../config/constants";
import { Navigate } from "react-router-dom";
import { AppContext } from '../context/appContext';
import { UserContext } from '../context/userContext';

import axios from 'axios';
const userdata ={

  'firstname':'Teddy',
  'lastname':'Oweh',
  'email':'teddyoweh@gmail.com',
  'username':'teddyoweh'
  
}

export default function DashboardPage() {
  const {isAuth, setIsAuth } = useContext(AppContext);

  const {userD} = useContext(UserContext)
 
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  const [selected, setSelected] = useState([]);

  const [isaddOpen,setisaddOpen]=useState(false)
  const [newdataname,setNewDataName]= useState('')
  const [datatype, setDatatype] =useState('')

  const toggleUpload=()=>{
    console.log('toggle upload')
    setisaddOpen(!isaddOpen);
  }
  const selectDatatype = (name)=>{
    setDatatype(name)
  }

  function submitDataForm(e){
    

  }
  const [imageURL, setImageURL] = useState('');

  const handleUploadImage = (ev) => {
    ev.preventDefault();

    const data = new FormData();
    data.append('file', uploadInput.current.files[0]);
 
    data.append('datatype',datatype)
    data.append('userdata', JSON.stringify(userD))
    console.log(data)
    fetch(dataendpoints, {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
      
      });
    });
  }

  const uploadInput = React.createRef();
  const fileName = React.createRef();
 
  return (
   
    <>
 {
     isAuth===false?
      <Navigate to='/login'></Navigate>
      :
<>
 

    <div className='app-c'>
      <SidebarComponent where='overview'/>
      <div className="dash-app">
        <NavbarComponent toggleUpload={()=>toggleUpload()}
       />
      </div>
    </div>
       <div className={!isaddOpen?"addnewbox hidethisshit":"addnewbox "}>
  
             <div className="addnew">
              <div className="top">

     
              <div className="header">
                <div className="left">
                  <label htmlFor="">
                    Add Data
                  </label>
                </div>
                <div className="right">
                  <i className='bx bx-x' onClick={()=>toggleUpload()}></i>
                </div>

              </div>
              <div className="box">

                <form action="">
                  <div className="frm-group">
                    <label htmlFor="">Name</label>
                    <input type="text" value={newdataname} onChange={(e)=>setNewDataName(e.target.value)}/>
                  </div>
                  <div className="frm-group">
                    <label htmlFor="">Data Type</label>
                    <div className="data-types">

           
                    {
                      datatypes.map((item,index)=>{
                        return(
                          <div className={datatype==item.name?"data-type active":"data-type"} onClick={()=>selectDatatype(item.name)}>
                            {item.icon}
                            <span>{item.name}</span>
                          </div>
                        )
                      })
                    }        
                     </div>
              

                  </div>
                  <div className="frm-group">
                    <label htmlFor="">Tags</label>
                    <CreatableSelect isMulti options={options} />
                  </div>
                  <div className="frm-group">
           
      <div>
        <input ref={uploadInput}  type="file" />
      </div>
      <div>
       
      </div>
      <br />
      <div>
 
      </div>
     
 
                  </div>

                </form>

              </div>
              </div>
              <div className="bottom">
                <div className="lilbtns">
                  <button onClick={handleUploadImage}>Upload</button>
                  <button onClick={()=>toggleUpload()}>Cancel</button>
                </div>
              </div>
              
             </div>
      
       </div>
       </>
}
       </>
  )
}
