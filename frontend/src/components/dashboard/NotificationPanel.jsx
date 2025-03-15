// src/components/dashboard/NotificationPanel.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';

const NotificationPanel = ({ notifications }) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'message':
        return (
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
              <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
          );
        case 'session':
          return (
            <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
              <svg className="h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          );
        case 'quiz':
          return (
            <div className="flex-shrink-0 bg-purple-100 rounded-full p-2">
              <svg className="h-5 w-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          );
        default:
          return (
            <div className="flex-shrink-0 bg-gray-100 rounded-full p-2">
              <svg className="h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
          );
      }
    };
  
    const getNotificationLink = (notification) => {
      switch (notification.type) {
        case 'message':
          return `/messages/${notification.referenceId}`;
        case 'session':
          return `/sessions/${notification.referenceId}`;
        case 'quiz':
          return `/quiz/${notification.referenceId}`;
        default:
          return '#';
      }
    };
  
    return (
      <Card
        title="Notifications"
        footer={
          <button className="text-gray-600 hover:text-gray-800 text-sm">
            Mark all as read
          </button>
        }
        className="mb-6"
      >
        {notifications && notifications.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <li key={notification.id} className={`py-3 ${notification.read ? '' : 'bg-blue-50'}`}>
                <Link to={getNotificationLink(notification)} className="flex items-start -mx-4 px-4 py-2 hover:bg-gray-50 rounded-md">
                  {getNotificationIcon(notification.type)}
                  <div className="ml-3 flex-1">
                    <p className={`text-sm ${notification.read ? 'text-gray-600' : 'font-medium text-gray-800'}`}>
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No new notifications.</p>
        )}
      </Card>
    );
  };
  
  export default NotificationPanel;