// components/messages/MessageItem.jsx
import React from 'react';

const MessageItem = ({ message, isOwn }) => {
  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className={`message-item ${isOwn ? 'own-message' : 'other-message'}`}>
      <div className="message-content">
        {message.text}
        
        {message.attachment && (
          <div className="message-attachment">
            {message.attachment.type.startsWith('image/') ? (
              <img 
                src={message.attachment.url} 
                alt="Attachment" 
                className="attachment-preview"
                onClick={() => window.open(message.attachment.url)}
              />
            ) : (
              <div className="file-attachment">
                <i className="material-icons">insert_drive_file</i>
                <a 
                  href={message.attachment.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {message.attachment.name}
                </a>
              </div>
            )}
          </div>
        )}
        
        <div className="message-meta">
          <span className="message-time">{formatMessageTime(message.timestamp)}</span>
          {isOwn && message.status && (
            <span className="message-status">
              {message.status === 'sent' && <i className="material-icons">check</i>}
              {message.status === 'delivered' && <i className="material-icons">done_all</i>}
              {message.status === 'read' && <i className="material-icons status-read">done_all</i>}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;