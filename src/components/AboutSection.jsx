import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const skills = [
    { name: "Django", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", category: "Backend" },
    { name: "Python", level: 90, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Language" },
    { name: "JavaScript", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "Language" },
    { name: "PHP", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg", category: "Language" },
    { name: "React", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Frontend" },
    { name: "React Native", level: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Mobile" },
    { name: "Vue.js", level: 70, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", category: "Frontend" },
    { name: "Next.js", level: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", category: "Frontend" },
    { name: "Flutter", level: 68, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", category: "Mobile" },
    { name: "Three.js", level: 65, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg", category: "3D Graphics" },
    { name: "Node.js", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Backend" },
    { name: "Flask", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", category: "Backend" },
    { name: "Spring Boot", level: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", category: "Backend" },
    { name: "Java", level: 78, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", category: "Language" },
    { name: "TypeScript", level: 70, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "Language" },
    { name: "MongoDB", level: 80, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", category: "Database" },
    { name: "PostgreSQL", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", category: "Database" },
    { name: "MySQL", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", category: "Database" },
    { name: "SQLite", level: 82, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg", category: "Database" },
    { name: "Git", level: 85, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "DevOps" },
    { name: "Docker", level: 78, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", category: "DevOps" },
    { name: "AWS", level: 72, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", category: "Cloud" },
    { name: "Azure", level: 72, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", category: "Cloud" },
    { name: "Shopify", level: 75, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/shopify/shopify-original.svg", category: "CMS" },
    { name: "WordPress", level: 78, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg", category: "CMS" },
    { name: "AI & ML", level: 70, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", category: "AI/ML" },
    { name: "AI Automation", level: 68, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "AI/ML" },
    { name: "Zinn", level: 65, icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Backend" }
];

const ThreeBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });

        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        mount.appendChild(renderer.domElement);

        // Create particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 800;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.015,
            color: '#00ffff',
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        camera.position.z = 3;

        let mouseX = 0;
        let mouseY = 0;

        const handleMouseMove = (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            requestAnimationFrame(animate);

            particlesMesh.rotation.x += 0.0003;
            particlesMesh.rotation.y += 0.0005;

            camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.05;
            camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            if (!mount) return;
            camera.aspect = mount.clientWidth / mount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mount.clientWidth, mount.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            if (mount && renderer.domElement) {
                mount.removeChild(renderer.domElement);
            }
            renderer.dispose();
            particlesGeometry.dispose();
            particlesMaterial.dispose();
        };
    }, []);

    return <div ref={mountRef} className="absolute inset-0 opacity-30" />;
};

const AboutSection = () => {
    const [filter, setFilter] = useState('All');
    const categories = ['All', 'Language', 'Frontend', 'Backend', 'Database', 'Mobile', 'CMS', 'AI/ML', 'DevOps', 'Cloud', '3D Graphics'];

    const filteredSkills = filter === 'All' ? skills : skills.filter(s => s.category === filter);

    return (
        <section className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="about">
            <ThreeBackground />

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.h2
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    About Me
                </motion.h2>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="bg-gray-800/30 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border border-cyan-400/20">
                            <h3 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                                Software Engineer & Creative Developer
                            </h3>
                            <p className="text-base sm:text-lg text-gray-300 mb-4 leading-relaxed">
                                I'm a Software Engineer & Creative Developer who loves pushing the boundaries of web technology.
                                With expertise in Python, Django, React, Three.js, Node.js, React Native, Shopify, WordPress, PHP, Laravel, AI & ML and modern web frameworks, I create
                                immersive digital experiences that captivate users and drive results.
                            </p>
                            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                                When I'm not coding, you'll find me exploring new technologies, contributing
                                to open-source projects, or experimenting with the latest in web animation, video editing
                                and 3D graphics.
                            </p>
                        </div>

                        <motion.div
                            className="grid grid-cols-3 gap-4"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 backdrop-blur-lg p-4 sm:p-6 rounded-xl border border-cyan-400/30 text-center">
                                <div className="text-3xl sm:text-4xl font-bold text-cyan-400 mb-2">20+</div>
                                <div className="text-sm sm:text-base text-gray-300">Projects</div>
                            </div>
                            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-lg p-4 sm:p-6 rounded-xl border border-purple-400/30 text-center">
                                <div className="text-3xl sm:text-4xl font-bold text-purple-400 mb-2">1+</div>
                                <div className="text-sm sm:text-base text-gray-300">Years Exp</div>
                            </div>
                            <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/20 backdrop-blur-lg p-4 sm:p-6 rounded-xl border border-pink-400/30 text-center">
                                <div className="text-3xl sm:text-4xl font-bold text-pink-400 mb-2">100%</div>
                                <div className="text-sm sm:text-base text-gray-300">Satisfaction</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-gray-800/30 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border border-purple-400/20"
                    >
                        <h3 className="text-xl sm:text-2xl font-bold mb-6 text-purple-400">Tech Stack Expertise</h3>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${filter === cat
                                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                            {filteredSkills.map((skill, i) => (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.1, y: -5 }}
                                    className="group relative"
                                >
                                    <div className="bg-gray-700/30 backdrop-blur-sm p-4 rounded-xl border border-gray-600/30 hover:border-cyan-400/50 transition-all aspect-square flex flex-col items-center justify-center">
                                        <img
                                            src={skill.icon}
                                            alt={skill.name}
                                            className="w-10 h-10 sm:w-12 sm:h-12 mb-2 object-contain filter brightness-90 group-hover:brightness-110 transition-all"
                                        />
                                        <div className="text-xs text-center text-gray-400 font-medium">{skill.name}</div>
                                        <div className="text-xs text-cyan-400 font-bold mt-1">{skill.level}%</div>
                                    </div>

                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-gray-800/40 via-gray-900/40 to-gray-800/40 backdrop-blur-lg p-6 sm:p-8 rounded-2xl border border-cyan-400/20"
                >
                    <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        What I Bring to the Table
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { icon: "⚡", title: "Fast Development", desc: "Rapid prototyping and delivery" },
                            { icon: "🎨", title: "Creative Solutions", desc: "Innovative approach to problems" },
                            { icon: "🚀", title: "Performance", desc: "Optimized and scalable code" },
                            { icon: "🤝", title: "Collaboration", desc: "Team player and communicator" }
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                whileHover={{ scale: 1.05 }}
                                className="bg-gray-700/30 p-4 rounded-xl text-center border border-gray-600/30 hover:border-purple-400/50 transition-all"
                            >
                                <div className="text-3xl mb-2">{item.icon}</div>
                                <div className="font-semibold text-white mb-1">{item.title}</div>
                                <div className="text-xs text-gray-400">{item.desc}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;