import { useState } from 'react';

export default function NotificationsPage() {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [templates, setTemplates] = useState({
    matchConfirmed: 'Hi {ownerName}, great news! Your lost item "{itemName}" has been matched with a found item. The finder is {finderName}. You can now contact them at {finderContact} to arrange pickup. Match ID: {matchId}',
    claimApproved: 'Hello {claimantName}, your claim for "{itemName}" has been approved! Please contact the finder at {finderContact} to arrange pickup. Claim ID: {claimId}',
    statusUpdated: 'Hi {userName}, the status of your report for "{itemName}" has been updated to: {newStatus}. Report ID: {reportId}'
  });

  const handleSaveSettings = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Notification Settings</h1>
        <p className="text-gray-600 mt-2">Configure how users receive notifications about matches, claims, and updates.</p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-teal-50 border border-teal-200 text-teal-800 px-4 py-3 rounded-lg flex items-center gap-2">
          <i className="ri-checkbox-circle-line text-xl"></i>
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Notification Channels */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Channels</h2>
        
        <div className="space-y-6">
          {/* Email Notifications */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <i className="ri-mail-line text-2xl text-teal-600"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email Notifications</h3>
                <p className="text-sm text-gray-600">Send notifications via email to users</p>
              </div>
            </div>
            <button
              onClick={() => setEmailEnabled(!emailEnabled)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                emailEnabled ? 'bg-teal-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                  emailEnabled ? 'translate-x-7' : 'translate-x-0'
                }`}
              ></span>
            </button>
          </div>

          {/* SMS Notifications */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-message-2-line text-2xl text-blue-600"></i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">SMS Notifications</h3>
                <p className="text-sm text-gray-600">Send notifications via text message</p>
              </div>
            </div>
            <button
              onClick={() => setSmsEnabled(!smsEnabled)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                smsEnabled ? 'bg-teal-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                  smsEnabled ? 'translate-x-7' : 'translate-x-0'
                }`}
              ></span>
            </button>
          </div>
        </div>
      </div>

      {/* Message Templates */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Message Templates</h2>
        <p className="text-sm text-gray-600 mb-6">Customize notification messages. Use variables in curly braces.</p>

        <div className="space-y-6">
          {/* Match Confirmed Template */}
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              Match Confirmed Template
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Available variables: {'{ownerName}'}, {'{itemName}'}, {'{finderName}'}, {'{finderContact}'}, {'{matchId}'}
            </p>
            <textarea
              value={templates.matchConfirmed}
              onChange={(e) => setTemplates({ ...templates, matchConfirmed: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1 text-right">
              {templates.matchConfirmed.length}/500 characters
            </p>
          </div>

          {/* Claim Approved Template */}
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              Claim Approved Template
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Available variables: {'{claimantName}'}, {'{itemName}'}, {'{finderContact}'}, {'{claimId}'}
            </p>
            <textarea
              value={templates.claimApproved}
              onChange={(e) => setTemplates({ ...templates, claimApproved: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1 text-right">
              {templates.claimApproved.length}/500 characters
            </p>
          </div>

          {/* Status Updated Template */}
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              Status Updated Template
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Available variables: {'{userName}'}, {'{itemName}'}, {'{newStatus}'}, {'{reportId}'}
            </p>
            <textarea
              value={templates.statusUpdated}
              onChange={(e) => setTemplates({ ...templates, statusUpdated: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1 text-right">
              {templates.statusUpdated.length}/500 characters
            </p>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={handleSaveSettings}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
          >
            <i className="ri-save-line text-xl"></i>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}