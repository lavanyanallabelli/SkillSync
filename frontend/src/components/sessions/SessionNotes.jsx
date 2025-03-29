// components/sessions/SessionNotes.jsx
import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Input from '../common/Input';

const SessionNotes = ({ sessionId, initialNotes = '', onSave }) => {
  const [notes, setNotes] = useState(initialNotes);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(sessionId, notes);
      setLastSaved(new Date());
    } catch (error) {
      console.error('Failed to save notes:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Auto-save notes every 30 seconds if changes are made
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (notes !== initialNotes) {
        handleSave();
      }
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [notes, initialNotes]);

  return (
    <Card className="session-notes">
      <div className="notes-header">
        <h3>Session Notes</h3>
        {lastSaved && (
          <span className="last-saved">
            Last saved: {lastSaved.toLocaleTimeString()}
          </span>
        )}
      </div>
      
      <div className="notes-content">
        <Input
          type="textarea"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add your session notes here..."
          rows={10}
        />
      </div>
      
      <div className="notes-actions">
        <Button 
          variant="primary" 
          onClick={handleSave}
          isLoading={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Notes'}
        </Button>
      </div>
    </Card>
  );
};

export default SessionNotes;