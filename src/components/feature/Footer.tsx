import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-teal-600 to-teal-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="https://static.readdy.ai/image/5f08ddaf02590812ef646ac2639b33e0/809fabfe5844483a727a0fadba2eb569.jpeg"
                alt="iFound Logo"
                className="h-10 w-10 rounded-lg object-cover"
              />
              <span className="text-2xl font-bold">iFound</span>
            </div>
            <p className="text-teal-50 text-sm leading-relaxed max-w-md">
              A comprehensive lost and found management system designed to help reunite people with their belongings quickly and efficiently.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-teal-50 hover:text-white text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse-items" className="text-teal-50 hover:text-white text-sm transition-colors">
                  Browse Items
                </Link>
              </li>
              <li>
                <Link to="/report-lost" className="text-teal-50 hover:text-white text-sm transition-colors">
                  Report Lost
                </Link>
              </li>
              <li>
                <Link to="/report-found" className="text-teal-50 hover:text-white text-sm transition-colors">
                  Report Found
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-teal-50">
              <li className="flex items-center space-x-2">
                <i className="ri-mail-line"></i>
                <span>support@ifound.edu</span>
              </li>
              <li className="flex items-center space-x-2">
                <i className="ri-phone-line"></i>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <i className="ri-map-pin-line"></i>
                <span>Campus Security Office</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-teal-500 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-teal-50 text-sm">
            © 2024 iFound. All rights reserved.
          </p>
          <a 
            href="https://readdy.ai/?ref=logo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-teal-50 hover:text-white text-sm transition-colors mt-2 md:mt-0"
          >
            Powered by Readdy
          </a>
        </div>
      </div>
    </footer>
  );
}
