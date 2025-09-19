import React, { useContext } from 'react';
import { ImCart } from "react-icons/im";
import { MdMenu } from 'react-icons/md';
import ResponsiveMenu from './ResponsiveMenu';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from "react-router-dom";
import { CartContext } from '../CartContext/CartContext';

const NavMenu = [
  { id: 1, title: "Home", link: "/Home" },
  { id: 2, title: "Products", link: "/Products" },
  { id: 3, title: "About", link: "/About" },
  { id: 4, title: "Contacts", link: "/Contact" },
];

const Navbar = () => {
  const { cart, popupMessage } = useContext(CartContext); 
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <nav className="bg-gradient-to-r from-gray-900 to-black p-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="container flex justify-between items-center py-4 md:pt-4"
        >
          {/* Logo section */}
          <div className='text-2xl flex items-center gap-2 font-bold uppercase'>
            <p className="text-white font-bold uppercase">FLEX</p>
            <p className="text-white font-bold uppercase">GEAR</p>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className='flex items-center gap-6 text-blue-500'>
              {NavMenu.map((menu) => (
                <li key={menu.id}>
                  <Link
                    to={menu.link}
                    className='inline-block py-1 px-3 hover:text-secondary hover:shadow-[0_3px_0_-1px_#fb923c] font-semibold'
                  >
                    {menu.title}
                  </Link>
                </li>
              ))}
              <Link to="/Cart" className="relative">
                <ImCart className="text-2xl text-white hover:bg-secondary hover:text-white rounded-full p-2 duration-200" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                    {cart.length}
                  </span>
                )}
              </Link>
            </ul>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className='md:hidden' onClick={() => setOpen(!open)}>
            <MdMenu className='text-4xl text-white cursor-pointer' />
          </div>
        </motion.div>
      </nav> 

      {/* Popup Message */}
      <AnimatePresence>
        {popupMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg"
          >
            {popupMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <ResponsiveMenu open={open} setOpen={setOpen} />
    </>
  );
};

export default Navbar;
