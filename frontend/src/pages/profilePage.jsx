// src/pages/ProfilePage.jsx
import React, { useState } from 'react';
//import MainLayout from '../layouts/MainLayout';
import ProfileHeader from '../components/profile/ProfileHeader';
// import PersonalInfoSection from '../components/profile/PersonalInfoSection';
// import SkillsSection from '../components/profile/SkillsSection';
// import EducationSection from '../components/profile/EducationSection';
// import ReviewsSection from '../components/profile/ReviewsSection';

const ProfilePage = () => {
  // Sample user data - would come from API in a real app
  const [user, setUser] = useState({
    id: "u123",
    name: "Alex Johnson",
    pronouns: "they/them",
    location: "San Francisco, CA",
    email: "alex@example.com",
    profilePicture: "/api/placeholder/150/150",
    bio: "Software developer with 5+ years of experience. Passionate about teaching coding and learning new design skills.",
    skills: {
      verified: [
        { name: "JavaScript", proficiency: "Expert", level: 5 },
        { name: "React", proficiency: "Advanced", level: 4 },
        { name: "Node.js", proficiency: "Advanced", level: 4 }
      ],
      unverified: [
        { name: "UI/UX Design", proficiency: "Beginner", level: 2 },
        { name: "Python", proficiency: "Intermediate", level: 3 }
      ]
    },
    education: [
      { degree: "B.S. Computer Science", institution: "Stanford University", year: "2018" },
      { degree: "Full Stack Development Bootcamp", institution: "Tech Academy", year: "2019" }
    ],
    experience: [
      { role: "Frontend Developer", company: "TechCorp", duration: "2019-2022" },
      { role: "Senior Developer", company: "WebSolutions", duration: "2022-Present" }
    ],
    reviews: [
      { 
        id: 1, 
        reviewer: "Sarah Chen", 
        rating: 5, 
        date: "2025-02-10", 
        content: "Alex was an amazing JavaScript teacher! Very patient and explained concepts clearly.",
        reviewerImage: "/api/placeholder/40/40"
      },
      { 
        id: 2, 
        reviewer: "Michael Roberts", 
        rating: 4, 
        date: "2025-01-25", 
        content: "Great React session, helped me understand hooks much better.",
        reviewerImage: "/api/placeholder/40/40"
      }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = (updatedData) => {
    setUser({...user, ...updatedData});
    setIsEditing(false);
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <ProfileHeader 
          user={user} 
          isEditing={isEditing} 
          onEdit={handleEditProfile} 
          onSave={handleSaveProfile} 
        />

        <div className="space-y-8 mt-6">
          <PersonalInfoSection 
            user={user} 
            isEditing={isEditing} 
            onSave={handleSaveProfile} 
          />

          <SkillsSection 
            skills={user.skills} 
            isEditing={isEditing} 
            onSave={(skills) => handleSaveProfile({skills})} 
          />

          <EducationSection 
            education={user.education} 
            experience={user.experience} 
            isEditing={isEditing} 
            onSave={(data) => handleSaveProfile(data)} 
          />

          <ReviewsSection reviews={user.reviews} />
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;