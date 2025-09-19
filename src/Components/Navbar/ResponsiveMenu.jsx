import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from "react-router-dom";

const NavMenu = [
  { id: 1, title: "Home", link: "/Home" },
  { id: 2, title: "Products", link: "/Products" },
  { id: 3, title: "About", link: "/About" },
  { id: 4, title: "Contacts", link: "/Contact" },
  { id: 5, title: "Cart", link: "/Cart" },
];

const ResponsiveMenu = ({ open, setOpen }) => {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div 
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className='absolute top-20 left-0 w-full h-screen z-20'
        >
          <div className='text-xl font-semibold uppercase bg-black text-white py-10 m-6 rounded-3xl'>
            <ul className='flex flex-col items-center gap-10'>
              {NavMenu.map((menu) => (
                <li key={menu.id}>
                  <Link 
                    to={menu.link} 
                    onClick={() => setOpen(false)} 
                    className="hover:text-red-500 transition duration-200"
                  >
                    {menu.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
