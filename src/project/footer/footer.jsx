import React from 'react'
import './footer.css';
import { Link } from 'react-router-dom';


const Footer = () => {



  return (
    <>
        <div className="container-fluid  photo-footer d-flex justify-content-center align-items-center">

            <div className="container">

                <div className="row  d-flex justify-content-center align-items-center photo-footer-copyrights">

                    <div className="col-lg-6 col-8 d-flex justify-content-center align-items-center">
                        <h6 className='m-0'> @Designed By Lingeshwaran </h6>
                    </div>

                     <div className="col-lg-6 col-2 d-flex justify-content-center align-items-center">

                        <Link to={'https://www.instagram.com/lee_____photography/'} target='-blank'> 

                            <i className="fa-brands fa-instagram"></i>

                         </Link>
                    </div>

                </div>

            </div>

        </div>
    </>
  )
}

export default Footer