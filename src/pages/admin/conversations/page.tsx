import { useState } from 'react';
import { conversations } from '../../../mocks/conversations';

export default function ConversationsPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState('');
  const [conversationList, setConversationList] = useState(conversations);
  const [showConversationList, setShowConversationList] = useState(true);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      id: selectedConversation.messages.length + 1,
      sender: 'Admin',
      senderType: 'admin' as const,
      message: messageInput,
      timestamp: new Date().toISOString()
    };

    const updatedConversations = conversationList.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: messageInput,
          timestamp: new Date().toISOString()
        };
      }
      return conv;
    });

    setConversationList(updatedConversations);
    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage]
    });
    setMessageInput('');
  };

  const handleMarkAsResolved = () => {
    const updatedConversations = conversationList.map(conv => {
      if (conv.id === selectedConversation.id) {
        return { ...conv, status: 'resolved' as const };
      }
      return conv;
    });

    setConversationList(updatedConversations);
    setSelectedConversation({ ...selectedConversation, status: 'resolved' });

    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-teal-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    notification.textContent = 'Conversation marked as resolved';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getParticipantNames = (conv: typeof conversations[0]) => {
    if (conv.type === 'owner-finder') {
      return `${conv.participants.owner.name} & ${conv.participants.finder.name}`;
    }
    return `${conv.participants.user.name} (Support)`;
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex bg-gray-50">
      {/* Conversation List */}
      <div className={`${showConversationList ? 'block' : 'hidden'} lg:block w-full lg:w-80 bg-white border-r border-gray-200 flex flex-col`}>
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Conversations</h2>
          <p className="text-sm text-gray-500 mt-1">{conversationList.length} active threads</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversationList.map((conv) => (
            <div
              key={conv.id}
              onClick={() => {
                setSelectedConversation(conv);
                setShowConversationList(false);
              }}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                selectedConversation.id === conv.id ? 'bg-teal-50 border-l-4 border-l-teal-600' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {conv.type === 'owner-finder' ? (
                    <div className="flex -space-x-2">
                      <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center text-sm font-medium border-2 border-white">
                        {conv.participants.owner.avatar}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium border-2 border-white">
                        {conv.participants.finder.avatar}
                      </div>
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-medium">
                      {conv.participants.user.avatar}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {getParticipantNames(conv)}
                    </h3>
                    {conv.unread > 0 && (
                      <span className="ml-2 bg-teal-600 text-white text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{conv.itemName}</p>
                  <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">{formatTime(conv.timestamp)}</span>
                    {conv.status === 'resolved' && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                        Resolved
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`${showConversationList ? 'hidden' : 'block'} lg:block flex-1 flex flex-col bg-white`}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowConversationList(true)}
                    className="lg:hidden text-gray-600 hover:text-gray-900"
                  >
                    <i className="ri-arrow-left-line text-xl"></i>
                  </button>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {getParticipantNames(selectedConversation)}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm text-gray-500">{selectedConversation.itemName}</p>
                      {selectedConversation.type === 'owner-finder' && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                          Owner ↔ Finder
                        </span>
                      )}
                      {selectedConversation.type === 'user-admin' && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                          User ↔ Admin
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {selectedConversation.status === 'active' && (
                  <button
                    onClick={handleMarkAsResolved}
                    className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap"
                  >
                    <i className="ri-check-line mr-2"></i>
                    Mark as Resolved
                  </button>
                )}
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                <i className="ri-information-line"></i>
                <span>Admin Monitoring: You can view and participate in all conversations</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {selectedConversation.messages.map((msg) => {
                const isAdmin = msg.senderType === 'admin';
                const isOwner = msg.senderType === 'owner';

                return (
                  <div
                    key={msg.id}
                    className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-md ${isAdmin ? 'order-2' : 'order-1'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        {!isAdmin && (
                          <div className={`w-6 h-6 rounded-full ${
                            isOwner ? 'bg-teal-600' : 'bg-blue-600'
                          } text-white flex items-center justify-center text-xs font-medium`}>
                            {msg.sender.split(' ').map(n => n[0]).join('')}
                          </div>
                        )}
                        <span className="text-xs font-medium text-gray-700">{msg.sender}</span>
                        <span className="text-xs text-gray-400">{formatTime(msg.timestamp)}</span>
                      </div>
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          isAdmin
                            ? 'bg-teal-600 text-white rounded-tr-none'
                            : 'bg-white border border-gray-200 text-gray-900 rounded-tl-none'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              {selectedConversation.status === 'resolved' ? (
                <div className="text-center py-4 text-gray-500">
                  <i className="ri-check-double-line text-2xl text-green-600 mb-2"></i>
                  <p className="text-sm">This conversation has been resolved</p>
                </div>
              ) : (
                <div className="flex items-end gap-2">
                  <textarea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type your message..."
                    rows={1}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim()}
                    className="px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    <i className="ri-send-plane-fill"></i>
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <i className="ri-message-3-line text-6xl mb-4"></i>
              <p className="text-lg">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
