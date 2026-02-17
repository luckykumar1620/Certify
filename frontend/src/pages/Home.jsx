import React from 'react'
import Hero from '../components/sections/Hero';
import Stats from '../components/Stats';
import Features from '../components/sections/Features';
import About from '../components/sections/About';
import Contact from '../components/sections/Contact';
import Footer from '../components/layout/Footer';

const Home = () => {
  return (
    <>
      <Hero/>
      <Stats/>
       <Features/>
      <About/>
      <Contact/>
      <Footer/>
     
    </>
  )
}

export default Home;
