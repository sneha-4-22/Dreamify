import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './Card';
import { Target, CheckSquare, Image, BookOpen } from 'lucide-react';

const ManifestationDashboard = () => {
  const [goals, setGoals] = useState([
    { id: 1, title: 'Financial Freedom', affirmation: 'I attract abundance effortlessly', progress: 65 },
    { id: 2, title: 'Dream Home', affirmation: 'I live in my perfect home', progress: 40 },
  ]);

  const [habits, setHabits] = useState([
    { id: 1, name: 'Morning Affirmations', completed: true },
    { id: 2, name: 'Gratitude Journal', completed: false },
    { id: 3, name: 'Visualization', completed: false },
  ]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Manifestation Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Goals Section */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Manifestation Goals
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {goals.map(goal => (
                <div 
                  key={goal.id}
                  className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <h3 className="font-semibold">{goal.title}</h3>
                  <p className="text-sm text-slate-600 italic">"{goal.affirmation}"</p>
                  <div className="mt-2 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Habits Section */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5" />
                Daily Habits
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {habits.map(habit => (
                <div 
                  key={habit.id}
                  className="flex items-center p-3 bg-slate-50 rounded-lg"
                >
                  <input
                    type="checkbox"
                    checked={habit.completed}
                    onChange={() => {
                      setHabits(habits.map(h => 
                        h.id === habit.id ? {...h, completed: !h.completed} : h
                      ));
                    }}
                    className="h-4 w-4 mr-3"
                  />
                  <span className={habit.completed ? 'line-through text-slate-500' : ''}>
                    {habit.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vision Board */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Vision Board
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div 
                  key={item}
                  className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center"
                >
                  <div className="w-full h-full bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Journal Entry */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Manifestation Journal
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full h-32 p-3 rounded-lg border border-slate-200 resize-none"
              placeholder="Write your manifestation journal entry here..."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManifestationDashboard;