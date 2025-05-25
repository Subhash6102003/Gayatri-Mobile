import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef(null);
  useEffect(() => {
    // Get all reveal elements
    const revealElements = document.querySelectorAll('.gsap-reveal');
      // Set initial state for animation
    revealElements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
      }
    });
    
    // Delay to ensure initial styles are applied before animation
    setTimeout(() => {
      // GSAP animations using direct properties
      gsap.to('.gsap-reveal', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#services',
          start: "top 85%",
        }
      });
    }, 100);
  }, []);

  return (
    <section id="services" className="services" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title gsap-reveal">Our Services</h2>
        <div className="services-grid">                  <div className="service-card gsap-reveal glow-effect">
            <div className="service-icon">
              <svg className="brand-logo"><use xlinkHref="./brand-icons.svg#brand-tablet"></use></svg>
            </div>
            <h3>Broken Screen</h3>
            <p>Display replacement for all phone models with quality parts.</p>
          </div>
          <div className="service-card gsap-reveal glow-effect">
            <div className="service-icon">
              <svg className="brand-logo"><use xlinkHref="./brand-icons.svg#brand-chip"></use></svg>
            </div>
            <h3>IC Reballing</h3>
            <p>Expert IC Reballing service for motherboard repairs.</p>
          </div>                
          <div className="service-card gsap-reveal glow-effect">
            <div className="service-icon">
              <svg className="brand-logo"><use xlinkHref="./brand-icons.svg#brand-database"></use></svg>
            </div>
            <h3>Data Recovery</h3>
            <p>Rescue important data from damaged or malfunctioning devices.</p>          </div>
          <div className="service-card gsap-reveal glow-effect">
            <div className="service-icon">
              <svg className="brand-logo"><use xlinkHref="./brand-icons.svg#brand-battery"></use></svg>
            </div>
            <h3>Battery Replacement</h3>
            <p>Quality battery replacement for extended phone life.</p>
          </div>
          <div className="service-card gsap-reveal glow-effect">
            <div className="service-icon">
              <svg className="brand-logo"><use xlinkHref="./brand-icons.svg#brand-water"></use></svg>
            </div>
            <h3>Water Damage</h3>
            <p>Liquid damage treatment to restore phone functionality.</p>
          </div>
          <div className="service-card gsap-reveal glow-effect">
            <div className="service-icon">
              <svg className="brand-logo"><use xlinkHref="./brand-icons.svg#brand-lock"></use></svg>
            </div>
            <h3>Phone Unlocking</h3>
            <p>Unlock phones from networks and forgotten passwords.</p>
          </div>
      </div>
      </div>
    </section>
  );
};

export default Services;
