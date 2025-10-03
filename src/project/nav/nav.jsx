import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import './nav.css';
import { AllDatas } from '../context/context';

export const Navigation = () => {


  const [ navAni , setNavAni ] = useState(false);

  const { validuser , logout } = useContext(AllDatas);

  const [ responsive , setResponsive ] = useState(false);

  // const onscroll = () => {
  //   if(window.scrollY > 100){
  //     setNavAni(true)
  //     console.log(window.scrollY);
      
  //   }
  //   else{
  //     setNavAni(false)
  //   }
  // }

  // window.addEventListener("scroll",onscroll);


  return (
    <>
      <div className="container-fluid  main-navigation d-flex justify-content-center align-items-center" id={navAni && "header"} >
          
          <div className="container nav-body d-flex justify-content-between py-4 " >

            <div className="col-2 d-flex justify-content-center align-items-center">
                <Link to={'/'} > LOGO </Link>
            </div>

            <div className="col-lg-8 col-12 d-flex justify-content-between nav-links " id={responsive && "responsive"}>

              <div className="p my-lg-0 my-3 "> 
                <Link to={'/'}> Home </Link>
              </div>

              <div className="p my-lg-0 my-3">
                <Link to={'/portraits'}> portraits </Link>
              </div>

              <div className="p my-lg-0 my-3">

                <Link to={"/services"}> Services </Link>

              </div>

              <div className="p my-lg-0 my-3">

                <Link to={"/my-profile"}> Portfolio </Link>

              </div>

              <div className=" my-lg-0 my-3 text-center d-flex justify-content-center align-items-center user-div">

              { validuser ?
              <>


                <Link  onClick={logout}> Log-out </Link>

              </>
               
              :

              <Link to={'/login'}> Log-In </Link>

                }
              </div>

            </div>

                <div className="menu-icon " >

                <i className="fa-solid fa-user"></i>

                  {
                    responsive ?
                    <i class="fa-solid fa-x"  onClick={()=>setResponsive(!responsive)}></i>

                    :

                    <i class="fa-solid fa-bars" onClick={()=>setResponsive(!responsive)}></i>

                  }

                </div>

          </div>

      </div>
    </>
  )
}
