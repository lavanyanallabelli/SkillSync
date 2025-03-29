// pages/SessionDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SessionInfo from '../components/sessions/SessionInfo';
import SessionNotes from '../components/sessions/SessionNotes';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { useSessions } from '../hooks/useSessions';

const SessionDetail = () => {
  const { sessionId } = useParams();
  const { getSession, updateSessionNotes, cancelSession, isLoading } = useSessions();
  
  const [session, setSession] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  
  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const sessionData = await getSession(sessionId);
        setSession(sessionData);
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };
    
    fetchSessionDetails();
  }, [sessionId, getSession]);
  
  const handleSaveNotes = async (notes) => {
    try {
      await updateSessionNotes(sessionId, notes);
      // Update local state
      setSession(prev => ({
        ...prev,
        notes
      }));
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };
  
  const handleCancelSession = async () => {
    try {
      await cancelSession(sessionId, cancelReason);
      // Update local state
      setSession(prev => ({
        ...prev,
        status: 'cancelled',
        cancelReason
      }));
      setIsConfirmModalOpen(false);
    } catch (error) {
      console.error('Error cancelling session:', error);
    }
  };
  
  if (!session) {
    return <div className="loading">Loading session details...</div>;
  }
  
  return (
    <div className="session-detail-page">
      <div className="session-header">
        <h1>{session.title}</h1>
        <div className="session-actions">
          {session.status === 'scheduled' && (
            <>
              <Button 
                variant="secondary" 
                onClick={() => setIsConfirmModalOpen(true)}
              >
                Cancel Session
              </Button>
              <Button 
                variant="primary" 
                as="a" 
                href={session.meetingLink} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Join Session
              </Button>
            </>
          )}
          
          {session.status === 'completed' && !session.hasReview && (
            <Button 
              variant="primary" 
              as={Link} 
              to={`/review/${sessionId}`}
            >
              Leave a Review
            </Button>
          )}
        </div>
      </div>
      
      <div className="session-tabs">
        <button 
          className={`tab ${activeTab === 'info' ? 'active' : ''}`} 
          onClick={() => setActiveTab('info')}
        >
          Session Information
        </button>
        <button 
          className={`tab ${activeTab === 'notes' ? 'active' : ''}`} 
          onClick={() => setActiveTab('notes')}
        >
          Session Notes
        </button>
        <button 
          className={`tab ${activeTab === 'messages' ? 'active' : ''}`} 
          onClick={() => setActiveTab('messages')}
        >
          Messages
        </button>
      </div>
      
      <div className="session-content">
        {activeTab === 'info' && (
          <SessionInfo 
            session={session}
            onCancelRequest={() => setIsConfirmModalOpen(true)}
          />
        )}
        
        {activeTab === 'notes' && (
          <SessionNotes 
            sessionId={sessionId}
            initialNotes={session.notes || ''}
            onSave={handleSaveNotes}
          />
        )}
        
        {activeTab === 'messages' && (
          <Card className="messages-redirect">
            <p>
              View your conversation with {session.partner.name} in the messaging area.
            </p>
            <Button 
              variant="primary" 
              as={Link} 
              to={`/messages/${session.conversationId}`}
            >
              Go to Messages
            </Button>
          </Card>
        )}
      </div>
      
      {isConfirmModalOpen && (
        <Modal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          title="Cancel Session"
        >
          <div className="cancel-form">
            <p>Are you sure you want to cancel this session?</p>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Please provide a reason for cancellation..."
              rows={4}
              className="cancel-reason"
            />
            <div className="form-actions">
              <Button 
                variant="secondary" 
                onClick={() => setIsConfirmModalOpen(false)}
              >
                Keep Session
              </Button>
              <Button 
                variant="primary"
                onClick={handleCancelSession}
                isLoading={isLoading}
              >
                Confirm Cancellation
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SessionDetail;