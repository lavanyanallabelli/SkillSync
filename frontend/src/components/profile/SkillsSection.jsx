import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Modal from '../common/Modal';

const SkillLevelBadge = ({ level }) => {
  const getLevelClass = () => {
    switch (level) {
      case 'Beginner': return 'level-beginner';
      case 'Intermediate': return 'level-intermediate';
      case 'Advanced': return 'level-advanced';
      case 'Expert': return 'level-expert';
      default: return '';
    }
  };
  
  return <span className={`skill-level-badge ${getLevelClass()}`}>{level}</span>;
};

const SkillCard = ({ skill, isVerified, isOwn }) => {
  return (
    <div className="skill-card">
      <div className="skill-header">
        <h3>{skill.name}</h3>
        {isVerified && <span className="verified-badge">Verified</span>}
      </div>
      <SkillLevelBadge level={skill.level} />
      <p className="skill-description">{skill.description}</p>
      {isOwn && (
        <div className="skill-actions">
          <button className="action-btn edit">Edit</button>
          <button className="action-btn remove">Remove</button>
        </div>
      )}
    </div>
  );
};

const SkillsSection = ({ teachingSkills, learningSkills, isOwnProfile }) => {
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [skillType, setSkillType] = useState('');

  const openAddSkillModal = (type) => {
    setSkillType(type);
    setShowAddSkillModal(true);
  };

  return (
    <>
      <Card className="skills-section">
        <div className="section-header">
          <h2>Skills I Can Teach</h2>
          {isOwnProfile && (
            <Button onClick={() => openAddSkillModal('teaching')} variant="outlined" size="small">
              Add Skill
            </Button>
          )}
        </div>
        <div className="skills-grid">
          {teachingSkills.length > 0 ? (
            teachingSkills.map(skill => (
              <SkillCard 
                key={skill.id} 
                skill={skill} 
                isVerified={skill.isVerified} 
                isOwn={isOwnProfile} 
              />
            ))
          ) : (
            <p className="no-skills-message">No teaching skills added yet.</p>
          )}
        </div>
      </Card>
      
      <Card className="skills-section">
        <div className="section-header">
          <h2>Skills I Want to Learn</h2>
          {isOwnProfile && (
            <Button onClick={() => openAddSkillModal('learning')} variant="outlined" size="small">
              Add Skill
            </Button>
          )}
        </div>
        <div className="skills-grid">
          {learningSkills.length > 0 ? (
            learningSkills.map(skill => (
              <SkillCard 
                key={skill.id} 
                skill={skill} 
                isVerified={false}
                isOwn={isOwnProfile} 
              />
            ))
          ) : (
            <p className="no-skills-message">No learning skills added yet.</p>
          )}
        </div>
      </Card>

      {showAddSkillModal && (
        <Modal 
          isOpen={showAddSkillModal} 
          onClose={() => setShowAddSkillModal(false)}
          title={`Add a Skill to ${skillType === 'teaching' ? 'Teach' : 'Learn'}`}
        >
          <AddSkillForm 
            type={skillType} 
            onSubmit={(data) => {
              console.log('Skill data:', data);
              setShowAddSkillModal(false);
            }} 
          />
        </Modal>
      )}
    </>
  );
};

const AddSkillForm = ({ type, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    level: type === 'teaching' ? 'Intermediate' : 'Beginner',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="add-skill-form">
      <div className="form-group">
        <label htmlFor="skill-name">Skill Name</label>
        <input
          id="skill-name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="skill-category">Category</label>
        <select
          id="skill-category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          <option value="programming">Programming</option>
          <option value="language">Languages</option>
          <option value="music">Music</option>
          <option value="arts">Arts & Crafts</option>
          <option value="academics">Academics</option>
          <option value="business">Business</option>
          <option value="fitness">Fitness</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="skill-level">Proficiency Level</label>
        <select
          id="skill-level"
          name="level"
          value={formData.level}
          onChange={handleChange}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Expert">Expert</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="skill-description">Description</label>
        <textarea
          id="skill-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          placeholder={type === 'teaching' ? 'Describe your experience with this skill...' : 'Why do you want to learn this skill?'}
        />
      </div>
      
      <div className="form-actions">
        <Button type="submit" variant="primary">Add Skill</Button>
      </div>
    </form>
  );
};

export default SkillsSection;