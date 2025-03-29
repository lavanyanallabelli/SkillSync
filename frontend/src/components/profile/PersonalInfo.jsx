import React from "react";
import Card from "../common/Card";

const PersonalInfo = ({ personalInfo, isEditable }) => {
  return (
    <Card className="personal-info-card">
      <div className="card-header">
        <h2>Personal Information</h2>
        {isEditable && <button className="edit-btn">Edit</button>}
      </div>
      <div className="info-grid">
        <div className="info-item">
          <span className="label">Email:</span>
          {/* <span className="value">{personalInfo.email}</span> */}
          <span className="value">temperory@mail.com</span>
        </div>
        <div className="info-item">
          <span className="label">Phone:</span>
          {/* <span className="value">{personalInfo.phone || "Not provided"}</span> */}
          <span className="value"> 123243546</span>
        </div>
        <div className="info-item">
          <span className="label">Location:</span>
          {/* <span className="value">{personalInfo.location}</span> */}
        </div>
        <div className="info-item">
          <span className="label">Time Zone:</span>
          {/* <span className="value">{personalInfo.timeZone}</span> */}
        </div>
        <div className="info-item full-width">
          <span className="label">Bio:</span>
          <p className="value bio-text">
            {/* {personalInfo.bio || "No bio provided."} */}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default PersonalInfo;
