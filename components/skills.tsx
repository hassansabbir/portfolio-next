"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML/CSS", level: 80 },
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 87 },
      { name: "React", level: 93 },
      { name: "Next.js", level: 92 },
    ],
  },
  {
    title: "Styling",
    skills: [
      { name: "Tailwind CSS", level: 96 },
      { name: "Bootstrap", level: 80 },
      { name: "Material UI", level: 82 },
      { name: "Ant Design", level: 89 },
      { name: "Framer Motion", level: 84 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 75 },
      { name: "Express.js", level: 85 },
      { name: "MongoDB", level: 78 },
      { name: "Firebase", level: 72 },
      { name: "Redux Toolkit", level: 88 },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "VS Code", level: 96 },
      { name: "Git", level: 85 },
      { name: "Figma", level: 84 },
      { name: "GSAP", level: 60 },
      { name: "Webpack", level: 71 },
    ],
  },
];

export default function Skills() {
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Select all skill bars
      gsap.utils.toArray(".skill-bar").forEach((bar: any) => {
        // Get the target width from the element's data attribute or style
        const targetWidth = bar.style.width || "0%";

        // Reset width to 0 before animation
        gsap.set(bar, { width: 0 });

        // Animate to the specific width
        gsap.to(bar, {
          width: targetWidth,
          opacity: 1,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-container",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, skillsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={skillsRef} className="py-20 px-4 bg-gray-800/30">
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
              Skills & Technologies
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies I've mastered through 2+ years of development
            experience
          </p>
        </motion.div>

        <div className="skills-container grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">
                        {skill.name}
                      </span>
                      <span className="text-blue-400 text-sm font-semibold">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="skill-bar h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        style={{ width: `${skill.level}%` }}
                        data-width={`${skill.level}%`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating skill icons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          {[
            "⚛️",
            "🔥",
            "💻",
            "🎨",
            "📱",
            "🚀",
            "⚡",
            "🛠️",
            "📊",
            "🌐",
            "💡",
            "🎯",
            "🔧",
            "📈",
            "🎪",
            "🎭",
          ].map((emoji, index) => (
            <motion.div
              key={index}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.3,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="text-2xl opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
