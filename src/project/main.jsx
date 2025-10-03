import React, { Suspense } from 'react';
import  { BrowserRouter, Route, Routes } from "react-router-dom"
  import { ToastContainer, toast } from 'react-toastify';
import RequiredUser from './context/requiredUser';
import Preloader from './preloader/preloader';

const Home = React.lazy(()=> import('./home/home') );
const Login = React.lazy(()=> import('./loginform/login') );
const Services = React.lazy(()=> import('./services/services') );
const Portraits = React.lazy(()=> import('./portraits/portraits') );


// import Home from "./home"

 const MainProject1 = () => {


  return (
    <>
        <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        // closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />

        <BrowserRouter>
          <Routes>
            <Route  path='/' element={ <Suspense fallback = {<Preloader/>} >  <Home/> </Suspense> } />
            <Route  path='/login' element={ <Suspense fallback = {<Preloader/>} >  <Login/> </Suspense> } />
            <Route  path='/register' element={ <Suspense fallback = {<Preloader/>} >  <Login/> </Suspense> } />
            <Route  path='/services' element={ <Suspense fallback = {<Preloader/>} >  <Services/> </Suspense> } />
            <Route  path='/portraits' element={ <Suspense fallback = {<Preloader/>} > <RequiredUser> <Portraits/>  </RequiredUser> </Suspense> } />

          </Routes>
        </BrowserRouter>

    </>
  )
}

export default MainProject1;
