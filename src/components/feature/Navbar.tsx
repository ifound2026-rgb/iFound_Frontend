import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://static.readdy.ai/image/5f08ddaf02590812ef646ac2639b33e0/809fabfe5844483a727a0fadba2eb569.jpeg"
              alt="iFound Logo"
              className="h-12 w-12 rounded-lg object-cover"
            />
            <span className={`text-2xl font-bold transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              iFound
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors whitespace-nowrap ${
                isActive('/')
                  ? isScrolled
                    ? 'text-teal-600'
                    : 'text-white font-semibold'
                  : isScrolled
                  ? 'text-gray-700 hover:text-teal-600'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/browse-items"
              className={`text-sm font-medium transition-colors whitespace-nowrap ${
                isActive('/browse-items')
                  ? isScrolled
                    ? 'text-teal-600'
                    : 'text-white font-semibold'
                  : isScrolled
                  ? 'text-gray-700 hover:text-teal-600'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Browse Items
            </Link>
            <Link
              to="/admin/dashboard"
              className={`text-sm font-medium transition-colors whitespace-nowrap ${
                location.pathname.startsWith('/admin')
                  ? isScrolled
                    ? 'text-teal-600'
                    : 'text-white font-semibold'
                  : isScrolled
                  ? 'text-gray-700 hover:text-teal-600'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Admin
            </Link>
            <Link
              to="/report-lost"
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                isScrolled
                  ? 'bg-teal-600 text-white hover:bg-teal-700'
                  : 'bg-white text-teal-600 hover:bg-gray-100'
              }`}
            >
              Report Lost
            </Link>
            <Link
              to="/report-found"
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                isScrolled
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-teal-600 text-white hover:bg-teal-700'
              }`}
            >
              Report Found
            </Link>
          </div>

          <button className="md:hidden">
            <i className={`ri-menu-line text-2xl ${isScrolled ? 'text-gray-900' : 'text-white'}`}></i>
          </button>
        </div>
      </div>
    </nav>
  );
}
