// WebGL and device performance detection
function isWebGLAvailable() {
    try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && 
            (canvas.getContext('webgl') || canvas.getContext('experimental-web-gl')));
    } catch(e) {
        return false;
    }
}

function isLowEndDevice() {
    // Check if running on a mobile device with poor performance
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // If we can access hardware concurrency, use it to determine device capability
    if (navigator.hardwareConcurrency) {
        return isMobile && navigator.hardwareConcurrency <= 2;
    }
    
    // Fallback detection based on user agent for older devices
    return isMobile && (
        /Android 4\.|Android 5\.0|iPhone OS 9_|iPhone OS 8_|iPhone OS 7_/i.test(navigator.userAgent)
    );
}

function isMidEndDevice() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (navigator.hardwareConcurrency) {
        return (isMobile && navigator.hardwareConcurrency <= 4) || 
               (!isMobile && navigator.hardwareConcurrency <= 2);
    }
    
    return isMobile && !isLowEndDevice();
}

function isHighEndDevice() {
    if (navigator.hardwareConcurrency) {
        return navigator.hardwareConcurrency > 4;
    }
    
    // If we can't detect cores, assume desktop is high-end
    return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function handleNoWebGL() {
    // Replace the canvas with a static background
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Remove the canvas
    const canvas = document.getElementById('hero-canvas');
    if (canvas) canvas.remove();
    
    // Add a gradient background instead
    heroSection.style.background = 'radial-gradient(circle at 30% 30%, #1a1a1a 0%, #0f0f0f 70%)';
    
    // Add a subtle pattern overlay
    const overlay = document.createElement('div');
    overlay.classList.add('hero-fallback-overlay');
    heroSection.appendChild(overlay);
    
    // Add the CSS for the overlay
    const style = document.createElement('style');
    style.innerHTML = `
        .hero-fallback-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
                radial-gradient(circle at 20% 20%, rgba(255, 221, 0, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(255, 221, 0, 0.05) 0%, transparent 50%);
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
}

// Enhanced function to ensure SVG icons are properly loaded
function preloadSVGIcons() {
    // Fetch the SVG sprite file to ensure it's cached
    fetch('images/brand-icons.svg')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load SVG icons: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(svgData => {
            console.log("SVG sprite loaded successfully");
            
            // Create a div to hold the SVG data for preloading
            const preloadDiv = document.createElement('div');
            preloadDiv.style.display = 'none';
            preloadDiv.innerHTML = svgData;
            document.body.appendChild(preloadDiv);
            
            // Force browser to render SVGs
            setTimeout(() => {
                // Now make sure all SVG uses are visible
                document.querySelectorAll('.brand-logo use').forEach(use => {
                    use.setAttribute('style', 'visibility: visible !important; opacity: 1 !important; fill: var(--primary-color) !important;');
                });
                
                // Fix all brand logos
                document.querySelectorAll('.brand-logo').forEach(logo => {
                    logo.style.visibility = 'visible';
                    logo.style.opacity = '1';
                    logo.style.fill = 'var(--primary-color)';
                });
                
                // Add fallback icon for any broken SVG references
                document.querySelectorAll('.brand-logo').forEach(logo => {
                    const use = logo.querySelector('use');
                    if (use && !use.instanceRoot) {
                        // SVG reference might be broken, add a fallback star icon
                        const fallback = document.createElement('i');
                        fallback.classList.add('fas', 'fa-star');
                        fallback.style.color = '#FFD700';
                        logo.appendChild(fallback);
                    }
                });
                
                // Remove the preload div after it has served its purpose
                document.body.removeChild(preloadDiv);
            }, 300);
        })
        .catch(err => {
            console.error("Error preloading SVG icons:", err);
            
            // Fallback to Font Awesome icons if SVG loading fails
            document.querySelectorAll('.brand-logo').forEach(logo => {
                const fallback = document.createElement('i');
                fallback.classList.add('fas', 'fa-star');
                fallback.style.color = '#FFD700';
                logo.appendChild(fallback);
            });
        });
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Preload SVG icons first
    preloadSVGIcons();
    
    // Initialize Three.js scene for hero section
    initThreeJS();
    
    // Initialize phone model in about section
    initPhoneModel();
    
    // Initialize GSAP animations
    initGSAP();
    
    // Mobile menu functionality
    initMobileMenu();
    
    // Smooth scrolling
    initSmoothScrolling();
    
    // Scroll to top button
    initScrollToTopButton();
    
    // Initialize counter animations
    initCounters();

    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize form submission
    initFormSubmission();
    
    // Initialize transparent header with scroll effect
    initTransparentHeader();
});

// Three.js initialization for hero section
function initThreeJS() {
    // Get the canvas element
    const canvas = document.getElementById('hero-canvas');
    
    // Check for WebGL support and device performance
    if (!canvas || !isWebGLAvailable() || isLowEndDevice()) {
        handleNoWebGL();
        return;
    }
    
    // Create a scene with enhanced visuals
    const scene = new THREE.Scene();
    
    // Create a camera with improved field of view
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create a renderer with appropriate settings for performance
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: isHighEndDevice(), // Only use antialiasing on high-end devices
        powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Adjust pixel ratio for better performance on lower-end devices
    const pixelRatio = isHighEndDevice() ? Math.min(window.devicePixelRatio, 2) : 1;
    renderer.setPixelRatio(pixelRatio);
    
    // Create particles with count based on device performance - increased for better visuals
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = isHighEndDevice() ? 2000 : (isMidEndDevice() ? 1200 : 600);
    
    const posArray = new Float32Array(particlesCount * 3);
    
    // Create two particle swirls for more dynamic effect
    for (let i = 0; i < particlesCount * 3; i += 3) {
        // First half of particles in a wider spread
        if (i < particlesCount * 1.5) {
            posArray[i] = (Math.random() - 0.5) * 20;
            posArray[i+1] = (Math.random() - 0.5) * 20;
            posArray[i+2] = (Math.random() - 0.5) * 20;
        } 
        // Second half more concentrated in the center for depth effect
        else {
            const radius = 5 + Math.random() * 5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            
            posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
            posArray[i+1] = radius * Math.sin(phi) * Math.sin(theta);
            posArray[i+2] = radius * Math.cos(phi);
        }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Material for particles with improved visual effect
    const particlesMaterial = new THREE.PointsMaterial({
        size: isHighEndDevice() ? 0.08 : 0.05,
        color: 0xffdd00,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
    });
    
    // Create the main particle system
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Add a subtle glow effect for high-end devices
    if (isHighEndDevice()) {
        // Create a second smaller particle system with different color for visual depth
        const innerParticlesGeometry = new THREE.BufferGeometry();
        const innerParticlesCount = 500;
        const innerPosArray = new Float32Array(innerParticlesCount * 3);
        
        for (let i = 0; i < innerParticlesCount * 3; i += 3) {
            const radius = 2 + Math.random() * 3;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            
            innerPosArray[i] = radius * Math.sin(phi) * Math.cos(theta);
            innerPosArray[i+1] = radius * Math.sin(phi) * Math.sin(theta);
            innerPosArray[i+2] = radius * Math.cos(phi);
        }
        
        innerParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(innerPosArray, 3));
        
        const innerParticlesMaterial = new THREE.PointsMaterial({
            size: 0.1,
            color: 0xffffff,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending
        });
        
        const innerParticlesMesh = new THREE.Points(innerParticlesGeometry, innerParticlesMaterial);
        scene.add(innerParticlesMesh);
        
        // Animate inner particles differently
        innerParticlesMesh.rotation.x = Math.PI * 0.5;
        
        // Update inner particles animation
        const animateInnerParticles = () => {
            innerParticlesMesh.rotation.y -= 0.001;
            innerParticlesMesh.rotation.z += 0.002;
        };
        
        // Include in animation loop
        scene.userData.animateInnerParticles = animateInnerParticles;
    }
      // Enhanced animation with wave effects
    let time = 0;
    const waveSpeed = 0.3;
    
    const animate = () => {
        requestAnimationFrame(animate);
        time += 0.01;
        
        // Standard rotation
        particlesMesh.rotation.y += 0.0008;
        particlesMesh.rotation.x += 0.0003;
        
        // Add wave effect to particles
        const positions = particlesMesh.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            // Calculate wave effect based on position and time
            const x = positions[i];
            const y = positions[i + 1];
            const distance = Math.sqrt(x * x + y * y);
            
            // Apply sine wave effect to z coordinate for particles near center
            if (distance < 10) {
                positions[i + 2] += Math.sin(distance - time * waveSpeed) * 0.01;
            }
        }
        particlesMesh.geometry.attributes.position.needsUpdate = true;
        
        // Mouse movement effect - enhanced responsiveness
        if (mouseX > 0) {
            // Smoother, more dramatic mouse response
            gsap.to(particlesMesh.rotation, {
                y: mouseX * 0.2,
                x: -mouseY * 0.2,
                duration: 2,
                ease: "power2.out"
            });
        } else {
            // Default animation when no mouse movement
            particlesMesh.rotation.y += 0.001;
            particlesMesh.rotation.z += 0.0005;
        }
        
        // Run additional animations for high-end devices
        if (scene.userData.animateInnerParticles) {
            scene.userData.animateInnerParticles();
        }
        
        renderer.render(scene, camera);
    };
    
    // Handle window resize
    window.addEventListener('resize', () => {
        // Update camera
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        
        // Update renderer
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
    
    // Mouse movement tracking
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = (event.clientY / window.innerHeight) * 2 - 1;
    });
    
    // Start animation
    animate();
}

// 3D Phone Model for About section
function initPhoneModel() {
    const canvas = document.getElementById('phone-model-canvas');
    if (!canvas) return;
    
    // Check for WebGL support and device performance
    if (!isWebGLAvailable() || isLowEndDevice()) {
        handleNoPhoneModel();
        return;
    }
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: isHighEndDevice(), // Only use antialiasing on high-end devices
        powerPreference: 'high-performance'
    });
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffdd00, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Create a simple phone model
    const phoneGroup = new THREE.Group();
    
    // Phone body
    const phoneGeometry = new THREE.BoxGeometry(1, 2, 0.1);
    const phoneMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x111111,
        specular: 0x333333,
        shininess: 100
    });
    const phoneBody = new THREE.Mesh(phoneGeometry, phoneMaterial);
    phoneGroup.add(phoneBody);
    
    // Phone screen
    const screenGeometry = new THREE.BoxGeometry(0.85, 1.7, 0.02);
    const screenMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x1a1a1a,
        emissive: 0x222222,
        shininess: 150
    });
    const phoneScreen = new THREE.Mesh(screenGeometry, screenMaterial);
    phoneScreen.position.z = 0.06;
    phoneGroup.add(phoneScreen);
    
    // Phone camera
    const cameraGeometry = new THREE.CircleGeometry(0.08, 32);
    const cameraMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const phoneCamera = new THREE.Mesh(cameraGeometry, cameraMaterial);
    phoneCamera.position.set(0.3, 0.8, 0.06);
    phoneCamera.rotation.z = Math.PI;
    phoneGroup.add(phoneCamera);
    
    // Phone button
    const buttonGeometry = new THREE.CircleGeometry(0.1, 32);
    const buttonMaterial = new THREE.MeshPhongMaterial({ color: 0xffdd00 });
    const homeButton = new THREE.Mesh(buttonGeometry, buttonMaterial);
    homeButton.position.set(0, -0.85, 0.06);
    phoneGroup.add(homeButton);
    
    // Add phone to scene
    scene.add(phoneGroup);
    
    // Position camera
    camera.position.z = 3;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        phoneGroup.rotation.y += 0.01;
        
        renderer.render(scene, camera);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
    });
    
    // Start animation
    animate();
      // Enhanced hover effects - make the phone "respond" more dramatically to mouse hover
    canvas.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / canvas.offsetWidth) * 2 - 1;
        const y = -((event.clientY - rect.top) / canvas.offsetHeight) * 2 + 1;
        
        // More dramatic phone rotation for enhanced visual effect
        gsap.to(phoneGroup.rotation, {
            x: y * 0.5,
            y: x * 0.8,
            duration: 0.8,
            ease: 'power2.out'
        });
        
        // Add subtle hover glow to screen when mouse is over
        if (phoneScreen && isHighEndDevice()) {
            gsap.to(screenMaterial, {
                emissive: new THREE.Color(0x444444),
                emissiveIntensity: 0.5,
                duration: 0.5
            });
            
            // Make the button pulse
            gsap.to(homeButton.scale, {
                x: 1.15,
                y: 1.15,
                z: 1.15,
                duration: 0.5,
                yoyo: true,
                repeat: 1
            });
        }
    });
    
    // Reset all animations when mouse leaves
    canvas.addEventListener('mouseleave', () => {
        gsap.to(phoneGroup.rotation, {
            x: 0,
            y: 0,
            duration: 1.2,
            ease: 'elastic.out(1, 0.5)'
        });
        
        if (phoneScreen && isHighEndDevice()) {
            gsap.to(screenMaterial, {
                emissive: new THREE.Color(0x222222),
                emissiveIntensity: 0.2,
                duration: 0.8
            });
            
            gsap.to(homeButton.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 0.5
            });
        }
    });
    
    // Add periodic animation to make the phone more lifelike
    gsap.to(phoneGroup.position, {
        y: 0.1,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
    });
}

// GSAP animations
function initGSAP() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animations - enhanced with stronger visual impact
    const heroTimeline = gsap.timeline();
    
    heroTimeline
        .from('.hero', {
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        })
        .from('.animated-heading', {
            opacity: 0,
            y: 80,
            duration: 1.2,
            ease: 'back.out(1.7)'
        }, 0.3)
        .from('.animated-text', {
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: 'power3.out'
        }, 0.7)
        .from('.animated-button', {
            opacity: 0,
            y: 30,
            scale: 0.8,
            duration: 1,
            ease: 'elastic.out(1, 0.5)'
        }, 1.1);
    
    // Letter animation for the heading
    const headingText = document.querySelector('.animated-heading');
    if (headingText) {
        let originalText = headingText.textContent;
        headingText.textContent = '';
        
        for (let i = 0; i < originalText.length; i++) {
            const char = originalText[i];
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for actual spaces
            span.style.display = 'inline-block';
            span.style.opacity = 0;
            headingText.appendChild(span);
            
            gsap.to(span, {
                opacity: 1,
                duration: 0.05,
                delay: 0.5 + (i * 0.05),
                ease: 'power1.out'
            });
        }
    }
    
    // Reveal animations for sections with enhanced effects
    gsap.utils.toArray('.gsap-reveal').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 70,
            scale: 0.95,
            duration: 1.2,
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            ease: 'power2.out'
        });
    });
    // Enhanced staggered animations for brand items with more dynamic effects
    const brandsTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.brands-grid',
            start: 'top 85%'
        }
    });
    
    gsap.utils.toArray('.brands-grid .gsap-stagger').forEach((item, index) => {
        brandsTimeline.fromTo(item, 
            {
                opacity: 0,
                y: 50,
                scale: 0.8
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                delay: index * 0.1,
                ease: 'back.out(1.2)'
            }, 
            index * 0.08
        );
        
        // Enhanced hover animations for brand items
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                scale: 1.08,
                boxShadow: '0 15px 30px rgba(255, 221, 0, 0.3)',
                y: -10,
                duration: 0.4,
                ease: 'power3.out'
            });
            
            gsap.to(item.querySelector('.brand-overlay'), {
                opacity: 1,
                duration: 0.3
            });
            
            gsap.to(item.querySelector('.brand-logo'), {
                scale: 1.15,
                fill: '#FFD700',
                duration: 0.4,
                ease: 'back.out(1.7)'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                scale: 1,
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(item.querySelector('.brand-overlay'), {
                opacity: 0,
                duration: 0.3
            });
            
            gsap.to(item.querySelector('.brand-logo'), {
                scale: 1,
                fill: 'currentColor',
                duration: 0.3
            });
        });
    });
    
    // Enhanced contact info animations
    gsap.utils.toArray('.contact-info .gsap-stagger').forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            x: -50,
            scale: 0.9,
            duration: 0.7,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: '.contact-info',
                start: 'top 80%'
            },
            ease: 'back.out(1.2)'
        });
    });
      // Enhanced service cards hover animation with more dynamic effects
    const serviceCards = document.querySelectorAll('.service-card');
    
    // Initial animation for service cards when they come into view
    gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            scale: 0.9,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 80%'
            },
            ease: 'back.out(1.4)'
        });
    });
    
    serviceCards.forEach(card => {
        // Create a timeline for each card hover
        const hoverTimeline = gsap.timeline({ paused: true });
        
        // Add animations to the timeline
        hoverTimeline
            .to(card, {
                y: -15,
                scale: 1.05,
                boxShadow: '0 20px 30px rgba(0, 0, 0, 0.2), 0 0 15px rgba(255, 221, 0, 0.3)',
                backgroundColor: 'rgba(53, 56, 57, 0.95)',
                borderColor: '#FFD700',
                duration: 0.4,
                ease: 'power3.out'
            }, 0)
            .to(card.querySelector('.service-icon'), {
                y: -10,
                scale: 1.1,
                duration: 0.4,
                ease: 'back.out(1.7)'
            }, 0)
            .to(card.querySelector('svg'), {
                scale: 1.2,
                fill: '#FFD700',
                duration: 0.4,
                ease: 'back.out(1.7)'
            }, 0)
            .to(card.querySelector('h3'), {
                color: '#FFD700',
                duration: 0.3
            }, 0);
        
        // Play timeline on mouseenter
        card.addEventListener('mouseenter', () => {
            hoverTimeline.play();
        });
        
        // Reverse timeline on mouseleave
        card.addEventListener('mouseleave', () => {
            hoverTimeline.reverse();
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (!mobileMenuBtn || !navMenu) {
        console.error("Could not initialize mobile menu: Missing elements");
        return;
    }
    
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const menuIcon = mobileMenuBtn.querySelector('i');
        
        if (navMenu.classList.contains('active')) {
            // Change icon to X when menu is open
            if (menuIcon) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            }
            
            gsap.from('nav ul li', {
                opacity: 0,
                y: -20,
                stagger: 0.1,
                duration: 0.4,
                ease: 'power2.out'
            });
        } else {
            // Change back to hamburger icon when menu is closed
            if (menuIcon) {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        }
    });
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            
            // Also reset the hamburger icon
            const menuIcon = mobileMenuBtn.querySelector('i');
            if (menuIcon) {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    });
}

// Smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Close mobile menu if open
            const mobileMenu = document.querySelector('nav ul');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn i');
            
            if (window.innerWidth < 992 && mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.classList.remove('fa-times');
                    mobileMenuBtn.classList.add('fa-bars');
                }
            }
            
            if (targetElement) {
                // Ensure ScrollToPlugin is available
                if (gsap.getProperty && gsap.getProperty("scrollTo")) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            y: targetElement,
                            offsetY: 70
                        },
                        ease: 'power3.inOut'
                    });
                } else {
                    // Fallback smooth scrolling
                    const headerOffset = 70;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });
}

// Scroll to top button
function initScrollToTopButton() {
    window.addEventListener('scroll', function() {
        let scrollToTopBtn = document.querySelector('.scroll-to-top');
        
        if (window.pageYOffset > 300) {
            if (!scrollToTopBtn) {
                const btn = document.createElement('button');
                btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
                btn.className = 'scroll-to-top';
                
                btn.addEventListener('click', () => {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            y: 0
                        },
                        ease: 'power3.inOut'
                    });
                });
                
                document.body.appendChild(btn);
                
                // Animate button entrance
                gsap.from(btn, {
                    opacity: 0,
                    scale: 0.5,
                    duration: 0.3,
                    ease: 'back.out(1.7)'
                });
            }
        } else {
            if (scrollToTopBtn) {
                gsap.to(scrollToTopBtn, {
                    opacity: 0,
                    scale: 0.5,
                    duration: 0.3,
                    ease: 'power3.out',
                    onComplete: () => scrollToTopBtn.remove()
                });
            }
        }
    });
}

// Counter animations for stats in About section
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        // Set initial value
        counter.innerText = '0';
        
        // Create counter animation
        const updateCounter = () => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / 100;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCounter, 30);
            } else {
                counter.innerText = target;
            }
        };
        
        // Trigger animation when the element is in view
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            onEnter: () => updateCounter()
        });
    });
}

// Enhanced Testimonial Slider with improved animations
function initTestimonialSlider() {
    console.log("Initializing testimonial slider");
    const testimonialContainer = document.querySelector('.testimonial-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cards = document.querySelectorAll('.testimonial-card');
    const sliderDotsContainer = document.querySelector('.slider-dots');
    
    if (!testimonialContainer || !prevBtn || !nextBtn || !cards.length) {
        console.error("Could not initialize testimonial slider: Missing elements");
        return;
    }
    
    // Log number of testimonial cards for debugging
    console.log(`Found ${cards.length} testimonial cards`);
    
    let currentSlide = 0;
    const maxSlide = cards.length - 1;
    
    // Set up testimonial container with correct width for all cards
    testimonialContainer.style.width = `${cards.length * 100}%`;
    
    // Set up individual cards with equal width - exactly 16.666% for 6 cards
    cards.forEach((card, index) => {
        card.style.width = `calc(${100 / cards.length}% - 30px)`;
        card.style.opacity = '1'; 
        card.style.transform = 'scale(1)';
        card.setAttribute('data-index', index);
        
        // Log each card for debugging
        console.log(`Card ${index}: ${card.querySelector('.testimonial-text').textContent.substring(0, 20)}...`);
    });
    
    // Create dots for navigation - important to do this BEFORE using the dots array
    const dots = [];
    
    // Generate dots based on number of cards
    if (sliderDotsContainer) {
        sliderDotsContainer.innerHTML = ''; // Clear any existing dots
        for (let i = 0; i <= maxSlide; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.setAttribute('data-slide', i);
            if (i === 0) dot.classList.add('active');
            sliderDotsContainer.appendChild(dot);
            dots.push(dot);
            
            // Log dot creation
            console.log(`Created dot ${i}`);
        }
        
        // Make slider controls visible
        const sliderControls = document.querySelector('.slider-controls');
        if (sliderControls) {
            sliderControls.style.opacity = '1';
        }
    }
    
    // Function to go to a specific slide with enhanced animation
    function goToSlide(slide) {
        console.log(`Going to slide ${slide}`);
        
        // Ensure slide is within bounds
        if (slide < 0) slide = maxSlide;
        if (slide > maxSlide) slide = 0;
        
        currentSlide = slide;
        
        // Calculate the exact percentage to translate
        const translatePercentage = (currentSlide * 100 / cards.length);
        console.log(`Translating container to: -${translatePercentage}%`);
        
        // Move the container to show current slide
        testimonialContainer.style.transform = `translateX(-${translatePercentage}%)`;
        
        // Reset all cards to initial state
        cards.forEach((card, i) => {
            // Make all cards visible but style the current one differently
            card.style.visibility = 'visible';
            card.style.opacity = i === currentSlide ? '1' : '0.5';
            card.style.transform = i === currentSlide ? 'scale(1)' : 'scale(0.9)';
        });
        
        // Animate current card
        gsap.to(cards[currentSlide], {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(1.7)'
        });
        
        // Special effect for quote icon
        const quoteIcon = cards[currentSlide].querySelector('.quote i');
        if (quoteIcon) {
            gsap.to(quoteIcon, {
                rotation: 360,
                scale: 1.2,
                duration: 0.5,
                ease: 'back.out(1.7)'
            });
        }
        
        // Make stars twinkle
        const stars = cards[currentSlide].querySelectorAll('.rating i');
        stars.forEach((star, i) => {
            gsap.to(star, {
                scale: 1.3,
                color: '#FFD700',
                duration: 0.2,
                delay: 0.1 * i,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1
            });
        });
        
        // Update active dot
        if (dots && dots.length > 0) {
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[currentSlide]) {
                dots[currentSlide].classList.add('active');
                
                gsap.from(dots[currentSlide], {
                    scale: 1.5,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        }
    }
    
    // Event listeners for navigation
    prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    });
    
    // Dot navigation
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });
    }
    
    // Auto slide functionality
    let slideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000);
    
    // Pause auto slide on hover
    testimonialContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    // Resume auto slide when mouse leaves
    testimonialContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
    });
    
    // Initialize first slide
    goToSlide(0);
}

// Create custom cursor
document.addEventListener('DOMContentLoaded', function() {
    // Create custom cursor elements
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    
    const cursorInner = document.createElement('div');
    cursorInner.classList.add('cursor-inner');
    
    const cursorOuter = document.createElement('div');
    cursorOuter.classList.add('cursor-outer');
    
    cursor.appendChild(cursorInner);
    cursor.appendChild(cursorOuter);
    document.body.appendChild(cursor);
    
    // Update cursor position on mouse move
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    
    // Add/remove grow class on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .brand-item, .social-icon');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-grow');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-grow');
        });
    });
    
    // Hide cursor when it leaves window
    document.addEventListener('mouseout', () => {
        cursor.style.display = 'none';
    });
    
    document.addEventListener('mouseover', () => {
        cursor.style.display = 'block';
    });
});

// Add CSS for additional effects
const style = document.createElement('style');
style.innerHTML = `
    .scroll-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--primary-color);
        color: var(--dark-color);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99;
        box-shadow: 0 3px 15px rgba(255, 221, 0, 0.4);
        transition: all 0.3s ease;
    }
    
    .scroll-to-top:hover {
        background-color: var(--dark-color);
        color: var(--primary-color);
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(255, 221, 0, 0.5);
    }
    
    .animated-heading {
        background: linear-gradient(to right, #ffffff, #ffdd00);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: 200% auto;
        animation: textShine 5s linear infinite;
    }
    
    @keyframes textShine {
        to {
            background-position: 200% center;
        }
    }
    
    .service-icon i {
        transition: all 0.3s ease;
    }
    
    .glow-on-hover {
        position: relative;
        z-index: 1;
    }
    
    .glow-on-hover::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at center, rgba(255, 221, 0, 0.8), transparent);
        z-index: -1;
        opacity: 0;
        transition: opacity 0.3s ease;
        filter: blur(15px);
    }
    
    .glow-on-hover:hover::after {
        opacity: 0.5;
    }
      /* Enhanced call to action animations */
    .animated-button {
        animation: pulse 2s infinite;
        position: relative;
        overflow: hidden;
    }
    
    .animated-button:before {
        content: "";
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: rgba(255, 221, 0, 0.3);
        background: linear-gradient(
            to right, 
            rgba(255, 221, 0, 0.1) 0%, 
            rgba(255, 221, 0, 0.3) 50%, 
            rgba(255, 221, 0, 0.1) 100%
        );
        transform: rotate(30deg);
        animation: shimmer 3s infinite;
        z-index: -1;
    }
    
    @keyframes shimmer {
        0% { transform: translateX(-100%) rotate(30deg); }
        100% { transform: translateX(100%) rotate(30deg); }
    }
    
    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(255, 221, 0, 0.7);
        }
        70% {
            box-shadow: 0 0 0 15px rgba(255, 221, 0, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(255, 221, 0, 0);
        }
    }
    
    /* Add animation to contact buttons */
    .contact-btn {
        position: relative;
        overflow: hidden;
        transform: translateZ(0);
    }
    
    .contact-btn:before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
        transform: skewX(-25deg);
        animation: contactBtnShine 3s infinite;
    }
    
    @keyframes contactBtnShine {
        0% { left: -100%; }
        20% { left: 100%; }
        100% { left: 100%; }
    }
    
    /* Google Maps styles */    #map {
        width: 100%;
        height: 400px;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
    }
    
    /* Hide default Google Maps UI elements */
    .gm-svpc {
        display: none !important;
    }
    
    /* Custom marker style */
    .gm-style .gm-marker {
        background-color: #ffdd00;
        border-radius: 50%;
        width: 10px;
        height: 10px;
        transform: translate(-50%, -50%);
    }
    
    /* Info window styles */
    .gm-style .gm-style-iw {
        background-color: #242f3e;
        color: #ffd700;
        padding: 10px;
        border-radius: 8px;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }
    
    .gm-style .gm-style-iw h3 {
        margin: 0 0 5px;
        font-size: 16px;
        color: #ffd700;
    }
    
    .gm-style .gm-style-iw p {
        margin: 0;
        font-size: 14px;
        color: #ffd700;
    }
    
    /* Button to show shop location */
    #showShopLocation {
        background-color: var(--primary-color);
        color: var(--dark-color);
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s ease, transform 0.3s ease;
        position: relative;
        overflow: hidden;
    }
    
    #showShopLocation:hover {
        background-color: var(--dark-color);
        color: var(--primary-color);
        transform: translateY(-2px);
    }
    
    #showShopLocation.active {
        background-color: var(--dark-color);
        color: var(--primary-color);
    }
    
    #showShopLocation i {
        margin-right: 8px;
    }
