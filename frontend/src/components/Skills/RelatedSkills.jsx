import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';

const RelatedSkillItem = ({ skill }) => {
  return (
    <Link to={`/skills/${skill.id}`} className="related-skill-item">
      <span className="skill-name">{skill.name}</span>
      <span className="teacher-count">{skill.teachersCount} teachers</span>
    </Link>
  );
};

const RelatedSkills = ({ skills }) => {
  return (
    <Card className="related-skills-card">
      <h3 className="card-title">Related Skills</h3>
      
      <div className="related-skills-list">
        {skills.length > 0 ? (
          skills.map(skill => (
            <RelatedSkillItem key={skill.id} skill={skill} />
          ))
        ) : (
          <p className="no-skills-message">No related skills found.</p>
        )}
      </div>
    </Card>
  );
};

export default RelatedSkills;