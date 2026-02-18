import { Link } from 'react-router-dom';
import { dashboardStats } from '../../../mocks/adminReports';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Pending Reports',
      count: dashboardStats.pendingReports,
      icon: 'ri-file-list-3-line',
      color: 'bg-orange-500',
      link: '/admin/reports'
    },
    {
      title: 'Matched Items',
      count: dashboardStats.matchedItems,
      icon: 'ri-checkbox-circle-line',
      color: 'bg-teal-500',
      link: '/admin/matches'
    },
    {
      title: 'Claims Waiting Approval',
      count: dashboardStats.claimsWaiting,
      icon: 'ri-hand-heart-line',
      color: 'bg-blue-500',
      link: '/admin/claims'
    },
    {
      title: 'Active Conversations',
      count: dashboardStats.activeConversations,
      icon: 'ri-message-3-line',
      color: 'bg-purple-500',
      link: '/admin/conversations'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's an overview of your system.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100 group cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-gray-600 text-sm font-medium mb-2">{stat.title}</p>
                <p className="text-4xl font-bold text-gray-900 mb-4">{stat.count}</p>
                <div className="flex items-center text-teal-600 text-sm font-medium group-hover:translate-x-1 transition-transform whitespace-nowrap">
                  View Details
                  <i className="ri-arrow-right-line ml-1 w-4 h-4 flex items-center justify-center"></i>
                </div>
              </div>
              <div className={`${stat.color} w-14 h-14 flex items-center justify-center rounded-xl text-white`}>
                <i className={`${stat.icon} text-2xl w-6 h-6 flex items-center justify-center`}></i>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'New lost item reported', item: 'Black Leather Wallet', time: '5 minutes ago', icon: 'ri-file-add-line', color: 'text-orange-500' },
              { action: 'Match confirmed', item: 'MacBook Pro 13-inch', time: '1 hour ago', icon: 'ri-checkbox-circle-line', color: 'text-teal-500' },
              { action: 'Claim approved', item: 'Pink Water Bottle', time: '2 hours ago', icon: 'ri-hand-heart-line', color: 'text-blue-500' },
              { action: 'New message received', item: 'Conversation #1234', time: '3 hours ago', icon: 'ri-message-3-line', color: 'text-purple-500' }
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className={`${activity.color} w-10 h-10 flex items-center justify-center rounded-lg bg-gray-50`}>
                  <i className={`${activity.icon} text-xl w-5 h-5 flex items-center justify-center`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600 truncate">{activity.item}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/admin/reports"
              className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-teal-500 text-white rounded-xl mb-3 group-hover:scale-110 transition-transform">
                <i className="ri-file-list-3-line text-2xl w-6 h-6 flex items-center justify-center"></i>
              </div>
              <span className="text-sm font-medium text-gray-900 text-center whitespace-nowrap">Manage Reports</span>
            </Link>
            <Link
              to="/admin/matches"
              className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-xl mb-3 group-hover:scale-110 transition-transform">
                <i className="ri-search-eye-line text-2xl w-6 h-6 flex items-center justify-center"></i>
              </div>
              <span className="text-sm font-medium text-gray-900 text-center whitespace-nowrap">View Matches</span>
            </Link>
            <Link
              to="/admin/claims"
              className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-purple-500 text-white rounded-xl mb-3 group-hover:scale-110 transition-transform">
                <i className="ri-hand-heart-line text-2xl w-6 h-6 flex items-center justify-center"></i>
              </div>
              <span className="text-sm font-medium text-gray-900 text-center whitespace-nowrap">Review Claims</span>
            </Link>
            <Link
              to="/admin/conversations"
              className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-orange-500 text-white rounded-xl mb-3 group-hover:scale-110 transition-transform">
                <i className="ri-message-3-line text-2xl w-6 h-6 flex items-center justify-center"></i>
              </div>
              <span className="text-sm font-medium text-gray-900 text-center whitespace-nowrap">Conversations</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}