// components/messages/ChatWindow.jsx
import React, { useState, useRef, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';
import MessageItem from './MessageItem';

const ChatWindow = ({ 
  conversation, 
  currentUserId,
  onSendMessage,
  onAttachFile,
  isLoading = false
}) => {
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText.trim() && onSendMessage) {
      onSendMessage(messageText);
      setMessageText('');
    }
  };
  
  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileSelect = (e) => {
    if (e.target.files.length > 0 && onAttachFile) {
      onAttachFile(e.target.files[0]);
    }
  };
  
  if (!conversation) {
    return (
      <div className="empty-chat-window">
        <p>Select a conversation to start messaging</p>
      </div>
    );
  }
  
  return (
    <Card className="chat-window">
      <div className="chat-header">
        <div className="chat-participant">
          <img 
            src={conversation.participant.avatar || '/assets/images/default-avatar.png'} 
            alt={conversation.participant.name}
            className="avatar"
          />
          <div className="participant-info">
            <h3>{conversation.participant.name}</h3>
            <span className={`status ${conversation.participant.isOnline ? 'online' : 'offline'}`}>
              {conversation.participant.isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
        
        {conversation.relatedSession && (
          <div className="related-session">
            <span>Related to: </span>
            <a href={`/session/${conversation.relatedSession.id}`}>
              {conversation.relatedSession.title}
            </a>
          </div>
        )}
      </div>
      
      <div className="messages-container">
        {conversation.messages.length === 0 ? (
          <div className="no-messages">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          conversation.messages.map((message) => (
            <MessageItem
              key={message.id}
              message={message}
              isOwn={message.senderId === currentUserId}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form className="message-input-container" onSubmit={handleSendMessage}>
        <input 
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileSelect}
        />
        
        <Button 
          type="button"
          variant="icon"
          onClick={handleAttachClick}
          className="attach-button"
          aria-label="Attach file"
        >
          <i className="material-icons">attach_file</i>
        </Button>
        
        <Input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
        />
        
        <Button 
          type="submit"
          variant="primary"
          disabled={!messageText.trim() || isLoading}
          className="send-button"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </form>
    </Card>
  );
};

export default ChatWindow;