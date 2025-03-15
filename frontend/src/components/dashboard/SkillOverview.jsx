// src/components/dashboard/SkillOverview.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';

const SkillOverview = ({ teachingSkills, learningSkills }) => {
  return (
    <Card
      title="Skill Overview"
      footer={
        <Link to="/skills" className="text-blue-600 hover:text-blue-800 text-sm">
          Manage Skills
        </Link>
      }
      className="mb-6"
    >
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-gray-800 mb-2">Teaching</h3>
          {teachingSkills && teachingSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {teachingSkills.map((skill) => (
                <span
                  key={skill.id}
                  className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No teaching skills added yet.</p>
          )}
        </div>
        <div>
          <h3 className="font-medium text-gray-800 mb-2">Learning</h3>
          {learningSkills && learningSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {learningSkills.map((skill) => (
                <span
                  key={skill.id}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No learning skills added yet.</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SkillOverview;