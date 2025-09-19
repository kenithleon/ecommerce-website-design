import React from "react";
import BannerPng from "../../assets/Fruits/virat.png";
import { motion } from "framer-motion";
import { FadeUp } from "../../utility/animation";

const Banner = () => {
  return (
    <section className="bg-black py-12">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Banner Image */}
        <div className="flex justify-center">
          <motion.img
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            src={BannerPng}
            alt="Brand Info"
            className="w-[300px] md:max-w-[400px] object-cover drop-shadow"
          />
        </div>
        {/* Banner Info */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <motion.h1
            variants={FadeUp(0.5)}
            initial="hidden"
            whileInView="visible"
            className="text-3xl lg:text-6xl font-bold uppercase text-primary text-blue-500"
          >
            Brand Info
          </motion.h1>
          <motion.p variants={FadeUp(0.7)}></motion.p>
          <motion.div variants={FadeUp(1.1)} className="mt-4">
            <button className="font-bold bg-blue-500 text-black flex items-center gap-3 py-2 px-4 rounded-lg shadow-lg shadow-blue-500/50 ">Learn More</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
