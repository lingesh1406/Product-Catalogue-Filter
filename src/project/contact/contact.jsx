
import React, { useEffect, useState } from 'react';
import "./contact.css";
import { validatingEmail } from '../context/common_tag';


const Contact = () => {

  const [ contact , setContact ] = useState({
    name:'',
    number:"",
    email:"",
    message:"",
    shoot:""
  });


  const storingValue = ( e ) => {
    setContact({...contact , [e.target.name] : e.target.value })
  };

  const numberChecking = (value) => {

    if(value.key == "e" || value.key =="E"){
      value.preventDefault();
    }
  };

  const [err , setErr] = useState({});

  const errChecking = (passingerr) => {
    let validating = {};

    if(passingerr.name == ""){
      validating.name="Enter your name";
    }

    if(passingerr.number == ''){
      validating.number="Enter your number";
    }

    else if(passingerr.number.length != 10 ){
      validating.number="Enter valid number";
    }

    if(!validatingEmail.test(passingerr.email)){
      validating.email="Enter valid email";
    }

    if(passingerr.message == ""){
      validating.message="Enter message";

    }

    if(passingerr.shoot == ""){
      validating.shoot="Enter message";

    }

    return validating;

  };

  const formSubmit = (e) => {
    e.preventDefault();
    setErr(errChecking(contact))
  }

  useEffect( () => {
    setErr(errChecking(contact));
  },[ contact ] )

  return (
    <>
      <div className="container-fluid bg-white ph-contact-main">

        <div className="container ph-contact-body">

          <div className="row py-5">

            <div className="col-lg-6 col-12 ph-contact-left">

              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-lg-6 col-12">
                  
                  <h1> CONTACT </h1>

                  <div className="col-lg-8 col-6  d-flex justify-content-between  align-items-center social-media">

                    <i className="fa-brands fa-instagram"></i>

                    <p className='m-0 col-8'> Lee_photography  </p>

                  </div>

                  <div className="col-lg-8 col-6 d-flex justify-content-between  align-items-center mt-4 social-media">

                    <i class="fa-solid fa-envelope"></i>

                    <p className='m-0 col-8'> lingeshwaran3496@gmail.com  </p>

                  </div>
                
                </div>

              </div>

            </div>

            <div className="col-lg-6 col-12 ph-contact-right">

              <div className="row">

                <form className="col-lg-9 col-12 input-div" onSubmit={formSubmit} >

                  <div className="col-12 d-flex flex-column mt-3">
                    <label htmlFor="username"> Name * </label>
                    <input type="text" id='username' className='px-2' name='name' onChange={storingValue}  value={contact.name} />
                    {err.name &&  <p> {err.name} </p> }
                  </div>

                  <div className="col-12 d-flex flex-column mt-3">
                    <label htmlFor="number"> Number * </label>
                    <input type="number" id='number' className='px-2' name='number' onKeyDown={numberChecking}  onChange={storingValue}  value={contact.number} />
                    {err.number  &&  <p> {err.number} </p> }

                  </div>

                  <div className="col-12 d-flex flex-column mt-3">
                    <label htmlFor="email"> Email * </label>
                    <input type="text" id='email' className='px-2' name='email'  onChange={storingValue}   value={contact.email} />
                    {err.email &&  <p> {err.email} </p> }
                  </div>

                  <div className="col-12 d-flex flex-column mt-3">
                    <label htmlFor="shoot"> Shoot * </label>
                    <input list='shooting' type="text" id='email' name='shoot' className='px-2'   onChange={storingValue}   value={contact.shoot} />
                    <datalist id='shooting'>

                      <option value="Marriage Shoot"></option>
                      <option value="Model Shoot"></option>
                      <option value="Candid Shoot"></option>

                    </datalist>
                    {err.shoot &&  <p> {err.shoot} </p> }
                  </div>

                  <div className="col-12 d-flex flex-column mt-3">
                    <label htmlFor="mess"> Message * </label>
                    <textarea type="text" id='mess' className='p-2' name='message' cols={20} rows={5}  onChange={storingValue}   value={contact.message} />
                    {err.message &&  <p> {err.message} </p> }

                  </div>

                  <div className="col-12 mt-3">

                    <button className='py-2'> Submit </button>
                    
                  </div>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>  
    </>
  )
}

export default Contact;