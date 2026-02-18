import { useState, useMemo } from 'react';
import { historyItems } from '../../../mocks/historyItems';

export default function AdminHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredItems = useMemo(() => {
    return historyItems.filter(item => {
      const matchesSearch = 
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.reporterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = typeFilter === 'All' || item.type === typeFilter;
      const matchesStatus = statusFilter === 'All' || item.resolutionStatus === statusFilter;
      
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchQuery, typeFilter, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Claimed':
        return 'bg-teal-100 text-teal-800';
      case 'Returned':
        return 'bg-green-100 text-green-800';
      case 'Donated':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'Lost' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">History</h1>
        <p className="text-gray-600 mt-2">View all resolved and archived items</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search by item name, category, reporter, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              />
            </div>
            
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="Lost">Lost Items</option>
              <option value="Found">Found Items</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Claimed">Claimed</option>
              <option value="Returned">Returned</option>
              <option value="Donated">Donated</option>
            </select>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">{filteredItems.length}</span> of <span className="font-semibold">{historyItems.length}</span> items
            </p>
            {(searchQuery || typeFilter !== 'All' || statusFilter !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setTypeFilter('All');
                  setStatusFilter('All');
                }}
                className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center whitespace-nowrap"
              >
                <i className="ri-close-circle-line mr-1"></i>
                Clear Filters
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Item Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Reporter
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Date Reported
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Date Resolved
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center">
                    <i className="ri-inbox-line text-5xl text-gray-300 mb-3"></i>
                    <p className="text-gray-500 font-medium">No items found</p>
                    <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{item.itemName}</div>
                      <div className="text-xs text-gray-500">{item.id}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.category}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                        <i className={`${item.type === 'Lost' ? 'ri-error-warning-line' : 'ri-checkbox-circle-line'} mr-1`}></i>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.reporterName}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {new Date(item.dateReported).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {new Date(item.dateResolved).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(item.resolutionStatus)}`}>
                        <i className="ri-checkbox-circle-fill mr-1"></i>
                        {item.resolutionStatus}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}