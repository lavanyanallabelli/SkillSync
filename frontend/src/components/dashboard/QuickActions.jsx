// src/components/dashboard/QuickActions.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';

const QuickActions = () => {
  const actions = [
    {
      label: 'Add a Skill',
      icon: (
        <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      path: '/skills/add',
    },
    {
      label: 'Schedule a Session',
      icon: (
        <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      path: '/sessions/schedule',
    },
    {
      label: 'Take a Quiz',
      icon: (
        <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      path: '/quiz',
    },
  ];

  return (
    <Card title="Quick Actions">
      <div className="space-y-3">
        {actions.map((action, index) => (
          <Link key={index} to={action.path}>
            <Button variant="outline" fullWidth className="flex items-center justify-center">
              {action.icon}
              {action.label}
            </Button>
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default QuickActions;