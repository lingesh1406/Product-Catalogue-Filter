
import React, { useState } from 'react'
import "./about.css";
import marriage from "./images/marriage.jpg";
import { Link } from 'react-router-dom';

const About = () => {

    const [ shoots , setShoots ] = useState([
        {
            link:"/marriage",
            type:"Marriage",
            img:marriage
        },
        {
            link:"/candid",
            type:"Candid",
            img:marriage
        },
        {
            link:"/model",
            type:"Model",
            img:marriage
        },
    ])

  return (
    <>

    <div className="container-fluid bg-white shoots-main">

        <div className="container shoots-body">

            <div className="row d-flex justify-content-center align-items-center py-5">

                {
                    shoots.map((shoots) => {
                        return(<>

                            <div className="col-lg-3 col-12 my-lg-0 my-3 type-shoots">

                                <div className="col-12  shoot-image ">
                                    <img src={shoots.img} alt="" className='img-fluid' />
                                </div>

                                <div className="col-12 mt-5">

                                    <h3 className='my-4'>
                                        {shoots.type} Shoot
                                    </h3>

                                    <Link to={shoots.link}> <button>  Book Now  </button></Link>

                                </div>

                            </div>

                        </>)
                    } )
                }

            </div>

        </div>

    </div>

    <AboutContent/>

    </>
  )
}

export default About;

const AboutContent = () => {

    return(<>
    
        <div className="container-fluid about-content">

            <div className="row py-5 about-content-body d-flex justify-content-center align-items-center">

                <div className="col-lg-8 col-12 about-site p-5 d-flex flex-column justify-content-center align-items-center">

                    <h2 className='col-lg-10 col-12'>
                          Lee Here!!
                    </h2>

                    <p className='mt-4 text-white col-lg-8 col-12'>
                        I am a passionate photographer with an eye for detail and creativity. My skills include portrait, event, and lifestyle photography, with a strong focus on capturing authentic emotions and timeless moments. I specialize in natural lighting, composition, and storytelling through visuals. With experience in photo editing and retouching, I ensure every image is polished while maintaining its originality. My goal is to turn moments into lasting memories and create visuals that truly connect with people.
                    </p>

                </div>

            </div>

        </div>

        <div className="container-fluid photograper-image">

            <div className="row  ">

                {/* <img src={photograper} className='img-fluid p-0 h-50'  alt="" /> */}

            </div>

        </div>

    </>)

}
