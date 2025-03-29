import { useContext } from 'react';
import { SessionContext } from '../context/SessionContext';

export const useSessions = () => {
  const sessions = useContext(SessionContext);
  
  if (!sessions) {
    throw new Error('useSessions must be used within a SessionProvider');
  }
  
  return sessions;
};