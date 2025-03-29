import { useState, useEffect, useCallback, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { skillsService } from '../services/skills';

export const useSkills = () => {
  const { currentUser } = useContext(AuthContext);
  const [userSkills, setUserSkills] = useState({ teaching: [], learning: [] });
  const [allSkills, setAllSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all skills and categories
  const fetchSkillData = useCallback(async () => {
    try {
      setLoading(true);
      const [skills, cats] = await Promise.all([
        skillsService.getAllSkills(),
        skillsService.getSkillCategories()
      ]);
      setAllSkills(skills);
      setCategories(cats);
    } catch (err) {
      console.error("Error fetching skill data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch user's skills
  const fetchUserSkills = useCallback(async (userId) => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const skills = await skillsService.getUserSkills(userId);
      setUserSkills(skills);
    } catch (err) {
      console.error("Error fetching user skills:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data loading
  useEffect(() => {
    fetchSkillData();
  }, [fetchSkillData]);

  // Load user skills when user changes
  useEffect(() => {
    if (currentUser) {
      fetchUserSkills(currentUser.id);
    } else {
      setUserSkills({ teaching: [], learning: [] });
    }
  }, [currentUser, fetchUserSkills]);

  // Add a skill the user wants to teach
  const addTeachingSkill = async (skillData) => {
    try {
      setLoading(true);
      const newSkill = await skillsService.addUserTeachingSkill(currentUser.id, skillData);
      setUserSkills(prev => ({
        ...prev,
        teaching: [...prev.teaching, newSkill]
      }));
      return newSkill;
    } catch (err) {
      console.error("Error adding teaching skill:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Add a skill the user wants to learn
  const addLearningSkill = async (skillData) => {
    try {
      setLoading(true);
      const newSkill = await skillsService.addUserLearningSkill(currentUser.id, skillData);
      setUserSkills(prev => ({
        ...prev,
        learning: [...prev.learning, newSkill]
      }));
      return newSkill;
    } catch (err) {
      console.error("Error adding learning skill:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update a skill
  const updateUserSkill = async (skillId, skillType, updateData) => {
    try {
      setLoading(true);
      const updatedSkill = await skillsService.updateUserSkill(
        currentUser.id, 
        skillId, 
        skillType, 
        updateData
      );
      
      setUserSkills(prev => ({
        ...prev,
        [skillType]: prev[skillType].map(skill => 
          skill.id === skillId ? updatedSkill : skill
        )
      }));
      
      return updatedSkill;
    } catch (err) {
      console.error("Error updating skill:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Remove a skill
  const removeUserSkill = async (skillId, skillType) => {
    try {
      setLoading(true);
      await skillsService.removeUserSkill(currentUser.id, skillId, skillType);
      
      setUserSkills(prev => ({
        ...prev,
        [skillType]: prev[skillType].filter(skill => skill.id !== skillId)
      }));
      
      return true;
    } catch (err) {
      console.error("Error removing skill:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get users who can teach a specific skill
  const getTeachersForSkill = async (skillId) => {
    try {
      setLoading(true);
      return await skillsService.getSkillTeachers(skillId);
    } catch (err) {
      console.error("Error fetching skill teachers:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Search skills
  const searchSkills = async (query, filters = {}) => {
    try {
      setLoading(true);
      return await skillsService.searchSkills(query, filters);
    } catch (err) {
      console.error("Error searching skills:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    userSkills,
    allSkills,
    categories,
    loading,
    error,
    addTeachingSkill,
    addLearningSkill,
    updateUserSkill,
    removeUserSkill,
    getTeachersForSkill,
    searchSkills,
    refreshUserSkills: () => fetchUserSkills(currentUser?.id)
  };
};