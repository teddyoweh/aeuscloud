import React,{useEffect, useState,useContext} from 'react';
import { SidebarComponent,NavbarComponent } from '../components';
import { datatypes } from './Data';
import { MultiSelect } from "react-multi-select-component";
import CreatableSelect from 'react-select/creatable';
import { serverip,homendpoints,headers,dataendpoints } from "../config/constants";
import { Navigate } from "react-router-dom";
import { AppContext } from '../context/appContext';
import { UserContext } from '../context/userContext';
import { TabContext } from '../context/tabContext';

import axios from 'axios';
const userdata ={

  'firstname':'Teddy',
  'lastname':'Oweh',
  'email':'teddyoweh@gmail.com',
  'username':'teddyoweh'
  
}
function UploadLog({counter,name}){
  const [uploadcounter,setUploadcounter] = useState('0%')
  return (
    <div className="uploadrol-box">

    <div className="roll-details">
      <label htmlFor="">{name}</label>
    </div>
    <div className="upload-loader">
    <div className="uploader-roll">
      <div className="roll" style={{'width':counter}}>

      </div>
   

    </div>
    <div className="count">
    {counter}
    </div>
  </div>
  </div>
  )
}
export default function DashboardPage() {
  const [uploadcounters, setUploadcounters] = useState([])
  const [uploadison, setUploadison] = useState(false)
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
  const {thisTab, setThisTab} = useContext(TabContext)

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
  var blank = []
  const uploadImage =(ev) =>{
    setUploadison(true)
  
    for (let index = 0; index <uploadInput.current.files.length; index++) {
        blank.push({'percent':'0%','name':uploadInput.current.files[index].name})
     
    }
    console.log(uploadInput.current.files[0])
    setUploadcounters([...uploadcounters,blank])
 
    for (let index = 0; index <uploadInput.current.files.length; index++) {
 
      handleUploadImage(ev,index)
    }
  }
  const handleUploadImage = async (ev,index) => {
    ev.preventDefault();

    const data = new FormData();
    
    data.append('file', uploadInput.current.files[index]);
 
    data.append('datatype',datatype)
    data.append('userdata', JSON.stringify(userD))
 


   await axios.post(dataendpoints['upload'],data,{headers:headers,
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        var  auploadcounters = [...blank]
        console.log(auploadcounters)
        auploadcounters[index]['percent']=`${percentCompleted}%`
        blank[index]['percent']=`${percentCompleted}%`
 
        setUploadcounters(auploadcounters)
        }
    },
    
    )
    .then((response) => {
    
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
       <div className="dash-content">
      {
        thisTab.content
      }
       </div>
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
        <input ref={uploadInput}  multiple type="file" />
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
                  <button onClick={uploadImage}>Upload</button>
                  <button onClick={()=>toggleUpload()}>Cancel</button>
                </div>
              </div>
              
             </div>
             {uploadison==true &&
             <div className='addnew short'>

             <div className="header">
                <div className="left">
                  <label htmlFor="">
                    Upload Details
                  </label>
                </div>
                <div className="right">
                  <i className='bx bx-x' onClick={()=>setUploadison(false)}></i>
                </div>

              </div>
             <div className="bottom">
                <div className="uploadloaders">


                {uploadison==true &&
                  uploadcounters.reverse().map((counter,index)=>
                  {
                    return (
                      <UploadLog counter={counter['percent']} name={counter.name}/>
                    )
                  })
                }
                                </div>
                                </div>

             </div>
             }
      
       </div>
       </>
}
       </>
  )
}
