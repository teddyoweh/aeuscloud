import React,{useState} from 'react';
import axios from 'axios';
import { dataendpoints,headers,serverip } from '../../config/constants';
import { useEffect } from 'react';
// yml, Dockerfile, Docker, .json, pdf,csv,
function IconTag({name}){
    name = name.toLowerCase()
   if(name.endsWith('.mp3')){
    return <img src="https://img.icons8.com/material-outlined/150/82adff/mp3.png"/>
   }
   else if(name.endsWith('.dmg')){
    return <img src="https://img.icons8.com/material-outlined/150/82adff/dmg.png"/>
   } else if(name.endsWith('.mov')){
    return <img src="https://img.icons8.com/material-outlined/150/82adff/mov.png"/>
   }
   else if(name.endsWith('.js')){
    return <img src="https://img.icons8.com/ios/150/82adff/javascript--v1.png"/>
   }
   else if(name.endsWith('.html')){
    return  <img src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/150/82adff/external-html-social-media-tanah-basah-basic-outline-tanah-basah.png"/>
   }
   else if(name.endsWith('.ts')){
    return  <img src="https://img.icons8.com/ios/150/82adff/typescript.png"/>
   }
   else if(name.endsWith('.txt')){
    return   <img src="https://img.icons8.com/material-outlined/150/82adff/txt.png"/>
   }  
   else if(name.endsWith('.scss')){
    return   <img src="https://img.icons8.com/ios/150/82adff/sass.png"/>
   }  
   else if(name.endsWith('.pdf')){
    return   <img src="https://img.icons8.com/ios/150/82adff/pdf--v1.png"/>
   }  
   else if(name.endsWith('.json')){
    return  <img src="https://img.icons8.com/windows/150/82adff/json.png"/>
   }  
   else if(name.endsWith('.csv')){
    return  <img src="https://img.icons8.com/ios/150/82adff/csv.png"/>
   }  
  
  
   else if(name.endsWith('.css')){
    return  <img src="https://img.icons8.com/ios/150/82adff/css3.png"/>
   }  
   else if(name.endsWith('.mp4')){
    return  <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/150/82adff/external-MP4-video-actions-and-files-those-icons-lineal-those-icons.png"/>
   }  
   else if(name.endsWith('.py')){
    return <img src="https://img.icons8.com/ios/150/82adff/python--v1.png"/>
   }
   else if(name.endsWith('.bash')||name.endsWith('.sh')||name.endsWith('.bat')){
    return <img src="https://img.icons8.com/ios/150/82adff/console.png"/>
   }
   

  
    
}
function DocumentsTab(){
    const [filesData,setFilesData] = useState([])
    const [FilesDatatotalNum,setFilesDatatotalNum]=useState('0')
    const [start,setStart] = useState('0')
    const [end,setEnd] = useState('10')


    async function LoadData(){
       await axios.post(dataendpoints['list'],{'start':start,'end':end}, {headers:headers})
        .then((response)=>{
            console.log(response.data)
            setFilesData(response.data.data.reverse())
            setFilesDatatotalNum(response.data.total)
        }).catch((error)=>{
            console.log(error);
        })
    }
  useEffect(()=>{
    LoadData()
  },[filesData])
    return (
      <div className="app-sec">
            <div className="header">
                <div className="left">
                    <label htmlFor="">
                        Documents
                    </label>
                </div>
                <div className="right">
                    <div className="options">
                        <div className="search-box">
                            <i class='bx bx-search'></i>
                            <input type="text"  placeholder='Search'/>
                        </div>
                
                        <div className="display">
                            <span>
                                <i class='bx bx-grid-alt'></i>
                            </span>
                            <span>
                                <i class='bx bx-list-ul'></i>
                            </span>
                        </div>
                        <div className="upload">
                            <button>Upload</button>
                        </div>
                    </div>

                </div>
            </div>
            <div className="app-body">
                 <div className="app-body-content">
                 <table class="app-table">
  <thead>
    <tr>
    <th><input type="checkbox" /></th>
      <th scope=""><i class='bx bx-cloud'></i></th>
      <th scope="">File Name</th>
      <th scope="">File Size</th>
      <th scope="">Access</th>
      <th scope="">Modified at</th>
      <th scope="">Created at</th>
      <th scope="">Options</th>

    </tr>
  </thead>
  <tbody>
    {filesData.map((file, index)=>{
        return (
            <tr>
                <th><input type="checkbox" /></th>
            <th scope="row"><IconTag name={file.filename}/></th>
            <td className='link'><label htmlFor="">{file.filename}</label></td>
            <td>{file.size}</td>
            <td>Just You</td>
            <td>{file.modified}</td>
            <td>{file.created}</td>
            <td>@mdo</td>
          </tr>
        )

    })}
   
     
   
  </tbody>
</table>
                 </div>
            </div>
            <div className="app-page-footer">
                <div className="left">
                    <label htmlFor="">Showing {end} of {FilesDatatotalNum} </label>
                </div>     
                <div className="right">
                <div className="box">
      
                    <i class='bx bx-chevron-left'></i>  
                    <label htmlFor="">Previous</label>
                    </div>
                    <div className="box">
                    <label htmlFor="">Next</label>
                    <i class='bx bx-chevron-right'></i>  
                    </div>
                </div>
            </div>
      </div>
    )
}


export default DocumentsTab