import React from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import AXX from '../axios/axios';
import { useState } from 'react';
import { decodeToken } from "react-jwt";

export const AllDatas = createContext(null);

const Context = ({children}) => {

  const [ Refresh , setRefresh ] = useState();
  const [ validuser , setValiduser ] = useState();
console.log(validuser);

  const [ PortraitsImage , setProtraitsImage ] = useState([]);

  const logout = () => {
    localStorage.removeItem("Token");
    setRefresh("hello")
  }

    useEffect(() => {

      if(localStorage.getItem("Token")){
        setValiduser(decodeToken(localStorage.getItem("Token")))
      }

      AXX.get("user/ImageGet")
      .then((data)=>{
        console.log(data);
        setRefresh(data);
        setProtraitsImage(data.data.data);
      })
      .catch((err)=> console.error(err))
    },[Refresh])

  const passing_Values = { PortraitsImage , validuser , logout};

  return (
   <AllDatas.Provider value={passing_Values} >

    {children}

   </AllDatas.Provider>
  )
}

export default Context;