import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import Section from '../common/Section';
import Button from '../common/Button';
import { useHeroAnimation } from '../hooks/useAnimation';
import './Hero.css';

const Hero = ({ isWebGLAvailable }) => {
  const canvasRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const heroSectionRef = useRef(null);
  const [threeJsInitialized, setThreeJsInitialized] = useState(false);
  
  // First useEffect for Three.js initialization
  useEffect(() => {
    // Check if WebGL is available and canvas exists
    if (!isWebGLAvailable || !canvasRef.current) {
      // Add a fallback background if WebGL is not available
      if (heroSectionRef.current) {
        heroSectionRef.current.style.background = 'radial-gradient(circle at 30% 30%, #1a1a1a 0%, #0f0f0f 70%)';
        
        // Add a subtle pattern overlay
        const overlay = document.createElement('div');
        overlay.classList.add('hero-fallback-overlay');
        heroSectionRef.current.appendChild(overlay);
      }
      return;
    }

    let animationFrameId;
    let scene, camera, renderer, particleMesh, phoneMesh;

    try {
      // Initialize Three.js scene
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ 
        canvas: canvasRef.current,
        antialias: true,
        alpha: true
      });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffd700, 0.2);
      scene.add(ambientLight);
      
      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0xffd700, 0.5);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);
      
      // Add point light for better 3D object lighting
      const pointLight = new THREE.PointLight(0xffd700, 0.8);
      pointLight.position.set(2, 3, 4);
      scene.add(pointLight);

      // Create particles
      const particleGeometry = new THREE.BufferGeometry();
      const particleCount = 1000;
      
      const posArray = new Float32Array(particleCount * 3);
      
      for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
      }
      
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      
      const particleMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0xffd700,
        transparent: true,
        opacity: 0.8
      });
      
      particleMesh = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particleMesh);
      
      // Create a low-poly mobile phone 3D object
      const phoneGeometry = new THREE.BoxGeometry(1, 1.8, 0.1);
      const phoneMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x353839,
        metalness: 0.7,
        roughness: 0.2,
        emissive: 0x111111
      });
      phoneMesh = new THREE.Mesh(phoneGeometry, phoneMaterial);
      
      // Create screen for the phone
      const screenGeometry = new THREE.BoxGeometry(0.85, 1.5, 0.01);
      const screenMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x1a1a1a,
        transparent: true,
        opacity: 0.9
      });
      const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
      screenMesh.position.z = 0.06;
      phoneMesh.add(screenMesh);
      
      // Add screen glow
      const glowGeometry = new THREE.BoxGeometry(0.87, 1.52, 0.01);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xffd700,
        transparent: true,
        opacity: 0.2
      });
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      glowMesh.position.z = 0.07;
      phoneMesh.add(glowMesh);
      
      // Position phone in scene
      phoneMesh.position.set(-2.5, 0, 2);
      phoneMesh.rotation.y = Math.PI * 0.1;
      scene.add(phoneMesh);
      
      // Position camera
      camera.position.z = 5;
      
      // Animation
      const clock = new THREE.Clock();
      
      const animate = () => {
        const elapsedTime = clock.getElapsedTime();
        
        if (particleMesh) {
          // Rotate particle mesh
          particleMesh.rotation.y = elapsedTime * 0.05;
          // Mouse movement effect
          particleMesh.rotation.x = elapsedTime * 0.03;
        }
        
        if (phoneMesh) {
          // Add a floating animation for the phone
          phoneMesh.position.y = Math.sin(elapsedTime * 0.8) * 0.1;
          phoneMesh.rotation.y = Math.PI * 0.1 + Math.sin(elapsedTime * 0.5) * 0.1;
          phoneMesh.rotation.x = Math.sin(elapsedTime * 0.3) * 0.05;
          // Add a slight wobble
          phoneMesh.rotation.z = Math.sin(elapsedTime * 0.2) * 0.02;
        }
        
        // Renderer
        renderer.render(scene, camera);
        
        // Call animate recursively
        animationFrameId = window.requestAnimationFrame(animate);
      };
      
      animate();
      
      // Handle window resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          // Adjust phone position based on screen width with better responsiveness
        if (phoneMesh) {
          if (window.innerWidth <= 400) {
            // Extra small devices
            phoneMesh.position.set(-0.5, 0, 2);
            phoneMesh.scale.set(0.5, 0.5, 0.5);
          } else if (window.innerWidth <= 768) {
            // Mobile devices
            phoneMesh.position.set(-1, 0, 2);
            phoneMesh.scale.set(0.7, 0.7, 0.7);
          } else if (window.innerWidth <= 1200) {
            // Tablets and small laptops
            phoneMesh.position.set(-2, 0, 2);
            phoneMesh.scale.set(0.8, 0.8, 0.8);
          } else {
            // Large screens
            phoneMesh.position.set(-2.5, 0, 2);
            phoneMesh.scale.set(1, 1, 1);
          }
        }
      };
      
      window.addEventListener('resize', handleResize);
      
      // Initial resize to set correct positions
      handleResize();
      
      setThreeJsInitialized(true);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.cancelAnimationFrame(animationFrameId);
        
        // Clean up Three.js resources
        if (scene) scene.clear();
        if (renderer) renderer.dispose();
      };
    } catch (error) {
      console.error("Three.js initialization error:", error);
      if (heroSectionRef.current) {
        heroSectionRef.current.style.background = 'radial-gradient(circle at 30% 30%, #1a1a1a 0%, #0f0f0f 70%)';
      }
      return () => {};
    }
  }, [isWebGLAvailable]);
    // Second useEffect for GSAP animations - only runs after ThreeJS is initialized or skipped
  useEffect(() => {
    // Safe animation of content with refs
    if (headingRef.current && textRef.current && buttonRef.current) {
      // Set initial state for elements
      headingRef.current.style.opacity = 0;
      headingRef.current.style.transform = 'translateY(20px)';
      textRef.current.style.opacity = 0;
      textRef.current.style.transform = 'translateY(20px)';
      buttonRef.current.style.opacity = 0;
      buttonRef.current.style.transform = 'translateY(20px)';
      
      // Delay slightly to ensure styles are applied
      setTimeout(() => {
        // Animate elements
        gsap.to(headingRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out'
        });
        
        gsap.to(textRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.6,
          ease: 'power3.out'
        });
        
        gsap.to(buttonRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.8,
          ease: 'power3.out'
        });
      }, 100);
    }
  }, [threeJsInitialized]);

  return (
    <section className="hero" ref={heroSectionRef}>
      {isWebGLAvailable && <canvas ref={canvasRef} id="hero-canvas"></canvas>}
      <div className="container">
        <div className="hero-content">
          <h2 ref={headingRef} className="animated-heading">Expert Mobile Phone Repair Services</h2>
          <p ref={textRef} className="animated-text">Quality repairs with genuine parts and professional service</p>
          <a ref={buttonRef} href="#contact" className="btn-primary animated-button">Contact Us</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
