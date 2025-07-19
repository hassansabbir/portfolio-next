"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Eye } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Port A Vacation Co.",
    description:
      "Port A Vacation Co. is a vacation rental platform offering cottages, cars, and golf cart bookings tailored to your travel dates and group size. Users can explore accommodations, browse amenities, and make hassle-free reservations in one place.",
    image: "https://i.ibb.co/bRKjLhMt/Screenshot-2025-07-19-152708.png",
    technologies: [
      "Next.js",
      "TypeScript",
      "Redux Toolkit",
      "Tailwind CSS",
      "Ant Design",
      "Framer Motion",
    ],
    github: "#",
    live: "https://portavacationco-website.vercel.app/",
    category: "Frontend",
  },
  {
    id: 2,
    title: "ModaBella",
    description:
      "ModaBella is a modern eCommerce platform offering stylish apparel for men, women, and children. Featuring a sleek, interactive design, it delivers a seamless and visually engaging shopping experience.",
    image: "https://i.ibb.co/Fk4SDFTg/Screenshot-2025-07-19-151623.png",
    technologies: [
      "Next.js",
      "JavaScript",
      "React Query",
      "Express.js",
      "Firebase",
      "MongoDB",
      "Stripe",
      "Tailwind CSS",
    ],
    github: "#",
    live: "https://modabella-84ce4.web.app/",
    category: "Full Stack",
  },
  {
    id: 3,
    title: "The Cannasseurs Club",
    description:
      "The Cannasseurs Club is a California-based B2B cannabis distribution platform offering a wide variety of premium products. Designed exclusively for licensed retailers, it streamlines bulk ordering with a focus on quality and compliance.",
    image: "https://i.ibb.co/r2kfJp1z/Screenshot-2025-07-19-151518.png",
    technologies: [
      "Next.js",
      "TypeScript",
      "Redux Toolkit",
      "Express.js",
      "MongoDB",
      "Stripe",
      "Tailwind CSS",
      "Ant Design",
    ],
    github: "#",
    live: "https://doublet24.netlify.app/",
    category: "Full Stack",
  },
  {
    id: 4,
    title: "HealthCare Financial Consultation Website",
    description:
      "HealthCare Financial Consultation is a platform where users can book expert consultations with doctors on healthcare finance topics. Featuring a global timezone-aware booking system and Zoom integration, it ensures seamless virtual sessions anywhere, anytime.",
    image: "https://i.ibb.co/h170DWDJ/Screenshot-2025-07-19-151358.png",
    technologies: [
      "Next.js",
      "TypeScript",
      "Redux Toolkit",
      "Express.js",
      "MongoDB",
      "Stripe",
      "Tailwind CSS",
      "Ant Design",
    ],
    github: "#",
    live: "https://hcfinconsults.com",
    category: "Full Stack",
  },
  {
    id: 5,
    title: "WestFert",
    description:
      "Westfert is an administrative dashboard for a fertilizer production platform, enabling efficient management of products, employees, and customers. It streamlines task assignments, user oversight, and operational workflows from a centralized interface.",
    image: "https://i.ibb.co/R4JJZ5TT/Screenshot-2025-07-19-151111.png",
    technologies: ["React", "JavaScript", "Tailwind CSS", "Ant Design"],
    github: "#",
    live: "https://westfert-dashboard.netlify.app/",
    category: "Frontend",
  },
  {
    id: 6,
    title: "Event Management System",
    description:
      "Event 360 is a modern event management web app offering subscription-based access to professional event planning services. With an interactive UI and sleek design, it delivers a smooth and engaging user experience from booking to execution.",
    image: "https://i.ibb.co/nJkFv74/Screenshot-2025-07-19-151252.png",
    technologies: [
      "Next.js",
      "TypeScript",
      "Framer Motion",
      "Tailwind CSS",
      "Ant Design",
    ],
    github: "#",
    live: "https://event-manager365.netlify.app/",
    category: "Frontend",
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              My Projects
            </span>
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
                      {/* <a
                        href={project.github}
                        target="_blank"
                        className="p-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full"
                      >
                        <Github size={20} />
                      </a> */}
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
