import api from './api';

class SkillsService {
  async getAllSkills() {
    return api.get('/skills');
  }

  async getSkillById(skillId) {
    return api.get(`/skills/${skillId}`);
  }

  async getSkillCategories() {
    return api.get('/skills/categories');
  }

  async searchSkills(query, filters = {}) {
    const params = new URLSearchParams();
    
    if (query) {
      params.append('q', query);
    }
    
    if (filters.category) {
      params.append('category', filters.category);
    }
    
    if (filters.proficiency) {
      params.append('proficiency', filters.proficiency);
    }
    
    if (filters.availability) {
      params.append('availability', filters.availability);
    }
    
    if (filters.page) {
      params.append('page', filters.page);
    }
    
    if (filters.limit) {
      params.append('limit', filters.limit);
    }
    
    return api.get(`/skills/search?${params.toString()}`);
  }

  async getUserSkills(userId) {
    return api.get(`/users/${userId}/skills`);
  }

  async addUserTeachingSkill(userId, skillData) {
    return api.post(`/users/${userId}/skills/teaching`, skillData);
  }

  async addUserLearningSkill(userId, skillData) {
    return api.post(`/users/${userId}/skills/learning`, skillData);
  }

  async updateUserSkill(userId, skillId, skillType, updateData) {
    return api.put(`/users/${userId}/skills/${skillType}/${skillId}`, updateData);
  }

  async removeUserSkill(userId, skillId, skillType) {
    return api.delete(`/users/${userId}/skills/${skillType}/${skillId}`);
  }

  async getSkillTeachers(skillId) {
    return api.get(`/skills/${skillId}/teachers`);
  }

  async getSkillLearners(skillId) {
    return api.get(`/skills/${skillId}/learners`);
  }

  async getRelatedSkills(skillId) {
    return api.get(`/skills/${skillId}/related`);
  }

  async verifySkill(userId, skillId, verificationData) {
    return api.post(`/users/${userId}/skills/verify/${skillId}`, verificationData);
  }

  async getSkillQuiz(skillId) {
    return api.get(`/skills/${skillId}/quiz`);
  }

  async submitSkillQuiz(skillId, answers) {
    return api.post(`/skills/${skillId}/quiz/submit`, { answers });
  }

  async getSkillStatistics(skillId) {
    return api.get(`/skills/${skillId}/statistics`);
  }

  async addSkillReview(skillId, userId, reviewData) {
    return api.post(`/skills/${skillId}/reviews/${userId}`, reviewData);
  }

  async getSkillReviews(skillId) {
    return api.get(`/skills/${skillId}/reviews`);
  }
}

export const skillsService = new SkillsService();