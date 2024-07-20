// Add any interactivity or animations for the home page here
document.addEventListener('DOMContentLoaded', () => {
    // Example: Fade-in effect for hero section
    const heroSection = document.querySelector('.hero-section');
    heroSection.style.opacity = 0;
    heroSection.style.transition = 'opacity 2s';
  
    setTimeout(() => {
      heroSection.style.opacity = 1;
    }, 500);
  });
  