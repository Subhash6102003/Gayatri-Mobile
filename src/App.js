import React, { useEffect, useState } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Accessories from './components/sections/Accessories';
import Services from './components/sections/Services';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { 
  faHome, 
  faInfoCircle, 
  faMobileAlt, 
  faTools, 
  faStar, 
  faEnvelope,
  faBars,
  faQuoteLeft,
  faPhone,
  faMapMarkerAlt,
  faClock,
  faStarHalfStroke,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

// Add FontAwesome icons to the library
library.add(
  fab,
  far,
  faHome, 
  faInfoCircle, 
  faMobileAlt, 
  faTools, 
  faStar, 
  faEnvelope, 
  faBars,
  faQuoteLeft,
  faPhone,
  faMapMarkerAlt,
  faClock,
  faStarHalfStroke,
  faChevronLeft,
  faChevronRight
);

function App() {
  const [isWebGLAvailable, setIsWebGLAvailable] = useState(true);
  
  useEffect(() => {
    // Check WebGL availability on component mount
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && 
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch(e) {
        return false;
      }
    };
    
    setIsWebGLAvailable(checkWebGL());
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <Hero isWebGLAvailable={isWebGLAvailable} />
        <About />
        <Accessories />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
