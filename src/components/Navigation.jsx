import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navItems = ['Home', 'About', 'Experience', 'Projects', 'Reviews', 'Contact'];

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <motion.nav
            className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-3 sm:py-4">
                    {/* Logo */}
                    {/* <motion.div
                        className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                        whileHover={{ scale: 1.05 }}
                    >
                        VR
                    </motion.div> */}
                    <motion.div
                        className="flex items-center space-x-3 cursor-pointer group"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        {/* Circular Image */}
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-black-700 group-hover:border-purple-400 transition-colors duration-300">
                            <img
                                src="/vr_avatar.png" // <- make sure this is in your /public folder
                                alt="VR Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* VR Text */}
                        <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent transition-colors duration-300 group-hover:from-purple-400 group-hover:to-cyan-400">

                        </span>
                    </motion.div>


                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-4 lg:space-x-8">
                        {navItems.map((item, i) => (
                            <motion.a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-sm lg:text-base hover:text-cyan-400 transition-colors cursor-pointer"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 + 0.5 }}
                                whileHover={{ scale: 1.1 }}
                            >
                                {item}
                            </motion.a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden w-8 h-8 flex flex-col justify-center items-center space-y-1"
                        onClick={toggleMenu}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.span
                            className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}
                        />
                        <motion.span
                            className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`}
                        />
                        <motion.span
                            className={`w-6 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
                        />
                    </motion.button>
                </div>

                {/* Mobile Navigation Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-b border-white/10"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="px-4 py-4 space-y-4">
                                {navItems.map((item, i) => (
                                    <motion.a
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        className="block text-lg hover:text-cyan-400 transition-colors cursor-pointer"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        onClick={() => {
                                            setTimeout(() => setIsOpen(false), 800);
                                        }}
                                    >
                                        {item}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navigation;