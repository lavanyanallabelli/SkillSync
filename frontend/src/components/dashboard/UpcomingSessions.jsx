// src/components/dashboard/UpcomingSessions.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

const UpcomingSessions = ({ sessions }) => {
  return (
    <Card
      title="Upcoming Sessions"
      footer={
        <Link to="/sessions" className="text-blue-600 hover:text-blue-800 text-sm">
          View All Sessions
        </Link>
      }
      className="mb-6"
    >
      {sessions && sessions.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {sessions.map((session) => (
            <li key={session.id} className="py-3">
              <Link to={`/sessions/${session.id}`} className="block hover:bg-gray-50 -mx-4 px-4 py-2 rounded-md">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">{session.title}</h4>
                    <p className="text-sm text-gray-600">
                      Skill: {session.skill.name} • With {session.partner.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">{formatDate(session.date)}</p>
                    <p className="text-sm text-gray-600">{formatTime(session.date)}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No upcoming sessions.</p>
      )}
    </Card>
  );
};

export default UpcomingSessions;