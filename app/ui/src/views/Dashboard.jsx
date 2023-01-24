import React,{useState} from 'react';
import { SidebarComponent,NavbarComponent } from '../components';


export default function DashboardPage() {
  return (
    <>

    <div className='app-c'>
      <SidebarComponent where='overview'/>
      <div className="dash-app">
        <NavbarComponent/>
      </div>
    </div>
       <div className="addnewbox">
        <div className="exit">
        <i class='bx bx-x' ></i>   
             </div>
             <div className="addnew">
              
             </div>
      
       </div>

       </>
  )
}
