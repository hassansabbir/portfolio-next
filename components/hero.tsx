"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");

  const roles = [
    "Full Stack Developer",
    "Frontend Specialist",
    "MERN Stack Expert",
    "Frontend Architect",
  ];

  const subtitleText = "From Bangladesh 🇧🇩";
  const descriptionText =
    "Passionate developer with 2+ years of experience and 30+ projects. Specialized in modern web technologies and creating amazing user experiences.";

  // Main title typing effect
  useEffect(() => {
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
  }, [displayText, isDeleting, currentRole, roles]);

  // Subtitle typing effect - much faster
  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const typeSubtitle = () => {
        if (i <= subtitleText.length) {
          setSubtitle(subtitleText.slice(0, i));
          i++;
          setTimeout(typeSubtitle, 15); // Changed from 50ms to 15ms for much faster typing
        }
      };
      typeSubtitle();
    }, 1500); // Changed from 3000ms to 1500ms for earlier start

    return () => clearTimeout(timer);
  }, []);

  // Remove typing effect for description - just set it immediately
  useEffect(() => {
    const timer = setTimeout(() => {
      setDescription(descriptionText);
    }, 2000); // Appears at 2 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animated background particles
      gsap.set(".particle", { opacity: 0 });
      gsap.to(".particle", {
        opacity: 1,
        duration: 2,
        stagger: 0.1,
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".particle", {
        x: "random(-20, 20)",
        y: "random(-20, 20)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 2,
          from: "random",
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black"
    >
      {/* Enhanced animated background particles */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="particle absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
            }}
            animate={{
              background: [
                "rgba(59, 130, 246, 0.6)",
                "rgba(147, 51, 234, 0.6)",
                "rgba(236, 72, 153, 0.6)",
                "rgba(59, 130, 246, 0.6)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Floating code elements */}
      <div className="absolute inset-0 pointer-events-none">
        {["{ }", "< />", "=>", "( )", "[ ]", "&&", "||", "==="].map(
          (code, i) => (
            <motion.div
              key={i}
              className="absolute text-gray-600 text-sm font-mono"
              style={{
                left: `${Math.random() * 90}%`,
                top: `${Math.random() * 90}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.7, 0.3],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              {code}
            </motion.div>
          )
        )}
      </div>

      {/* Main content */}
      <motion.div
        className="text-center z-10 max-w-4xl mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Main title with typing effect */}
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold min-h-[1.2em] flex items-center justify-center">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {displayText}
            </span>
            <motion.span
              className="inline-block w-1 h-16 md:h-20 bg-gradient-to-b from-blue-400 to-purple-400 ml-2"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </h1>
        </div>

        {/* Subtitle with simple animation like description */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{
            opacity: subtitle ? 1 : 0,
            y: subtitle ? 0 : 30,
            scale: subtitle ? 1 : 0.9,
          }}
          transition={{
            duration: 0.7,
            type: "spring",
            stiffness: 120,
            damping: 20,
          }}
        >
          <motion.h2
            className="text-2xl md:text-3xl text-gray-300 min-h-[1.5em] flex items-center justify-center"
            animate={
              subtitle
                ? {
                    opacity: [0.8, 1, 0.8],
                  }
                : {}
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.span
              animate={
                subtitle
                  ? {
                      y: [0, -2, 0],
                    }
                  : {}
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {subtitle}
            </motion.span>
          </motion.h2>
        </motion.div>

        {/* Description with fast animation */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{
            opacity: description ? 1 : 0,
            y: description ? 0 : 40,
            scale: description ? 1 : 0.9,
          }}
          transition={{
            duration: 0.7,
            type: "spring",
            stiffness: 120,
            damping: 20,
            delay: 0.2,
          }}
        >
          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto min-h-[3em] flex items-start justify-center"
            animate={
              description
                ? {
                    opacity: [0.8, 1, 0.8],
                  }
                : {}
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.span
              animate={
                description
                  ? {
                      y: [0, -2, 0],
                    }
                  : {}
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {description}
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Social links with staggered animation */}
        <motion.div
          className="flex justify-center space-x-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }} // Adjusted for faster subtitle appearance
        >
          {[
            {
              icon: Github,
              href: "https://github.com/hassansabbir",
              label: "GitHub",
              color: "hover:from-gray-600 hover:to-gray-800",
            },
            {
              icon: Linkedin,
              href: "#",
              label: "LinkedIn",
              color: "hover:from-blue-600 hover:to-blue-800",
            },
            {
              icon: Mail,
              href: "#contact",
              label: "Contact",
              color: "hover:from-green-500 hover:to-green-700",
            },
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : "_self"}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : ""}
              className={`p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full hover:bg-gradient-to-r ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 0.6,
                delay: 2.4 + index * 0.1, // Adjusted for faster subtitle
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{
                scale: 1.2,
                rotate: [0, -10, 10, 0],
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon size={24} />
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Button with enhanced animation */}
        <motion.a
          href="#projects"
          className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.2 }} // Adjusted for faster subtitle
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Button background animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{
              background: [
                "linear-gradient(45deg, #8b5cf6, #ec4899)",
                "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                "linear-gradient(45deg, #8b5cf6, #ec4899)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="relative z-10">View My Work</span>
          <motion.div
            className="relative z-10 ml-2"
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.a>
      </motion.div>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 4.2 }} // Adjusted for faster subtitle
      >
        <motion.div
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center relative overflow-hidden"
          whileHover={{ scale: 1.1, borderColor: "#3b82f6" }}
        >
          <motion.div
            className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2"
            animate={{
              y: [0, 16, 0],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
