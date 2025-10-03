

import React, { useState } from 'react';
import './portraits.css';
import { Navigation } from '../nav/nav';
import gal1 from "./galleryimages/gal1.jpg";
import gal2 from "./galleryimages/gal2.jpg";
import gal3 from "./galleryimages/gal3.jpg";
import gal4 from "./galleryimages/gal4.jpg";
import gal5 from "./galleryimages/gal5.jpg";
import gal6 from "./galleryimages/gal6.jpg";
import gal7 from "./galleryimages/gal7.jpg";
import gal8 from "./galleryimages/gal8.jpg";
import {toast}  from "react-toastify";
import AXX from '../axios/axios';
import { useContext } from 'react';
import { AllDatas } from '../context/context';
import Preloader from '../preloader/preloader';
import Footer from '../footer/footer';

const Portraits = () => {

  const [ image , setImage ] = useState('');

  const errcheck = (imgerr) => {

    if(imgerr == ""){
      toast.error("Upload the image");
    }

  };

  const imgtostring = async( event ) => {
    const selectingImg = event.target.files[0];

      const fileReading = new  FileReader
      await fileReading.readAsDataURL(selectingImg);

      const stringImg = new Promise( ( done , error ) => {

        fileReading.onload = () => { 
          done(fileReading.result) ;
          setImage( fileReading.result )
        }

        fileReading.onerror = ( err ) => { error(err) }

      } )

      return stringImg;
  };

  const imgsubbmit = () => {

    errcheck(image);

    if( image != "" ){
      AXX.post("user/ImagePost" , JSON.stringify({
        image:image
      }) )
      .then( (data) => { console.log(data);
        toast.success("Image Uploaded");
        setImage("")
       } )
       .catch( (err) => {
        console.error(err);
        toast.error("failed")
       } )
    }
  
  };

  return (
    <>

    <Navigation/>
        
        <div className="container-fluid portraits-main d-flex justify-content-center align-items-center">

            <div className="row portraits-banner d-flex justify-content-center align-items-center p-0">

                <div className="col-lg-4 col-12 d-flex flex-column justify-content-between align-items-center">

                  <h1 className='mb-2'> Portraits </h1>

                  <p className='mb-4'> Upload Your Portraits Here </p>

                  <div className="col-12 d-flex justify-content-evenly align-items-center ">
                    <input type="file" accept='.jpg , .jpeg , .png' className='col-7 px-2 ' placeholder='Upload your Image Here' onChange={imgtostring} />

                    <button onClick={imgsubbmit}> Submit </button>
                  </div>

                </div>
               
            </div>

        </div>

      <Gallery/>

      <Footer/>

    </>
  )
}

export default Portraits;

const Gallery = () => {

  const { PortraitsImage } = useContext(AllDatas);

  console.log(PortraitsImage);

  const gallery = [
    gal1,
    gal2,
    gal3,
    gal4,
    gal5,
    gal6,
    gal7,
    gal8
  ];


  return(<>

      <div className="container my-5 gallery-main ">


          <div className="row gallery-body d-flex flex-collum ">

            {/* <div className="col-4 mt-3 img-container">

              {
                gallery.map( (gal) => {

                  return(<>

                        <div className="col-12  mb-2">
                          <img src={gal} alt="" className='img-fluid' />
                        </div>

                  </>)

                } )
              }

            </div> */}

            <div className="row mt-3">

                {
                  PortraitsImage.length == 0 || PortraitsImage == undefined ?

                  <Preloader/>

                  :

                  [0,1,2].map((colIndex) => (

                    <div className="col-lg-4 col-12 img-container" key={colIndex} >

                      {PortraitsImage.filter((a , b) => b % 3 === colIndex )
                        .map((gal, i) => {
                          return(<>

                            <div className="col-12 mb-2" key={i}>
                              <img src={gal.image} alt="" className="img-fluid" />
                            </div>

                        </>)}

                        )}

                    </div>

                  ))
                }

            </div>

          </div>

      </div>

      
  
  </>)
}