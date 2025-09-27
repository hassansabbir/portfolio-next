// Utility functions for smooth scrolling and scroll animations

// Reveal elements on scroll
export function initScrollReveal() {
  if (typeof window === 'undefined') return;
  
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealOnScroll = () => {
    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('visible');
      }
    });
  };
  
  // Initial check
  revealOnScroll();
  
  // Add event listener
  window.addEventListener('scroll', revealOnScroll);
  
  // Return cleanup function
  return () => window.removeEventListener('scroll', revealOnScroll);
}

// Smooth scroll to element
export function scrollToElement(elementId: string, offset: number = 80) {
  if (typeof window === 'undefined') return;
  
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

// Add scroll progress indicator
export function initScrollProgress() {
  if (typeof window === 'undefined') return;
  
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;
  
  const updateProgress = () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
  };
  
  // Initial update
  updateProgress();
  
  // Add event listener
  window.addEventListener('scroll', updateProgress);
  
  // Return cleanup function
  return () => window.removeEventListener('scroll', updateProgress);
}