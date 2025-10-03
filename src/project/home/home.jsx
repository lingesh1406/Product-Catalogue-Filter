import React from 'react';
import { Navigation } from '../nav/nav';
import Banner from './banner/banner';
import About from './about/about';
import Contact from '../contact/contact';
import Footer from '../footer/footer';

 const Home = () => {
  return (
    <>
  
        <Navigation/>
      
        <Banner/>

        <About/>

        <Contact/>

        <Footer/>

    </>
  )
}
export default Home;