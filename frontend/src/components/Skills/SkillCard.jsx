import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';

const SkillCard = ({ skill }) => {
  return (
    <Card className="skill-card">
      <Link to={`/skills/${skill.id}`} className="skill-link">
        <h3 className="skill-name">{skill.name}</h3>
        <div className="skill-badge">{skill.category}</div>
        <div className="skill-stats">
          <div className="stat-item">
            <span className="stat-icon teachers-icon"></span>
            <span className="stat-value">{skill.teachersCount} Teachers</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon learners-icon"></span>
            <span className="stat-value">{skill.learnersCount} Learners</span>
          </div>
        </div>
        <p className="skill-description">{skill.description}</p>
        <div className="skill-levels">
          {skill.levels && skill.levels.map(level => (
            <span key={level} className={`level-badge level-${level.toLowerCase()}`}>
              {level}
            </span>
          ))}
        </div>
      </Link>
    </Card>
  );
};

export default SkillCard;