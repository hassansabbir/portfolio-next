import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const allSkills = [
  {
    name: "HTML",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    color: "from-orange-400 to-red-500",
  },
  {
    name: "CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    color: "from-blue-400 to-blue-600",
  },
  {
    name: "Bootstrap",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    color: "from-purple-400 to-purple-600",
  },
  {
    name: "Tailwind CSS",
    logo: "https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/tailwindcss/tailwindcss-original.svg",
    color: "from-cyan-400 to-teal-500",
  },
  {
    name: "Material UI",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
    color: "from-blue-400 to-indigo-500",
  },
  {
    name: "Ant Design",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/antdesign/antdesign-original.svg",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "from-yellow-400 to-orange-500",
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "from-cyan-400 to-blue-500",
  },
  {
    name: "Redux Toolkit",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Next.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg",
    color: "from-gray-600 to-gray-800",
  },
  {
    name: "Express.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    color: "from-gray-500 to-gray-700",
  },
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "from-green-400 to-green-600",
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    color: "from-green-500 to-green-700",
  },
  {
    name: "Firebase",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    color: "from-orange-400 to-yellow-500",
  },
  {
    name: "Framer Motion",
    logo: "https://raw.githubusercontent.com/devicons/devicon/refs/tags/v2.16.0/icons/framermotion/framermotion-original.svg",
    color: "from-pink-400 to-purple-500",
  },
  {
    name: "VS Code",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "from-red-500 to-orange-500",
  },
  {
    name: "Postman",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    color: "from-orange-400 to-red-500",
  },
  {
    name: "Figma",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    color: "from-purple-400 to-pink-500",
  },
  {
    name: "Canva",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
    color: "from-cyan-400 to-blue-500",
  },
  {
    name: "Socket.IO",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
    color: "from-gray-600 to-gray-800",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const skillVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
    rotate: -180,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15,
    },
  },
};

export default function Skills() {
  const [isLoaded, setIsLoaded] = useState(Array(allSkills.length).fill(false));

  useEffect(() => {
    // Preload all skill images
    const preloadImages = allSkills.map((skill) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = skill.logo;
        img.onload = resolve;
        img.onerror = resolve; // Handle errors gracefully
      });
    });

    // Set loaded state when all images are preloaded
    Promise.all(preloadImages).then(() => {
      setIsLoaded(Array(allSkills.length).fill(true));
    });
  }, []);

  return (
    <section id="skills" className="py-20 px-4 bg-gray-800/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-8"
          />
          <p className="text-white text-xl max-w-3xl mx-auto">
            Technologies I use to craft modern digital experiences
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center items-center gap-12 md:gap-16 lg:gap-20"
        >
          {allSkills?.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={skillVariants}
              whileHover={{
                scale: 1.2,
                rotate: [0, -2, 5, 0],
                zIndex: 50,
                transition: {
                  scale: { type: "spring", stiffness: 400, damping: 10 },
                  rotate: { duration: 0.9 },
                },
              }}
              whileTap={{ scale: 0.9 }}
              className="group relative cursor-pointer flex items-center"
              animate={{
                y: [0, -12, 0, -8, 0],
                rotate: [0, 2, 0, -2, 0],
              }}
              transition={{
                duration: 4 + (index % 3),
                repeat: Infinity,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{
                  opacity: 1,
                  scale: 1.3,
                  rotate: 180,
                }}
                transition={{ duration: 0.3 }}
                className={`absolute -inset-4 bg-gradient-to-r ${skill.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30`}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileHover={{
                  opacity: 1,
                  scale: 1.1,
                  rotate: -90,
                }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className={`absolute -inset-2 bg-gradient-to-r ${skill.color} rounded-xl blur-md opacity-0 group-hover:opacity-50`}
              />

              <motion.div
                className="relative z-10 p-3 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 group-hover:border-white/20 transition-all duration-300"
                whileHover={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                }}
              >
                {isLoaded[index] ? (
                  <motion.img
                    src={skill.logo}
                    alt={skill.name}
                    className="w-16 h-16 md:w-20 md:h-20 lg:w-16 lg:h-16 object-contain transition-all duration-300"
                    whileHover={{
                      filter: "drop-shadow(0 10px 20px rgba(255,255,255,0.2))",
                    }}
                  />
                ) : (
                  <div className="bg-gray-700 rounded-lg animate-pulse w-16 h-16 md:w-20 md:h-20 lg:w-16 lg:h-16" />
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                whileHover={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                transition={{ duration: 0.2 }}
                className={`absolute -bottom-12 left-0 transform -translate-x-1/2 bg-gradient-to-r ${skill.color} p-[1px] rounded-lg pointer-events-none z-20`}
              >
                <div className="bg-gray-900 px-4 py-2 rounded-lg">
                  <span className="text-white text-sm font-medium whitespace-nowrap">
                    {skill.name}
                  </span>
                </div>
                <div
                  className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900`}
                />
              </motion.div>

              <motion.div
                className="absolute inset-0 pointer-events-none"
                whileHover="hover"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-1 h-1 bg-gradient-to-r ${skill.color} rounded-full`}
                    variants={{
                      hover: {
                        rotate: 360,
                        scale: [1, 1.5, 1],
                      },
                    }}
                    transition={{
                      rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                      scale: { duration: 1, repeat: Infinity, delay: i * 0.2 },
                    }}
                    style={{
                      left: `${50 + 30 * Math.cos((i * 120 * Math.PI) / 180)}%`,
                      top: `${50 + 30 * Math.sin((i * 120 * Math.PI) / 180)}%`,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex justify-center mt-20 space-x-3"
        >
          {[...Array(7)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 1, 0.2],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
              className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
            />
          ))}
        </motion.div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5"
              animate={{
                x: [0, 100, -50, 0],
                y: [0, -100, 50, 0],
                scale: [1, 1.2, 0.8, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
