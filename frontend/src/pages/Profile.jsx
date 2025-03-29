// pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProfileHeader from "../components/profile/ProfileHeader";
import PersonalInfo from "../components/profile/PersonalInfo";
import SkillsSection from "../components/profile/SkillsSection";
import EducationExperience from "../components/profile/EducationExperience";
import ReviewsSection from "../components/profile/ReviewsSection";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import { useAuth } from "../hooks/useAuth";

import axios from "axios";

const Profile = () => {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");

  // Hardcoded user ID to use if no userId is provided
  const HARDCODED_USER_ID = "67e4dfe733850b616f6d3a00";

  const isOwnProfile = currentUser && (!userId || userId === currentUser.id);

  useEffect(() => {
    console.log("Profile Page - Captured userId:", userId);

    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const userIdToFetch = userId || HARDCODED_USER_ID;
        // Use hardcoded ID if no userId is provided

        // Use axios for more reliable request
        const response = await axios.get(
          `http://localhost:5000/api/users/${userIdToFetch}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // const userIdToFetch = userId || HARDCODED_USER_ID;
        // const response = await fetch(`/api/users/${userIdToFetch}`);

        // if (!response.ok) {
        //   throw new Error("Failed to load profile");
        // }

        // const data = await response.json();
        console.log("Fetched Profile Data:", response.data); // Debug the fetched data
        setProfile(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.response?.data?.error || "Failed to fetch profile");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  //   if (userId || currentUser) {
  //     fetchProfile();
  //   }
  // }, [userId, currentUser]);

  if (isLoading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!profile) {
    return <div className="not-found">Profile not found</div>;
  }

  return (
    <div className="profile-page">
      <ProfileHeader
        profile={profile}
        isOwnProfile={isOwnProfile}
        onEditClick={() => setIsEditModalOpen(true)}
      />

      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="nav-section">
            <h3>Profile Sections</h3>
            <ul className="section-nav">
              <li
                className={activeSection === "personal" ? "active" : ""}
                onClick={() => setActiveSection("personal")}
              >
                Personal Information
              </li>
              <li
                className={activeSection === "skills" ? "active" : ""}
                onClick={() => setActiveSection("skills")}
              >
                Skills
              </li>
              <li
                className={activeSection === "education" ? "active" : ""}
                onClick={() => setActiveSection("education")}
              >
                Education & Experience
              </li>
              <li
                className={activeSection === "reviews" ? "active" : ""}
                onClick={() => setActiveSection("reviews")}
              >
                Reviews & Ratings
              </li>
            </ul>
          </div>

          {isOwnProfile && (
            <div className="action-section">
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(true)}
                fullWidth
              >
                Edit Profile
              </Button>
            </div>
          )}
        </div>

        <div className="profile-main">
          {activeSection === "personal" && <PersonalInfo profile={profile} />}

          {activeSection === "skills" && (
            <SkillsSection
              skills={profile.skills}
              isOwnProfile={isOwnProfile}
            />
          )}

          {activeSection === "education" && (
            <EducationExperience
              education={profile.education}
              experience={profile.experience}
              isOwnProfile={isOwnProfile}
            />
          )}

          {activeSection === "reviews" && (
            <ReviewsSection reviews={profile.reviews} />
          )}
        </div>
      </div>

      {isOwnProfile && isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Profile"
        >
          {/* Profile edit form would go here */}
          <div className="edit-form">
            {/* This would be replaced with actual form components */}
            <p>Edit profile form placeholder</p>
            <div className="form-actions">
              <Button
                variant="secondary"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  // Save logic would go here
                  setIsEditModalOpen(false);
                }}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Profile;
