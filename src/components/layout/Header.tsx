import {
  MoonStar,
  SunMedium,
  Sparkles,
  Menu,
  X,
  Key,
  Lock,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const panelVariants = {
  hidden: {
    opacity: 0,
    x: 50,
    y: -50,
    scale: 0,
    transformOrigin: "right",
  },
  visible: {
    opacity: 1,
    x: 0,
    y: -6,
    scale: 1,
    transformOrigin: "right center",
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    x: 50,
    y: -50,
    scale: 0,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 25,
    },
  },
};

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /**
   * @hook
   * Dark Mode with smooth transition
   */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

    // Control body scroll when menu opens/closes
    useEffect(() => {
      if (isMenuOpen) {
        // Disable scroll when menu is open
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '0px'; // Prevent layout shift
      } else {
        // Re-enable scroll when menu is closed
        document.body.style.overflow = 'unset';
        document.body.style.paddingRight = '0px';
      }
  
      // Cleanup function to ensure scroll is re-enabled if component unmounts
      return () => {
        document.body.style.overflow = 'unset';
        document.body.style.paddingRight = '0px';
      };
    }, [isMenuOpen]);
  

  /**
   * @function handle button click to toggle theme
   */
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Menu section first  --------------------------------> */}
      <nav className="fixed top-2 left-2 right-2 z-50 rounded-[32px] py-3 liquid-glass-nav overflow-hidden">
        {/* Floating Particles Background */}
        <div className="liquid-glass-particles"></div>

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex justify-between items-center">
            {/* Brand Section with Enhanced Typography */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8 h-8 liquid-glass-btn rounded-full">
                <Sparkles className="h-4 w-4 liquid-glass-icon liquid-glass-icon-rotate" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm oxanium font-semibold liquid-glass-text tracking-tight">
                  Zakari Game Store
                </h3>
                <p className="text-xs opacity-60 liquid-glass-text">
                  Premium Gaming Experience
                </p>
              </div>
            </div>

            {/* Action Buttons Section */}
            <div className="flex items-center gap-x-3">
              {/* Profile Button */}
              <button
                className="liquid-glass-btn flex items-center justify-center w-auto h-auto p-1 rounded-md transition-all duration-300 hover:scale-105 active:scale-95"
              >
                
                <span className="oxanium text-xs font-medium" >bill : <span className="open-sans" >100000000</span></span>
              </button>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="liquid-glass-btn flex items-center justify-center w-9 h-9 rounded-full transition-all duration-500 hover:scale-105 active:scale-95 group"
                aria-label={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                <div className="relative">
                  {isDarkMode ? (
                    <SunMedium className="h-4 w-4 liquid-glass-icon transition-all duration-500 rotate-0 opacity-100 group-hover:rotate-180" />
                  ) : (
                    <MoonStar className="h-4 w-4 liquid-glass-icon transition-all duration-500 rotate-0 opacity-100 group-hover:rotate-12" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div
            className={`w-1 h-1 rounded-full transition-all duration-500 ${
              isDarkMode
                ? "bg-blue-400 shadow-lg shadow-blue-400/50"
                : "bg-amber-400 shadow-lg shadow-amber-400/50"
            }`}
          ></div>
        </div>
      </nav>

      {/* Menu section second  --------------------------------> */}
      <div className=" relative">
        <nav
          className="
      fixed top-[90px] right-2 z-50 rounded-full w-auto p-2 liquid-glass-nav overflow-hidden
      "
        >
          {/* Menu Toggle Button */}
          <button
            onClick={toggleMenu}
            className="liquid-glass-btn flex items-center justify-center w-9 h-9 rounded-full transition-all duration-500 hover:scale-105 active:scale-95 group"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative">
              {isMenuOpen ? (
                <X className="h-4 w-4 liquid-glass-icon transition-all duration-500 rotate-0 opacity-100 group-hover:rotate-180" />
              ) : (
                <Menu className="h-4 w-4 liquid-glass-icon transition-all duration-500 rotate-0 opacity-100 group-hover:rotate-12" />
              )}
            </div>
          </button>
        </nav>

        {/* Menu Toggle Panel */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="
              fixed top-32 right-16 left-2 min-w-24 z-50 h-auto
              rounded-[32px] p-2 liquid-glass-nav overflow-hidden md:right-20 md:left-auto
              backdrop-blur-xl  origin-right
            "
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={panelVariants}
            >
              {/* Auth Buttons */}
              <div className="
              flex gap-4 justify-evenly
              " >
                <button
                className="
                liquid-glass-btn flex items-center justify-center w-auto p-3 h-auto oxanium font-medium
                rounded-full transition-all duration-500 hover:scale-105 active:scale-95 group
                "
                >
                  <span className=" text-md" >Login</span>
                  <Key className="ml-2 h-4 w-4" />
                </button>
                <button
                className="
                liquid-glass-btn flex items-center justify-center w-auto p-3 h-auto oxanium font-medium
                rounded-full transition-all duration-500 hover:scale-105 active:scale-95 group
                "
                >
                  <span className=" text-md" >Register</span>
                  <Lock className="ml-2 h-4 w-4" />
                </button>
                
              </div>
              {/* <div className="flex flex-col gap-4 text-sm font-semibold">
                <div>🏠 Dashboard</div>
                <div>🕹️ Games</div>
                <div>📦 Orders</div>
                <div>⚙️ Settings</div>
                <div>🚪 Logout</div>
              </div> */}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
