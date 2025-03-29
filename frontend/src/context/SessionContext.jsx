import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { sessionService } from '../services/sessions';

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [pastSessions, setPastSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      setUpcomingSessions([]);
      setPastSessions([]);
      setCurrentSession(null);
      return;
    }

    const fetchSessions = async () => {
      setLoading(true);
      try {
        const { upcoming, past } = await sessionService.getUserSessions(currentUser.id);
        setUpcomingSessions(upcoming);
        setPastSessions(past);
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();

    // Subscribe to session updates
    const unsubscribe = sessionService.subscribeToSessionUpdates(
      currentUser.id,
      (updatedSession) => {
        // Handle session updates in real-time
        if (updatedSession.startTime > new Date()) {
          setUpcomingSessions(prev => 
            prev.map(session => 
              session.id === updatedSession.id ? updatedSession : session
            )
          );
        } else {
          setPastSessions(prev => 
            prev.map(session => 
              session.id === updatedSession.id ? updatedSession : session
            )
          );
        }

        // If this is the current active session, update it
        if (currentSession && currentSession.id === updatedSession.id) {
          setCurrentSession(updatedSession);
        }
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const createSession = async (sessionData) => {
    try {
      setLoading(true);
      const newSession = await sessionService.createSession({
        ...sessionData,
        createdBy: currentUser.id
      });
      setUpcomingSessions(prev => [newSession, ...prev]);
      return newSession;
    } catch (error) {
      console.error("Failed to create session:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateSession = async (sessionId, updateData) => {
    try {
      setLoading(true);
      const updatedSession = await sessionService.updateSession(sessionId, updateData);
      
      // Update in the appropriate list
      if (updatedSession.startTime > new Date()) {
        setUpcomingSessions(prev => 
          prev.map(session => session.id === sessionId ? updatedSession : session)
        );
      } else {
        setPastSessions(prev => 
          prev.map(session => session.id === sessionId ? updatedSession : session)
        );
      }
      
      // Update current session if applicable
      if (currentSession && currentSession.id === sessionId) {
        setCurrentSession(updatedSession);
      }
      
      return updatedSession;
    } catch (error) {
      console.error("Failed to update session:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const cancelSession = async (sessionId, reason) => {
    try {
      setLoading(true);
      await sessionService.cancelSession(sessionId, reason);
      setUpcomingSessions(prev => prev.filter(session => session.id !== sessionId));
      return true;
    } catch (error) {
      console.error("Failed to cancel session:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getSessionById = async (sessionId) => {
    try {
      setLoading(true);
      const session = await sessionService.getSessionById(sessionId);
      setCurrentSession(session);
      return session;
    } catch (error) {
      console.error("Failed to get session details:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addSessionNote = async (sessionId, note) => {
    try {
      const updatedSession = await sessionService.addSessionNote(sessionId, note);
      
      // Update current session if applicable
      if (currentSession && currentSession.id === sessionId) {
        setCurrentSession(updatedSession);
      }
      
      return updatedSession;
    } catch (error) {
      console.error("Failed to add session note:", error);
      throw error;
    }
  };

  const value = {
    upcomingSessions,
    pastSessions,
    loading,
    currentSession,
    createSession,
    updateSession,
    cancelSession,
    getSessionById,
    addSessionNote
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};