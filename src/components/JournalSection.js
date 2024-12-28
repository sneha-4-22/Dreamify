import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './Card';
import { BookOpen, Sparkles, Loader2 } from 'lucide-react';

const JournalSection = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [newJournalEntry, setNewJournalEntry] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [error, setError] = useState('');
  const [mood, setMood] = useState('✨');

  const moods = ['✨', '🌟', '💫', '🦋', '🌈', '💖', '🙏', '💭'];

  const generateAIInsights = async () => {
    if (!newJournalEntry.trim()) {
      setError('Please write something in your journal first.');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/generate_journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          journal_entry: newJournalEntry 
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate insights');
      }

      setAiSuggestion(data.suggestions);
    } catch (err) {
      setError('Failed to generate insights. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const saveJournalEntry = () => {
    if (newJournalEntry.trim()) {
      const entry = {
        id: Date.now(),
        content: newJournalEntry,
        aiInsights: aiSuggestion,
        mood,
        date: new Date().toISOString(),
      };
      setJournalEntries([entry, ...journalEntries]);
      setNewJournalEntry('');
      setAiSuggestion('');
    }
  };

  return (
    <Card className="lg:col-span-2 border-none shadow-lg bg-white/80 backdrop-blur">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-pink-600" />
              <span>AI-Enhanced Journal</span>
            </div>
            <div className="flex gap-2">
              {moods.map((m) => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={`text-xl hover:scale-110 transition-transform ${
                    mood === m ? 'scale-110' : ''
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <textarea
              className="w-full p-3 h-20 rounded-lg border border-pink-200 resize-none focus:ring-2 focus:ring-pink-500 bg-white/50"
              placeholder="Write your manifestation journal entry here..."
              value={newJournalEntry}
              onChange={(e) => setNewJournalEntry(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                onClick={generateAIInsights}
                disabled={isGenerating}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isGenerating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                Get AI Insights
              </button>
              <button
                onClick={saveJournalEntry}
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Save Entry
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          {aiSuggestion && (
            <div className="p-4 bg-purple-50 rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-purple-600">
                <Sparkles className="h-4 w-4" />
                <span className="font-medium">AI Insights:</span>
              </div>
              <p className="text-purple-700 whitespace-pre-line">{aiSuggestion}</p>
            </div>
          )}

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {journalEntries.map((entry) => (
              <div
                key={entry.id}
                className="p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg space-y-3"
              >
                <div className="flex justify-between items-start">
                  <span className="text-2xl">{entry.mood}</span>
                  <span className="text-xs text-pink-400">
                    {new Date(entry.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-pink-700">{entry.content}</p>
                {entry.aiInsights && (
                  <div className="mt-2 p-2 bg-purple-50 rounded border border-purple-100">
                    <div className="flex items-center gap-1 text-purple-600 text-sm">
                      <Sparkles className="h-3 w-3" />
                      <span>AI Insights:</span>
                    </div>
                    <p className="text-sm text-purple-700 whitespace-pre-line">{entry.aiInsights}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JournalSection;