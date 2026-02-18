import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { foundItemsData, categories } from '../../mocks/foundItems';

export default function BrowseItemsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedItem, setSelectedItem] = useState<typeof foundItemsData[0] | null>(null);
  const [showClaimModal, setShowClaimModal] = useState(false);

  const filteredItems = foundItemsData.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
    return matchesSearch && matchesCategory && item.status !== 'claimed';
  });

  const handleViewDetails = (item: typeof foundItemsData[0]) => {
    setSelectedItem(item);
  };

  const handleClaimRequest = () => {
    setShowClaimModal(true);
    setTimeout(() => {
      setShowClaimModal(false);
      setSelectedItem(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Found Items</h1>
            <p className="text-lg text-gray-600">
              Search through our collection of found items to see if your lost item is here
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                  <input
                    type="text"
                    placeholder="Search by item name or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              <strong>{filteredItems.length}</strong> items found
            </p>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
                <div className="relative h-56 w-full bg-gray-100">
                  <img
                    src={item.photo}
                    alt={item.itemName}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      item.status === 'available' 
                        ? 'bg-green-100 text-green-700' 
                        : item.status === 'matched'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {item.status === 'available' ? 'Available' : item.status === 'matched' ? 'Matched' : 'Claimed'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.itemName}</h3>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-600 flex items-center">
                      <i className="ri-price-tag-3-line mr-2 text-teal-600"></i>
                      {item.category}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <i className="ri-map-pin-line mr-2 text-teal-600"></i>
                      {item.location}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <i className="ri-calendar-line mr-2 text-teal-600"></i>
                      {item.dateFound}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                  <button
                    onClick={() => handleViewDetails(item)}
                    className="w-full px-4 py-2.5 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all whitespace-nowrap"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <i className="ri-inbox-line text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
              <Link
                to="/report-lost"
                className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all whitespace-nowrap"
              >
                Report Lost Item
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Item Details Modal */}
      {selectedItem && !showClaimModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full shadow-2xl my-8">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Item Details</h3>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="h-80 w-full bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={selectedItem.photo}
                    alt={selectedItem.itemName}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">{selectedItem.itemName}</h4>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Category</p>
                  <p className="text-sm font-semibold text-gray-900">{selectedItem.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date Found</p>
                  <p className="text-sm font-semibold text-gray-900">{selectedItem.dateFound}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="text-sm font-semibold text-gray-900">{selectedItem.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    selectedItem.status === 'available' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {selectedItem.status === 'available' ? 'Available' : 'Matched'}
                  </span>
                </div>
              </div>
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Description</p>
                <p className="text-sm text-gray-700 leading-relaxed">{selectedItem.description}</p>
              </div>
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Found By</p>
                <p className="text-sm font-semibold text-gray-900">{selectedItem.finderName}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleClaimRequest}
                  className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all whitespace-nowrap"
                >
                  <i className="ri-hand-coin-line mr-2"></i>
                  Request Claim
                </button>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all whitespace-nowrap"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Claim Success Modal */}
      {showClaimModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-checkbox-circle-line text-4xl text-green-600"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">Claim Request Sent!</h3>
            <p className="text-gray-600 text-center">
              Your claim request has been submitted. The admin will review it and contact you soon.
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