`;
document.head.appendChild(style);

// Transparent header on scroll functionality
function initTransparentHeader() {
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    let heroHeight = 0;
    
    if (heroSection) {
        heroHeight = heroSection.offsetHeight - 100; // Subtract some offset for earlier trigger
    }
    
    // Set initial state
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Update on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Update hero height on window resize
    window.addEventListener('resize', () => {
        if (heroSection) {
            heroHeight = heroSection.offsetHeight - 100;
        }
    });
}

// Form submission functionality
function initFormSubmission() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const nameField = document.getElementById('name');
        const phoneField = document.getElementById('phone');
        const messageField = document.getElementById('message');
        const formMessage = document.querySelector('.form-message');
        
        // Simple validation
        let isValid = true;
        let errorMsg = '';
        
        if (!nameField.value.trim()) {
            isValid = false;
            errorMsg = 'Please enter your name';
            nameField.focus();
        } else if (!phoneField.value.trim()) {
            isValid = false;
            errorMsg = 'Please enter your phone number';
            phoneField.focus();
        } else if (!validatePhone(phoneField.value.trim())) {
            isValid = false;
            errorMsg = 'Please enter a valid 10-digit phone number';
            phoneField.focus();
        } else if (!messageField.value.trim()) {
            isValid = false;
            errorMsg = 'Please enter your message';
            messageField.focus();
        }
        
        if (!isValid) {
            formMessage.textContent = errorMsg;
            formMessage.classList.add('error-message');
            formMessage.classList.remove('success-message');
            
            // Shake animation for error
            gsap.to(formMessage, {
                x: [-10, 10, -10, 10, 0],
                duration: 0.5,
                ease: 'power2.inOut'
            });
            
            return;
        }
        
        // Collect form data
        const formData = {
            name: nameField.value.trim(),
            phone: phoneField.value.trim(),
            message: messageField.value.trim()
        };
        
        // Animation to show processing
        const submitBtn = contactForm.querySelector('.form-submit-btn');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        
        gsap.to(submitBtn, {
            scale: 0.95,
            duration: 0.2,
            ease: 'power2.out',
            onComplete: () => {
                submitBtn.textContent = 'Sending...';
                
                // Simulate form submission (in real world, this would be an AJAX call)
                setTimeout(() => {
                    // Reset form
                    contactForm.reset();
                    
                    // Show success message
                    formMessage.textContent = 'Thank you! We\'ll contact you shortly.';
                    formMessage.classList.add('success-message');
                    formMessage.classList.remove('error-message');
                    
                    // Reset button
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                    
                    // Success animation
                    gsap.fromTo(formMessage, 
                        { opacity: 0, y: -20 }, 
                        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
                    );
                    
                    gsap.to(submitBtn, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'back.out(1.7)'
                    });
                    
                    // Hide success message after some time
                    setTimeout(() => {
                        gsap.to(formMessage, {
                            opacity: 0,
                            y: -10,
                            duration: 0.5
                        });
                    }, 5000);
                }, 1500); // Simulate server delay
            }
        });
    });
    
    // Phone number validation function
    function validatePhone(phone) {
        // Remove all non-digit characters
        const digits = phone.replace(/\D/g, '');
        // Validate that we have 10-12 digits (allowing for country codes)
        return digits.length >= 10 && digits.length <= 12;
    }
}

// Handle no WebGL support for phone model
function handleNoPhoneModel() {
    // Remove the canvas and display a static image instead
    const canvas = document.getElementById('phone-model-canvas');
    if (!canvas) return;
    
    // Replace with a static phone image
    const container = canvas.parentElement;
    canvas.remove();
    
    // Create a replacement div with animated elements
    const replacement = document.createElement('div');
    replacement.className = 'phone-fallback';
    
    // Create a stylized phone
    const phone = document.createElement('div');
    phone.className = 'phone-static';
    
    // Create screen
    const screen = document.createElement('div');
    screen.className = 'phone-screen';
    
    // Create camera dot
    const camera = document.createElement('div');
    camera.className = 'phone-camera';
    
    // Create home button
    const homeBtn = document.createElement('div');
    homeBtn.className = 'phone-home-button';
    
    // Assemble the phone
    phone.appendChild(screen);
    phone.appendChild(camera);
    phone.appendChild(homeBtn);
    replacement.appendChild(phone);
    
    // Insert into the container
    container.appendChild(replacement);
    
    // Add CSS for the fallback phone
    const style = document.createElement('style');
    style.innerHTML = `
        .phone-fallback {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .phone-static {
            width: 120px;
            height: 220px;
            background-color: #1a1a1a;
            border-radius: 20px;
            position: relative;
            border: 2px solid #333;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            animation: floatPhone 3s ease-in-out infinite;
        }
        .phone-screen {
            position: absolute;
            top: 20px;
            left: 10px;
            width: calc(100% - 20px);
            height: 140px;
            background-color: #333;
            border-radius: 5px;
            overflow: hidden;
        }
        .phone-screen:after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            animation: screenGlow 2s infinite;
        }
        .phone-camera {
            position: absolute;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #111;
            border: 1px solid #444;
        }
        .phone-home-button {
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #333;
            border: 1px solid #555;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .phone-home-button:after {
            content: '';
            width: 15px;
            height: 15px;
            border-radius: 3px;
            border: 1px solid #ffdd00;
        }
        @keyframes floatPhone {
            0%, 100% { transform: translateY(0) rotate(0); }
            50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes screenGlow {
            0% { left: -100%; }
            100% { left: 200%; }
        }
    `;
    document.head.appendChild(style);
}

// Google Maps initialization with dark theme
let map;
let shopMarker;
// Updated coordinates to match Gour Colony, Malakhedi Road, Near SBI Bank, Narmadapuram
const narmadapuramCoordinates = { lat: 22.3547, lng: 77.7292 }; // Narmadapuram Malakhedi area
const shopCoordinates = { lat: 22.3547, lng: 77.7292 }; // Shop exact coordinates in Malakhedi

// Load Google Maps API
function loadGoogleMapsAPI() {
    const googleMapsScript = document.createElement('script');
    // Using Google Maps API key with no restrictions for demo purposes
    googleMapsScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&v=weekly';
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    
    // Add error handling to show fallback if Google Maps fails to load
    googleMapsScript.onerror = function() {
        console.error("Google Maps API failed to load");
        showMapFallback();
    };
    
    // Set a timeout to check if map loads within reasonable time
    const mapLoadTimeout = setTimeout(function() {
        if (!window.google || !window.google.maps) {
            console.error("Google Maps API timed out");
            showMapFallback();
        }
    }, 5000); // 5 second timeout
    
    // If map loads successfully, clear the timeout
    window.initMapSuccess = function() {
        clearTimeout(mapLoadTimeout);
    };
    
    document.head.appendChild(googleMapsScript);
}

// Function to show the fallback map iframe
function showMapFallback() {
    const mapElement = document.getElementById('map');
    const mapFallback = document.getElementById('map-fallback');
    
    if (mapElement && mapFallback) {
        mapElement.style.display = 'none';
        mapFallback.style.display = 'block';
    }
}

// Initialize map
window.initMap = function() {
    // Signal that map initialized successfully
    if (window.initMapSuccess) {
        window.initMapSuccess();
    }
    
    // Dark theme for the map
    const darkMapStyle = [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
        },
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }],
        },
        {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }],
        },
        {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }],
        },
        {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }],
        },
        {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }],
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }],
        },
        {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }],
        },
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
        },
    ];    
    
    // Map options
    const mapOptions = {
        zoom: 14,
        center: narmadapuramCoordinates,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: darkMapStyle,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER,
        }
    };    
    
    // Create the map
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
      
    // Remove "For development purposes only" overlay and other unwanted elements
    const style = document.createElement('style');
    style.textContent = `
        .gm-style a[target="_blank"], 
        .gm-style div[role="button"][title="Google"],
        .gm-style .gmnoprint a, 
        .gmnoprint span, 
        .gm-style-cc,
        a[href^="http://maps.google.com/maps"],
        a[href^="https://maps.google.com/maps"],
        .gm-style .gmnoprint,
        .gm-fullscreen-control,
        img[src^="https://maps.gstatic.com/mapfiles/api-3/images/"] {
            display: none !important;
        }
        
        /* Custom map controls styling */
        .gm-style-moc {
            display: none !important;
        }
        
        /* Override any Google copyright notices */
        .gm-style div[style*="margin: 10px"] {
            display: none !important;
        }
    `;
    document.head.appendChild(style);    // Create a pulsing marker icon with improved visibility
    const pulsingMarker = {
        url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                <circle cx="25" cy="25" r="10" fill="#FFD700" opacity="0.6" filter="url(#glow)">
                    <animate attributeName="r" values="10;18;10" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.7;0.4;0.7" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="25" cy="25" r="7" fill="#FFD700" opacity="0.9" filter="url(#glow)" />
                <path d="M25 12 L29 20 L37 21 L31 27 L33 35 L25 31 L17 35 L19 27 L13 21 L21 20 Z" fill="#FFD700" opacity="0.8" transform="scale(0.6) translate(17, 17)" filter="url(#glow)">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                </path>
            </svg>
        `),
        size: new google.maps.Size(50, 50),
        anchor: new google.maps.Point(25, 25),
        scaledSize: new google.maps.Size(50, 50)
    };

    // Create the shop marker (initially hidden)
    shopMarker = new google.maps.Marker({
        position: shopCoordinates,
        map: null, // Don't show initially
        title: "Gayatri Mobile",
        animation: google.maps.Animation.DROP,
        icon: pulsingMarker
    });    
    
    // Create info window for the shop with enhanced details from Google reviews
    const infoWindowContent = `
        <div style="padding: 15px; color: #FFD700; font-family: 'Poppins', sans-serif; max-width: 300px;">
            <h3 style="margin: 0 0 8px; color: #FFD700; font-size: 18px; font-weight: 600;">Gayatri Mobile</h3>
            <p style="margin: 0; font-size: 14px; line-height: 1.5;">Gour Colony, Malakhedi Road,<br>Near SBI Bank, Narmadapuram</p>
            <div style="display: flex; align-items: center; margin: 12px 0 8px;">
                <div style="display: flex; gap: 3px; margin-right: 8px;">
                    <span style="color: #FFD700; font-size: 18px;">★★★★</span><span style="color: #9c9c9c; font-size: 18px;">★</span>
                </div>
                <span style="color: #FFD700; font-size: 15px; font-weight: 600; margin-right: 3px;">4.3</span>
                <span style="color: #ccc; font-size: 13px;">(27 reviews)</span>
            </div>
            <div style="margin: 10px 0; border-top: 1px solid rgba(255, 215, 0, 0.3); padding-top: 10px;">
                <p style="margin: 0 0 5px; font-size: 13px; color: #ccc;">
                    <span style="color: #FFD700; margin-right: 5px;">⏰</span> 
                    <b>Monday-Saturday:</b> 10:00 AM - 9:00 PM
                </p>
                <p style="margin: 0; font-size: 13px; color: #ccc;">
                    <span style="color: #FFD700; margin-right: 5px;">⏰</span>
                    <b>Sunday:</b> By Appointment
                </p>
            </div>
            <div style="display: flex; gap: 10px; margin-top: 12px;">
                <a href="tel:+918963900439" style="color: #FFD700; text-decoration: none; background-color: rgba(0,0,0,0.4); padding: 5px 10px; border-radius: 20px; display: flex; align-items: center; gap: 5px;">
                    <span style="font-size: 16px;">📞</span> 8963900439
                </a>
                <a href="tel:+917974639694" style="color: #FFD700; text-decoration: none; background-color: rgba(0,0,0,0.4); padding: 5px 10px; border-radius: 20px; display: flex; align-items: center; gap: 5px;">
                    <span style="font-size: 16px;">📞</span> 7974639694
                </a>
            </div>
        </div>
    `;

    const infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
    });

    // Add click event to the marker
    shopMarker.addListener("click", () => {
        infoWindow.open({
            anchor: shopMarker,
            map,
        });
    });    // Button to show the shop location
    document.getElementById("showShopLocation").addEventListener("click", () => {
        // Open Google Maps in a new tab with the exact shop location
        window.open('https://maps.app.goo.gl/GnpNwVqAeMWgMWoA8?g_st=aw', '_blank');
        
        // Also show marker on the map if not already visible
        if (shopMarker.getMap() === null) {
            shopMarker.setMap(map);
        }
          // Zoom and pan to the shop location with animation
        map.panTo(shopCoordinates);
        map.setZoom(16);
        
        // Open info window after a short delay
        setTimeout(() => {
            infoWindow.open({
                anchor: shopMarker,
                map,
            });
        }, 700);
        
        // Add pulse animation to the button
        const button = document.getElementById("showShopLocation");
        button.classList.add("active");
        
        // Change button text
        button.innerHTML = '<i class="fas fa-map-marker-alt"></i> Shop Location';
    });
      // Add a click listener to the map that zooms out
    map.addListener("click", () => {
        if (map.getZoom() > 14) {
            // Use smooth animation to zoom out
            const currentZoom = map.getZoom();
            const targetZoom = 14;
            const zoomStep = 0.5;
            
            let zoomInterval = setInterval(() => {
                const nextZoom = Math.max(targetZoom, currentZoom - zoomStep);
                map.setZoom(nextZoom);
                
                if (map.getZoom() <= targetZoom) {
                    clearInterval(zoomInterval);
                    map.panTo(narmadapuramCoordinates);
                    
                    // Hide the marker when zoomed out
                    shopMarker.setMap(null);
                    
                    // Reset button
                    const button = document.getElementById("showShopLocation");
                    button.classList.remove("active");
                    button.innerHTML = '<i class="fas fa-map-marker-alt"></i> Show Shop Location';
                }
            }, 100);
        }
    });
};

// Add map initialization to the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function(event) {
    // Wait for the DOM to be loaded
    const existingHandler = event.handlers && event.handlers[0];
    
    if (typeof existingHandler === 'function') {
        // If there's already an event handler, call it first
        existingHandler();
    }
    
    // Load Google Maps API
    loadGoogleMapsAPI();
});
