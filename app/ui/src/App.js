import React,{useState,useEffect} from "react";
import Router from "./router";
import {AppContext} from "./context/appContext";
import axios from "axios";
import { homendpoints,headers } from "./config/constants";
function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [userD, setUserD] = useState({});
  async function initPage(){
  
    try {
      const response = await axios.post(homendpoints['home'],{'name':'tedd'},{headers:headers});
      setIsAuth(true)
      
   
    }
    catch (error) {
      console.log(error);
      setIsAuth(false);
      
      return (<>
  
      </>)
  
  
    }
  }
  useEffect(() => {
   console.log(isAuth)
    initPage();
  },[]);
  return (
    <AppContext.Provider value={{isAuth,setIsAuth,userD, setUserD}} >
        <Router/>
    </AppContext.Provider>

  );
}

export default App;
