// pages/Safety.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Safety = () => {
  const navigate = useNavigate();
  const [reportForm, setReportForm] = useState({
    reportType: '',
    userId: '',
    sessionId: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [reports, setReports] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // In a real app, this would call your API service
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reportForm)
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit report');
      }
      
      // Reset form and show success message
      setReportForm({
        reportType: '',
        userId: '',
        sessionId: '',
        description: ''
      });
      setSubmitSuccess(true);
      
      // Fetch updated reports
      fetchReports();
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchReports = async () => {
    try {
      // In a real app, this would call your API service
      const response = await fetch('/api/reports');
      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  // Fetch reports on component mount
  React.useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="safety-page">
      <h1>Safety Center</h1>
      
      <section className="safety-tips">
        <h2>Safety Guidelines</h2>
        <div className="tips-container">
          <div className="tip-card">
            <h3>Protect Your Personal Information</h3>
            <p>Never share sensitive personal information like your home address, financial details, or identification numbers with other users.</p>
          </div>
          
          <div className="tip-card">
            <h3>Keep Communication on Platform</h3>
            <p>For your safety, keep all communication within our platform's messaging system until you've established trust.</p>
          </div>
          
          <div className="tip-card">
            <h3>Report Suspicious Behavior</h3>
            <p>If someone asks for payment outside the platform, makes you uncomfortable, or violates our guidelines, report them immediately.</p>
          </div>
          
          <div className="tip-card">
            <h3>Choose Public Meeting Spaces</h3>
            <p>If meeting in person, choose public locations and let someone know your plans.</p>
          </div>
        </div>
      </section>
      
      <section className="report-section">
        <h2>Report an Issue</h2>
        {submitSuccess && (
          <div className="success-message">
            Your report has been submitted successfully. Our team will review it shortly.
          </div>
        )}
        
        {submitError && (
          <div className="error-message">
            {submitError}
          </div>
        )}
        
        <form className="report-form" onSubmit={handleSubmitReport}>
          <div className="form-group">
            <label htmlFor="reportType">Type of Issue</label>
            <select 
              id="reportType"
              name="reportType"
              value={reportForm.reportType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Issue Type</option>
              <option value="inappropriate-behavior">Inappropriate Behavior</option>
              <option value="spam">Spam or Scam</option>
              <option value="harassment">Harassment</option>
              <option value="fake-profile">Fake Profile</option>
              <option value="other">Other Issue</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="userId">User ID (if applicable)</label>
            <input 
              type="text"
              id="userId"
              name="userId"
              value={reportForm.userId}
              onChange={handleInputChange}
              placeholder="Username of the person you're reporting"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="sessionId">Session ID (if applicable)</label>
            <input 
              type="text"
              id="sessionId"
              name="sessionId"
              value={reportForm.sessionId}
              onChange={handleInputChange}
              placeholder="ID of the related session"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description of the Issue</label>
            <textarea 
              id="description"
              name="description"
              value={reportForm.description}
              onChange={handleInputChange}
              rows={5}
              required
              placeholder="Please provide details about the issue"
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </section>
      
      <section className="report-history">
        <h2>Your Report History</h2>
        {reports.length === 0 ? (
          <p>You have no previous reports.</p>
        ) : (
          <div className="reports-list">
            {reports.map(report => (
              <div key={report.id} className="report-card">
                <div className="report-header">
                  <h3>Report #{report.id}</h3>
                  <span className={`status-badge status-${report.status.toLowerCase()}`}>
                    {report.status}
                  </span>
                </div>
                <p><strong>Type:</strong> {report.type}</p>
                <p><strong>Submitted:</strong> {new Date(report.createdAt).toLocaleDateString()}</p>
                <p><strong>Description:</strong> {report.description}</p>
                {report.response && (
                  <div className="report-response">
                    <p><strong>Admin Response:</strong> {report.response}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Safety;