/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import { IoBagHandleOutline } from 'react-icons/io5';
import HeroPng from '../../assets/Fruits/skater-with-safety-protections.png';
//import StrwPng from '../../assets/strw.png';
import {motion} from 'framer-motion';
import { FadeRight } from '../../utility/animation';

const Hero = () => {
  return (
     <section className='bg-black'>
        <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px]  relative ">
           {/* Brand Info */}
            <div className='flex flex-col justify-center py-14 md:py-0 relative z-10  md:pl-12'>
                <div className='text-center md:text-left space-y-6 lg:max-w-[400px]'>
                    <motion.h1 
                    variants={FadeRight(0.6)}
                    initial='hidden'
                    animate='visible'
                    className='text-5xl text-white lg:text-6xlfont-bold leading-relaxed xl:leading-loose font-averia'>Shop the Best 
                    <br />
                    Sportswear <span className='text-blue-500'>Today!</span></motion.h1>
                    <motion.p 
                    variants={FadeRight(0.9)}
                    initial='hidden'
                    animate='visible'
                    className='text-3xl text-white tracking-wide font-bold'>Gear Up for Peak Performance!</motion.p>
                    <motion.p 
                    variants={FadeRight(1.2)}
                    initial='hidden'
                    animate='visible'
                    className='text-gray-400'>
                    </motion.p>
                    {/* Button section*/}
                    <motion.div 
                    variants={FadeRight(1.5)}
                    initial='hidden'
                    animate='visible'
                    className='flex justify-center md:justify-start'>
                    <button className='font-bold bg-blue-500 text-white flex items-center gap-3 py-2 px-4 rounded-lg shadow-lg shadow-blue-500/50 hover:shadow-blue-700/50 transition ease-in-out duration-300'> <span><IoBagHandleOutline /> 
                    </span>
                    Order Now
                    </button>
                    </motion.div>
                </div>
            </div>
            {/*Hero image */}
            <div className='flex justify-center items-center'> 
                <motion.img 
                variants={FadeRight(0.9)}
                initial={{opacity: 0,x:200, rotate:0}}
                animate={{opacity: 1, x:0, rotate:0}}
                transition={{delay: 0.5, duration: 1}}
                src={HeroPng} alt="" className='w-[250px] md:w-[450px] drop-shadow'/>
            </div>
          
            { /*<div className='absolute top-14 md:top-0 right-1/2 blur-sm opacity-80 rotate-[-10deg]'>
                <motion.img 
                initial={{opacity: 0,x:200, rotate:75}}
                animate={{opacity: 1, x:0, rotate:0}}
                transition={{delay: 0.2, duration: 1}}
                src={StrwPng} alt="" className='w-full md:max-w-[300px]' />
            </div>*/}
        </div>
     </section>
  );
    
  
};

export default Hero;
