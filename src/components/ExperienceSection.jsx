import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
// import * as THREE from 'three';

const ExperienceCard = ({ company, position, duration, description, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay }}
            viewport={{ once: true }}
            className="bg-gray-900/50 backdrop-blur-lg p-6 rounded-xl border border-cyan-400/20 hover:border-cyan-400/50 transition-all"
        >
            <h3 className="text-xl font-bold text-cyan-400 mb-2">{position}</h3>
            <h4 className="text-lg text-purple-400 mb-2">{company}</h4>
            <p className="text-gray-400 text-sm mb-4">{duration}</p>
            <ul className="text-gray-300 space-y-2">
                {description.map((item, index) => (
                    <li key={index} className="flex items-start">
                        <span className="text-cyan-400 mr-2">▹</span>
                        {item}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};

const FloatingCube = () => {
    const meshRef = useRef();

    useFrame((state) => {
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                color="#22d3ee"
                metalness={0.7}
                roughness={0.2}
                emissive="#22d3ee"
                emissiveIntensity={0.2}
            />
        </mesh>
    );
};

const ExperienceSection = () => {
    const experiences = [
        {
            company: "GoSharpener (NSP, Delhi)",
            position: "Software Engineer",
            duration: "April 2025 - Present",
            description: [
                "Led development of key features using PHP and Node.js",
                "Improved application performance by 80%",
                "Mentored junior developers and conducted code reviews",
                "Implemented Local storage optimization techniques to enhance user experience",
                "Implemented Cache management strategies to reduce server load and improve response times",
            ]
        },
        {
            company: "iTech Mission Pvt Ltd (Green Park, Delhi)",
            position: "Intern Solution Developer",
            duration: "Sept 2024 - April 2025",
            description: [
                "Developed and maintained multiple web applications",
                "Implemented RESTful APIs using Django.",
                "Implemented AI Chatbot for the company website using Python, ML, Ollama and JavaScript",
                "Collaborated with cross-functional teams to deliver high-quality software solutions",
                "Dockerized applications for easier deployment and scalability",
                "Automated Script for the report generation using Python and Pandas",
            ]
        },
        {
            company: "Medic Tech Pvt Ltd (IIT Delhi)",
            position: "Python Developer Intern",
            duration: "Feb 2024 - July 2024",
            description: [
                "Worked on a gel image analysis research project for healthcare, integrating hardware and software to process blood sample images and generate results using Python, PyQt5, and OpenCV",
                "Contributed to a fully automated nanoparticle creation system, designing the Python and Qt Designer-based software for seamless hardware integration, implemented an admin login system for secure access",
                "Created user manuals and technical documentation for project usability and reference.",
                "Developed a Python-based GUI application for the gel image analysis project, enabling users to easily interact with the system and view results",
            ]
        },
        // Add more experiences as needed
    ];

    return (
        <section className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative" id="experience">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    Professional Experience
                </motion.h2>

                {/* 3D Background Element */}
                <div className="absolute right-0 top-0 w-full h-full -z-10 opacity-50">
                    <Canvas>
                        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                        <ambientLight intensity={0.5} />
                        <pointLight position={[10, 10, 10]} />
                        <FloatingCube />
                        <OrbitControls enableZoom={false} autoRotate />
                    </Canvas>
                </div>

                {/* Experience Cards */}
                <div className="grid md:grid-cols-2 gap-6 relative z-10">
                    {experiences.map((exp, index) => (
                        <ExperienceCard
                            key={index}
                            {...exp}
                            delay={0.2 * index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;