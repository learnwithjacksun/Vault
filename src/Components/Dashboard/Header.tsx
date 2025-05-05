import { Link, useLocation } from "react-router-dom";
import { Goback, ThemeToggle } from "../UI";
import { EllipsisVertical, LogOut, Settings, Shield } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/Hooks";

const Header = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    let timeout: NodeJS.Timeout;
    if (isOpen) {
      timeout = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 0);
    }

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 backdrop-blur-md z-50">
      <nav className="relative h-[60px] layout flex items-center justify-between">
        {isDashboard ? (
          <Shield size={32} strokeWidth={3} className="text-primary" />
        ) : (
          <Goback />
        )}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            onClick={toggleMenu}
            className="center h-10 w-10 rounded-full bg-secondary"
          >
            <EllipsisVertical size={20} />
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={dropDownRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute shadow-lg top-full right-0 min-w-[200px] border border-line rounded-lg p-2 bg-background dark:bg-secondary"
            >
              <div className="flex flex-col gap-4">
                <Link
                  to="/settings"
                  className="flex items-center gap-2 p-2 border-b border-line"
                >
                  <Settings size={20} />
                  <p>Settings</p>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 bg-red-500 text-white rounded-md p-2"
                >
                  <LogOut size={18} />
                  <p>Logout</p>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
