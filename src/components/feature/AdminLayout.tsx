import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: 'ri-dashboard-line', label: 'Dashboard' },
    { path: '/admin/reports', icon: 'ri-file-list-3-line', label: 'Manage Reports' },
    { path: '/admin/matches', icon: 'ri-links-line', label: 'Possible Matches' },
    { path: '/admin/claims', icon: 'ri-hand-heart-line', label: 'Claim Requests' },
    { path: '/admin/conversations', icon: 'ri-message-3-line', label: 'Conversations' },
    { path: '/admin/notifications', icon: 'ri-notification-3-line', label: 'Notifications' },
    { path: '/admin/logs', icon: 'ri-file-text-line', label: 'Activity Logs' },
    { path: '/admin/history', icon: 'ri-history-line', label: 'History' },
    { path: '/admin/settings', icon: 'ri-settings-3-line', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
              <i className="ri-search-eye-line text-xl text-white"></i>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">iFound</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-teal-50 text-teal-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <i className={`${item.icon} text-xl`}></i>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all whitespace-nowrap"
          >
            <i className="ri-logout-box-line text-xl"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden text-gray-700 hover:text-gray-900"
          >
            <i className="ri-menu-line text-2xl"></i>
          </button>

          <div className="flex items-center gap-4 ml-auto">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
              <i className="ri-notification-3-line text-xl"></i>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Admin Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="w-9 h-9 bg-teal-600 rounded-full flex items-center justify-center">
                <i className="ri-user-line text-white"></i>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}