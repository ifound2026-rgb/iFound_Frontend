export const conversations = [
  {
    id: 1,
    participants: {
      owner: { name: 'Sarah Johnson', avatar: 'SJ' },
      finder: { name: 'Mike Chen', avatar: 'MC' }
    },
    itemName: 'Blue Backpack',
    lastMessage: 'Yes, I can meet you at the library tomorrow at 2pm',
    timestamp: '2024-01-15T14:30:00',
    unread: 2,
    status: 'active',
    type: 'owner-finder',
    messages: [
      {
        id: 1,
        sender: 'Sarah Johnson',
        senderType: 'owner',
        message: 'Hi! I saw that you found my blue backpack. Is it still available?',
        timestamp: '2024-01-15T10:00:00'
      },
      {
        id: 2,
        sender: 'Mike Chen',
        senderType: 'finder',
        message: 'Yes! I have it with me. It has a laptop and some textbooks inside.',
        timestamp: '2024-01-15T10:15:00'
      },
      {
        id: 3,
        sender: 'Sarah Johnson',
        senderType: 'owner',
        message: 'That\'s exactly mine! Can we arrange a time to meet?',
        timestamp: '2024-01-15T11:00:00'
      },
      {
        id: 4,
        sender: 'Mike Chen',
        senderType: 'finder',
        message: 'Sure! I\'m usually at the library in the afternoon. Does tomorrow work for you?',
        timestamp: '2024-01-15T13:45:00'
      },
      {
        id: 5,
        sender: 'Sarah Johnson',
        senderType: 'owner',
        message: 'Yes, I can meet you at the library tomorrow at 2pm',
        timestamp: '2024-01-15T14:30:00'
      }
    ]
  },
  {
    id: 2,
    participants: {
      user: { name: 'Emily Rodriguez', avatar: 'ER' },
      admin: { name: 'Admin', avatar: 'A' }
    },
    itemName: 'Support Request',
    lastMessage: 'I\'ll look into this and get back to you shortly.',
    timestamp: '2024-01-15T12:00:00',
    unread: 0,
    status: 'active',
    type: 'user-admin',
    messages: [
      {
        id: 1,
        sender: 'Emily Rodriguez',
        senderType: 'user',
        message: 'Hello, I reported a lost phone 3 days ago but haven\'t received any updates. Can you help?',
        timestamp: '2024-01-15T11:00:00'
      },
      {
        id: 2,
        sender: 'Admin',
        senderType: 'admin',
        message: 'Hi Emily, let me check the status of your report. Can you provide the item name or report ID?',
        timestamp: '2024-01-15T11:15:00'
      },
      {
        id: 3,
        sender: 'Emily Rodriguez',
        senderType: 'user',
        message: 'It\'s an iPhone 13 Pro, black color. I lost it near the cafeteria.',
        timestamp: '2024-01-15T11:30:00'
      },
      {
        id: 4,
        sender: 'Admin',
        senderType: 'admin',
        message: 'I\'ll look into this and get back to you shortly.',
        timestamp: '2024-01-15T12:00:00'
      }
    ]
  },
  {
    id: 3,
    participants: {
      owner: { name: 'David Kim', avatar: 'DK' },
      finder: { name: 'Lisa Wang', avatar: 'LW' }
    },
    itemName: 'Silver Watch',
    lastMessage: 'Great! See you then.',
    timestamp: '2024-01-14T16:45:00',
    unread: 0,
    status: 'resolved',
    type: 'owner-finder',
    messages: [
      {
        id: 1,
        sender: 'David Kim',
        senderType: 'owner',
        message: 'Hi, I believe you found my silver watch?',
        timestamp: '2024-01-14T14:00:00'
      },
      {
        id: 2,
        sender: 'Lisa Wang',
        senderType: 'finder',
        message: 'Yes! I found it in the gym locker room. Does it have an engraving on the back?',
        timestamp: '2024-01-14T14:30:00'
      },
      {
        id: 3,
        sender: 'David Kim',
        senderType: 'owner',
        message: 'Yes, it says "DK 2020". That\'s mine!',
        timestamp: '2024-01-14T15:00:00'
      },
      {
        id: 4,
        sender: 'Lisa Wang',
        senderType: 'finder',
        message: 'Perfect! I can meet you at the student center tomorrow at 3pm.',
        timestamp: '2024-01-14T15:30:00'
      },
      {
        id: 5,
        sender: 'David Kim',
        senderType: 'owner',
        message: 'Great! See you then.',
        timestamp: '2024-01-14T16:45:00'
      }
    ]
  },
  {
    id: 4,
    participants: {
      owner: { name: 'Jessica Brown', avatar: 'JB' },
      finder: { name: 'Tom Anderson', avatar: 'TA' }
    },
    itemName: 'Red Umbrella',
    lastMessage: 'I\'m available after 4pm on weekdays.',
    timestamp: '2024-01-15T09:20:00',
    unread: 1,
    status: 'active',
    type: 'owner-finder',
    messages: [
      {
        id: 1,
        sender: 'Jessica Brown',
        senderType: 'owner',
        message: 'Hi! Is the red umbrella you found still available?',
        timestamp: '2024-01-15T08:00:00'
      },
      {
        id: 2,
        sender: 'Tom Anderson',
        senderType: 'finder',
        message: 'Yes, it is! When would you like to pick it up?',
        timestamp: '2024-01-15T08:30:00'
      },
      {
        id: 3,
        sender: 'Jessica Brown',
        senderType: 'owner',
        message: 'I\'m available after 4pm on weekdays.',
        timestamp: '2024-01-15T09:20:00'
      }
    ]
  },
  {
    id: 5,
    participants: {
      user: { name: 'Alex Martinez', avatar: 'AM' },
      admin: { name: 'Admin', avatar: 'A' }
    },
    itemName: 'Claim Question',
    lastMessage: 'Thank you for the clarification!',
    timestamp: '2024-01-13T10:00:00',
    unread: 0,
    status: 'resolved',
    type: 'user-admin',
    messages: [
      {
        id: 1,
        sender: 'Alex Martinez',
        senderType: 'user',
        message: 'I submitted a claim for a laptop but it was rejected. Can you explain why?',
        timestamp: '2024-01-13T09:00:00'
      },
      {
        id: 2,
        sender: 'Admin',
        senderType: 'admin',
        message: 'Hi Alex, your claim was rejected because the serial number you provided didn\'t match the one on the found laptop.',
        timestamp: '2024-01-13T09:30:00'
      },
      {
        id: 3,
        sender: 'Alex Martinez',
        senderType: 'user',
        message: 'Thank you for the clarification!',
        timestamp: '2024-01-13T10:00:00'
      }
    ]
  }
];
