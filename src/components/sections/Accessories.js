import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobile, faTablet, faLaptop } from '@fortawesome/free-solid-svg-icons';
import { faApple, faAndroid } from '@fortawesome/free-brands-svg-icons';
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
                {/* Samsung official SVG replaced with user-provided SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="brand-logo samsung" viewBox="0 0 256 256" style={{width: '40px', height: '40px', fill: '#fab005'}}>
                  <g fill="#fab005" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}>
                    <g transform="scale(5.12,5.12)">
                      <path d="M16.28125,0.03125c-0.12891,0.02344 -0.26172,0.04688 -0.375,0.125c-0.45703,0.30859 -0.55859,0.94922 -0.25,1.40625l2.15625,3.21875c-3.33203,1.76563 -5.81641,4.69922 -6.625,8.21875h27.625c-0.80859,-3.51953 -3.29297,-6.45312 -6.625,-8.21875l2.15625,-3.21875c0.30859,-0.45703 0.20703,-1.09766 -0.25,-1.40625c-0.46094,-0.30859 -1.09766,-0.17578 -1.40625,0.28125l-2.375,3.5c-1.64844,-0.60156 -3.4375,-0.9375 -5.3125,-0.9375c-1.875,0 -3.66406,0.33594 -5.3125,0.9375l-2.375,-3.5c-0.23047,-0.34375 -0.64844,-0.48047 -1.03125,-0.40625zM19.5,8c0.82813,0 1.5,0.67188 1.5,1.5c0,0.83203 -0.67187,1.5 -1.5,1.5c-0.83203,0 -1.5,-0.66797 -1.5,-1.5c0,-0.82812 0.66797,-1.5 1.5,-1.5zM30.5,8c0.83203,0 1.5,0.67188 1.5,1.5c0,0.83203 -0.66797,1.5 -1.5,1.5c-0.82812,0 -1.5,-0.66797 -1.5,-1.5c0,-0.82812 0.67188,-1.5 1.5,-1.5zM8,15c-1.65625,0 -3,1.34375 -3,3v14c0,1.65625 1.34375,3 3,3c0.35156,0 0.6875,-0.07422 1,-0.1875v-19.625c-0.3125,-0.11328 -0.64844,-0.1875 -1,-0.1875zM11,15v22c0,1.65234 1.34766,3 3,3h22c1.65234,0 3,-1.34766 3,-3v-22zM42,15c-0.35156,0 -0.6875,0.07422 -1,0.1875v19.625c0.3125,0.10938 0.64844,0.1875 1,0.1875c1.65625,0 3,-1.34375 3,-3v-14c0,-1.65625 -1.34375,-3 -3,-3zM15,42v4c0,2.20703 1.79297,4 4,4c2.20703,0 4,-1.79297 4,-4v-4zM27,42v4c0,2.20703 1.79297,4 4,4c2.20703,0 4,-1.79297 4,-4v-4z"></path>
                    </g>
                  </g>
                </svg>
                <span>Samsung</span>
              </div><div className="brand-item gsap-stagger">
                <svg xmlns="http://www.w3.org/2000/svg" className="brand-logo apple" viewBox="0 0 256 256" style={{width: '40px', height: '40px'}}>
                  <g fill="#fab005" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}>
                    <g transform="scale(5.12,5.12)">
                      <path d="M44.52734,34.75c-1.07812,2.39453 -1.59766,3.46484 -2.98437,5.57813c-1.94141,2.95313 -4.67969,6.64063 -8.0625,6.66406c-3.01172,0.02734 -3.78906,-1.96484 -7.87891,-1.92969c-4.08594,0.01953 -4.9375,1.96875 -7.95312,1.9375c-3.38672,-0.03125 -5.97656,-3.35156 -7.91797,-6.30078c-5.42969,-8.26953 -6.00391,-17.96484 -2.64844,-23.12109c2.375,-3.65625 6.12891,-5.80469 9.65625,-5.80469c3.59375,0 5.85156,1.97266 8.82031,1.97266c2.88281,0 4.63672,-1.97656 8.79297,-1.97656c3.14063,0 6.46094,1.71094 8.83594,4.66406c-7.76562,4.25781 -6.50391,15.34766 1.33984,18.31641zM31.19531,8.46875c1.51172,-1.94141 2.66016,-4.67969 2.24219,-7.46875c-2.46484,0.16797 -5.34766,1.74219 -7.03125,3.78125c-1.52734,1.85938 -2.79297,4.61719 -2.30078,7.28516c2.69141,0.08594 5.47656,-1.51953 7.08984,-3.59766z"></path>
                    </g>
                  </g>
                </svg>
                <span>Apple</span>
              </div><div className="brand-item gsap-stagger">
                <svg xmlns="http://www.w3.org/2000/svg" className="brand-logo xiaomi" viewBox="0 0 256 256" style={{width: '40px', height: '40px'}}>
                  <g fill="#fab005" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}>
                    <g transform="scale(5.12,5.12)">
                      <path d="M39,4h-28c-3.855,0 -7,3.145 -7,7v28c0,3.855 3.145,7 7,7h28c3.855,0 7,-3.145 7,-7v-28c0,-3.855 -3.145,-7 -7,-7zM23,34h-4v-11h4zM31,34h-4v-11c0,-1.66 -1.34,-3 -3,-3h-9v14h-4v-18h14c3.31,0 6,2.69 6,6zM39,34h-4v-18h4z"></path>
                    </g>
                  </g>
                </svg>
                <span>Xiaomi</span>
              </div>              <div className="brand-item gsap-stagger">
                {/* OPPO official SVG replaced with user-provided SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="brand-logo oppo" viewBox="0 0 61 61" width="40" height="40" style={{display: 'block', margin: '0 auto'}}>
                  <path fill="#e2c651" d="M7.7,17.5c-2,0-3.7,0.8-3.7,1.8c0,1,1.6,1.8,3.7,1.8c2,0,3.7-0.8,3.7-1.8C11.4,18.3,9.7,17.5,7.7,17.5L7.7,17.5z M7.3,20.7c-0.7,0-2.5-0.3-2.5-1.3c0-0.7,1.1-1.3,2.5-1.3c1.4,0,2.5,0.6,2.5,1.3C9.8,20,8.7,20.7,7.3,20.7L7.3,20.7z M32.3,17.5c-2,0-3.7,0.8-3.7,1.8c0,1,1.6,1.8,3.7,1.8c2,0,3.7-0.8,3.7-1.8C36,18.3,34.4,17.5,32.3,17.5L32.3,17.5z M31.9,20.7c-0.7,0-2.5-0.3-2.5-1.3c0-0.7,1.1-1.3,2.5-1.3c1.4,0,2.5,0.6,2.5,1.3C34.4,20,33.3,20.7,31.9,20.7L31.9,20.7z M16,17.5c2,0,3.7,0.8,3.7,1.8c0,1-1.7,1.8-3.7,1.8c-1,0-1.9-0.2-2.6-0.5v1.8h-1.3v-4.9h1.3V20c0.4,0.4,1.3,0.7,2.2,0.7c1.4,0,2.5-0.6,2.5-1.3c0-0.7-1.1-1.3-2.5-1.3c-0.5,0-0.9,0.1-1.3,0.2v-0.5C14.8,17.6,15.4,17.5,16,17.5L16,17.5z M24.3,17.5c2,0,3.7,0.8,3.7,1.8c0,1-1.7,1.8-3.7,1.8c-1,0-1.9-0.2-2.6-0.5v1.8h-1.3v-4.9h1.3V20c0.4,0.4,1.3,0.7,2.2,0.7c1.4,0,2.5-0.6,2.5-1.3c0-0.7-1.1-1.3-2.5-1.3c-0.5,0-0.9,0.1-1.3,0.2v-0.5C23.1,17.6,23.7,17.5,24.3,17.5L24.3,17.5z"/>
                </svg>
                <span>OPPO</span>
              </div>              <div className="brand-item gsap-stagger">
                {/* Vivo official SVG replaced with user-provided SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="brand-logo vivo" viewBox="0 0 62.17 17.27" width="40" height="40" style={{display: 'block', margin: '0 auto'}}>
                  <path fill="#eacc3b" fillRule="evenodd" d="M48.82 6.9c.57-.11 4.52 0 5.43 0a11.89 11.89 0 0 1 2.64.1c3.85 1 3.82 7-.35 7.75-.62.11-4.5 0-5.44 0a12.21 12.21 0 0 1-2.64-.11 4 4 0 0 1-2.62-5.23 3.76 3.76 0 0 1 3-2.52zm13.31 4.66a6.42 6.42 0 0 0-2.19-5.69 6.18 6.18 0 0 0-2.66-1.32 20.77 20.77 0 0 0-3.82-.13h-4a6 6 0 0 0-3.17.82 6.53 6.53 0 0 0-.9 10.51c2 1.71 3.94 1.46 6.47 1.46h4a6.21 6.21 0 0 0 6.27-5.65zM24.47 6.15a6.78 6.78 0 0 0 1 1.64l3.15 4.62c.58.91 1.38 2.22 2.06 3.09a3.94 3.94 0 0 0 3.42 1.76 4 4 0 0 0 3.13-2c.68-1 1.37-2 2.09-3.08L43 6.73a1.31 1.31 0 0 0-1.27-2.09 2.26 2.26 0 0 0-1.32 1.26L38.32 9c-.69 1-1.39 2.07-2.09 3.08-.36.52-.68 1-1 1.54s-.76 1.2-1.55 1a2.77 2.77 0 0 1-1.29-1.31l-1-1.54c-.7-1-1.37-2-2.1-3.08s-1.36-2-2.09-3.08a1.53 1.53 0 0 0-1.59-1 1.31 1.31 0 0 0-1.14 1.54zM0 6.12a6 6 0 0 0 1 1.64l4.19 6.16c1 1.56 2 3.42 4.43 3.34 2.2-.08 3.11-1.92 4.23-3.58L17 9.06c.33-.5.69-1 1.05-1.54a2.77 2.77 0 0 0 .8-1.78 1.31 1.31 0 0 0-1.52-1.11A2.12 2.12 0 0 0 16 5.87c-.73 1.07-1.38 2.01-2.1 3.13s-1.38 2-2.1 3c-.37.53-.68 1-1 1.54a1.65 1.65 0 0 1-1.52 1.06 2.55 2.55 0 0 1-1.32-1.31c-1.73-2.47-3.53-5.18-5.24-7.71a1.55 1.55 0 0 0-1.58-1A1.31 1.31 0 0 0 0 6.12zm21.4-1.48c-1.28.27-1.07 1.36-1.07 2.72V15a2.94 2.94 0 0 0 .23 1.69 1.31 1.31 0 0 0 2.33-.34c.12-.4.06-5 .06-5.67V6.85a3 3 0 0 0-.22-1.68 1.28 1.28 0 0 0-1.31-.55zM21.47 0a1.64 1.64 0 0 0-.47.47l-1 .94c-.6.59-.1.86.67 1.59l.47.47c.61.61.84.16 1.64-.64C23.9 1.76 23.86 2 22.13.27a.57.57 0 0 0-.66-.27z"/>
                </svg>
                <span>Vivo</span>
              </div>
              <div className="brand-item gsap-stagger">
                {/* OnePlus logo SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" className="brand-logo oneplus" viewBox="0 0 61 61" width="40" height="40">
                  <path fill="#d8ce43" d="M18.5 47.8v-5.3h5.3V26.6h-5.3v-5.4h10.6v21.2h5.4v5.3h-16zM53 61V26.5h-5.3v29.2H5.3V13.3h29.2V8H0v53zm0-39.8v-8h8V8h-8V0h-5.3v8h-8v5.3h8v8H53z"/>
                </svg>
                <span>OnePlus</span>
              </div>
              <div className="brand-item gsap-stagger">
                {/* Realme icon by Icon Mafia from Iconscout: https://iconscout.com/icons/realme */}
                <svg xmlns="http://www.w3.org/2000/svg" className="brand-logo realme" viewBox="0 0 256 256" style={{width: '40px', height: '40px'}}>
                  <g fill="#fab005">
                    <rect width="256" height="256" rx="60"/>
                    <path d="M80 96h48a32 32 0 1 1 0 64h-32v-16h32a16 16 0 1 0 0-32H80zm0 0v64h16v-24h32a8 8 0 1 1 0 16h-32v8h32a24 24 0 1 0 0-48H80z" fill="#fff"/>
                  </g>
                </svg>
                <span>Realme</span>
                {/* Realme by Icon Mafia: https://iconscout.com/icons/realme */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accessories;
