// pages/Messaging.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ConversationList from '../components/messages/ConversationList';
import ChatWindow from '../components/messages/ChatWindow';
import { useAuth } from '../hooks/useAuth';

const Messaging = () => {
  const { conversationId } = useParams();
  const { currentUser } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchConversations = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would call your API service
        const response = await fetch('/api/conversations');
        const data = await response.json();
        setConversations(data);
        
        // If conversationId is provided in URL, select that conversation
        if (conversationId) {
          const selected = data.find(c => c.id === conversationId);
          if (selected) {
            setActiveConversation(selected);
          }
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchConversations();
  }, [conversationId]);
  
  const handleSelectConversation = async (id) => {
    const selected = conversations.find(c => c.id === id);
    if (selected) {
      setActiveConversation(selected);
      
      // Mark conversation as read
      try {
        await fetch(`/api/conversations/${id}/read`, { method: 'POST' });
        
        // Update unread count locally
        setConversations(prevConversations => 
          prevConversations.map(conv => 
            conv.id === id ? { ...conv, unreadCount: 0 } : conv
          )
        );
      } catch (error) {
        console.error('Error marking conversation as read:', error);
      }
    }
  };
  
  const handleSendMessage = async (text) => {
    if (!activeConversation) return;
    
    try {
      // In a real app, this would call your API service
      const response = await fetch(`/api/conversations/${activeConversation.id}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      });
      
      const newMessage = await response.json();
      
      // Update local state with new message
      setActiveConversation(prev => ({
        ...prev,
        messages: [...prev.messages, newMessage],
        lastMessage: newMessage
      }));
      
      // Update conversations list
      setConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.id === activeConversation.id 
            ? { 
                ...conv, 
                lastMessage: newMessage 
              } 
            : conv
        )
      );
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  const handleAttachFile = async (file) => {
    if (!activeConversation) return;
    
    try {
      // Create form data for file upload
      const formData = new FormData();
      formData.append('file', file);
      
      // In a real app, this would call your API service
      const response = await fetch(`/api/conversations/${activeConversation.id}/attachments`, {
        method: 'POST',
        body: formData
      });
      
      const newMessage = await response.json();
      
      // Update local state with new message
      setActiveConversation(prev => ({
        ...prev,
        messages: [...prev.messages, newMessage],
        lastMessage: newMessage
      }));
      
      // Update conversations list
      setConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.id === activeConversation.id 
            ? { 
                ...conv, 
                lastMessage: newMessage 
              } 
            : conv
        )
      );
    } catch (error) {
      console.error('Error sending attachment:', error);
    }
  };
  
  return (
    <div className="messaging-page">
      <div className="messaging-container">
        <div className="conversations-panel">
          <ConversationList 
            conversations={conversations}
            activeConversationId={activeConversation?.id}
            onSelectConversation={handleSelectConversation}
          />
        </div>
        
        <div className="chat-panel">
          <ChatWindow 
            conversation={activeConversation}
            currentUserId={currentUser?.id}
            onSendMessage={handleSendMessage}
            onAttachFile={handleAttachFile}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Messaging;