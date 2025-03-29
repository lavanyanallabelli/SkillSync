import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Rating from '../common/Rating';
import Button from '../common/Button';

const TeacherListItem = ({ teacher }) => {
  return (
    <div className="teacher-list-item">
      <div className="teacher-avatar">
        <img 
          src={teacher.avatar || '/assets/images/default-avatar.png'} 
          alt={teacher.name} 
        />
      </div>
      
      <div className="teacher-info">
        <div className="teacher-header">
          <Link to={`/profile/${teacher.id}`} className="teacher-name">{teacher.name}</Link>
          <div className="teacher-rating">
            <Rating value={teacher.rating} readOnly size="small" />
            <span className="rating-value">{teacher.rating.toFixed(1)}</span>
            <span className="review-count">({teacher.reviewCount} reviews)</span>
          </div>
        </div>
        
        <div className="teacher-proficiency">
          <span className={`proficiency-badge level-${teacher.proficiencyLevel.toLowerCase()}`}>
            {teacher.proficiencyLevel}
          </span>
        </div>
        
        <p className="teacher-bio">{teacher.bio}</p>
        
        <div className="teacher-footer">
          <div className="availability">
            <span className="availability-icon"></span>
            <span className="availability-text">
              {teacher.availability.join(', ')}
            </span>
          </div>
          
          <div className="teacher-actions">
            <Button 
              as={Link} 
              to={`/schedule/${teacher.id}`} 
              variant="primary"
              size="small"
            >
              Schedule
            </Button>
            <Button 
              as={Link} 
              to={`/messages/${teacher.id}`} 
              variant="outlined"
              size="small"
            >
              Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeachersList = ({ teachers, skillName }) => {
  return (
    <Card className="teachers-list-card">
      <div className="card-header">
        <h2>Available Teachers for {skillName}</h2>
        <p className="found-count">{teachers.length} teachers found</p>
      </div>
      
      <div className="teachers-list">
        {teachers.length > 0 ? (
          teachers.map(teacher => (
            <TeacherListItem key={teacher.id} teacher={teacher} />
          ))
        ) : (
          <div className="no-teachers-message">
            <p>No teachers available for this skill yet.</p>
            <p>Would you like to <Link to="/profile">become a teacher</Link> for this skill?</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TeachersList;