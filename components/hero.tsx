"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

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
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Motion-wrapped content */}
      <motion.div
        className="text-center z-10 max-w-4xl mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Full Stack Developer
            </span>
          </h1>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl md:text-3xl text-gray-300">
            From Bangladesh 🇧🇩
          </h2>
        </div>

        <div className="mb-6">
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Passionate developer with 2+ years of experience and 30+ projects.
            Specialized in modern web technologies and creating amazing user
            experiences.
          </p>
        </div>

        <div className="flex justify-center space-x-6 mb-12">
          {[
            {
              icon: Github,
              href: "https://github.com/hassansabbir",
              label: "GitHub",
            },
            { icon: Linkedin, href: "#", label: "LinkedIn" },
            { icon: Mail, href: "#contact", label: "Contact" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : "_self"}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : ""}
              className="p-3 bg-gray-800 rounded-full hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
            >
              <social.icon size={24} />
            </a>
          ))}
        </div>

        <a
          href="#about"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
        >
          View My Work
          <ChevronDown className="ml-2" size={20} />
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}
