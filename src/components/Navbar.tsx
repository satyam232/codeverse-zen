
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Code, Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeProvider';
import { useSound } from '@/contexts/SoundProvider';
import {authService} from '@/Services/auth';

const Navbar = () => {
  const { playSound } = useSound();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Set initial auth state
    setIsAuthenticated(authService.isAuthenticated());

    // Subscribe to auth state changes
    const unsubscribe = authService.onAuthStateChanged((isAuth) => {
      setIsAuthenticated(isAuth);
    });

    return () => unsubscribe();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-background/80 backdrop-blur-lg shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Code className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">CodeWays</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/problems" className="nav-link">Problems</Link>
          <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
          <Link to="/about" className="nav-link">About</Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={toggleTheme} className="w-9 px-0">
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          {isAuthenticated ? (
            <Button variant="outline" onClick={async () => {
              await authService.logout();
              setIsAuthenticated(false);
            }}>
              Log Out
            </Button>
          ) : (
            <Button variant="outline" asChild>
              <Link to="/login">Log In</Link>
            </Button>
          )}
          <Button asChild>
            <Link to="/dashboard">Start Coding</Link>
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={toggleMobileMenu} aria-label="Toggle menu">
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute left-0 right-0 top-full bg-background shadow-md z-[100] transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 invisible'
        } overflow-hidden`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <Link to="/" className="px-4 py-2 hover:bg-secondary rounded-md" onClick={toggleMobileMenu}>Home</Link>
          <Link to="/problems" className="px-4 py-2 hover:bg-secondary rounded-md" onClick={toggleMobileMenu}>Problems</Link>
          <Link to="/leaderboard" className="px-4 py-2 hover:bg-secondary rounded-md" onClick={toggleMobileMenu}>Leaderboard</Link>
          <Link to="/about" className="px-4 py-2 hover:bg-secondary rounded-md" onClick={toggleMobileMenu}>About</Link>
          
          <div className="pt-2 flex flex-col space-y-3">
            {isAuthenticated ? (
              <Button variant="outline" className="w-full" onClick={async () => {
                await authService.logout();
                setIsAuthenticated(false);
                toggleMobileMenu();
              }}>
                Log Out
              </Button>
            ) : (
              <Button variant="outline" asChild className="w-full">
                <Link to="/login" onClick={toggleMobileMenu}>Log In</Link>
              </Button>
            )}
            <Button asChild className="w-full">
              <Link to="/dashboard" onClick={toggleMobileMenu}>Start Coding</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
