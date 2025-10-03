import React, { useState } from 'react';
import './login.css';
import AXX from '../axios/axios';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const Login = () => {

  return (
    <>

        <div className="container-fluid main-login d-flex justify-content-center align-items-center">

          <div className="login-body">

              { location.pathname == '/login' ?
              <LoginForm/> 
              :
              <Register />
              }

          </div>

        </div>

    </>
  )
}

export default Login;


const LoginForm = ( {form} ) => {
 const navigate = useNavigate();

  const [ loginData , setLoginData  ] = useState(
    {
      useremail:"",
      password:""
    }
  );

  const [ err , setErr ] = useState({});

  const errHandling = (errCheck) => {
    let err = {};

    if(errCheck.useremail == ""){
      err.useremail = "enter email"
    }

    if(errCheck.password == ""){
      err.password = "enter password"
    }

    else if(errCheck.password.length < 8 ){
      err.password = "password should contain atleast 8 character"
    }

    return err;

  };

  const storingData = (e) => {
    setLoginData({...loginData , [ e.target.name] : e.target.value })
  };

  const submitForm = (e) => {
    setErr(errHandling(loginData));

    if(Object.keys(err).length === 0 && loginData.useremail != "" && loginData.password != ""  ){
      console.log(loginData);

      AXX.post("user/login", loginData)
      .then( (data) => { 
        console.log(data);
        toast.success('successfully login');
        navigate("/");
        localStorage.setItem("Token",JSON.stringify(data.data.tok))
       })
      .catch( (err) => { console.error(err) ;
        toast.error('login failed')
       } )

    }
  };

  return (
    <>

      <div className="form-main d-flex justify-content-center align-items-center flex-column">

        <div className="form-title mb-4">

          <h1> Login </h1>

        </div>

      <form action={submitForm} className='d-flex flex-column justify-content-center align-items-center '>

        <input type="text" className='py-2 px-3 mt-2' placeholder='Email' name='useremail' onChange={storingData} value={loginData.useremail}  />
        { err.useremail &&   <p className='m-0'> {err.useremail}  </p> }

        <input type="password" className='py-2 px-3 mt-2' placeholder='Password' name='password' onChange={storingData} value={loginData.password}   />
        { err.password &&   <p className='m-0'> {err.password}  </p> }

        <div className="col-12 d-flex justify-content-center align-items-center m-2">

          <h6 className='text-white 400 m-0'> Don't have an Account?  <Link to={'/register'}> Register here </Link> </h6>

        </div>

        <button className='px-4 py-1 mt-2'> Submit </button>

      </form>

      </div>

    </>
  )
}

const Register = ( {form } ) => {
 const navigate = useNavigate();

  const [ RegisterData , setRegisterData  ] = useState(
    {
      username:"",
      useremail:"",
      password:""
    }
  );

  const [ otp , setOtp ] = useState("");
  const [ validatingOtp , setValOtp ] = useState(true);

   const [ err , setErr ] = useState({});


  const errHandling = (errCheck) => {
    let err = {};

    if(validatingOtp){

    if(errCheck.username == ""){
      err.username = "enter username"
    }

    if(errCheck.useremail == ""){
      err.useremail = "enter email"
    }

    if(errCheck.password == ""){
      err.password = "enter password"
    }

    else if(errCheck.password.length < 8 ){
      err.password = "password should contain atleast 8 character"
    }
    return err;

    }
    if(!validatingOtp){

      if(errCheck.otp == ""){
        err.otp = "enter otp"
      }
      else if(errCheck.otp.length < 6 || errCheck.otp.length > 6 ){
        err.otp = "otp has 6 characters"
      }

      return err
    }

  };

  const storingData = (e) => {
    setRegisterData({...RegisterData , [ e.target.name] : e.target.value })
  };

  const otpchecking = (e) => {

    if( validatingOtp ){

      setErr(errHandling(RegisterData));
  
      if(Object.keys(err).length === 0 && RegisterData.useremail != "" && RegisterData.password != "" ){

        AXX.post("validuser/otp", RegisterData)
        .then( (data) => {
          console.log(data);
          toast.success(`Enter the otp that sended to ${data.data.useremail}`);
          setValOtp(false);
        })
        .catch( (err) => {
          console.error(err);
          {err.response.data ? 
            toast.error(err.response.data.message)
              :
            toast.error("failed")
          }

        })

      }

    }

    else{

      setErr(errHandling({otp}));

      if(Object.keys(err).length === 0 && otp != "" && otp.length == 6 ){

        AXX.post("user/signup", {RegisterData,otp})
        .then( (data) => {
          console.log(data) ;
          toast.success("successfully Registered");
          navigate("/");

        })
        .catch( (err) => {
          console.error(err);
          {err.response.data ? 
            toast.error(err.response.data.message)
              :
            toast.error("failed")
          }
          
        })

      };

    
    }

  };

  const resendotp = () => {


      AXX.post("validuser/otp", RegisterData)
      .then( (data) => {
        console.log(data);
        toast.success("otp resended");
       })
      .catch( (err) => {
        console.error(err);
        {err.response.data ? 
          toast.error(err.response.data.message)
            :
          toast.error("failed")
         }
        
       } )

  
  }

  return (
    <>

    <div className="form-main d-flex justify-content-center align-items-center flex-column py-4">

      <div className="form-title mb-3">

        <h1 className='m-0'> Register </h1>

      </div>

      <form action={otpchecking} className=' '>

        {
          validatingOtp ?
            <div className="d-flex flex-column justify-content-center align-items-center">

              <input type="text" className='py-2 px-3 ' placeholder='username' name='username' onChange={storingData} value={RegisterData.username}  />
              { err.username &&   <p className='m-0'> {err.username}  </p> }

              <input type="text" className='py-2 px-3 mt-2' placeholder='Email' name='useremail' onChange={storingData} value={RegisterData.useremail}  />
              { err.useremail &&   <p className='m-0'> {err.useremail}  </p> }

              <input type="password" className='py-2 px-3 mt-2' placeholder='Password' name='password' onChange={storingData} value={RegisterData.password}   />
              { err.password &&   <p className='m-0'> {err.password}  </p> }

              <div className="col-12 d-flex justify-content-center align-items-center m-2">
                <h6 className='text-white 400 m-0'> have an Account?  <Link to={'/login'}> Login here </Link> </h6>
              </div>

              <button className='px-4 py-1 mt-2'> Submit </button>

            </div>
          :
          <div className="d-flex flex-column justify-content-center align-items-center">

            <input type="text" className='py-2 px-3 ' placeholder='otp' name='otp' maxLength={6} minLength={6} onChange={(e) => setOtp(e.target.value) } value={otp}  />
            { err.otp &&   <p className='m-0'> {err.otp}  </p> }

            <div className="col-12 d-flex justify-content-center align-items-center m-2">
              <h6 className='text-white 400 m-0'> resend otp  <Link onClick={resendotp}> Click here </Link> </h6>
            </div>

            <button className='px-4 py-1 mt-2'> Submit </button>

          </div>
        }



      </form>

    </div>

    </>
  )
}
