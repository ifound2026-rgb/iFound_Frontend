import { useState } from 'react';

interface LogEntry {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  details: string;
  type: 'match' | 'claim' | 'report' | 'conversation' | 'system';
}

export default function LogsPage() {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const logs: LogEntry[] = [
    {
      id: 'LOG001',
      timestamp: '2024-01-16 14:30:25',
      action: 'Match Confirmed',
      user: 'Admin User',
      details: 'Confirmed match between Lost Report L002 (MacBook Pro) and Found Report F002',
      type: 'match'
    },
    {
      id: 'LOG002',
      timestamp: '2024-01-16 13:15:10',
      action: 'Claim Approved',
      user: 'Admin User',
      details: 'Approved claim C004 for AirPods Pro by James Brown',
      type: 'claim'
    },
    {
      id: 'LOG003',
      timestamp: '2024-01-16 12:45:33',
      action: 'Report Created',
      user: 'Sarah Johnson',
      details: 'New lost item report submitted: Black Leather Wallet (L001)',
      type: 'report'
    },
    {
      id: 'LOG004',
      timestamp: '2024-01-16 11:20:18',
      action: 'Conversation Started',
      user: 'System',
      details: 'New conversation initiated between Sarah Johnson and Mike Chen for Blue Backpack',
      type: 'conversation'
    },
    {
      id: 'LOG005',
      timestamp: '2024-01-16 10:05:42',
      action: 'Report Updated',
      user: 'Admin User',
      details: 'Updated status of Found Report F004 from Pending to Claimed',
      type: 'report'
    },
    {
      id: 'LOG006',
      timestamp: '2024-01-16 09:30:55',
      action: 'Claim Rejected',
      user: 'Admin User',
      details: 'Rejected claim C005 for Black Jacket - insufficient proof of ownership',
      type: 'claim'
    },
    {
      id: 'LOG007',
      timestamp: '2024-01-15 16:45:12',
      action: 'Match Confirmed',
      user: 'Admin User',
      details: 'Confirmed match between Lost Report L007 (Ray-Ban Sunglasses) and Found Report F009',
      type: 'match'
    },
    {
      id: 'LOG008',
      timestamp: '2024-01-15 15:20:38',
      action: 'Report Deleted',
      user: 'Admin User',
      details: 'Deleted duplicate report L009 - Red Umbrella',
      type: 'report'
    },
    {
      id: 'LOG009',
      timestamp: '2024-01-15 14:10:25',
      action: 'Conversation Resolved',
      user: 'Admin User',
      details: 'Marked conversation #3 as resolved - item successfully returned',
      type: 'conversation'
    },
    {
      id: 'LOG010',
      timestamp: '2024-01-15 13:05:17',
      action: 'System Notification',
      user: 'System',
      details: 'Email notification sent to Robert Taylor about matched sunglasses',
      type: 'system'
    },
    {
      id: 'LOG011',
      timestamp: '2024-01-15 11:50:44',
      action: 'Report Created',
      user: 'Kevin Lee',
      details: 'New found item report submitted: AirPods Pro (F003)',
      type: 'report'
    },
    {
      id: 'LOG012',
      timestamp: '2024-01-15 10:35:29',
      action: 'Claim Approved',
      user: 'Admin User',
      details: 'Approved claim C002 for Red Water Bottle by David Martinez',
      type: 'claim'
    }
  ];

  const filteredLogs = logs.filter(log => {
    const matchesType = filterType === 'all' || log.type === filterType;
    const matchesSearch = log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'match': return 'ri-links-line';
      case 'claim': return 'ri-hand-heart-line';
      case 'report': return 'ri-file-list-3-line';
      case 'conversation': return 'ri-message-3-line';
      case 'system': return 'ri-settings-3-line';
      default: return 'ri-information-line';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'match': return 'bg-teal-100 text-teal-700';
      case 'claim': return 'bg-blue-100 text-blue-700';
      case 'report': return 'bg-purple-100 text-purple-700';
      case 'conversation': return 'bg-orange-100 text-orange-700';
      case 'system': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Activity Logs</h1>
        <p className="text-gray-600 mt-2">Track all system activities, admin actions, and user interactions.</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Logs</label>
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by action, user, or details..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
            >
              <option value="all">All Types</option>
              <option value="match">Match Confirmations</option>
              <option value="claim">Claim Actions</option>
              <option value="report">Report Updates</option>
              <option value="conversation">Conversations</option>
              <option value="system">System Events</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredLogs.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{logs.length}</span> log entries
          </p>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(log.type)}`}>
                        <i className={`${getTypeIcon(log.type)} w-3 h-3 flex items-center justify-center`}></i>
                        {log.type.charAt(0).toUpperCase() + log.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {log.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {log.user}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {log.details}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <i className="ri-file-list-3-line text-4xl text-gray-300 mb-2"></i>
                    <p className="text-gray-500">No logs found matching your filters</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}