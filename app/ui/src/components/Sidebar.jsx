import React, {useState,useContext}from 'react'
import { TabContext } from '../context/tabContext'

export default function SidebarComponent({where}) {

    const {tabs,setTab,activeTab,setActiveTab} = useContext(TabContext) 
    const [tab_data,setTab_data] = useState({})
    function addTab(tab){
        
        if (tab==='dc'){


 
        setTab_data({
            'title':'Data Cluster',
            'title_icon':<i class='bx bxs-data'></i>
        })
   
      
    }
        
        if (tabs.length===0){
            setTab([tab_data])
        }else{
            setTab([...tabs,tab_data])
        }
     
        setActiveTab([...activeTab, tabs.length])

    }
  return (
    <div className="sidebar">
        <div className="sidebar-content">
            <div className="header">
                <img src="" alt="" />
                <label htmlFor="header">AEUS</label>
            </div>
            <div className="sidebar-items">
                <div className="sidebar-group">
                    <div className={where==='overview'?"sidebar-item active":'sidebar-item '}>
                        <i class='bx bxs-grid-alt'></i>
                        <span>Overview</span> 
                    </div>
                  
                    <div onClick={()=>addTab('dc')} className={where==='starred'?"sidebar-item active":'sidebar-item '}>
                    <i class='bx bxs-data'></i>
                        <span>Data Cluster</span> 
                    </div>
                    
               
             
                    <div className="endline">

                    </div>
                </div>
                <div className="sidebar-group">
                    <div className={where=='documents'?"sidebar-item active":'sidebar-item '}>
                        <i class='bx bxs-file-blank'></i>
                        <span>Documents</span> 
                    </div>
                    <div className={where=='documents'?"sidebar-item active":'sidebar-item '}>
                        <i class='bx bxs-file-image'></i>
                        <span>Pictures</span> 
                    </div>
                    <div className={where=='documents'?"sidebar-item active":'sidebar-item '}>
                        <i class='bx bxs-video'></i>
                        <span>Videos</span> 
                    </div>
                    <div className={where=='documents'?"sidebar-item active":'sidebar-item '}>
                        <i class='bx bxs-music'></i>
                        <span>Audios</span> 
                    </div>
                    <div className={where==='starred'?"sidebar-item active":'sidebar-item '}>
                        <i class='bx bxs-bookmark'></i>
                        <span>Starred</span> 
                    </div>
                    <div className="endline">
                        
                    </div>
                </div>
                <div className="sidebar-group">
                    <div className={where=='documents'?"sidebar-item active":'sidebar-item '}>
                    <i class='bx bx-code-curly' ></i>
                    <span>Codes</span> 
                    </div>
                    <div className={where=='documents'?"sidebar-item active":'sidebar-item '}>
                        <i class='bx bxl-git'></i>
                        <span>Git Repos</span> 
                    </div>
                    <div className={where=='documents'?"sidebar-item active":'sidebar-item '}>
                        <i class='bx bx-network-chart'></i>
                        <span>API Integration</span> 
                    </div>
                   
                    <div className="endline">
                        
                    </div>
                    <div className={where=='documents'?"sidebar-item active":'sidebar-item '}>
                        <i class='bx bxs-cog' ></i>
                        <span>Settings</span> 
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
