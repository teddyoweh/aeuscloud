import React,{useState} from 'react';
import { SidebarComponent,NavbarComponent } from '../components';
import { datatypes } from './Data';
import { MultiSelect } from "react-multi-select-component";
import CreatableSelect from 'react-select/creatable';



export default function DashboardPage() {
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

  return (
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
              <div className="header">
                <div className="left">
                  <label htmlFor="">
                    Add Data
                  </label>
                </div>
                <div className="right">
                  <i class='bx bx-x' onClick={()=>toggleUpload()}></i>
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

                </form>

              </div>
              
             </div>
      
       </div>

       </>
  )
}
