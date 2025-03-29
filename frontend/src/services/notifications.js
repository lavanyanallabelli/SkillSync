import api from './api';

class NotificationService {
  async getUserNotifications(userId) {
    return api.get(`/users/${userId}/notifications`);
  }

  async markNotificationAsRead(notificationId) {
    return api.put(`/notifications/${notificationId}/read`);
  }

  async markAllNotificationsAsRead(userId) {
    return api.put(`/users/${userId}/notifications/read-all`);
  }

  async deleteNotification(notificationId) {
    return api.delete(`/notifications/${notificationId}`);
  }

  async createCustomNotification(userId, notificationData) {
    return api.post(`/users/${userId}/notifications`, notificationData);
  }

  async getNotificationPreferences(userId) {
    return api.get(`/users/${userId}/notification-preferences`);
  }

  async updateNotificationPreferences(userId, preferences) {
    return api.put(`/users/${userId}/notification-preferences`, preferences);
  }

  // For real-time subscription - implementation will depend on your backend tech
  subscribeToNotifications(userId, callback) {
    // This is a simplified mock implementation
    // In a real application, you would use WebSockets or similar technology
    
    // Mock implementation using a timer to simulate real-time updates
    const intervalId = setInterval(async () => {
      try {
        // In a real app, this would be handled by the WebSocket connection
        const lastNotificationId = localStorage.getItem(`lastNotificationId_${userId}`);
        
        // Fetch only new notifications
        const params = lastNotificationId ? { after: lastNotificationId } : {};
        const newNotifications = await api.get(`/users/${userId}/notifications/new`, { params });
        
        if (newNotifications && newNotifications.length > 0) {
          // Store the latest notification ID
          localStorage.setItem(`lastNotificationId_${userId}`, newNotifications[0].id);
          
          // Trigger callback for each new notification
          newNotifications.forEach(notification => {
            callback(notification);
          });
        }
      } catch (error) {
        console.error("Error in notification subscription:", error);
      }
    }, 15000); // Poll every 15 seconds
    
    // Return unsubscribe function
    return () => clearInterval(intervalId);
  }
}

export const notificationService = new NotificationService();