
// components/sessions/SessionInfo.jsx 
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';

const SessionInfo = ({ session, onCancelRequest }) => {
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'scheduled': return 'status-scheduled';
    
    case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      case 'pending':
        return 'status-pending';
      default:
        return '';
    }
  };
  
    return (
      <Card className="session-info">
        <div className="session-header">
          <h2>{session.title}</h2>
          <span className={`session-status ${getStatusClass(session.status)}`}>
            {session.status}
          </span>
        </div>
        
        <div className="session-details">
          <div className="detail-row">
            <span className="label">Skill:</span>
            <span className="value">{session.skill}</span>
          </div>
          
          <div className="detail-row">
            <span className="label">Date & Time:</span>
            <span className="value">{formatDateTime(session.dateTime)}</span>
          </div>
          
          {session.meetingLink && (
            <div className="detail-row">
              <span className="label">Meeting Link:</span>
              <a href={session.meetingLink} target="_blank" rel="noopener noreferrer" className="meeting-link">
                Join Meeting
              </a>
            </div>
          )}
          
          <div className="detail-row">
            <span className="label">Session Type:</span>
            <span className="value">{session.isVirtual ? 'Virtual' : 'In-person'}</span>
          </div>
          
          {!session.isVirtual && session.location && (
            <div className="detail-row">
              <span className="label">Location:</span>
              <span className="value">{session.location}</span>
            </div>
          )}
        </div>
        
        <div className="session-actions">
          {session.status === 'scheduled' && (
            <>
              <Button variant="primary" as={Link} to={`/session/${session.id}/notes`}>
                View Notes
              </Button>
              <Button variant="secondary" onClick={() => onCancelRequest(session.id)}>
                Cancel Session
              </Button>
            </>
          )}
          
          {session.status === 'completed' && (
            <Button variant="primary" as={Link} to={`/review/${session.id}`}>
              Leave Review
            </Button>
          )}
          
          {session.status === 'pending' && (
            <>
              <Button variant="primary" onClick={() => onCancelRequest(session.id, 'accept')}>
                Accept
              </Button>
              <Button variant="secondary" onClick={() => onCancelRequest(session.id, 'decline')}>
                Decline
              </Button>
            </>
          )}
        </div>
      </Card>
    );
  };
  
  export default SessionInfo;