"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Eye } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with seamless user experience, secure payments, and a powerful admin panel.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    github: "#",
    live: "#",
    category: "Full Stack",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "Collaborative task management with real-time sync, Kanban board, and intuitive UI.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Next.js", "TypeScript", "Firebase", "Framer Motion"],
    github: "#",
    live: "#",
    category: "Frontend",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "Dynamic weather dashboard featuring animated charts, sleek visuals, and mobile-friendly layout.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["React", "Chart.js", "OpenWeather API", "Material UI"],
    github: "#",
    live: "#",
    category: "Frontend",
  },
  {
    id: 4,
    title: "Social Media App",
    description:
      "Full-featured social platform with messaging, posts, real-time updates, and media uploads.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Next.js", "Socket.io", "MongoDB", "Cloudinary"],
    github: "#",
    live: "#",
    category: "Full Stack",
  },
  {
    id: 5,
    title: "Portfolio Website",
    description:
      "Personal branding portfolio with sleek animations, contact integration, and responsive layout.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "EmailJS"],
    github: "#",
    live: "#",
    category: "Frontend",
  },
  {
    id: 6,
    title: "Learning Management System",
    description:
      "Educational platform with instructor tools, video streaming, and student progress tracking.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["React", "Express.js", "PostgreSQL", "AWS S3"],
    github: "#",
    live: "#",
    category: "Full Stack",
  },
];

const categories = ["All", "Frontend", "Full Stack"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section
      id="projects"
      className="py-24 px-4 bg-gradient-to-br from-gray-950 to-black text-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            My Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore a selection of my most impactful and polished projects.
          </p>
          <div className="mt-8 flex justify-center space-x-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full border text-sm font-medium backdrop-blur-md transition-all duration-300 hover:border-purple-500 hover:text-purple-400 ${
                  activeCategory === category
                    ? "border-purple-600 text-purple-300"
                    : "border-gray-700 text-gray-400"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
                className="relative group rounded-xl overflow-hidden bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-5 border border-gray-700 hover:shadow-xl hover:shadow-purple-500/20 transition duration-300"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative overflow-hidden rounded-md mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                  />
                  {hoveredProject === project.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4"
                    >
                      <a
                        href={project.live}
                        target="_blank"
                        className="p-3 bg-purple-600 hover:bg-purple-500 text-white rounded-full"
                      >
                        <Eye size={20} />
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        className="p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full"
                      >
                        <Github size={20} />
                      </a>
                    </motion.div>
                  )}
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-white">
                      {project.title}
                    </h3>
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
