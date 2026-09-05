import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo, Logout, Container } from "../index";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const { status, userData } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const navItems = [
    { name: "Home", active: status, slug: "/" },
    { name: "Posts", active: status, slug: "/posts" },
    { name: "New Post", active: status, slug: "/post/create" },
    { name: "Log in", active: !status, slug: "/login" },
    { name: "Sign up", active: !status, slug: "/signup" },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-white/10">
      <Container>
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => navigate("/")} className="hover:opacity-80 active:scale-95 transition-all duration-150 origin-left">
            <Logo size="md" />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-6">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className={
                        item.name === "Sign up"
                          ? "text-sm px-4 py-1.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 active:scale-95 transition-all duration-150"
                          : "text-sm text-gray-400 hover:text-white active:scale-95 transition-all duration-150"
                      }
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
            </ul>
            {status && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 hidden lg:block truncate max-w-40 tracking-tight">
                  {userData?.email}
                </span>
                <Logout />
              </div>
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-gray-400 hover:text-white active:scale-90 transition-all duration-150"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="md:hidden border-t border-white/10 bg-gray-950/80 backdrop-blur-xl px-6 flex flex-col items-start overflow-hidden origin-top"
          >
            <div className="py-4 flex flex-col gap-4 w-full">
              {navItems.map((item) =>
                item.active ? (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.slug);
                      setMenuOpen(false);
                    }}
                    className={
                      item.name === "Sign up"
                        ? "text-sm px-4 py-1.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 active:scale-95 transition-all duration-150 text-center w-full origin-left"
                        : "text-sm text-gray-400 hover:text-white active:scale-95 transition-all duration-150 text-left w-full origin-left"
                    }
                  >
                    {item.name}
                  </button>
                ) : null
              )}
              {status && (
                <>
                  <span className="text-sm text-gray-500 truncate w-full tracking-tight">
                    {userData?.email}
                  </span>
                  <div className="w-full origin-left">
                    <Logout />
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
