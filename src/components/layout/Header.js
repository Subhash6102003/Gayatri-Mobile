import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 60,
        behavior: 'smooth'
      });
    }
    
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header id="home" className={`${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="logo-container">
          <div className="logo">
            <img src="/logo.svg" alt="Gayatri Mobile Logo" />
          </div>
          <div className="brand-info">
            <h1>Gayatri Mobile</h1>
            <p className="tagline">Mobile Repair & Accessories Expert</p>
          </div>
        </div>        <nav>
          <div className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
            <FontAwesomeIcon icon={mobileMenuOpen ? "times" : "bars"} />
          </div>
          <ul className={mobileMenuOpen ? 'active' : ''}>
            <li><a href="#home" onClick={handleNavClick}><FontAwesomeIcon icon="home" className="nav-icon" /> Home</a></li>
            <li><a href="#about" onClick={handleNavClick}><FontAwesomeIcon icon="info-circle" className="nav-icon" /> About</a></li>
            <li><a href="#accessories" onClick={handleNavClick}><FontAwesomeIcon icon="mobile-alt" className="nav-icon" /> Accessories</a></li>
            <li><a href="#services" onClick={handleNavClick}><FontAwesomeIcon icon="tools" className="nav-icon" /> Services</a></li>
            <li><a href="#testimonials" onClick={handleNavClick}><FontAwesomeIcon icon="star" className="nav-icon" /> Reviews</a></li>
            <li><a href="#contact" onClick={handleNavClick}><FontAwesomeIcon icon="envelope" className="nav-icon" /> Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
