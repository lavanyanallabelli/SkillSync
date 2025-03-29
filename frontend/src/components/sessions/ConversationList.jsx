// components/messages/ConversationList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';

const ConversationList = ({ conversations, activeConversationId, onSelectConversation }) => {
  const formatLastMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    
    // If message is from today, show only time
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // If message is from this week, show day name
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 7);
    if (date > oneWeekAgo) {
      return date.toLocaleDateString([], { weekday: 'short' });
    }
    
    // Otherwise show date
    return date.toLocaleDateString();
  };

  return (
    <div className="conversation-list">
      <div className="list-header">
        <h3>Messages</h3>
      </div>
      
      {conversations.length === 0 ? (
        <div className="no-conversations">
          <p>No conversations yet</p>
        </div>
      ) : (
        <ul className="conversations">
          {conversations.map((conversation) => (
            <li 
              key={conversation.id} 
              className={`conversation-item ${conversation.id === activeConversationId ? 'active' : ''} ${conversation.unreadCount > 0 ? 'unread' : ''}`}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <div className="avatar-container">
                <img 
                  src={conversation.participant.avatar || '/assets/images/default-avatar.png'} 
                  alt={conversation.participant.name}
                  className="avatar"
                />
                {conversation.participant.isOnline && <span className="online-indicator" />}
              </div>
              
              <div className="conversation-content">
                <div className="conversation-header">
                  <h4 className="participant-name">{conversation.participant.name}</h4>
                  <span className="last-message-time">
                    {formatLastMessageTime(conversation.lastMessage.timestamp)}
                  </span>
                </div>
                
                <div className="conversation-preview">
                  <p className="last-message-text">
                    {conversation.lastMessage.text.length > 40
                      ? `${conversation.lastMessage.text.substring(0, 40)}...`
                      : conversation.lastMessage.text}
                  </p>
                  
                  {conversation.unreadCount > 0 && (
                    <span className="unread-count">{conversation.unreadCount}</span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConversationList;