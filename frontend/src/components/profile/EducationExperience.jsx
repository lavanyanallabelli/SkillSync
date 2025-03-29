import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Modal from '../common/Modal';

const EducationItem = ({ item, onEdit, onDelete, isOwn }) => {
  return (
    <div className="education-item">
      <div className="edu-header">
        <h3>{item.institution}</h3>
        {isOwn && (
          <div className="item-actions">
            <button onClick={() => onEdit(item)} className="action-btn">Edit</button>
            <button onClick={() => onDelete(item.id)} className="action-btn">Delete</button>
          </div>
        )}
      </div>
      <p className="edu-degree">{item.degree}</p>
      <p className="edu-field">{item.fieldOfStudy}</p>
      <p className="edu-period">{item.startDate} - {item.endDate || 'Present'}</p>
      {item.description && <p className="edu-description">{item.description}</p>}
    </div>
  );
};

const ExperienceItem = ({ item, onEdit, onDelete, isOwn }) => {
  return (
    <div className="experience-item">
      <div className="exp-header">
        <h3>{item.company}</h3>
        {isOwn && (
          <div className="item-actions">
            <button onClick={() => onEdit(item)} className="action-btn">Edit</button>
            <button onClick={() => onDelete(item.id)} className="action-btn">Delete</button>
          </div>
        )}
      </div>
      <p className="exp-title">{item.title}</p>
      <p className="exp-period">{item.startDate} - {item.endDate || 'Present'}</p>
      {item.description && <p className="exp-description">{item.description}</p>}
    </div>
  );
};

const EducationForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
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
    <form onSubmit={handleSubmit} className="education-form">
      <div className="form-group">
        <label htmlFor="institution">Institution</label>
        <input
          id="institution"
          name="institution"
          type="text"
          value={formData.institution}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="degree">Degree</label>
        <input
          id="degree"
          name="degree"
          type="text"
          value={formData.degree}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="fieldOfStudy">Field of Study</label>
        <input
          id="fieldOfStudy"
          name="fieldOfStudy"
          type="text"
          value={formData.fieldOfStudy}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-row">
        <div className="form-group half">
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group half">
          <label htmlFor="endDate">End Date</label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
          />
          <small>Leave empty if currently studying</small>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        />
      </div>
      
      <div className="form-actions">
        <Button type="submit" variant="primary">Save</Button>
        <Button type="button" variant="outlined" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
};

const ExperienceForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {
    company: '',
    title: '',
    startDate: '',
    endDate: '',
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
    <form onSubmit={handleSubmit} className="experience-form">
      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          value={formData.company}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-row">
        <div className="form-group half">
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group half">
          <label htmlFor="endDate">End Date</label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
          />
          <small>Leave empty if currently working</small>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        />
      </div>
      
      <div className="form-actions">
        <Button type="submit" variant="primary">Save</Button>
        <Button type="button" variant="outlined" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
};

const EducationExperience = ({ education, experience, isOwnProfile }) => {
  const [modalType, setModalType] = useState(null); // 'education' or 'experience'
  const [modalMode, setModalMode] = useState(null); // 'add' or 'edit'
  const [editItem, setEditItem] = useState(null);

  const openModal = (type, mode, item = null) => {
    setModalType(type);
    setModalMode(mode);
    setEditItem(item);
  };

  const closeModal = () => {
    setModalType(null);
    setModalMode(null);
    setEditItem(null);
  };

  const handleFormSubmit = (data) => {
    console.log('Form submitted:', modalType, modalMode, data);
    // Here you would handle adding or editing the item
    closeModal();
  };

  const handleDelete = (id) => {
    console.log('Delete item with ID:', id);
    // Here you would handle deleting the item
  };

  return (
    <>
      <Card className="education-section">
        <div className="section-header">
          <h2>Education</h2>
          {isOwnProfile && (
            <Button onClick={() => openModal('education', 'add')} variant="outlined" size="small">
              Add Education
            </Button>
          )}
        </div>
        <div className="education-list">
          {education && education.length > 0 ? (
            education.map(edu => (
              <EducationItem 
                key={edu.id} 
                item={edu} 
                isOwn={isOwnProfile}
                onEdit={(item) => openModal('education', 'edit', item)}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="no-items-message">No education details added yet.</p>
          )}
        </div>
      </Card>
      
      <Card className="experience-section">
        <div className="section-header">
          <h2>Experience</h2>
          {isOwnProfile && (
            <Button onClick={() => openModal('experience', 'add')} variant="outlined" size="small">
              Add Experience
            </Button>
          )}
        </div>
        <div className="experience-list">
          {experience && experience.length > 0 ? (
            experience.map(exp => (
              <ExperienceItem 
                key={exp.id} 
                item={exp} 
                isOwn={isOwnProfile}
                onEdit={(item) => openModal('experience', 'edit', item)}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p className="no-items-message">No experience details added yet.</p>
          )}
        </div>
      </Card>

      {modalType && (
        <Modal 
          isOpen={modalType !== null} 
          onClose={closeModal}
          title={`${modalMode === 'add' ? 'Add' : 'Edit'} ${modalType === 'education' ? 'Education' : 'Experience'}`}
        >
          {modalType === 'education' ? (
            <EducationForm 
              initialData={modalMode === 'edit' ? editItem : null}
              onSubmit={handleFormSubmit}
              onCancel={closeModal}
            />
          ) : (
            <ExperienceForm 
              initialData={modalMode === 'edit' ? editItem : null}
              onSubmit={handleFormSubmit}
              onCancel={closeModal}
            />
          )}
        </Modal>
      )}
    </>
  );
};

export default EducationExperience;