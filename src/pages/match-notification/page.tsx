import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

export default function MatchNotificationPage() {
  const navigate = useNavigate();
  const [showContactModal, setShowContactModal] = useState(false);

  // Mock matched item data
  const matchData = {
    lostItem: {
      id: 'L002',
      photo: 'https://readdy.ai/api/search-image?query=silver%20apple%20macbook%20pro%20laptop%20computer%20with%20programming%20stickers%20on%20simple%20white%20background%20product%20photography%20style%20clean%20minimalist%20studio%20lighting&width=600&height=400&seq=matchlost001&orientation=landscape',
      itemName: 'MacBook Pro 13-inch',
      category: 'Electronics',
      location: 'Science Building - Room 301',
      date: '2024-01-14',
      ownerName: 'Sarah Johnson',
      ownerEmail: 'sarah.j@school.edu',
      description: 'Silver MacBook Pro 13-inch with stickers on the lid. Has a small dent on the corner.'
    },
    foundItem: {
      id: 'F002',
      photo: 'https://readdy.ai/api/search-image?query=silver%20apple%20macbook%20laptop%20with%20programming%20stickers%20found%20on%20desk%20simple%20white%20background%20product%20photography%20style%20clean%20minimalist%20studio%20lighting&width=600&height=400&seq=matchfound001&orientation=landscape',
      itemName: 'MacBook Pro',
      category: 'Electronics',
      location: 'Science Building - Room 305',
      date: '2024-01-14',
      finderName: 'Lisa Anderson',
      finderEmail: 'lisa.a@school.edu',
      description: 'Silver MacBook Pro found under a desk. Has various programming stickers on the lid.'
    },
    matchPercentage: 95,
    matchedDate: '2024-01-16'
  };

  const handleOpenConversation = () => {
    navigate('/admin/conversations');
  };

  const handleContactAdmin = () => {
    setShowContactModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Success Banner */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <i className="ri-checkbox-circle-fill text-5xl"></i>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-center mb-3">Match Found!</h1>
            <p className="text-center text-teal-50 text-lg max-w-2xl mx-auto">
              Great news! Your item has been successfully matched with a found item report. 
              You can now connect with the finder to arrange pickup.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <span className="font-semibold">{matchData.matchPercentage}% Match Confidence</span>
              </div>
            </div>
          </div>

          {/* Match Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Lost Item Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-red-50 px-6 py-4 border-b border-red-100">
                <div className="flex items-center gap-2">
                  <i className="ri-error-warning-line text-red-600 text-xl"></i>
                  <h2 className="text-lg font-bold text-red-900">Your Lost Item</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img 
                    src={matchData.lostItem.photo} 
                    alt={matchData.lostItem.itemName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{matchData.lostItem.itemName}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <i className="ri-price-tag-3-line text-gray-400 mt-0.5"></i>
                    <div>
                      <span className="text-gray-500">Category:</span>
                      <span className="ml-2 text-gray-900 font-medium">{matchData.lostItem.category}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="ri-map-pin-line text-gray-400 mt-0.5"></i>
                    <div>
                      <span className="text-gray-500">Location Lost:</span>
                      <span className="ml-2 text-gray-900 font-medium">{matchData.lostItem.location}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="ri-calendar-line text-gray-400 mt-0.5"></i>
                    <div>
                      <span className="text-gray-500">Date Lost:</span>
                      <span className="ml-2 text-gray-900 font-medium">{matchData.lostItem.date}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="ri-user-line text-gray-400 mt-0.5"></i>
                    <div>
                      <span className="text-gray-500">Owner:</span>
                      <span className="ml-2 text-gray-900 font-medium">{matchData.lostItem.ownerName}</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-gray-600 text-sm leading-relaxed">{matchData.lostItem.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Found Item Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-teal-50 px-6 py-4 border-b border-teal-100">
                <div className="flex items-center gap-2">
                  <i className="ri-checkbox-circle-line text-teal-600 text-xl"></i>
                  <h2 className="text-lg font-bold text-teal-900">Matched Found Item</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img 
                    src={matchData.foundItem.photo} 
                    alt={matchData.foundItem.itemName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{matchData.foundItem.itemName}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <i className="ri-price-tag-3-line text-gray-400 mt-0.5"></i>
                    <div>
                      <span className="text-gray-500">Category:</span>
                      <span className="ml-2 text-gray-900 font-medium">{matchData.foundItem.category}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="ri-map-pin-line text-gray-400 mt-0.5"></i>
                    <div>
                      <span className="text-gray-500">Location Found:</span>
                      <span className="ml-2 text-gray-900 font-medium">{matchData.foundItem.location}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="ri-calendar-line text-gray-400 mt-0.5"></i>
                    <div>
                      <span className="text-gray-500">Date Found:</span>
                      <span className="ml-2 text-gray-900 font-medium">{matchData.foundItem.date}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <i className="ri-user-line text-gray-400 mt-0.5"></i>
                    <div>
                      <span className="text-gray-500">Finder:</span>
                      <span className="ml-2 text-gray-900 font-medium">{matchData.foundItem.finderName}</span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-gray-600 text-sm leading-relaxed">{matchData.foundItem.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Next Steps</h2>
            <p className="text-gray-600 text-center mb-6 max-w-2xl mx-auto">
              Connect with the finder to verify the item and arrange a convenient pickup time and location.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleOpenConversation}
                className="px-8 py-4 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <i className="ri-message-3-line text-xl"></i>
                Open Conversation
              </button>
              <button
                onClick={handleContactAdmin}
                className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <i className="ri-customer-service-2-line text-xl"></i>
                Message Admin
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Contact Admin Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Contact Admin</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Send a message to the admin team if you need assistance with this match or have any questions.
            </p>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              rows={4}
              placeholder="Type your message here..."
            ></textarea>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowContactModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowContactModal(false);
                  alert('Message sent to admin successfully!');
                }}
                className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all whitespace-nowrap"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}