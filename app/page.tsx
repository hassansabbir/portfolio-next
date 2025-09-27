"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { initScrollReveal, initScrollProgress } from "@/lib/scroll-utils"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Navbar from "@/components/navbar"

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    // Optimize scroll tracking
    container: typeof window !== "undefined" ? window.document.documentElement : undefined,
  })
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const prefersReducedMotion = useReducedMotion()
  
  // Track if animations have been initialized
  const [animationsInitialized, setAnimationsInitialized] = useState(false)

  useEffect(() => {
    // Prevent multiple initializations
    if (animationsInitialized) return
    
    // Initialize scroll reveal animations
    const cleanupScrollReveal = initScrollReveal()
    
    // Initialize scroll progress indicator
    const cleanupScrollProgress = initScrollProgress()
    
    // Create a single GSAP context for better performance
    const ctx = gsap.context(() => {
      // Batch animations for better performance
      const tl = gsap.timeline();
      
      // GSAP animations for scroll-triggered elements - with optimizations
      const fadeElements = document.querySelectorAll(".fade-in")
      
      if (fadeElements.length > 0) {
        // Use batched animations for better performance
        gsap.set(fadeElements, { opacity: 0, y: 20 })
        
        fadeElements.forEach((element) => {
          ScrollTrigger.create({
            trigger: element,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            markers: false,
            onEnter: () => {
              gsap.to(element, {
                opacity: 1,
                y: 0,
                duration: 0.6, // Reduced for better performance
                ease: "power2.out",
                overwrite: "auto", // Prevent animation conflicts
                clearProps: "transform", // Clean up after animation
              })
            },
            onLeaveBack: () => {
              gsap.to(element, {
                opacity: 0,
                y: 20,
                duration: 0.5,
                ease: "power1.in",
              })
            }
          })
        })
      }

      // Parallax effect for background elements - with optimizations
      const parallaxElements = document.querySelectorAll(".parallax-bg")
      
      if (parallaxElements.length > 0) {
        parallaxElements.forEach((element) => {
          gsap.to(element, {
            yPercent: -15, // Reduced for better performance
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5, // Smoother scrolling
              invalidateOnRefresh: true, // Recalculate on window resize
            }
          })
        })
      }
    }, containerRef)
    
    // Mark animations as initialized
    setAnimationsInitialized(true)
    
    // Cleanup function
    return () => {
      // Kill all ScrollTriggers to prevent memory leaks
      ctx.revert()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      cleanupScrollReveal && cleanupScrollReveal()
      cleanupScrollProgress && cleanupScrollProgress()
    }
  }, [animationsInitialized, prefersReducedMotion])

  return (
    <div 
      ref={containerRef} 
      className="bg-gray-900 text-white overflow-x-hidden"
    >
      <Navbar />

      {/* Animated background - with hardware acceleration */}
      <div className="fixed inset-0 z-0 gpu-accelerated">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      </div>

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* Scroll progress indicator - with hardware acceleration */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 hardware-accelerated"
        style={{
          scaleX: scrollYProgress,
          transformOrigin: "0%",
        }}
      />
    </div>
  )
}
