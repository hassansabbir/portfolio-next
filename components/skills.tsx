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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("skills");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Lazy load images as they become visible
    const lazyLoad = () => {
      allSkills.forEach((skill, index) => {
        if (isLoaded[index]) return;

        const img = new Image();
        img.src = skill.logo;
        img.onload = () => {
          setIsLoaded((prev) => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        };
        img.onerror = () => {
          setIsLoaded((prev) => {
            const newState = [...prev];
            newState[index] = true; // Mark as loaded to prevent retries
            return newState;
          });
        };
      });
    };

    const timer = setTimeout(lazyLoad, 300);
    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <section id="skills" className="py-20 px-4 bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-8"
          />
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            Technologies I use to craft modern digital experiences
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center items-center gap-12 md:gap-16 lg:gap-16"
        >
          {allSkills?.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={skillVariants}
              whileHover={{
                scale: 1.15,
                rotate: [0, -2, 5, 0],
                zIndex: 50,
                transition: {
                  scale: { type: "spring", stiffness: 400, damping: 10 },
                  rotate: { duration: 0.9 },
                },
              }}
              whileTap={{ scale: 0.9 }}
              className="group relative cursor-pointer flex flex-col items-center justify-center"
            >
              <div className="relative w-full flex justify-center">
                {/* <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{
                    opacity: 1,
                    scale: 0.2,
                    rotate: 180,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`absolute -inset-4 bg-gradient-to-r ${skill.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30`}
                /> */}

                {/* <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileHover={{
                    opacity: 1,
                    scale: 1.1,
                    rotate: -90,
                  }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className={`absolute -inset-2 bg-gradient-to-r ${skill.color} rounded-xl blur-md opacity-0 group-hover:opacity-50`}
                /> */}

                <motion.div
                  className="relative z-10 p-3 rounded-xl bg-gray-800 backdrop-blur-sm border border-gray-700 group-hover:border-white/20 transition-all duration-300 w-24 h-24 flex items-center justify-center"
                  whileHover={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {isLoaded[index] ? (
                    <motion.img
                      src={skill.logo}
                      alt={skill.name}
                      className="w-14 h-14 object-contain transition-all duration-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  ) : (
                    <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg w-14 h-14 flex items-center justify-center">
                      <div className="w-6 h-6 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
                    </div>
                  )}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="mt-4 text-center"
              >
                <span className="text-gray-300 text-sm font-medium">
                  {skill.name}
                </span>
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
