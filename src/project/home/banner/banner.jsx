import React, { useState } from 'react';
import './banner.css';
import bnr from "./images/banner5.jpg";

import { motion } from "framer-motion";

const Banner = () => {

    const [ bannerContent , setBannerContent ] = useState([
      {
        p:"Lee Photography",
        h1:"Click With Love",
        button:"Book Now"
      },
      {
        p:"",
        h1:"Portraits",
        button:""
      }
    ]);

  return (
    <>

        <div className="container-fluid banner-main ">

          <div className="row banner-img ">

            <img src={bnr} className='img-fluid p-0'  />

            <div className="row title-banner d-flex justify-content-center align-items-center ">

              <div className="col-lg-12 col-12 banner-content d-flex flex-column justify-content-center align-items-center">
                <motion.p
                  initial={{ opacity: 0, y:100 }}
                  animate={{ opacity: 1, y:0}}

                  transition={{
                    delay:.7,
                    duration:1
                  }}
                > Lee Photography </motion.p>

                <motion.h1
                initial={{ opacity: 0, y:100 }}
                  animate={{ opacity: 1, y:0}}

                  transition={{
                    delay:.9,
                    duration:1
                  }}
                > Click With Love </motion.h1>
                {/* <h1> The lens sees what the heart feels </h1> */}
                <motion.button
                  initial={{ opacity: 0, y:100 }}
                  animate={{ opacity: 1, y:0}}

                  transition={{
                    delay:1,
                    // animation:"in",
                    duration:1
                  }}
                > Book Now </motion.button>
              </div>

            </div>

          </div>
          
        </div>

    </>
  )
}

export default Banner;