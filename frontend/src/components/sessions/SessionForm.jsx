import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';

const SessionForm = ({ selectedTime, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    platform: 'zoom',
    duration: 60,
    additionalNotes: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      dateTime: selectedTime
    });
  };
  
  // Format selected date and time for display
  const formatDateTime = () => {
    if (!selectedTime) return 'Please select a time first';
    
    const { date, time } = selectedTime;
    const formattedDate = date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
    
    return `${formattedDate} at ${time}`;
  };
  
  return (
    <Card className="session-form-card">
      <h2 className="form-title">Session Details</h2>
      
      {selectedTime ? (
        <>
          <div className="selected-time">
            <h3>Selected Time:</h3>
            <p className="time-display">{formatDateTime()}</p>
          </div>
          
          <form onSubmit={handleSubmit} className="session-form">
            <div className="form-group">
              <label htmlFor="title">Session Title</label>
              <Input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. JavaScript Basics Introduction"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Session Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what you want to learn or teach in this session..."
                rows="4"
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="platform">Preferred Platform</label>
                <select
                  id="platform"
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  required
                >
                  <option value="zoom">Zoom</option>
                  <option value="teams">Microsoft Teams</option>
                  <option value="meet">Google Meet</option>
                  <option value="skype">Skype</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group half">
                <label htmlFor="duration">Duration (minutes)</label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                >
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="90">90 minutes</option>
                  <option value="120">120 minutes</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="additionalNotes">Additional Notes</label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                placeholder="Any additional information or requests..."
                rows="3"
              />
            </div>
            
            <div className="form-actions">
              <Button type="submit" variant="primary">Schedule Session</Button>
            </div>
          </form>
        </>
      ) : (
        <div className="no-time-selected">
          <p>Please select a date and time first.</p>
        </div>
      )}
    </Card>
  );
};

export default SessionForm;