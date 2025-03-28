
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Bell, 
  Clock, 
  BookOpen, 
  Star, 
  ArrowRight,
  Trophy
} from 'lucide-react';

interface ProblemCardProps {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  completionRate: number;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ title, difficulty, category, completionRate }) => {
  const difficultyColor = 
    difficulty === 'Easy' ? 'text-green-500 bg-green-500/10' :
    difficulty === 'Medium' ? 'text-yellow-500 bg-yellow-500/10' :
    'text-red-500 bg-red-500/10';
  
  return (
    <div className="bg-card border border-border/50 rounded-lg p-4 hover:shadow-subtle transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium hover:text-primary transition-colors">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${difficultyColor}`}>
          {difficulty}
        </span>
      </div>
      <div className="text-sm text-muted-foreground mb-3">{category}</div>
      <div className="flex justify-between items-center">
        <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full" 
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
        <span className="ml-3 text-xs text-muted-foreground">{completionRate}%</span>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const recentProblems = [
    { title: 'Two Sum', difficulty: 'Easy' as const, category: 'Arrays & Hashing', completionRate: 70 },
    { title: 'Valid Parentheses', difficulty: 'Easy' as const, category: 'Stack', completionRate: 60 },
    { title: 'Merge Intervals', difficulty: 'Medium' as const, category: 'Arrays & Sorting', completionRate: 40 },
    { title: 'LRU Cache', difficulty: 'Medium' as const, category: 'Hash Table & Design', completionRate: 30 },
  ];

  const competitions = [
    { title: 'Weekly Contest 347', time: 'Starts in 2 days' },
    { title: 'Biweekly Contest 112', time: 'Starts in 4 days' },
    { title: 'CodeWays Championship', time: 'Registration open' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex-1 lg:ml-64 pt-32">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, John Doe</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search problems..."
                  className="pl-10 pr-4 py-2 rounded-full bg-secondary border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/50 w-48 md:w-64"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </div>
              
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full flex items-center justify-center text-xs text-white">3</span>
              </Button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border/50 rounded-lg p-6 flex items-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Problems Solved</p>
                <h3 className="text-2xl font-bold">128</h3>
              </div>
            </div>
            
            <div className="bg-card border border-border/50 rounded-lg p-6 flex items-center">
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center mr-4">
                <Clock className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Coding Streak</p>
                <h3 className="text-2xl font-bold">15 days</h3>
              </div>
            </div>
            
            <div className="bg-card border border-border/50 rounded-lg p-6 flex items-center">
              <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center mr-4">
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Rating</p>
                <h3 className="text-2xl font-bold">1,842</h3>
              </div>
            </div>
            
            <div className="bg-card border border-border/50 rounded-lg p-6 flex items-center">
              <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center mr-4">
                <Trophy className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Global Rank</p>
                <h3 className="text-2xl font-bold">#4,281</h3>
              </div>
            </div>
          </div>
          
          {/* Continue Coding & Recent Problems */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-card border border-border/50 rounded-lg overflow-hidden mb-6">
                <div className="p-6 pb-0">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Continue Coding</h2>
                    <Button variant="ghost" size="sm" className="text-primary" asChild>
                      <a href="/editor">Open Editor <ArrowRight className="ml-1 h-4 w-4" /></a>
                    </Button>
                  </div>
                  <p className="text-muted-foreground mb-6">You're working on a medium level problem:</p>
                </div>
                
                <div className="bg-primary/5 border-y border-border/50 p-6">
                  <h3 className="font-semibold mb-2">Longest Substring Without Repeating Characters</h3>
                  <p className="text-muted-foreground mb-4">
                    Given a string s, find the length of the longest substring without repeating characters.
                  </p>
                  <div className="flex gap-2 mb-2">
                    <span className="text-xs px-2 py-1 rounded-full text-yellow-500 bg-yellow-500/10">
                      Medium
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full text-muted-foreground bg-muted">
                      String
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full text-muted-foreground bg-muted">
                      Sliding Window
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Last worked on: 2 hours ago
                  </div>
                </div>
                
                <div className="p-6">
                  <Button asChild>
                    <a href="/editor">Continue Coding</a>
                  </Button>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Recent Problems</h2>
                  <Button variant="ghost" size="sm" className="text-primary" asChild>
                    <a href="/problems">View All</a>
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recentProblems.map((problem, index) => (
                    <ProblemCard key={index} {...problem} />
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-card border border-border/50 rounded-lg overflow-hidden mb-6">
                <div className="p-6 border-b border-border/50 flex justify-between items-center">
                  <h2 className="font-semibold">Recommended For You</h2>
                  <Button variant="ghost" size="sm" className="text-primary">
                    Refresh
                  </Button>
                </div>
                
                <div className="divide-y divide-border/50">
                  {['String to Integer (atoi)', 'Rotate Image', 'Minimum Path Sum'].map((problem, index) => (
                    <div key={index} className="p-4 hover:bg-secondary/30 transition-colors">
                      <div className="flex justify-between items-center">
                        <span>{problem}</span>
                        <Button variant="ghost" size="sm" className="text-primary" asChild>
                          <a href="/editor">Solve</a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-card border border-border/50 rounded-lg overflow-hidden">
                <div className="p-6 border-b border-border/50">
                  <h2 className="font-semibold">Upcoming Competitions</h2>
                </div>
                
                <div className="divide-y divide-border/50">
                  {competitions.map((competition, index) => (
                    <div key={index} className="p-4">
                      <h3 className="font-medium mb-1">{competition.title}</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{competition.time}</span>
                        <Button variant="outline" size="sm">Register</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
