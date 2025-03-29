import React, { useState } from 'react';
import Card from '../common/Card';

const TimeSlot = ({ time, available, selected, onClick }) => {
  const slotClass = available 
    ? selected ? 'time-slot selected' : 'time-slot available' 
    : 'time-slot unavailable';
  
  return (
    <div 
      className={slotClass}
      onClick={available ? onClick : undefined}
    >
      {time}
    </div>
  );
};

const AvailabilityCalendar = ({ teacherAvailability, learnerAvailability, onTimeSelected }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  // Generate dates for the next 14 days
  const getDateRange = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };
  
  const dateRange = getDateRange();
  
  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Generate time slots for the selected date
  const getTimeSlots = () => {
    // In a real app, these would be filtered based on the teacher and learner availability
    // For now, we'll generate some sample slots
    const slots = [];
    const date = selectedDate.toDateString();
    
    // Sample hours from 9 AM to 6 PM
    for (let hour = 9; hour <= 18; hour++) {
      const time = `${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
      
      // Simulate availability (would come from props in a real app)
      // Make some slots unavailable randomly
      const isTeacherAvailable = Math.random() > 0.3;
      const isLearnerAvailable = Math.random() > 0.3;
      const isAvailable = isTeacherAvailable && isLearnerAvailable;
      
      slots.push({
        time,
        available: isAvailable,
        isSelected: selectedSlot === `${date}-${time}`
      });
    }
    
    return slots;
  };
  
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    
    // Clear time selection when date changes
    onTimeSelected(null);
  };
  
  const handleTimeSelect = (time) => {
    const dateTime = `${selectedDate.toDateString()}-${time}`;
    setSelectedSlot(dateTime);
    
    // Pass the selected date and time to parent component
    onTimeSelected({
      date: selectedDate,
      time: time
    });
  };
  
  const timeSlots = getTimeSlots();

  return (
    <Card className="availability-calendar">
      <h2 className="calendar-title">Select a Date & Time</h2>
      
      <div className="date-selector">
        <div className="date-scroller">
          {dateRange.map((date, index) => (
            <div 
              key={index}
              className={`date-item ${date.toDateString() === selectedDate.toDateString() ? 'selected' : ''}`}
              onClick={() => handleDateSelect(date)}
            >
              {formatDate(date)}
            </div>
          ))}
        </div>
      </div>
      
      <div className="time-slots">
        <div className="legend">
          <div className="legend-item">
            <div className="legend-color available"></div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="legend-color unavailable"></div>
            <span>Unavailable</span>
          </div>
          <div className="legend-item">
            <div className="legend-color selected"></div>
            <span>Selected</span>
          </div>
        </div>
        
        <div className="slots-grid">
          {timeSlots.map((slot, index) => (
            <TimeSlot
              key={index}
              time={slot.time}
              available={slot.available}
              selected={slot.isSelected}
              onClick={() => handleTimeSelect(slot.time)}
            />
          ))}
        </div>
        
        {timeSlots.every(slot => !slot.available) && (
          <p className="no-availability-message">
            No available time slots on this day. Please select another date.
          </p>
        )}
      </div>
    </Card>
  );
};

export default AvailabilityCalendar;