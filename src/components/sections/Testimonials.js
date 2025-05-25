import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonials.css';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const testimonialData = [
  {
    id: 1,
    text: "My phone screen was completely shattered, and they fixed it in just 2 hours. Excellent service and very fair pricing!",
    author: "Rahul Sharma",
    rating: 5
  },
  {
    id: 2,
    text: "I bought a second-hand Samsung phone from Gayatri Mobile and it works perfectly. Great condition and three months warranty!",
    author: "Priya Patel",
    rating: 4.5
  },
  {
    id: 3,
    text: "Fantastic service! They helped recover all my data from a damaged phone that another shop said was impossible. Highly recommend!",
    author: "Amit Kumar",
    rating: 5
  },
  {
    id: 4,
    text: "Amazing coustomer service and best quality products available here. Excellent service and very fair pricing!!",
    author: "Harsh Pandey",
    rating: 5
  },
  {
    id: 5,
    text: "The tempered glass and phone cover they recommended perfectly protected my device during an accidental drop. Excellent quality accessories at reasonable prices!",
    author: "Sneha Verma",
    rating: 5
  },
  {
    id: 6,
    text: "They replaced my iPhone battery in just 30 minutes and the phone feels like new again. Their technicians are truly skilled professionals who know what they're doing.",
    author: "Vijay Malhotra",
    rating: 4.5
  }
];

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);

  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon icon="star" key={`star-${i}`} />);
    }
    
    if (halfStar) {
      stars.push(<FontAwesomeIcon icon="star-half-stroke" key="half-star" />);
    }
    
    // Add empty stars if needed to make 5 stars total
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FontAwesomeIcon icon={['far', 'star']} key={`empty-star-${i}`} />);
    }
    
    return stars;
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === testimonialData.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? testimonialData.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };  useEffect(() => {
    // Get animation elements
    const revealElements = document.querySelectorAll('.testimonials .gsap-reveal');
      // Set initial state for animation
    revealElements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
      }
    });
    
    // Delay for reliable animation
    setTimeout(() => {
      // GSAP animations for section reveal with direct properties
      gsap.to('.testimonials .gsap-reveal', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#testimonials',
          start: "top 80%",
        }
      });
    }, 100);
    
    // Testimonial slider automatic movement
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        x: `-${currentSlide * 100}%`,
        duration: 0.6,
        ease: 'power2.out'
      });
    }
  }, [currentSlide]);

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <h2 className="section-title gsap-reveal">Customer Reviews</h2>
        <div className="testimonial-slider">
          <div className="testimonial-container" ref={containerRef}>
            {testimonialData.map((testimonial) => (
              <div className="testimonial-card gsap-reveal" key={testimonial.id}>
                <div className="quote">
                  <FontAwesomeIcon icon="quote-left" />
                </div>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4>{testimonial.author}</h4>
                    <div className="rating">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="slider-controls">
            <button className="prev-btn" onClick={prevSlide}>
              <FontAwesomeIcon icon="chevron-left" />
            </button>
            <div className="slider-dots">
              {testimonialData.map((_, index) => (
                <span 
                  key={index} 
                  className={`dot ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                ></span>
              ))}
            </div>
            <button className="next-btn" onClick={nextSlide}>
              <FontAwesomeIcon icon="chevron-right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
