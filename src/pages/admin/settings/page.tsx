import { useState } from 'react';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [showSuccess, setShowSuccess] = useState(false);
  
  // General Settings
  const [systemName, setSystemName] = useState('iFound');
  const [systemDescription, setSystemDescription] = useState('Lost and Found Management System');
  
  // Matching Settings
  const [autoMatchEnabled, setAutoMatchEnabled] = useState(true);
  const [matchSensitivity, setMatchSensitivity] = useState(75);
  
  // Notification Settings
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  
  // Security Settings
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveSettings = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    alert('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const tabs = [
    { id: 'general', label: 'General Settings', icon: 'ri-settings-3-line' },
    { id: 'matching', label: 'Matching Settings', icon: 'ri-links-line' },
    { id: 'notifications', label: 'Notifications', icon: 'ri-notification-3-line' },
    { id: 'security', label: 'Security', icon: 'ri-shield-check-line' }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Configure system preferences and security options.</p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-teal-50 border border-teal-200 text-teal-800 px-4 py-3 rounded-lg flex items-center gap-2">
          <i className="ri-checkbox-circle-line text-xl"></i>
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <i className={`${tab.icon} text-lg`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* General Settings Tab */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Name
                </label>
                <input
                  type="text"
                  value={systemName}
                  onChange={(e) => setSystemName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Description
                </label>
                <textarea
                  value={systemDescription}
                  onChange={(e) => setSystemDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Logo
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-teal-600 rounded-xl flex items-center justify-center">
                    <i className="ri-search-eye-line text-3xl text-white"></i>
                  </div>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all whitespace-nowrap">
                    <i className="ri-upload-2-line mr-2"></i>
                    Upload New Logo
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Recommended size: 200x200px, PNG or JPG format</p>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSaveSettings}
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
                >
                  <i className="ri-save-line text-xl"></i>
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Matching Settings Tab */}
          {activeTab === 'matching' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">Enable Auto-Matching</h3>
                  <p className="text-sm text-gray-600">Automatically suggest matches between lost and found items</p>
                </div>
                <button
                  onClick={() => setAutoMatchEnabled(!autoMatchEnabled)}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    autoMatchEnabled ? 'bg-teal-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                      autoMatchEnabled ? 'translate-x-7' : 'translate-x-0'
                    }`}
                  ></span>
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Match Sensitivity: {matchSensitivity}%
                </label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={matchSensitivity}
                  onChange={(e) => setMatchSensitivity(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Less Strict (50%)</span>
                  <span>More Strict (100%)</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Higher sensitivity means stricter matching criteria. Items must be more similar to be suggested as matches.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <i className="ri-information-line text-blue-600 text-xl"></i>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">How Matching Works</h4>
                    <p className="text-sm text-blue-800">
                      The system compares item names, categories, locations, and dates to suggest potential matches. 
                      Adjust the sensitivity to control how strict the matching algorithm should be.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSaveSettings}
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
                >
                  <i className="ri-save-line text-xl"></i>
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
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

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <i className="ri-alert-line text-amber-600 text-xl"></i>
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-1">SMS Configuration Required</h4>
                    <p className="text-sm text-amber-800">
                      To enable SMS notifications, you need to configure an SMS gateway service. 
                      Contact your system administrator for setup instructions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSaveSettings}
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
                >
                  <i className="ri-save-line text-xl"></i>
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex gap-3">
                  <i className="ri-shield-check-line text-red-600 text-xl"></i>
                  <div>
                    <h4 className="font-semibold text-red-900 mb-1">Security Notice</h4>
                    <p className="text-sm text-red-800">
                      Choose a strong password with at least 8 characters, including uppercase, lowercase, numbers, and special characters.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Confirm new password"
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={handleChangePassword}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
                >
                  <i className="ri-lock-password-line text-xl"></i>
                  Change Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}