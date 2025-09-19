import React from 'react';
import {FaFacebook, FaInstagram, FaTwitter, FaYoutube, } from 'react-icons/fa';
import {motion} from 'framer-motion';
import { GiVineLeaf } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className='bg-gradient-to-r from-gray-900 to-black p-0bg-black '>
        <motion.div 
        initial={{opacity:0}}
        whileInView={{opacity:1}}
        transition={{delay:0.2, duration:0.5}}
        className='container flex justify-between items-center'>
            {/* Logo  Section */}
            <div className='bg black text-2xl flex items-center gap-2 font-bold uppercase'>
                    <p className='bg-white text-transparent bg-clip-text '>FLEX</p>
                    <p className='bg-white text-transparent bg-clip-text'>GEAR</p>
                  
                </div>
            {/* Social Media Section */}
            <div className='text-3xl flex items-center gap-4 mt-6 pb-5 text-gray-700'>
             <FaInstagram />
             <FaFacebook/>
             <FaTwitter />           
           </div>
        </motion.div>
    </footer>
  );
};

export default Footer;
