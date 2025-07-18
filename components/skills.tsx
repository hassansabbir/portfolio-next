"use client";

import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend Development",
    description:
      "Modern UI/UX development with fast, modular and scalable interfaces.",
    tools: [
      {
        name: "React",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Next.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg",
      },
      {
        name: "JavaScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "TypeScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
    ],
  },
  {
    title: "Styling",
    description:
      "Responsive design systems with utility-first CSS and component libraries.",
    tools: [
      {
        name: "Tailwind CSS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
      },
      {
        name: "Ant Design",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/antdesign/antdesign-original.svg",
      },
      {
        name: "SASS",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
      },
    ],
  },
  {
    title: "Backend & Database",
    description:
      "Robust RESTful APIs and scalable database-driven applications.",
    tools: [
      {
        name: "Node.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "Express",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      },
      {
        name: "MongoDB",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
    ],
  },
  {
    title: "Dev Tools",
    description:
      "Modern development, collaboration, and debugging workflow tools.",
    tools: [
      {
        name: "Git",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      },
      {
        name: "Figma",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      },
      {
        name: "Postman",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
      },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 bg-gray-950 text-white">
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
              Skills & Tech Stack
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tools I use daily to craft, optimize and scale modern web
            applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, i) => (
            <motion.div
              key={category.title}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-gray-800/60 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 shadow-md backdrop-blur-md"
            >
              <h3 className="text-xl font-bold mb-2">{category.title}</h3>
              <p className="text-gray-400 text-sm mb-4">
                {category.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {category.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center gap-2 px-3 py-1 rounded-full border border-gray-600 bg-gray-900/50 hover:bg-gray-800/70 transition text-sm"
                  >
                    <img src={tool.logo} alt={tool.name} className="w-5 h-5" />
                    <span>{tool.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
