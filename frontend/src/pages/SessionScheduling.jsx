// pages/SessionScheduling.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AvailabilityCalendar from '../components/sessions/AvailabilityCalender';
import SessionForm from '../components/sessions/SessionForm';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useSessions } from '../hooks/useSessions';

const SessionScheduling = () => {
  const { partnerId, skillId } = useParams();
  const navigate = useNavigate();
  const { scheduleSession, isLoading } = useSessions();
  
  const [partner, setPartner] = useState(null);
  const [skill, setSkill] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [sessionDetails, setSessionDetails] = useState({
    title: '',
    description: '',
    platform: 'zoom',
    isVirtual: true,
    location: ''
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, these would be API calls
        const partnerResponse = await fetch(`/api/users/${partnerId}`);
        const partnerData = await partnerResponse.json();
        setPartner(partnerData);
        
        const skillResponse = await fetch(`/api/skills/${skillId}`);
        const skillData = await skillResponse.json();
        setSkill(skillData);
        
        // Pre-fill the session title based on skill
        setSessionDetails(prev => ({
          ...prev,
          title: `${skillData.name} Learning Session`
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, [partnerId, skillId]);
  
  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };
  
  const handleDetailsChange = (name, value) => {
    setSessionDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async () => {
    if (!selectedTimeSlot) {
      alert('Please select a time slot');
      return;
    }
    
    try {
      const sessionData = {
        partnerId,
        skillId,
        dateTime: selectedTimeSlot,
        ...sessionDetails
      };
      
      const result = await scheduleSession(sessionData);
      navigate(`/session/${result.id}`);
    } catch (error) {
      console.error('Error scheduling session:', error);
    }
  };
  
  if (!partner || !skill) {
    return <div className="loading">Loading scheduling details...</div>;
  }
  
  return (
    <div className="session-scheduling-page">
      <div className="scheduling-header">
        <h1>Schedule a Session</h1>
        <p>
          Schedule a learning session for{' '}
          <span className="highlight">{skill.name}</span> with{' '}
          <span className="highlight">{partner.name}</span>
        </p>
      </div>
      
      <div className="scheduling-content">
        <Card className="partner-info">
          <div className="partner-header">
            <img 
              src={partner.avatar || '/assets/images/default-avatar.png'} 
              alt={partner.name}
              className="partner-avatar"
            />
            <div className="partner-details">
              <h3>{partner.name}</h3>
              <div className="partner-meta">
                <span className="partner-location">{partner.location}</span>
                <span className="divider">•</span>
                <span className="skill-level">
                  {skill.proficiencyLevels.find(p => p.userId === partner.id)?.level || 'Expert'} in {skill.name}
                </span>
              </div>
            </div>
          </div>
          
          <div className="partner-availability">
            <h4>Select a Time</h4>
            <AvailabilityCalendar 
              partnerAvailability={partner.availability}
              selectedTimeSlot={selectedTimeSlot}
              onTimeSlotSelect={handleTimeSlotSelect}
            />
          </div>
        </Card>
        
        <SessionForm 
          sessionDetails={sessionDetails}
          onChange={handleDetailsChange}
          selectedTimeSlot={selectedTimeSlot}
        />
      </div>
      
      <div className="scheduling-actions">
        <Button 
          variant="secondary" 
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button 
          variant="primary"
          onClick={handleSubmit}
          isLoading={isLoading}
          disabled={isLoading || !selectedTimeSlot}
        >
          Schedule Session
        </Button>
      </div>
    </div>
  );
};

export default SessionScheduling;