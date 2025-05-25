/**
 * Utility functions for Gayatri Mobile website
 */

/**
 * Format a phone number for display
 * @param {string} phoneNumber - Raw phone number
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  return `${phoneNumber.slice(0, 5)} ${phoneNumber.slice(5)}`;
};

/**
 * Create a WhatsApp message link
 * @param {string} phoneNumber - Phone number with country code
 * @param {string} message - Pre-filled message
 * @returns {string} WhatsApp message link
 */
export const createWhatsAppLink = (phoneNumber, message = '') => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

/**
 * Check if the device is mobile
 * @returns {boolean} True if the device is mobile
 */
export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Detect browser for feature compatibility
 * @returns {string} Browser name
 */
export const detectBrowser = () => {
  const userAgent = navigator.userAgent;
  
  if (userAgent.match(/chrome|chromium|crios/i)) {
    return 'chrome';
  } else if (userAgent.match(/firefox|fxios/i)) {
    return 'firefox';
  } else if (userAgent.match(/safari/i)) {
    return 'safari';
  } else if (userAgent.match(/opr\//i)) {
    return 'opera';
  } else if (userAgent.match(/edg/i)) {
    return 'edge';
  } else {
    return 'unknown';
  }
};

/**
 * Smooth scroll to element
 * @param {string} elementId - Target element ID
 * @param {number} offset - Offset from top (default: 60px)
 */
export const scrollToElement = (elementId, offset = 60) => {
  const element = document.getElementById(elementId);
  if (element && element instanceof HTMLElement) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Check WebGL availability
 * @returns {boolean} True if WebGL is available
 */
export const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch(e) {
    return false;
  }
};

/**
 * Lazy load images
 * @param {string} selector - CSS selector for images to lazy load
 */
export const lazyLoadImages = (selector = 'img[data-src]') => {
  const images = document.querySelectorAll(selector);
  
  if ('IntersectionObserver' in window) {
    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img instanceof HTMLImageElement && img.dataset.src) {
            img.src = img.dataset.src;
          }
          observer.unobserve(img);
        }
      });
    });
    
    images.forEach(img => observer.observe(img));
  } else {
    images.forEach(img => {
      if (img instanceof HTMLImageElement && img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  }
};
