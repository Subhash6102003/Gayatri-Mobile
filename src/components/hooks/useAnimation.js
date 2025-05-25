import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for animated elements with GSAP and ScrollTrigger
 * @param {Partial<{ duration: number; delay: number; ease: string; y: number; stagger: boolean; staggerAmount: number; start: string; }>} options - Animation options
 * @returns {Object} Reference object to attach to the element
 */
export const useScrollAnimation = (options = {}) => {
  const {
    duration = 1,
    delay = 0,
    ease = 'power3.out',
    y = 50,
    stagger = false,
    staggerAmount = 0.2,
    start = 'top 80%'
  } = options;
  
  const element = useRef(null);
  
  useEffect(() => {
    const elementRef = element.current;
    if (!elementRef || !(elementRef instanceof HTMLElement)) return;
    
    // Set initial state
    gsap.set(elementRef, { y: y, opacity: 0 });
    
    // Create animation
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: elementRef,
        start: start,
        toggleActions: 'play none none none'
      }
    });
    
    // Handle staggered animation if there are children elements
    if (stagger && elementRef.children.length > 0) {
      timeline.to(Array.from(elementRef.children), {
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease,
        stagger: staggerAmount
      });
    } else {
      timeline.to(elementRef, {
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease
      });
    }
    
    // Cleanup function
    return () => {
      if (timeline.scrollTrigger) {
        timeline.scrollTrigger.kill();
      }
      timeline.kill();
    };
  }, [duration, delay, ease, y, stagger, staggerAmount, start]);
  
  return element;
};

/**
 * Custom hook for animating hero section with GSAP
 * @returns {Object} Reference object to attach to the element
 */
export const useHeroAnimation = () => {
  const element = useRef(null);
  
  useEffect(() => {
    const heroRef = element.current;
    if (!heroRef || !(heroRef instanceof HTMLElement)) return;
    
    // Set initial state for children elements
    const animatedEls = heroRef.querySelectorAll('.hero-animated');
    gsap.set(animatedEls, {
      y: 30,
      opacity: 0
    });
    
    // Create timeline animation
    const timeline = gsap.timeline({ delay: 0.2 });
    
    timeline
      .to(heroRef.querySelector('.hero-title'), {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      })
      .to(heroRef.querySelector('.hero-subtitle'), {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6')
      .to(heroRef.querySelector('.hero-cta'), {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4');
    
    // Cleanup function
    return () => {
      timeline.kill();
    };
  }, []);
  
  return element;
};

/**
 * Custom hook for text reveal animation
 * @returns {Object} Reference object and text split function
 */
export const useTextReveal = () => {
  const element = useRef(null);
  
  const splitText = (text) => {
    return text.split('').map((char, i) => (
      <span key={i} className="text-reveal-char">{char}</span>
    ));
  };
  
  useEffect(() => {
    const textRef = element.current;
    if (!textRef || !(textRef instanceof HTMLElement)) return;
    
    const chars = textRef.querySelectorAll('.text-reveal-char');
    
    gsap.from(chars, {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.03,
      scrollTrigger: {
        trigger: textRef,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
    
    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return { element, splitText };
};
