import { useState } from 'react';
import { lostReports, foundReports } from '../../../mocks/adminReports';

type Report = typeof lostReports[0] | typeof foundReports[0];

export default function ManageReports() {
  const [activeTab, setActiveTab] = useState<'lost' | 'found'>('lost');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [editingReport, setEditingReport] = useState<Report | null>(null);

  const currentReports = activeTab === 'lost' ? lostReports : foundReports;
  
  const filteredReports = currentReports.filter(report =>
    report.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-orange-100 text-orange-700';
      case 'Matched':
        return 'bg-teal-100 text-teal-700';
      case 'Resolved':
        return 'bg-green-100 text-green-700';
      case 'Claimed':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleDelete = (id: string) => {
    setShowDeleteConfirm(null);
    // In real app, this would delete from database
    alert(`Report ${id} deleted successfully`);
  };

  const handleResolve = (report: Report) => {
    // In real app, this would update status in database
    alert(`Report ${report.id} marked as resolved`);
  };

  const handleSaveEdit = () => {
    // In real app, this would update in database
    alert(`Report ${editingReport?.id} updated successfully`);
    setEditingReport(null);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Reports</h1>
        <p className="text-gray-600 mt-2">View and manage all lost and found item reports</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <div className="flex items-center justify-between p-6">
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('lost')}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'lost'
                    ? 'bg-white text-teal-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Lost Reports ({lostReports.length})
              </button>
              <button
                onClick={() => setActiveTab('found')}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === 'found'
                    ? 'bg-white text-teal-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Found Reports ({foundReports.length})
              </button>
            </div>

            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 flex items-center justify-center"></i>
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Photo</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Item Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-16 h-16 flex items-center justify-center">
                      <img
                        src={report.photo}
                        alt={report.itemName}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{report.itemName}</div>
                    <div className="text-xs text-gray-500">{report.id}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{report.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{report.location}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{report.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedReport(report)}
                        className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="View"
                      >
                        <i className="ri-eye-line w-5 h-5 flex items-center justify-center"></i>
                      </button>
                      <button
                        onClick={() => setEditingReport(report)}
                        className="w-8 h-8 flex items-center justify-center text-teal-600 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <i className="ri-edit-line w-5 h-5 flex items-center justify-center"></i>
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(report.id)}
                        className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <i className="ri-delete-bin-line w-5 h-5 flex items-center justify-center"></i>
                      </button>
                      {report.status === 'Pending' && (
                        <button
                          onClick={() => handleResolve(report)}
                          className="w-8 h-8 flex items-center justify-center text-green-600 hover:bg-green-50 rounded-lg transition-colors cursor-pointer"
                          title="Resolve"
                        >
                          <i className="ri-check-line w-5 h-5 flex items-center justify-center"></i>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-inbox-line text-6xl text-gray-300 w-16 h-16 flex items-center justify-center mx-auto mb-4"></i>
            <p className="text-gray-500">No reports found</p>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Report Details</h2>
              <button
                onClick={() => setSelectedReport(null)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-2xl w-6 h-6 flex items-center justify-center"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="w-full h-64 flex items-center justify-center mb-6">
                <img
                  src={selectedReport.photo}
                  alt={selectedReport.itemName}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Report ID</p>
                  <p className="font-medium text-gray-900">{selectedReport.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(selectedReport.status)}`}>
                    {selectedReport.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Item Name</p>
                  <p className="font-medium text-gray-900">{selectedReport.itemName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Category</p>
                  <p className="font-medium text-gray-900">{selectedReport.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Location</p>
                  <p className="font-medium text-gray-900">{selectedReport.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Date</p>
                  <p className="font-medium text-gray-900">{selectedReport.date}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600 mb-1">Description</p>
                  <p className="font-medium text-gray-900">{selectedReport.description}</p>
                </div>
                {'ownerName' in selectedReport ? (
                  <>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Owner Name</p>
                      <p className="font-medium text-gray-900">{selectedReport.ownerName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Owner Email</p>
                      <p className="font-medium text-gray-900">{selectedReport.ownerEmail}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-600 mb-1">Owner Phone</p>
                      <p className="font-medium text-gray-900">{selectedReport.ownerPhone}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Finder Name</p>
                      <p className="font-medium text-gray-900">{selectedReport.finderName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Finder Email</p>
                      <p className="font-medium text-gray-900">{selectedReport.finderEmail}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-600 mb-1">Finder Phone</p>
                      <p className="font-medium text-gray-900">{selectedReport.finderPhone}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Edit Report</h2>
              <button
                onClick={() => setEditingReport(null)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-2xl w-6 h-6 flex items-center justify-center"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                  <input
                    type="text"
                    defaultValue={editingReport.itemName}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    defaultValue={editingReport.category}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    defaultValue={editingReport.location}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    defaultValue={editingReport.status}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  >
                    <option>Pending</option>
                    <option>Matched</option>
                    <option>Resolved</option>
                    <option>Claimed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    defaultValue={editingReport.description}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  ></textarea>
                </div>
              </div>
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium whitespace-nowrap cursor-pointer"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingReport(null)}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium whitespace-nowrap cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-full mx-auto mb-4">
              <i className="ri-alert-line text-2xl text-red-600 w-6 h-6 flex items-center justify-center"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Delete Report</h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete this report? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium whitespace-nowrap cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium whitespace-nowrap cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}