import React from "react";
import MainLayout from "../layouts/MainLayout";
import ProfileSummary from "../components/dashboard/ProfileSummary";
import SkillOverview from "../components/dashboard/SkillOverview";
import QuickActions from "../components/dashboard/QuickActions";
import UpcomingSession from "../components/dashboard/UpcomingSessions";
import NotificationItem from "../components/dashboard/NotificationPanel";

const Dashboard = () => {
  // Sample data - in a real app would come from API
  const user = {
    id: "u123",
    name: "Alex Johnson",
    profilePicture: "/api/placeholder/80/80",
    bio: "Software developer passionate about learning new technologies and sharing knowledge.",
    teachingSkills: ["JavaScript", "React", "Node.js"],
    learningSkills: ["Python", "Data Science", "UI/UX Design"],
  };

  const upcomingSessions = [
    {
      id: 1,
      date: "2025-03-16",
      time: "14:00",
      skill: "Python",
      partner: "Sarah Chen",
    },
    {
      id: 2,
      date: "2025-03-18",
      time: "10:30",
      skill: "UI/UX Design",
      partner: "Michael Roberts",
    },
  ];

  const notifications = [
    {
      id: 1,
      type: "message",
      content: "New message from Sarah Chen",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "request",
      content: "Session request for React tutoring",
      time: "1 day ago",
    },
    {
      id: 3,
      type: "quiz",
      content: "Quiz results for JavaScript: Passed!",
      time: "3 days ago",
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <ProfileSummary user={user} />
            <SkillOverview
              teachingSkills={user.teachingSkills}
              learningSkills={user.learningSkills}
            />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            <QuickActions />

            {/* Upcoming Sessions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Upcoming Sessions
              </h3>

              {upcomingSessions.length > 0 ? (
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <UpcomingSession key={session.id} session={session} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No upcoming sessions scheduled.</p>
              )}

              <div className="mt-4 text-center">
                <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                  View All Sessions →
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Notifications
              </h3>

              {notifications.length > 0 ? (
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No new notifications.</p>
              )}

              <div className="mt-4 text-center">
                <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                  View All Notifications →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
