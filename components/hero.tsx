"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  
  // Check if user prefers reduced motion
  const prefersReducedMotion = useReducedMotion();

  // Memoize these values to prevent unnecessary re-renders
  const roles = useMemo(() => [
    "Full Stack Developer",
    "Frontend Specialist",
    "MERN Stack Expert",
  ], []);

  const subtitleText = "From Bangladesh 🇧🇩";
  const descriptionText =
    "Passionate developer with 2+ years of experience and 30+ projects. Specialized in modern web technologies and creating amazing user experiences.";

  // Main title typing effect - optimized
  useEffect(() => {
    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion) {
      setDisplayText(roles[currentRole]);
      return;
    }
    
    const typeSpeed = 70;
    const deleteSpeed = 50;
    const pauseTime = 2000;

    const type = () => {
      const currentText = roles[currentRole];

      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    };

    const timer = setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRole, roles, prefersReducedMotion]);

  // Subtitle and description - optimized to load immediately if reduced motion is preferred
  useEffect(() => {
    if (prefersReducedMotion) {
      setSubtitle(subtitleText);
      setDescription(descriptionText);
      return;
    }
    
    // Subtitle typing effect - optimized
    let i = 0;
    const timer = setTimeout(() => {
      const typeSubtitle = () => {
        if (i <= subtitleText.length) {
          setSubtitle(subtitleText.slice(0, i));
          i++;
          setTimeout(typeSubtitle, 15);
        }
      };
      typeSubtitle();
    }, 1000); // Reduced from 1500ms for faster appearance

    // Description - set immediately after subtitle starts
    const descTimer = setTimeout(() => {
      setDescription(descriptionText);
    }, 1500); // Reduced from 2000ms for faster appearance

    return () => {
      clearTimeout(timer);
      clearTimeout(descTimer);
    };
  }, [prefersReducedMotion]);

  // Optimize particle animations with GSAP
  useEffect(() => {
    // Skip heavy animations if user prefers reduced motion
    if (prefersReducedMotion) return;
    
    // Create a single GSAP context for better performance
    const ctx = gsap.context(() => {
      // Reduce the number of animated particles for better performance
      const particles = document.querySelectorAll(".particle");
      
      // Only animate a subset of particles for better performance
      const particlesToAnimate = Array.from(particles).slice(0, 40); // Reduced from 80
      
      gsap.set(particlesToAnimate, { opacity: 0 });
      
      // Use a single timeline for better performance
      const tl = gsap.timeline();
      
      tl.to(particlesToAnimate, {
        opacity: 0.7, // Reduced from 1 for better performance
        duration: 2,
        stagger: {
          each: 0.1,
          from: "random",
        },
      });
      
      // Use simpler animations for better performance
      particlesToAnimate.forEach((particle, i) => {
        // Only animate every other particle for better performance
        if (i % 2 === 0) {
          gsap.to(particle, {
            x: "random(-10, 10)", // Reduced range from (-20, 20)
            y: "random(-10, 10)", // Reduced range from (-20, 20)
            duration: 3 + (i % 3), // Simplified random duration
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.05, // Staggered delay for better performance
          });
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Memoize social links to prevent unnecessary re-renders
  const socialLinks = useMemo(() => [
    {
      icon: Github,
      href: "https://github.com/hassansabbir",
      label: "GitHub",
      color: "hover:from-gray-600 hover:to-gray-800",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/mahmud-hasan-sabbir-87nsm/",
      label: "LinkedIn",
      color: "hover:from-blue-600 hover:to-blue-800",
    },
    {
      icon: Mail,
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=mahmoodsabbir3087@gmail.com",
      label: "Contact",
      color: "hover:from-green-500 hover:to-green-700",
    },
  ], []);

  // Memoize code elements to prevent unnecessary re-renders
  const codeElements = useMemo(() => ["{ }", "< />", "=>", "( )", "[ ]", "&&", "||", "==="], []);

  // Reduce the number of particles for better performance
  const particleCount = prefersReducedMotion ? 20 : 40; // Reduced from 80

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black"
    >
      {/* Optimized animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(particleCount)].map((_, i) => (
          <motion.div
            key={i}
            className="particle absolute rounded-full hardware-accelerated"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`, // Reduced size for better performance
              height: `${Math.random() * 3 + 1}px`, // Reduced size for better performance
            }}
            // Simplified animation for better performance
            animate={prefersReducedMotion ? {} : {
              background: [
                "rgba(59, 130, 246, 0.4)", // Reduced opacity
                "rgba(147, 51, 234, 0.4)", // Reduced opacity
                "rgba(59, 130, 246, 0.4)", // Reduced opacity
              ],
            }}
            transition={{
              duration: 6, // Increased from 4 for smoother animation
              repeat: Infinity,
              delay: i % 5, // Simplified delay calculation
            }}
          />
        ))}
      </div>

      {/* Optimized floating code elements - reduced count */}
      <div className="absolute inset-0 pointer-events-none">
        {prefersReducedMotion ? null : codeElements.slice(0, 5).map( // Reduced from 8 to 5
          (code, i) => (
            <motion.div
              key={i}
              className="absolute text-gray-600 text-sm font-mono hardware-accelerated"
              style={{
                left: `${20 + (i * 15)}%`, // More predictable positioning for better performance
                top: `${15 + (i * 12)}%`, // More predictable positioning for better performance
              }}
              animate={{
                y: [0, -10, 0], // Reduced range from [-20, 0]
                opacity: [0.3, 0.5, 0.3], // Reduced range from [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 5, // Reduced from 6+random for more consistent performance
                repeat: Infinity,
                delay: i, // Simplified delay
              }}
            >
              {code}
            </motion.div>
          )
        )}
      </div>

      {/* Main content - optimized */}
      <motion.div
        className="text-center z-10 max-w-4xl mx-auto px-4 hardware-accelerated"
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }} // Reduced from 0.8
      >
        {/* Main title with typing effect */}
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold min-h-[1.2em] flex items-center justify-center">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {displayText}
            </span>
            {!prefersReducedMotion && (
              <motion.span
                className="inline-block w-1 h-16 md:h-20 bg-gradient-to-b from-blue-400 to-purple-400 ml-2 hardware-accelerated"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </h1>
        </div>

        {/* Subtitle - optimized */}
        <motion.div
          className="mb-4"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{
            opacity: subtitle ? 1 : 0,
            y: subtitle && !prefersReducedMotion ? 0 : 20,
          }}
          transition={{
            duration: 0.5, // Reduced from 0.7
            type: "spring",
            stiffness: 100, // Reduced from 120
            damping: 15, // Reduced from 20
          }}
        >
          <h2 className="text-2xl md:text-3xl text-gray-300 min-h-[1.5em] flex items-center justify-center">
            {subtitle}
          </h2>
        </motion.div>

        {/* Description - optimized */}
        <motion.div
          className="mb-8"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{
            opacity: description ? 1 : 0,
            y: description && !prefersReducedMotion ? 0 : 20,
          }}
          transition={{
            duration: 0.5, // Reduced from 0.7
            type: "spring",
            stiffness: 100, // Reduced from 120
            damping: 15, // Reduced from 20
          }}
        >
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto min-h-[3em] flex items-start justify-center">
            {description}
          </p>
        </motion.div>

        {/* Social links - optimized */}
        <div className="flex justify-center space-x-6 mb-12">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : "_self"}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : ""}
              className={`p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full hover:bg-gradient-to-r ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25 hardware-accelerated`}
              initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4, // Reduced from 0.6
                delay: prefersReducedMotion ? 0 : 1.5 + index * 0.1, // Reduced delay
              }}
              whileHover={prefersReducedMotion ? {} : {
                scale: 1.1, // Reduced from 1.2
              }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon size={24} />
            </motion.a>
          ))}
        </div>

        {/* CTA Button - optimized */}
        <motion.a
          href="#projects"
          className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 relative overflow-hidden hardware-accelerated"
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 2 }} // Reduced from 3.2
          whileHover={prefersReducedMotion ? {} : {
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)", // Reduced shadow
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Button background - simplified */}
          {!prefersReducedMotion && (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
          <span className="relative z-10">View My Work</span>
          <motion.div
            className="relative z-10 ml-2"
            animate={prefersReducedMotion ? {} : { y: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.a>
      </motion.div>

      {/* Scroll indicator - optimized */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hardware-accelerated"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.5 }} // Reduced from 4.2
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center relative overflow-hidden">
            <motion.div
              className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2"
              animate={{
                y: [0, 16, 0],
                opacity: [1, 0.5, 1], // Reduced opacity change
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
