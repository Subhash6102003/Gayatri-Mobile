import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import shopImage from '../layout/image.png.png';
import './Contact.css';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [formMessage, setFormMessage] = useState('');
  const sectionRef = useRef(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would submit to a server
    // For demo, just show a success message
    setFormMessage('Thank you for your inquiry! We will contact you soon.');
    
    // Reset form after submission
    setFormData({
      name: '',
      phone: '',
      message: ''
    });
    
    // Clear message after 5 seconds
    setTimeout(() => {
      setFormMessage('');
    }, 5000);
  };
    useEffect(() => {
    // Get animation elements
    const revealElements = document.querySelectorAll('.gsap-reveal');
    const staggerElements = document.querySelectorAll('.gsap-stagger');
      // Set initial state for animation
    revealElements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
      }
    });
    
    staggerElements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
      }
    });
    
    // Delay to ensure initial styles are applied
    setTimeout(() => {
      // GSAP animations with direct properties
      gsap.to('.gsap-reveal', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#contact',
          start: "top 85%",
        }
      });
      
      // GSAP animations for staggered elements
      gsap.to('.gsap-stagger', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-info',
          start: "top 85%",
        }
      });
    }, 100);
  }, []);
  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title gsap-reveal">Contact Us</h2>
        <div className="contact-container">
          <div className="contact-info gsap-reveal">
            <div className="contact-item gsap-stagger">
              <div className="contact-icon">
                <FontAwesomeIcon icon="phone" />
              </div>
              <div>
                <h3>Phone</h3>
                <p> 8963900439, 7974639694</p>
              </div>
            </div>
            <div className="contact-item gsap-stagger">
              <div className="contact-icon">
                <FontAwesomeIcon icon="map-marker-alt" />
              </div>
              <div>
                <h3>Address</h3>
                <p>Gour Colony, Malakhedi Road, Near SBI Bank, Narmadapuram (M.P.)</p>
              </div>
            </div>
            <div className="contact-item gsap-stagger">
              <div className="contact-icon">
                <FontAwesomeIcon icon="clock" />
              </div>
              <div>
                <h3>Business Hours</h3>
                <p>Mon - Sat: 10:00 AM - 8:00 PM</p>
                <p>Sunday: By Appointment</p>
              </div>
            </div>            <div className="contact-buttons">
              <a 
                href="https://wa.me/918963900439?text=Hello%20Gayatri%20Mobile,%20I'm%20interested%20in%20your%20services." 
                className="contact-btn whatsapp-btn gsap-stagger"
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (window.innerWidth < 768) {
                    // For mobile, use the direct WhatsApp link
                    window.location.href = "whatsapp://send?phone=918963900439&text=Hello%20Gayatri%20Mobile,%20I'm%20interested%20in%20your%20services.";
                    e.preventDefault();
                  }
                }}
              >
                <FontAwesomeIcon icon={['fab', 'whatsapp']} /> WhatsApp Us
              </a>
              <a 
                href="tel:+918963900439" 
                className="contact-btn call-btn gsap-stagger"
                onClick={(e) => {
                  // Confirm before making the call
                  if (!window.confirm("Call Gayatri Mobile at 8963900439?")) {
                    e.preventDefault();
                  }
                }}
              >
                <FontAwesomeIcon icon="phone" /> Call Now
              </a>
            </div>
            <form id="contactForm" className="contact-form gsap-reveal" onSubmit={handleSubmit}>
              <h4>Quick Inquiry</h4>
              <div className="form-group">
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Your Name" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  placeholder="Phone Number" 
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">                <textarea 
                  id="message" 
                  name="message" 
                  placeholder="Tell us about your phone issue" 
                  rows={3}
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="form-submit-btn">Send Inquiry</button>
              {formMessage && <div className="form-message success">{formMessage}</div>}
            </form>
          </div>          <div className="map-container gsap-reveal">
            <div className="shop-image-container">              {/* Using local shop image instead of map */}              <div className="shop-image">                <img 
                  src={shopImage} 
                  alt="Gayatri Mobile Shop" 
                  className="shop-location-image"
                />
              </div>
             
            </div>
            <div className="map-button-container">
              <button 
                className="map-button"
                onClick={() => window.open('https://maps.google.com/?q=Gayatri+Mobile+Gour+Colony+Malakhedi+Road+Narmadapuram+Madhya+Pradesh', '_blank')}
              >
                <FontAwesomeIcon icon="map-marker-alt" /> Open in Google Maps
              </button>
            </div>
             <div className="image-overlay">
                <div className="location-info">
                  <FontAwesomeIcon icon="map-marker-alt" size="2x" />
                  <span>Gayatri Mobile</span>
                  <p>Gour Colony, Malakhedi Road, Near SBI Bank, Narmadapuram (M.P.)</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
