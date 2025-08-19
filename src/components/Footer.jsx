import React from 'react';
import { FaBriefcase, FaEnvelope, FaLinkedin, FaGithub, FaYoutube, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = ({ theme }) => {
  return (
    <footer
      className={`w-full p-2 sm:p-3 ${
        theme === 'dark'
          ? 'bg-gray-800'
          : 'bg-gray-200'
      } text-blue-500 text-xs sm:text-sm flex flex-col sm:flex-row flex-wrap justify-center items-center gap-1 sm:gap-3 fixed bottom-0 left-0 font-poppins`}
    >
      <span>Developed by</span>
      <a
        href="https://your-portfolio-link.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-300 transition-colors flex items-center gap-1"
      >
        <FaBriefcase className="inline-block mr-0.5 sm:mr-1" /> Noor Malik
      </a>
      <span className="hidden sm:inline">|</span>
      <a
        href="mailto:noormalik56500@gmail.com?subject=Contact%20from%20Todo%20App&body=Hello%20Noor,%0D%0A%0D%0AI%20would%20like%20to%20get%20in%20touch%20regarding%20your%20Todo%20App.%20Please%20let%20me%20know%20how%20I%20can%20reach%20you.%0D%0A%0D%0AThanks!"
        className="hover:text-blue-300 transition-colors flex items-center gap-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaEnvelope /> Email
      </a>
      <span className="hidden sm:inline">|</span>
      <a
        href="https://www.linkedin.com/in/noormalik56500/"
        className="hover:text-blue-300 transition-colors flex items-center gap-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin /> LinkedIn
      </a>
      <span className="hidden sm:inline">|</span>
      <a
        href="https://github.com/noormalik33"
        className="hover:text-blue-300 transition-colors flex items-center gap-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub /> GitHub
      </a>
      <span className="hidden sm:inline">|</span>
      <a
        href="https://www.youtube.com/@CoreITTech1"
        className="hover:text-blue-300 transition-colors flex items-center gap-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaYoutube /> YouTube
      </a>
      <span className="hidden sm:inline">|</span>
      <a
        href="https://www.instagram.com/coreit.tech"
        className="hover:text-blue-300 transition-colors flex items-center gap-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram /> Instagram
      </a>
      <span className="hidden sm:inline">|</span>
      <a
        href="https://www.facebook.com/share/1AmgLDUnc9/"
        className="hover:text-blue-300 transition-colors flex items-center gap-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebook /> Facebook
      </a>
    </footer>
  );
};

export default Footer;