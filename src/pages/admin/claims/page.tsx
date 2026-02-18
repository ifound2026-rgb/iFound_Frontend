import { useState } from 'react';
import { claimRequests } from '../../../mocks/claims';

export default function ClaimsPage() {
  const [claims, setClaims] = useState(claimRequests);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);

  const handleApprove = (claimId: string) => {
    setClaims(claims.map(claim => 
      claim.id === claimId ? { ...claim, status: 'Approved' } : claim
    ));
    setNotificationMessage('Claim approved successfully! The claimant has been notified via email and SMS.');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  const handleRejectClick = (claimId: string) => {
    setSelectedClaimId(claimId);
    setShowRejectDialog(true);
  };

  const confirmReject = () => {
    if (selectedClaimId) {
      setClaims(claims.map(claim => 
        claim.id === selectedClaimId ? { ...claim, status: 'Rejected' } : claim
      ));
      setNotificationMessage('Claim rejected. The claimant has been notified.');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    }
    setShowRejectDialog(false);
    setSelectedClaimId(null);
  };

  const pendingClaims = claims.filter(c => c.status === 'Pending');
  const processedClaims = claims.filter(c => c.status !== 'Pending');

  return (
    <div className="p-6">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-teal-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 max-w-md">
          <div className="flex items-start gap-3">
            <i className="ri-checkbox-circle-line text-2xl"></i>
            <div>
              <p className="font-semibold">Success!</p>
              <p className="text-sm mt-1">{notificationMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Reject Confirmation Dialog */}
      {showRejectDialog && (
        <div className="fixed inset-0 bg-black bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-error-warning-line text-2xl text-red-600"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Reject Claim?</h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to reject this claim request? The claimant will be notified of the rejection.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRejectDialog(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={confirmReject}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
              >
                Reject Claim
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Claim Requests</h1>
        <p className="text-gray-600 mt-1">Review and manage item claim requests from users</p>
      </div>

      {/* Pending Claims Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Pending Claims ({pendingClaims.length})
        </h2>
        
        {pendingClaims.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-inbox-line text-3xl text-gray-400"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Pending Claims</h3>
            <p className="text-gray-600">All claim requests have been processed.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {pendingClaims.map((claim) => (
              <div key={claim.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Item Photo */}
                  <div className="w-full lg:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={claim.itemPhoto} 
                      alt={claim.itemName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Claim Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{claim.itemName}</h3>
                        <p className="text-sm text-gray-600">Claim ID: {claim.id}</p>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-full whitespace-nowrap">
                        {claim.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Category</p>
                        <p className="font-medium text-gray-900">{claim.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Date Requested</p>
                        <p className="font-medium text-gray-900">{claim.dateRequested}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Claimant Name</p>
                        <p className="font-medium text-gray-900">{claim.claimantName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Contact</p>
                        <p className="text-sm text-gray-900">{claim.claimantEmail}</p>
                        <p className="text-sm text-gray-900">{claim.claimantPhone}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-1">Claim Description</p>
                      <p className="text-gray-900">{claim.description}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleRejectClick(claim.id)}
                        className="px-6 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors whitespace-nowrap"
                      >
                        <i className="ri-close-line mr-2"></i>
                        Reject
                      </button>
                      <button
                        onClick={() => handleApprove(claim.id)}
                        className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors whitespace-nowrap"
                      >
                        <i className="ri-check-line mr-2"></i>
                        Approve
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Processed Claims Section */}
      {processedClaims.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Processed Claims ({processedClaims.length})
          </h2>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Claimant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Date Requested
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {processedClaims.map((claim) => (
                    <tr key={claim.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={claim.itemPhoto} 
                              alt={claim.itemName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{claim.itemName}</p>
                            <p className="text-sm text-gray-600">{claim.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{claim.claimantName}</p>
                        <p className="text-sm text-gray-600">{claim.claimantEmail}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {claim.dateRequested}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full whitespace-nowrap ${
                          claim.status === 'Approved' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {claim.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}