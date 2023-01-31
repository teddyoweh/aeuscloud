import React,{useState,useEffect} from "react";
import Router from "./router";
import {AppContext} from "./context/appContext";
import axios from "axios";
import { homendpoints,headers } from "./config/constants";
import { UserContext } from "./context/userContext";
import { TabContext } from "./context/tabContext";
function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [tabs, setTab] = useState([]);
  const [activeTab,setActiveTab] = useState([])
  const [activeType, setActiveType] =useState('')
  const [userD, setUserD] = useState(JSON.parse(localStorage.getItem("user")));
  async function initPage(){
  
    try {
      const response = await axios.post(homendpoints['home'],{'name':'tedd'},{headers:headers});
      setIsAuth(true)

      
      
   
    }
    
    catch (error) {
 
      setIsAuth(false);
      
    
  
  
    }
  }
  useEffect(() => {
 
    initPage();
  },[]);
  return (
    <AppContext.Provider value={{isAuth,setIsAuth}} >
      <UserContext.Provider value={{userD, setUserD}}>
        <TabContext.Provider value={{tabs,setTab,activeTab,setActiveTab,activeType, setActiveType}}>


   
      
        <Router/>
        </TabContext.Provider>
        </UserContext.Provider>
    </AppContext.Provider>

  );
}

export default App;
