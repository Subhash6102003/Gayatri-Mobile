/**
 * Application configuration file
 * Contains global configuration settings for Gayatri Mobile website
 */

// App settings
const APP_CONFIG = {
  // Site settings
  site: {
    name: "Gayatri Mobile",
    title: "Gayatri Mobile | Mobile Repair & Accessories Expert",
    description: "Professional mobile repair and accessories shop in Narmadapuram",
    language: "en",
    themeColor: "#ff6b35",
    backgroundColor: "#ffffff"
  },
  
  // Animation settings
  animations: {
    enabled: true,      // Enable/disable all animations
    reducedMotion: true // Respect user's reduced motion preference
  },
  
  // Performance settings
  performance: {
    lazyLoadImages: true,    // Enable lazy loading for images
    webGLFallback: true,     // Use fallback for devices without WebGL
    minifyAssets: true,      // Use minified assets in production
    preloadCriticalAssets: true // Preload critical assets
  },
  
  // Contact information
  contact: {
    phone: ["8963900439", "7974639694"],
    email: "contact@gayatrimobile.com", // Replace with actual email if available
    address: "Gour Colony, Malakhedi Road, Near SBI Bank, Narmadapuram (M.P.)",
    location: {
      latitude: "22.7546", // Replace with actual coordinates
      longitude: "77.7299"  // Replace with actual coordinates
    }
  },
  
  // Social media profiles
  social: {
    facebook: "https://facebook.com/gayatrimobile",
    instagram: "https://instagram.com/gayatrimobile",
    whatsapp: "https://wa.me/918963900439"
  }
};

export default APP_CONFIG;
