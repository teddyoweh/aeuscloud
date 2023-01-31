import React, {useState,useContext}from 'react'
import { TabContext } from '../context/tabContext'
import { GenerateNewTab } from './tabs'
import { tab_uuid } from '../config/utils'
export default function SidebarComponent() {

    const {tabs,setTab,activeTab,setActiveTab,activeType, setActiveType,thisTab, setThisTab} = useContext(TabContext) 
 
    function addTab(tab){
        let tab_data = {}

        if (tab==='dc'){


 
        tab_data={
            'uuid':tab_uuid(),
            'title':'Data Cluster',
            'title_icon':<i class='bx bxs-data'></i>,
            'type':'dc'
        }
   
        }
        else if (tab==='ovw'){
            tab_data={
                'uuid':tab_uuid(),
                'title':'Overview',
                'title_icon':<i class='bx bxs-grid-alt'></i>,
                'type':tab
            }
        }
        else if (tab==='docs'){
            tab_data={
                'uuid':tab_uuid(),
                'title':'Documents',
                'title_icon':<i class='bx bxs-file-blank'></i>,
                'type':tab,
                'content':<GenerateNewTab tab={tab}/>
            }
        }
        else if (tab==='pics'){
            tab_data={
                'uuid':tab_uuid(),
                'title':'Pictures',
                'title_icon':<i class='bx bxs-file-image'></i>,
                'type':tab,
                'content':<GenerateNewTab tab={tab}/>
            }
            
        }
        else if(tab==='vids'){
            tab_data={
                'uuid':tab_uuid(),
                'title':'Videos',
                'title_icon': <i class='bx bxs-video'></i>,
                'type':tab,
                'content':<GenerateNewTab tab={tab}/>
            }
           
        }
        else if(tab==='audio'){
            tab_data={
                'uuid':tab_uuid(),
                'title':'Audios',
                'title_icon':     <i class='bx bxs-music'></i>,
                'type':tab,
                'content':<GenerateNewTab tab={tab}/>
            }
        }
        else if(tab==='starred'){
            tab_data={
                'uuid':tab_uuid(),
                'title':'Starred',
                'title_icon':<i class='bx bxs-bookmark'></i>,
                'type':tab
            }

        }
    
        else if(tab==='code'){
            tab_data={
                'uuid':tab_uuid(),
                'title':'Codes',
                'title_icon':        <i class='bx bx-code-curly' ></i>,
                'type':tab
            }

        }
        else if(tab==='git'){
            tab_data={
                'uuid':tab_uuid(),
                'title':'Git Repos',
                'title_icon':               <i class='bx bxl-git'></i>,
                'type':tab
            }

        }
        else if(tab==='api'){
            tab_data={
                'uuid':tab_uuid(),
                'title':'Api Integrations',
                'title_icon':<i class='bx bx-network-chart'></i>,
                'type':tab
            }

        }



      
            setTab([tab_data,...tabs])
   
        setActiveType(tab)
        setActiveTab([ tab_data.uuid,...activeTab])
        setThisTab(tab_data)
    console.log(activeTab)
    }
    function countType(data, type) {
        var count = 0;
        for (var i = 0; i < data.length; i++) {
          if (data[i].type === type) {
            count++;
          }
        }
        return count;
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
                    <div  onClick={()=>addTab('ovw')}  className={activeType==='ovw'?"sidebar-item active":'sidebar-item '}>
                        <div className="left">
                        <i class='bx bxs-grid-alt'></i>
                        <span>Overview</span> 
                        </div>
                   
                        <div className="right">
                    {countType(tabs,'ovw') >0 &&
                       <small>{countType(tabs,'ovw')} </small>}
                    </div>
                    </div>
                  
                    <div onClick={()=>addTab('dc')} className={activeType==='dc'?"sidebar-item active":'sidebar-item '}>
                    <div className="left">
                    <i class='bx bxs-data'></i>
                        <span>Data Cluster</span> 
                    </div>
                 

                        <div className="right">
                    {countType(tabs,'dc') >0 &&
                       <small>{countType(tabs,'dc')} </small>}
                    </div>
                    </div>
                    
               
             
                    <div className="endline">

                    </div>
                </div>
                <div className="sidebar-group">
                    <div onClick={()=>addTab('docs')} className={activeType==='docs'?"sidebar-item active":'sidebar-item '}>
                        <div className="left">
                        <i class='bx bxs-file-blank'></i>
                        <span>Documents</span> 
                        </div>
                        <div className="right">
                        {countType(tabs,'docs')>0&&
                       <small> {countType(tabs,'docs')} </small>}
                        </div>
                   
                    </div>
                    <div  onClick={()=>addTab('pics')} className={activeType==='pics'?"sidebar-item active":'sidebar-item '}>
                        <div className="left">

                   
                        <i class='bx bxs-file-image'></i>
                        <span>Pictures</span> 
                        </div>
                        <div className="right">
                        {countType(tabs,'pics') >0 &&
                       <small>{countType(tabs,'pics')} </small>}
                        </div>
                    </div>
                    <div  onClick={()=>addTab('vids')} className={activeType==='vids'?"sidebar-item active":'sidebar-item '}>
                        <div className="left">
                        <i class='bx bxs-video'></i>
                        <span>Videos</span> 
                        </div>
                        <div className="right">
                        {countType(tabs,'vids') >0 &&
                       <small>{countType(tabs,'vids')} </small>}
                        </div>
           
                    </div>
                    <div onClick={()=>addTab('audio')} className={activeType==='audio'?"sidebar-item active":'sidebar-item '}>
                        <div className="left">
                        <i class='bx bxs-music'></i>
                        <span>Audios</span> 
                        </div>
                
                        <div className="right">
                        {countType(tabs,'audio') >0 &&
                       <small>{countType(tabs,'audio')} </small>}
                        </div>
                    </div>
                    <div onClick={()=>addTab('starred')} className={activeType==='starred'?"sidebar-item active":'sidebar-item '}>
                        <div className="left">
                        <i class='bx bxs-bookmark'></i>
                        <span>Starred</span> 
                        </div>
                        <div className="right">
                        {countType(tabs,'starred') >0 &&
                       <small>{countType(tabs,'starred')} </small>}
                        </div>                 
                        
                    </div>
                    <div className="endline">
                        
                    </div>
                </div>
                <div className="sidebar-group">
                    <div onClick={()=>addTab('code')} className={activeType==='code'?"sidebar-item active":'sidebar-item '}>
                    <div className="left">
                    <i class='bx bx-code-curly' ></i>
                    <span>Codes</span> 
                    </div>
                    <div className="right">
                    {countType(tabs,'code') >0 &&
                       <small>{countType(tabs,'code')} </small>}
                    </div>
                  
                    </div>
                    <div onClick={()=>addTab('git')} className={activeType==='git'?"sidebar-item active":'sidebar-item '}>
                        <div className="left">
                        <i class='bx bxl-git'></i>
                        <span>Git Repos</span> 
                        </div>
             
                        <div className="right">
                    {countType(tabs,'git') >0 &&
                       <small>{countType(tabs,'git')} </small>}
                    </div>
                    </div>
                    <div onClick={()=>addTab('api')} className={activeType==='api'?"sidebar-item active":'sidebar-item '}>
                        <div className="left">
                        <i class='bx bx-network-chart'></i>
            
                            <span>API Integration</span> 
                        </div>
                        <div className="right">
                    {countType(tabs,'api') >0 &&
                       <small>{countType(tabs,'api')} </small>}
                    </div>
                    </div>
                   
                    <div className="endline">
                        
                    </div>
                    <div className={activeType=='documents'?"sidebar-item active":'sidebar-item '}>
                        <i class='bx bxs-cog' ></i>
                        <span>Settings</span> 
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
