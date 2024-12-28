import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './Card';
import { Target, CheckSquare, Image, BookOpen } from 'lucide-react';

const ManifestationDashboard = () => {
  const [goals, setGoals] = useState([
    { id: 1, title: 'Financial Freedom', affirmation: 'I attract abundance effortlessly', progress: 65 },
    { id: 2, title: 'Dream Home', affirmation: 'I live in my perfect home', progress: 40 },
  ]);

  const [habits, setHabits] = useState([
    { id: 1, name: 'Morning Affirmations', completed: true, streak: 3 },
    { id: 2, name: 'Gratitude Journal', completed: false, streak: 0 },
    { id: 3, name: 'Visualization', completed: false, streak: 1 },
  ]);

  const [journalEntry, setJournalEntry] = useState('');
  const [visionBoardImages, setVisionBoardImages] = useState([]);
  const [newImageURL, setNewImageURL] = useState('');

  const addGoal = () => {
    const newGoal = { id: Date.now(), title: 'New Goal', affirmation: '', progress: 0 };
    setGoals([...goals, newGoal]);
  };

  const addHabit = () => {
    const newHabit = { id: Date.now(), name: 'New Habit', completed: false, streak: 0 };
    setHabits([...habits, newHabit]);
  };

  const addImageToVisionBoard = () => {
    if (newImageURL.trim()) {
      const imageObj = { url: newImageURL.trim(), isValid: true };
      setVisionBoardImages([...visionBoardImages, imageObj]);
      setNewImageURL('');
    }
  };

  const handleImageError = (index) => {
    setVisionBoardImages((prevImages) =>
      prevImages.map((img, i) => (i === index ? { ...img, isValid: false } : img))
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-pink-600">Manifestation Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Goals Section */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-pink-600" />
                Manifestation Goals
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  className="p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors shadow-sm"
                >
                  <h3 className="font-semibold text-pink-700">{goal.title}</h3>
                  <p className="text-sm text-pink-500 italic">"{goal.affirmation}"</p>
                  <div className="mt-2 bg-pink-200 rounded-full h-2">
                    <div
                      className="bg-pink-500 h-2 rounded-full transition-all"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={addGoal}
                className="mt-4 w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600"
              >
                + Add Goal
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Daily Habits Section */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-pink-600" />
                Daily Habits
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {habits.map((habit) => (
                <div
                  key={habit.id}
                  className="flex items-center p-3 bg-pink-50 rounded-lg shadow-sm"
                >
                  <input
                    type="checkbox"
                    checked={habit.completed}
                    onChange={() => {
                      setHabits(
                        habits.map((h) =>
                          h.id === habit.id
                            ? { ...h, completed: !h.completed, streak: h.completed ? h.streak : h.streak + 1 }
                            : h
                        )
                      );
                    }}
                    className="h-4 w-4 mr-3 accent-pink-600"
                  />
                  <span
                    className={
                      habit.completed
                        ? 'line-through text-pink-400'
                        : 'text-pink-700'
                    }
                  >
                    {habit.name}
                  </span>
                  <span className="ml-auto text-sm text-pink-500">Streak: {habit.streak}</span>
                </div>
              ))}
              <button
                onClick={addHabit}
                className="mt-4 w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600"
              >
                + Add Habit
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Vision Board */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <Image className="h-5 w-5 text-pink-600" />
                Vision Board
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Paste Pinterest Image URL"
                  value={newImageURL}
                  onChange={(e) => setNewImageURL(e.target.value)}
                  className="flex-grow p-2 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-500"
                />
                <button
                  onClick={addImageToVisionBoard}
                  className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600"
                >
                  Add
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {visionBoardImages.map((img, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-pink-100 rounded-lg flex items-center justify-center shadow-sm hover:shadow-lg"
                  >
                    {img.isValid ? (
                      <img
                        src={img.url}
                        alt={`Vision ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                        onError={() => handleImageError(index)}
                      />
                    ) : (
                      <div className="text-center text-pink-500">Image Not Found</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Journal Entry */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-pink-600" />
                Manifestation Journal
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full h-32 p-3 rounded-lg border border-pink-200 resize-none focus:ring-2 focus:ring-pink-500"
              placeholder="Write your manifestation journal entry here..."
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManifestationDashboard;
