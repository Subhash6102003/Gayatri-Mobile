import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Accessories.css';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const Accessories = () => {
  const accessoriesSectionRef = useRef(null);
  useEffect(() => {
    // Set initial visibility for animation
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
        el.style.transform = 'translateY(20px)';
      }
    });

    // Delay to let initial styles take effect
    setTimeout(() => {
      // GSAP animations for section reveal
      gsap.to('.gsap-reveal', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#accessories',
          start: "top 85%",
        }
      });
      
      // GSAP animations for staggered brand items
      gsap.to('.gsap-stagger', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.brands-grid',
          start: "top 85%",
        }
      });
    }, 100);
  }, []);

  return (
    <section id="accessories" className="accessories" ref={accessoriesSectionRef}>
      <div className="container">
        <h2 className="section-title gsap-reveal">Wholesale Accessories</h2>
        <div className="accessories-content">                
          <div className="accessories-info gsap-reveal">
            <h3>Wide Range of Mobile Accessories</h3>
            <p>We offer wholesale accessories for all major brands at competitive prices with premium quality and genuine parts.</p>
            <div className="second-hand">
              <h4>Second Hand Mobile Phones</h4>
              <p>Quality checked second-hand phones with 3-month warranty and excellent condition at affordable prices.</p>              <div className="accessory-features">
                <div className="feature">
                  <svg className="brand-logo"><use xlinkHref="./brand-icons.svg#brand-check"></use></svg>
                  <span>Quality Tested</span>
                </div>
                <div className="feature">
                  <svg className="brand-logo"><use xlinkHref="./brand-icons.svg#brand-warranty"></use></svg>
                  <span>3-Month Warranty</span>
                </div>
                <div className="feature">
                  <svg className="brand-logo"><use xlinkHref="./brand-icons.svg#brand-price"></use></svg>
                  <span>Affordable Price</span>
                </div>
              </div>
            </div>
          </div>
          <div className="brands-container gsap-reveal">
            <h3>Brand Accessories</h3>
            <p>Accessories for all popular mobile phone brands:</p>
            <div className="brands-grid">              <div className="brand-item gsap-stagger">
                <svg className="brand-logo"><use href="/brand-icons.svg#brand-samsung"></use></svg>
                <span>Samsung</span>
              </div>
              <div className="brand-item gsap-stagger">
                <svg className="brand-logo"><use href="/brand-icons.svg#brand-apple"></use></svg>
                <span>Apple</span>
              </div>              <div className="brand-item gsap-stagger">
                <svg className="brand-logo"><use href="/brand-icons.svg#brand-xiaomi"></use></svg>
                <span>Xiaomi</span>
              </div>
              <div className="brand-item gsap-stagger">
                <svg className="brand-logo"><use href="/brand-icons.svg#brand-oppo"></use></svg>
                <span>OPPO</span>
              </div>
              <div className="brand-item gsap-stagger">
                <svg className="brand-logo"><use href="/brand-icons.svg#brand-vivo"></use></svg>
                <span>Vivo</span>
              </div>
              <div className="brand-item gsap-stagger">
                <svg className="brand-logo"><use href="/brand-icons.svg#brand-oneplus"></use></svg>
                <span>OnePlus</span>
              </div>
              <div className="brand-item gsap-stagger">
                <svg className="brand-logo"><use href="/brand-icons.svg#brand-realme"></use></svg>
                <span>Realme</span>
              </div>
              <div className="brand-item gsap-stagger">
                <svg className="brand-logo"><use href="/brand-icons.svg#brand-more"></use></svg>
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accessories;
