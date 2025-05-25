# Gayatri Mobile Website

A modern, responsive React website for Gayatri Mobile, a mobile repair and accessory shop in Narmadapuram, M.P.

## Business Information

- **Business name:** Gayatri Mobile
- **Owner:** Pro. Shree Jaiswal
- **Services:** Mobile repair, accessories sales, second-hand mobile sales
- **Address:** Gour Colony, Malakhedi Road, Near SBI Bank, Narmadapuram (M.P.)
- **Contact:** 8963900439, 7974639694

## Features

- Modern, responsive design optimized for all device sizes
- Single-page React application with smooth scrolling between sections
- Information about services, products, and contact details
- WhatsApp integration for quick customer communication
- Image-based location representation with directions
- GSAP animations for enhanced user experience
- Fallback options for devices with limited capabilities

## Project Structure

```
├── public/                   # Static assets
│   ├── brand-icons.svg       # SVG symbols for brands
│   ├── index.html            # HTML template
│   ├── logo.svg              # Company logo
│   └── manifest.json         # Web app manifest
│
├── src/                      # Source code
│   ├── assets/               # Assets organized by type
│   │   ├── fonts/            # Custom fonts
│   │   ├── icons/            # Icon assets
│   │   ├── images/           # Image assets
│   │   └── videos/           # Video assets
│   │
│   ├── components/           # React components
│   │   ├── common/           # Reusable components
│   │   │   ├── Button.js     # Button component
│   │   │   ├── Card.js       # Card component
│   │   │   └── Section.js    # Section component
│   │   │
│   │   ├── hooks/            # Custom React hooks
│   │   │   └── useAnimation.js  # Animation hooks
│   │   │
│   │   ├── layout/           # Layout components
│   │   │   ├── Footer.js     # Footer component
│   │   │   └── Header.js     # Header component
│   │   │
│   │   └── sections/         # Page section components
│   │       ├── About.js      # About section
│   │       ├── Accessories.js # Accessories section
│   │       ├── Contact.js    # Contact section
│   │       ├── Hero.js       # Hero section
│   │       ├── Services.js   # Services section
│   │       └── Testimonials.js # Testimonials section
│   │
│   ├── constants/            # Constants and static data
│   │   └── businessInfo.js   # Business information
│   │
│   ├── context/              # React contexts
│   │
│   ├── styles/               # Styling
│   │   ├── animations/       # Animation styles
│   │   ├── mixins/           # SCSS mixins
│   │   ├── variables/        # CSS variables
│   │   └── global.css        # Global styles
│   │
│   ├── utils/                # Utility functions
│   │   └── helpers.js        # Helper functions
│   │
│   ├── App.js                # Main App component
│   ├── config.js             # App configuration
│   └── index.js              # Entry point
│
├── jsconfig.json             # JavaScript configuration
├── package.json              # Dependencies and scripts
└── README.md                 # Documentation
```

## Services Featured

- Broken Screen Repair
- IC Reballing
- Data Recovery
- Phone Unlock
- Broken Glass & LCD Repair
- Battery Replacement

## Wholesale Accessories

The website showcases wholesale accessories available for major brands including:
- iPhone
- Samsung
- Vivo
- Oppo
- Infinix
- Motorola
- IQOO
- OnePlus
- POCO

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gayatri-mobile.git
   cd gayatri-mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Customization

To customize this website:

1. Update the business information in `src/constants/businessInfo.js`
2. Replace images in the `src/assets/images/` directory with actual shop photos
3. Modify colors in `src/styles/variables/colors.css` as needed
4. Update services and accessory brands in `src/constants/businessInfo.js`
5. Add or remove sections by modifying the `App.js` file

## Dependencies

- React (v19.1.0) - Frontend library
- GSAP (v3.13.0) - Animation library
- Three.js (v0.176.0) - 3D graphics
- Font Awesome - Icon library
- Google Fonts - Typography (Poppins and Roboto)

## Browser Compatibility

The website is compatible with all modern browsers including:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari
- Opera

## Technologies Used

- React for building the user interface
- CSS3 with CSS variables for styling
- GSAP (GreenSock Animation Platform) for smooth animations
- Three.js for 3D elements (interactive background and phone model)
- Font Awesome for icons
- Google Fonts for typography
- Progressive Web App capabilities

## Performance Optimization

The website includes several optimization features:

- Automatic device capability detection
- Reduced effects on lower-end devices
- Fallback static elements for devices without WebGL support
- Lazy-loading of non-critical resources using React's lazy loading
- Responsive design with optimized assets for mobile
- Intelligent animation throttling on scroll

## Project Organization

This project follows a structured organization pattern:

- **Component-Based Architecture**: Modular components for reusability
- **Custom Hooks**: Encapsulated logic for animations and other behaviors
- **CSS Organization**: Variables, mixins, and component-specific styles
- **Constants**: Business information and other data separated from UI code
- **Utility Functions**: Helper functions in a dedicated directory

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the ISC License - see the LICENSE file for details.
