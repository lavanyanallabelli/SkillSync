import api from './api';

class SessionService {
  async getUserSessions(userId) {
    const sessions = await api.get(`/users/${userId}/sessions`);
    
    // Split sessions into upcoming and past
    const now = new Date();
    const upcoming = sessions.filter(session => new Date(session.startTime) > now);
    const past = sessions.filter(session => new Date(session.startTime) <= now);
    
    // Sort upcoming by start time (ascending) and past by start time (descending)
    upcoming.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    past.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
    
    return { upcoming, past };
  }

  async createSession(sessionData) {
    return api.post('/sessions', sessionData);
  }

  async getSessionById(sessionId) {
    return api.get(`/sessions/${sessionId}`);
  }

  async updateSession(sessionId, updateData) {
    return api.put(`/sessions/${sessionId}`, updateData);
  }

  async cancelSession(sessionId, reason) {
    return api.put(`/sessions/${sessionId}/cancel`, { reason });
  }

  async addSessionNote(sessionId, note) {
    return api.post(`/sessions/${sessionId}/notes`, { content: note });
  }

  async getSessionNotes(sessionId) {
    return api.get(`/sessions/${sessionId}/notes`);
  }

  async confirmSessionAttendance(sessionId, userId) {
    return api.put(`/sessions/${sessionId}/confirm-attendance`, { userId });
  }

  async rescheduleSession(sessionId, newTime) {
    return api.put(`/sessions/${sessionId}/reschedule`, { newTime });
  }

  async addSessionFeedback(sessionId, feedbackData) {
    return api.post(`/sessions/${sessionId}/feedback`, feedbackData);
  }

  async getSessionFeedback(sessionId) {
    return api.get(`/sessions/${sessionId}/feedback`);
  }

  async getAvailableTimeSlots(teacherId, learnerId, date) {
    return api.get('/sessions/availability', {
      params: { teacherId, learnerId, date }
    });
  }

  async generateMeetingLink(sessionId, platform) {
    return api.post(`/sessions/${sessionId}/meeting-link`, { platform });
  }

  // For real-time subscription - implementation will depend on your backend tech
  subscribeToSessionUpdates(userId, callback) {
    // This is a simplified mock implementation
    // In a real application, you would use WebSockets or similar technology
    
     // Mock implementation using a timer to simulate real-time updates
     const intervalId = setInterval(async () => {
        try {
          // In a real app, this would be handled by the WebSocket connection
          // Here we're just polling as a simple alternative
          const { upcoming } = await this.getUserSessions(userId);
          
          // Check for any sessions that might have been updated
          upcoming.forEach(session => {
            // This would normally be triggered by server events
            if (session.status === 'updated' || session.status === 'needsAttention') {
              callback(session);
            }
          });
        } catch (error) {
          console.error("Error in session subscription:", error);
        }
      }, 30000); // Poll every 30 seconds
      
      // Return unsubscribe function
      return () => clearInterval(intervalId);
    }
  }
  
  export const sessionService = new SessionService();