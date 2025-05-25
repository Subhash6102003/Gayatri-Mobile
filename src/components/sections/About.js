import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import repairShopImage from '../../assets/images/repair-shop.svg';
import './About.css';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const phoneModelCanvasRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const textRef = useRef(null);
    useEffect(() => {    // Counter animation setup
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
      // Set initial value
      const updateCount = () => {
        if (!(counter instanceof HTMLElement)) return;
        const target = +(counter.getAttribute('data-count') || '0');
        const count = +(counter.innerText);
        const increment = target / 50; // Adjust the speed of counting
        if (count < target) {
          counter.innerText = Math.ceil(count + increment).toString();
          if (typeof setTimeout === 'function') {
            setTimeout(updateCount, 20);
          }
        } else {
          counter.innerText = target.toString();
        }
      };
      if (counter instanceof HTMLElement) {
        counter.innerText = '0';
      }
      // Start the animation when the section comes into view
      ScrollTrigger.create({
        trigger: counter,
        start: "top 80%",
        onEnter: () => updateCount(),
        once: true
      });
    });
      // Set initial state for animation elements
    const revealElements = document.querySelectorAll('.gsap-reveal');
    revealElements.forEach(el => {
      // Set initial state for animation
      if (el instanceof HTMLElement) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
      }
    });
      // Delay to ensure initial styles are properly applied before animation
    setTimeout(() => {
      // GSAP animations using ScrollTrigger with direct properties
      gsap.to(
        '.gsap-reveal',
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#about',
            start: "top 85%",
          }
        }
      );
    }, 100);
  }, []);
    
  // Separate useEffect for Three.js to avoid conflicts
  useEffect(() => {
    // Create a 3D phone model if canvas is supported
    if (phoneModelCanvasRef.current) {
      try {
        const isLowEndDevice = () => {
          const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
          if (navigator.hardwareConcurrency) {
            return isMobile && navigator.hardwareConcurrency <= 2;
          }
          return isMobile;
        };
        
        // Skip complex 3D on low-end devices
        if (isLowEndDevice()) return;
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
          canvas: phoneModelCanvasRef.current,
          alpha: true,
          antialias: true
        });
        
        renderer.setSize(300, 300);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Create a simple phone model
        const phoneGeometry = new THREE.BoxGeometry(1, 2, 0.1);
        const phoneMaterial = new THREE.MeshStandardMaterial({
          color: 0x333333,
          metalness: 0.7,
          roughness: 0.2,
        });
        const phone = new THREE.Mesh(phoneGeometry, phoneMaterial);
        
        // Screen material
        const screenGeometry = new THREE.BoxGeometry(0.9, 1.8, 0.02);
        const screenMaterial = new THREE.MeshBasicMaterial({
          color: 0x1f1f1f,
          opacity: 0.9,
          transparent: true
        });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.z = 0.06;
        
        phone.add(screen);
        scene.add(phone);
        
        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffd700, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        
        // Position camera
        camera.position.z = 3;
        
        let animationFrameId;
        
        // Animation
        const animate = () => {
          phone.rotation.y += 0.01;
          renderer.render(scene, camera);
          animationFrameId = requestAnimationFrame(animate);
        };
        
        animate();
        
        // Clean up
        return () => {
          cancelAnimationFrame(animationFrameId);
          scene.clear();
          renderer.dispose();
        };
      } catch (error) {
        console.error("Error initializing 3D model:", error);
      }
    }
  }, []);

  return (
    <section id="about" className="about" ref={aboutSectionRef} style={{ background: '#353839' }}>
      <div className="container">
        <h2 className="section-title gsap-reveal">About Us</h2>
        <div className="about-content">
          <div className="about-3d">
            <canvas ref={phoneModelCanvasRef} id="phone-model-canvas"></canvas>
            <div className="about-image">
              <img src={repairShopImage} alt="Mobile Repair Shop" />
            </div>
          </div>
          <div className="about-text gsap-reveal" ref={textRef}>
            <h3 className="highlight-text">Pro. Shree Jaiswal</h3>
            <p>We specialize in repairing and servicing all types of mobile phones with expertise in IC reballing, broken screen replacement, data recovery, and more.</p>
            <p>With years of experience in the mobile repair industry, we offer professional repairs with a quick turnaround time and competitive pricing.</p>
            <p>Our team of skilled technicians ensures your devices are handled with care and repaired to the highest standards.</p>
            <div className="experience-counter">
              <div className="counter-item">
                <span className="counter" data-count="2">0</span>
                <span>+</span>
                <p>Years Experience</p>
              </div>
              <div className="counter-item">
                <span className="counter" data-count="1000">0</span>
                <span>+</span>
                <p>Devices Repaired</p>
              </div>
              <div className="counter-item">
                <span className="counter" data-count="100">0</span>
                <span>%</span>
                <p>Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

