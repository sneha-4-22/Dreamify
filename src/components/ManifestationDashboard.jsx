import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './Card';
import { Target, CheckSquare, Image, Moon, Sun, Star, Coffee, Medal } from 'lucide-react';
import JournalSection from './JournalSection';
const ManifestationDashboard = () => {
  const [goals, setGoals] = useState([
    { id: 1, title: 'Financial Freedom', affirmation: 'I attract abundance effortlessly', progress: 65, category: 'wealth' },
    { id: 2, title: 'Dream Home', affirmation: 'I live in my perfect home', progress: 40, category: 'lifestyle' },
  ]);

  const [habits, setHabits] = useState([
    { id: 1, name: 'Morning Affirmations', completed: true, streak: 3, time: 'morning' },
    { id: 2, name: 'Gratitude Journal', completed: false, streak: 0, time: 'evening' },
    { id: 3, name: 'Visualization', completed: false, streak: 1, time: 'morning' },
  ]);
  

  
  const [visionBoardImages, setVisionBoardImages] = useState([]);
  
  const [newImageURL, setNewImageURL] = useState('');

  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', affirmation: '', category: 'personal' });

  
  const categories = ['personal', 'wealth', 'health', 'relationships', 'career', 'lifestyle'];

  const addGoal = () => {
    if (newGoal.title && newGoal.affirmation) {
      const goal = {
        id: Date.now(),
        ...newGoal,
        progress: 0
      };
      setGoals([...goals, goal]);
      setNewGoal({ title: '', affirmation: '', category: 'personal' });
      setShowNewGoalForm(false);
    }
  };

  const addHabit = () => {
    const newHabit = {
      id: Date.now(),
      name: 'New Habit',
      completed: false,
      streak: 0,
      time: 'morning'
    };
    setHabits([...habits, newHabit]);
  };
  
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'wealth': return '💰';
      case 'health': return '💪';
      case 'relationships': return '❤️';
      case 'career': return '💼';
      case 'lifestyle': return '🌟';
      default: return '✨';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
            ✨ Manifestation Dashboard ✨
          </h1>
          <p className="text-pink-600 opacity-75">Manifest your dreams into reality</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Goals Section */}
          <Card className="lg:col-span-2 border-none shadow-lg bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-pink-600" />
                    <span>Manifestation Goals</span>
                  </div>
                  <button
                    onClick={() => setShowNewGoalForm(!showNewGoalForm)}
                    className="text-sm px-3 py-1 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
                  >
                    + New Goal
                  </button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showNewGoalForm && (
                <div className="mb-4 p-4 bg-pink-50 rounded-lg space-y-3">
                  <input
                    type="text"
                    placeholder="Goal Title"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    className="w-full p-2 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-500"
                  />
                  <input
                    type="text"
                    placeholder="Affirmation"
                    value={newGoal.affirmation}
                    onChange={(e) => setNewGoal({ ...newGoal, affirmation: e.target.value })}
                    className="w-full p-2 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-500"
                  />
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                    className="w-full p-2 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={addGoal}
                    className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors"
                  >
                    Add Goal
                  </button>
                </div>
              )}
              <div className="space-y-4">
                {goals.map((goal) => (
                  <div
                    key={goal.id}
                    className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <span>{getCategoryIcon(goal.category)}</span>
                      <h3 className="font-semibold text-pink-700">{goal.title}</h3>
                    </div>
                    <p className="text-sm text-pink-500 italic mt-1">"{goal.affirmation}"</p>
                    <div className="mt-2 bg-pink-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Habits Section */}
          <Card className="border-none shadow-lg bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="h-5 w-5 text-pink-600" />
                    <span>Daily Habits</span>
                  </div>
                  <div className="flex gap-2">
                    <Sun className="h-4 w-4 text-pink-400" />
                    <Moon className="h-4 w-4 text-purple-400" />
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {habits.map((habit) => (
                  <div
                    key={habit.id}
                    className="flex items-center p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg hover:shadow-md transition-all duration-300"
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
                    <div className="flex-1">
                      <span className={habit.completed ? 'line-through text-pink-400' : 'text-pink-700'}>
                        {habit.name}
                      </span>
                      <div className="text-xs text-pink-400">
                        {habit.time === 'morning' ? <Sun className="h-3 w-3 inline" /> : <Moon className="h-3 w-3 inline" />}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Medal className="h-4 w-4 text-pink-400" />
                      <span className="text-sm text-pink-500">{habit.streak}</span>
                    </div>
                  </div>
                ))}
                <button
                  onClick={addHabit}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  + Add Habit
                </button>
              </div>
            </CardContent>
          </Card>
           {/* Journal Section */}
          <JournalSection />
         

          {/* Vision Board */}
          <Card className="border-none shadow-lg bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <Image className="h-5 w-5 text-pink-600" />
                  <span>Vision Board</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Paste Image URL"
                    value={newImageURL}
                    onChange={(e) => setNewImageURL(e.target.value)}
                    className="flex-1 p-2 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-500 bg-white/50"
                  />
                  <button
                    onClick={() => {
                      if (newImageURL.trim()) {
                        setVisionBoardImages([...visionBoardImages, { url: newImageURL, isValid: true }]);
                        setNewImageURL('');
                      }
                    }}
                    className="px-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Add
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                  {visionBoardImages.map((img, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      {img.isValid ? (
                        <img
                        src={img.url}
                        alt={`Vision ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                        onError={() => {
                          setVisionBoardImages(prevImages =>
                            prevImages.map((img, i) => (i === index ? { ...img, isValid: false } : img))
                          );
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-center p-4">
                        <Star className="h-8 w-8 text-pink-300" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Stats */}
        <Card className="lg:col-span-3 border-none shadow-lg bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <Coffee className="h-5 w-5 text-pink-600" />
                <span>Daily Progress</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl text-pink-600 font-bold">
                  {goals.filter(g => g.progress > 0).length}
                </div>
                <div className="text-sm text-pink-500">Active Goals</div>
              </div>
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl text-pink-600 font-bold">
                  {habits.filter(h => h.completed).length}/{habits.length}
                </div>
                <div className="text-sm text-pink-500">Habits Completed</div>
              </div>
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl text-pink-600 font-bold">
                  {Math.max(...habits.map(h => h.streak))}
                </div>
                <div className="text-sm text-pink-500">Longest Streak</div>
              </div>
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl text-pink-600 font-bold">
                  {/* {journalEntries.length} */}
                </div>
                <div className="text-sm text-pink-500">Journal Entries</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);
};

export default ManifestationDashboard;