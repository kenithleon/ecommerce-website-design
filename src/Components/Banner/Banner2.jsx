import React from "react";
import BannerPng from "../../assets/Fruits/hh.png";
import { motion } from "framer-motion";
import { FadeUp } from "../../utility/animation";

const Banner2 = () => {
  return (
    <section className="bg-black py-12 w-full">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[400px]">
        {/* Banner Info */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <motion.h1
            variants={FadeUp(0.5)}
            className="text-3xl lg:text-6xl font-bold uppercase text-red-600"
          >
            Online Store
          </motion.h1>

          <motion.div variants={FadeUp(1.1)} className="mt-4">
            <button className="font-bold bg-blue-500 text-black flex items-center gap-3 py-2 px-4 rounded-lg shadow-lg shadow-blue-500/50 hover:shadow-blue-700/50 transition ease-in-out duration-300">
              Download App
            </button>
          </motion.div>
        </div>

        {/* Banner Image */}
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            src={BannerPng}
            alt="Online Store"
            className="w-[300px] md:w-[400px] object-cover drop-shadow"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner2;
