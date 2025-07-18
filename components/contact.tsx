"use client";

import type React from "react";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [modalContent, setModalContent] = useState<{
    title: string;
    description: string;
    messageId?: string;
  } | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });
    setModalContent(null); // reset before new request

    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          toast.success(data.message);
          setSubmitStatus({
            type: "success",
            message: data.message,
          });
          setModalContent(data.modalContent);
          setShowModal(true); // Show the modal
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
        } else {
          throw new Error(data.message || "Failed to send message");
        }
      })
      .catch((error) => {
        setSubmitStatus({
          type: "error",
          message: "Failed to send message. Please try again.",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "mahmoodsabbir3087@gmail.com",
      href: "mailto:mahmoodsabbir3087@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+880 1516 564923",
      href: "tel:+8801516564923",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Dhaka, Bangladesh",
      href: "#",
    },
  ];

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-gray-800/30">
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
              Get In Touch
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ready to work together? Let's discuss your next project and bring
            your ideas to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">
                Let's start a conversation
              </h3>
              <p className="text-gray-400 mb-8">
                I'm always interested in hearing about new projects and
                opportunities. Whether you're a company looking to hire, or
                you're someone who has a project in mind, I'd love to hear from
                you.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.02,
                    x: 10,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                    },
                  }}
                  className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <info.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">{info.label}</div>
                    <div className="text-white font-medium">{info.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <h4 className="text-lg font-semibold text-white mb-4">
                Follow me on
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    whileHover={{
                      scale: 1.2,
                      rotate: 5,
                      transition: {
                        duration: 0.3,
                        ease: "easeOut",
                      },
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800/50 rounded-xl p-8 backdrop-blur-sm border border-gray-700"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                  placeholder="Project discussion"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 15,
                }}
                className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                <Send size={20} />
                <span>Send Message</span>
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16 pt-8 border-t border-gray-700"
        >
          <p className="text-gray-400">
            © 2024 Frontend Developer Portfolio. Made with ❤️ in Bangladesh
          </p>
        </motion.div>
      </div>

      {showModal && modalContent && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-gray-800/90 p-6 rounded-lg border border-green-600 text-green-100 shadow-md transition-all w-full max-w-md mx-4">
            <h4 className="text-xl font-semibold mb-2">{modalContent.title}</h4>
            <p>{modalContent.description}</p>
            {/* {modalContent.messageId && (
              <p className="text-xs text-green-300 mt-2">
                Message ID: {modalContent.messageId}
              </p>
            )} */}
            <button
              onClick={() => {
                setShowModal(false);
                setModalContent(null);
              }}
              className="mt-4 px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition-colors duration-200 text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
