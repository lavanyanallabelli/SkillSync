import api from './api';

// Helper functions for auth management
const saveAuthData = (token, user) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('userData', JSON.stringify(user));
};

const clearAuthData = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
};

const getStoredUser = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

// Auth event listeners
const authListeners = [];

class AuthService {
  constructor() {
    this.currentUser = getStoredUser();
    
    // Check token validity on initialization
    if (this.currentUser) {
      this.validateToken().catch(() => this.signOut());
    }
  }

  onAuthStateChanged(callback, errorCallback) {
    authListeners.push({ callback, errorCallback });
    
    // Immediately invoke with current state
    if (this.currentUser) {
      callback(this.currentUser);
    }
    
    // Return unsubscribe function
    return () => {
      const index = authListeners.findIndex(
        listener => listener.callback === callback && listener.errorCallback === errorCallback
      );
      if (index !== -1) {
        authListeners.splice(index, 1);
      }
    };
  }

  notifyListeners(user = null, error = null) {
    authListeners.forEach(listener => {
      if (error && listener.errorCallback) {
        listener.errorCallback(error);
      } else {
        listener.callback(user);
      }
    });
  }

  async validateToken() {
    try {
      const user = await api.get('/auth/validate');
      this.currentUser = user;
      return user;
    } catch (error) {
      clearAuthData();
      this.currentUser = null;
      throw error;
    }
  }

  async signIn(email, password) {
    try {
      const { token, user } = await api.post('/auth/login', { email, password });
      saveAuthData(token, user);
      this.currentUser = user;
      this.notifyListeners(user);
      return user;
    } catch (error) {
      this.notifyListeners(null, error);
      throw error;
    }
  }

  async signUp(email, password, username) {
    try {
      const { token, user } = await api.post('/auth/register', { 
        email, 
        password, 
        username 
      });
      saveAuthData(token, user);
      this.currentUser = user;
      this.notifyListeners(user);
      return user;
    } catch (error) {
      this.notifyListeners(null, error);
      throw error;
    }
  }

  async signOut() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error("Logout error (continuing):", error);
    } finally {
      clearAuthData();
      this.currentUser = null;
      this.notifyListeners(null);
    }
  }

  async resetPassword(email) {
    return api.post('/auth/reset-password', { email });
  }

  async confirmPasswordReset(token, newPassword) {
    return api.post('/auth/confirm-reset', { token, newPassword });
  }

  async updateUserProfile(userData) {
    try {
      const user = await api.put('/users/profile', userData);
      this.currentUser = { ...this.currentUser, ...user };
      localStorage.setItem('userData', JSON.stringify(this.currentUser));
      this.notifyListeners(this.currentUser);
      return this.currentUser;
    } catch (error) {
      this.notifyListeners(this.currentUser, error);
      throw error;
    }
  }

  async updatePassword(currentPassword, newPassword) {
    return api.put('/auth/update-password', { currentPassword, newPassword });
  }

  async updateEmail(newEmail, password) {
    try {
      const { user } = await api.put('/auth/update-email', { newEmail, password });
      this.currentUser = { ...this.currentUser, ...user };
      localStorage.setItem('userData', JSON.stringify(this.currentUser));
      this.notifyListeners(this.currentUser);
      return this.currentUser;
    } catch (error) {
      this.notifyListeners(this.currentUser, error);
      throw error;
    }
  }

  async uploadProfileImage(imageFile) {
    const formData = new FormData();
    formData.append('profileImage', imageFile);
    
    try {
      const user = await api.put('/users/profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      this.currentUser = { ...this.currentUser, ...user };
      localStorage.setItem('userData', JSON.stringify(this.currentUser));
      this.notifyListeners(this.currentUser);
      return this.currentUser;
    } catch (error) {
      this.notifyListeners(this.currentUser, error);
      throw error;
    }
  }
}

export const auth = new AuthService();