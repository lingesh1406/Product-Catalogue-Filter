
import React from 'react';
import "./preloader.css";

function Preloader() {


  return (
    <>
         <div className="container-fluid pho-loader d-flex justify-content-center align-items-center">
        <div className="preloader  d-flex justify-content-center align-items-center">
            <div className="ani"></div>
            <div className="ani"></div>
            <div className="ani"></div>
            <div className="ani"></div>
        </div>
    </div>
    </>
  )
}

export default Preloader;