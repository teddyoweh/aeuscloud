import React, {useState,useContext}from 'react'
import { TabContext } from '../context/tabContext'
export default function NavbarComponent({toggleUpload}) {
  const {tabs,setTab,activeTab,setActiveTab,setActiveType} = useContext(TabContext)
  function removeTab(index) {
    
    const newTabs = [...tabs];
    newTabs.splice(index, 1);
    const newActiveTabs = [...activeTab]
    newActiveTabs.pop()
    setActiveTab(newActiveTabs)
    setTab(newTabs);

  }
  function putTab(item1){
    const item = item1.index
    setActiveType(item1.type)
    const array = activeTab

    if(activeTab.includes(item)){
      var index = array.indexOf(item);
      if (index !== -1) {
        array.splice(index, 1);
      }
    }

    setActiveTab([...array,item])
    console.log(activeTab)
}
console.log(tabs)
  return (
    <>

    <nav>
      <div className="left">
        {
          tabs.map((item,index)=>{
            return (
              <>
                 <div className={activeTab[activeTab.length-1] ===index?"item active":"item"} onClick={()=>putTab(item)} key={index}>
          <div className="icon">
            {item.title_icon}
          </div>
          <div className="text">{item.title}</div>
          <div className="x" onClick={()=>removeTab(index)}>x</div>
        </div>
              </>
            )
          })
        }
     
     
      </div>
      <div className="right">
        <div className="item">
        <button onClick={()=>toggleUpload()}><i class='bx bx-plus'></i></button>
        </div>
       
      </div>
    </nav>
 
    </>
  )
}
