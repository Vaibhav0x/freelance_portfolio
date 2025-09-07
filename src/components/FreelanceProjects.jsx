import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFreelanceProjectsByCategory, freelanceCategoryInfo } from '../data/freelanceProject.js';

const FreelanceProjects = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const categorizedProjects = useMemo(() => getFreelanceProjectsByCategory(), []);
    const categories = Object.keys(categorizedProjects);

    const handleCategoryClick = (category) => {
        setSelectedCategory(selectedCategory === category ? null : category);
    };

    const handleBackToCategories = () => {
        setSelectedCategory(null);
    };

    return (
        <section className="min-h-screen py-20 px-6" id="freelance-projects">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        Freelance Projects
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Professional client work showcasing diverse skills and successful project deliveries across multiple domains.
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!selectedCategory ? (
                        /* Category Selection View */
                        <motion.div
                            key="categories"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {categories.map((category, index) => {
                                const info = freelanceCategoryInfo[category];
                                const projectCount = categorizedProjects[category].length;

                                return (
                                    <motion.div
                                        key={category}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: index * 0.15,
                                            type: "spring",
                                            stiffness: 100
                                        }}
                                        className="group relative"
                                    >
                                        {/* Category Card */}
                                        <motion.div
                                            className={`relative overflow-hidden bg-gradient-to-br ${info.gradient} p-8 rounded-2xl cursor-pointer h-64 shadow-2xl`}
                                            whileHover={{
                                                scale: 1.03,
                                                rotateY: 8,
                                                rotateX: 5
                                            }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => handleCategoryClick(category)}
                                            style={{
                                                transformStyle: "preserve-3d",
                                                perspective: "1000px"
                                            }}
                                        >
                                            {/* Premium glass overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* Shine effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

                                            {/* Content */}
                                            <div className="relative z-10 h-full flex flex-col justify-between text-white">
                                                <div>
                                                    <motion.div
                                                        className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300"
                                                        whileHover={{ rotate: [0, -10, 10, 0] }}
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                        {info.icon}
                                                    </motion.div>
                                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-200 transition-colors duration-300">
                                                        {category}
                                                    </h3>
                                                    <p className="text-white/90 text-sm leading-relaxed">
                                                        {info.description}
                                                    </p>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <motion.div
                                                            className="w-2 h-2 bg-green-400 rounded-full"
                                                            animate={{
                                                                scale: [1, 1.2, 1],
                                                                opacity: [1, 0.7, 1]
                                                            }}
                                                            transition={{ duration: 2, repeat: Infinity }}
                                                        />
                                                        <span className="text-white/90 font-medium text-sm">
                                                            {projectCount} Project{projectCount !== 1 ? 's' : ''}
                                                        </span>
                                                    </div>
                                                    <motion.div
                                                        className="bg-white/20 backdrop-blur-sm p-2 rounded-full border border-white/30"
                                                        whileHover={{
                                                            rotate: 90,
                                                            backgroundColor: "rgba(255,255,255,0.3)"
                                                        }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                    </motion.div>
                                                </div>
                                            </div>

                                            {/* Animated background elements */}
                                            <div className="absolute inset-0 opacity-30">
                                                {[...Array(15)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="absolute w-1 h-1 bg-white rounded-full"
                                                        style={{
                                                            left: `${Math.random() * 100}%`,
                                                            top: `${Math.random() * 100}%`,
                                                        }}
                                                        animate={{
                                                            y: [0, -30, 0],
                                                            opacity: [0.3, 1, 0.3],
                                                            scale: [1, 1.5, 1],
                                                        }}
                                                        transition={{
                                                            duration: 4 + Math.random() * 2,
                                                            repeat: Infinity,
                                                            delay: Math.random() * 3,
                                                            ease: "easeInOut"
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    ) : (
                        /* Projects View */
                        <motion.div
                            key="projects"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* Back Button & Category Header */}
                            <div className="flex items-center justify-between mb-12">
                                <motion.button
                                    onClick={handleBackToCategories}
                                    className="flex items-center gap-3 px-6 py-3 bg-gray-800/60 backdrop-blur-sm hover:bg-gray-700/60 rounded-xl transition-all duration-300 border border-gray-600/50 hover:border-emerald-400/50 shadow-lg"
                                    whileHover={{ scale: 1.05, x: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    <span className="font-medium">Back to Categories</span>
                                </motion.button>

                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-4"
                                >
                                    <h3 className={`text-3xl font-bold bg-gradient-to-r ${freelanceCategoryInfo[selectedCategory].gradient} bg-clip-text text-transparent`}>
                                        {selectedCategory} Projects
                                    </h3>
                                    <span className="text-5xl">
                                        {freelanceCategoryInfo[selectedCategory].icon}
                                    </span>
                                </motion.div>
                            </div>

                            {/* Projects Grid */}
                            <motion.div
                                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.1
                                        }
                                    }
                                }}
                            >
                                {categorizedProjects[selectedCategory].map((project) => (
                                    <motion.div
                                        key={project.id}
                                        variants={{
                                            hidden: { opacity: 0, y: 30, scale: 0.9 },
                                            visible: { opacity: 1, y: 0, scale: 1 }
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            type: "spring",
                                            stiffness: 100
                                        }}
                                        className="group bg-gradient-to-br from-gray-800/40 via-gray-800/30 to-gray-900/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700/40 hover:border-emerald-400/60 hover:from-gray-800/60 hover:to-gray-900/60 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/10"
                                        whileHover={{
                                            y: -8,
                                            rotateX: 5,
                                            rotateY: 5
                                        }}
                                        style={{ transformStyle: "preserve-3d" }}
                                    >
                                        {/* Project Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <motion.div
                                                className="text-4xl group-hover:scale-110 transition-transform duration-300"
                                                whileHover={{ rotate: [0, -15, 15, 0] }}
                                                transition={{ duration: 0.6 }}
                                            >
                                                {project.image}
                                            </motion.div>
                                            {project.featured && (
                                                <motion.span
                                                    className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-gray-900 text-xs px-3 py-1 rounded-full font-bold shadow-lg"
                                                    animate={{
                                                        boxShadow: [
                                                            "0 0 0 0 rgba(16, 185, 129, 0.4)",
                                                            "0 0 0 8px rgba(16, 185, 129, 0)",
                                                            "0 0 0 0 rgba(16, 185, 129, 0)"
                                                        ]
                                                    }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                >
                                                    CLIENT WORK
                                                </motion.span>
                                            )}
                                        </div>

                                        {/* Project Info */}
                                        <h4 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-400 transition-colors duration-300">
                                            {project.title}
                                        </h4>

                                        <p className="text-gray-400 text-sm mb-5 leading-relaxed line-clamp-4">
                                            {project.description}
                                        </p>

                                        {/* Tech Stack */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.tech.slice(0, 4).map((tech, index) => (
                                                <motion.span
                                                    key={tech}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="bg-emerald-400/15 text-emerald-400 text-xs px-3 py-1 rounded-full font-medium border border-emerald-400/25 hover:bg-emerald-400/25 transition-colors duration-200"
                                                >
                                                    {tech}
                                                </motion.span>
                                            ))}
                                            {project.tech.length > 4 && (
                                                <span className="text-gray-500 text-xs px-3 py-1 bg-gray-700/40 rounded-full border border-gray-600/30">
                                                    +{project.tech.length - 4}
                                                </span>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3">
                                            {project.github && (
                                                <motion.a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 bg-gray-700/60 hover:bg-gray-600/60 backdrop-blur-sm py-3 px-4 rounded-lg text-center text-sm font-medium transition-all duration-300 border border-gray-600/40 hover:border-gray-500/60"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <span className="mr-2">📂</span>
                                                    Code
                                                </motion.a>
                                            )}
                                            {project.live && (
                                                <motion.a
                                                    href={project.live}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 py-3 px-4 rounded-lg text-center text-sm font-medium text-white transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <span className="mr-2">🚀</span>
                                                    View Project
                                                </motion.a>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer Stats - Only show in category view */}
                {!selectedCategory && (
                    <motion.div
                        className="mt-20 text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                            <div className="text-center">
                                <motion.div
                                    className="text-3xl font-bold text-emerald-400 mb-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    {Object.values(categorizedProjects).flat().length}
                                </motion.div>
                                <div className="text-gray-500 text-sm">Total Projects</div>
                            </div>
                            <div className="text-center">
                                <motion.div
                                    className="text-3xl font-bold text-cyan-400 mb-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                >
                                    {categories.length}
                                </motion.div>
                                <div className="text-gray-500 text-sm">Categories</div>
                            </div>
                            <div className="text-center">
                                <motion.div
                                    className="text-3xl font-bold text-blue-400 mb-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.2 }}
                                >
                                    {Object.values(categorizedProjects).flat().filter(p => p.featured).length}
                                </motion.div>
                                <div className="text-gray-500 text-sm">Client Works</div>
                            </div>
                            <div className="text-center">
                                <motion.div
                                    className="text-3xl font-bold text-purple-400 mb-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.4 }}
                                >
                                    {new Set(Object.values(categorizedProjects).flat().flatMap(p => p.tech)).size}
                                </motion.div>
                                <div className="text-gray-500 text-sm">Technologies</div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default FreelanceProjects;