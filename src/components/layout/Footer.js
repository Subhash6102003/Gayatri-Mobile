import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>Gayatri Mobile</h3>
            <p>Mobile Repair & Accessories Expert</p>
          </div>
          <div className="social-links">
            <a href="https://www.facebook.com/share/19QDciMgoE/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FontAwesomeIcon icon={['fab', 'facebook-f']} />
            </a>
            <a href="https://www.instagram.com/gayatri_mobile_111?igsh=MWN1eHNzcnNmM3VvdA==" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FontAwesomeIcon icon={['fab', 'instagram']} />
            </a>
            <a href="whatsapp://send?phone=918963900439&text=Hello%20Gayatri%20Mobile,%20I'm%20interested%20in%20your%20services." target="_blank" rel="noopener noreferrer" className="social-icon">
              <FontAwesomeIcon icon={['fab', 'whatsapp']} />
            </a>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} Gayatri Mobile. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
