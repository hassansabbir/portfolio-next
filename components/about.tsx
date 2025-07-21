"use client";

import { motion } from "framer-motion";
import { Code, Coffee, Globe, Users } from "lucide-react";
import Image from "next/image";
import profileImg from "../assets/20250613_090732.jpg";
import Link from "next/link";

const stats = [
  { icon: Code, label: "Projects Completed", value: "30+" },
  { icon: Coffee, label: "Years Experience", value: "2+" },
  { icon: Globe, label: "Technologies", value: "15+" },
  { icon: Users, label: "Happy Clients", value: "25+" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      ease: "easeOut",
      duration: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function About() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Frontend-focused full stack developer passionate about building
            fast, functional, and beautiful user experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-white">
              Hello! I'm Mahmud Hasan Sabbir <br /> a Full Stack Developer from
              Bangladesh
            </h3>
            <p className="text-gray-400 leading-relaxed">
              I specialize in frontend engineering with React and Next.js, and
              bring strong design system awareness, interactive UI building, and
              performance-focused development to every project I take on.
            </p>
            <p className="text-gray-400 leading-relaxed">
              My stack spans React, Next.js, TypeScript, Tailwind, Node.js,
              MongoDB, and Firebase. With 2+ years of experience, I’ve built 30+
              web apps — from landing pages to full-featured platforms —
              consistently delivering value to users and clients.
            </p>
            <Link
              href="https://drive.google.com/file/d/1myvx8U6W-NbqAgU6wzystwuBvSjH1BfT/view?usp=sharing"
              target="_blank"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                }}
                className="px-6 py-3 mt-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Download Resume
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="w-80 h-80 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse" />
              <div className="relative w-full h-full bg-gray-800 rounded-full flex items-center justify-center border-4 border-gray-700">
                <Image
                  src={profileImg}
                  alt="profileImage"
                  width={4646546}
                  height={24354354}
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
              className="text-center p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-4">
                <stat.icon size={24} className="text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
