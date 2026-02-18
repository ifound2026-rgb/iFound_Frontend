import { useState } from 'react';
import { possibleMatches } from '../../../mocks/matches';

export default function MatchesPage() {
  const [matches, setMatches] = useState(possibleMatches);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleConfirmMatch = (matchId: string) => {
    setMatches(matches.filter(m => m.id !== matchId));
    setNotificationMessage('Match confirmed! Email and SMS notifications have been sent to both users. A conversation thread has been opened.');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  const handleIgnore = (matchId: string) => {
    setMatches(matches.filter(m => m.id !== matchId));
  };

  return (
    <div className="p-6">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-teal-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md">
          <div className="flex items-start gap-3">
            <i className="ri-checkbox-circle-line text-2xl"></i>
            <div>
              <p className="font-semibold">Match Confirmed!</p>
              <p className="text-sm mt-1">{notificationMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Possible Matches</h1>
        <p className="text-gray-600 mt-1">Review and confirm potential matches between lost and found items</p>
      </div>

      {/* Matches List */}
      {matches.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-search-line text-3xl text-gray-400"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Matches Found</h3>
          <p className="text-gray-600">There are currently no possible matches to review.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {matches.map((match) => (
            <div key={match.id} className="bg-white rounded-lg shadow-sm p-6">
              {/* Match Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                    <i className="ri-links-line text-xl text-teal-600"></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Match #{match.id}</h3>
                    <p className="text-sm text-gray-600">Similarity Score</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    match.matchPercentage >= 90 ? 'bg-green-100 text-green-700' :
                    match.matchPercentage >= 80 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {match.matchPercentage}% Match
                  </span>
                </div>
              </div>

              {/* Side-by-Side Comparison */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Lost Item */}
                <div className="border-2 border-red-200 rounded-lg p-4 bg-red-50">
                  <div className="flex items-center gap-2 mb-4">
                    <i className="ri-error-warning-line text-red-600"></i>
                    <h4 className="font-semibold text-red-900">Lost Item</h4>
                  </div>
                  
                  <div className="w-full h-48 bg-white rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={match.lostReport.photo} 
                      alt={match.lostReport.itemName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Item Name</p>
                      <p className="font-semibold text-gray-900">{match.lostReport.itemName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="font-medium text-gray-900">{match.lostReport.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location Lost</p>
                      <p className="font-medium text-gray-900">{match.lostReport.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date Lost</p>
                      <p className="font-medium text-gray-900">{match.lostReport.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Description</p>
                      <p className="text-gray-900">{match.lostReport.description}</p>
                    </div>
                    <div className="pt-3 border-t border-red-200">
                      <p className="text-sm text-gray-600">Owner</p>
                      <p className="font-medium text-gray-900">{match.lostReport.ownerName}</p>
                      <p className="text-sm text-gray-700">{match.lostReport.ownerEmail}</p>
                      <p className="text-sm text-gray-700">{match.lostReport.ownerPhone}</p>
                    </div>
                  </div>
                </div>

                {/* Found Item */}
                <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
                  <div className="flex items-center gap-2 mb-4">
                    <i className="ri-checkbox-circle-line text-green-600"></i>
                    <h4 className="font-semibold text-green-900">Found Item</h4>
                  </div>
                  
                  <div className="w-full h-48 bg-white rounded-lg mb-4 overflow-hidden">
                    <img 
                      src={match.foundReport.photo} 
                      alt={match.foundReport.itemName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Item Name</p>
                      <p className="font-semibold text-gray-900">{match.foundReport.itemName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="font-medium text-gray-900">{match.foundReport.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location Found</p>
                      <p className="font-medium text-gray-900">{match.foundReport.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date Found</p>
                      <p className="font-medium text-gray-900">{match.foundReport.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Description</p>
                      <p className="text-gray-900">{match.foundReport.description}</p>
                    </div>
                    <div className="pt-3 border-t border-green-200">
                      <p className="text-sm text-gray-600">Finder</p>
                      <p className="font-medium text-gray-900">{match.foundReport.finderName}</p>
                      <p className="text-sm text-gray-700">{match.foundReport.finderEmail}</p>
                      <p className="text-sm text-gray-700">{match.foundReport.finderPhone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => handleIgnore(match.id)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  <i className="ri-close-line mr-2"></i>
                  Ignore
                </button>
                <button
                  onClick={() => handleConfirmMatch(match.id)}
                  className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap"
                >
                  <i className="ri-check-line mr-2"></i>
                  Confirm Match
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}