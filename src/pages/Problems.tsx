import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeProvider';
import { ChevronRight, HardDriveDownload, Search, Filter } from 'lucide-react';

const ProblemCard = ({ title, difficulty, acceptance, submissions }) => (
  <div className="p-6 rounded-lg border border-border/50 bg-card hover:bg-card/80 transition-colors">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-medium text-lg">{title}</h3>
      <Badge variant={difficulty === 'Easy' ? 'secondary' : difficulty === 'Medium' ? 'outline' : 'destructive'}>
        {difficulty}
      </Badge>
    </div>
    <div className="flex justify-between text-sm text-muted-foreground">
      <span>Acceptance: {acceptance}%</span>
      <span>Submissions: {submissions}</span>
    </div>
    <Button variant="outline" size="sm" className="mt-4 w-full gap-2" asChild>
      <Link to="/editor">
        Solve Problem
        <ChevronRight className="h-4 w-4" />
      </Link>
    </Button>
  </div>
);

export default function Problems() {
  const { theme } = useTheme();

  const challenges = [
    { title: 'Two Sum', difficulty: 'Easy', acceptance: 49.2, submissions: '12.3M' },
    { title: 'Add Two Numbers', difficulty: 'Medium', acceptance: 36.7, submissions: '8.9M' },
    { title: 'Longest Substring', difficulty: 'Medium', acceptance: 32.1, submissions: '6.7M' },
    { title: 'Median of Arrays', difficulty: 'Hard', acceptance: 28.5, submissions: '4.2M' },
    { title: 'Reverse Linked List', difficulty: 'Easy', acceptance: 65.4, submissions: '9.8M' },
    { title: 'Valid Palindrome', difficulty: 'Easy', acceptance: 52.1, submissions: '7.2M' },
    { title: 'Container With Most Water', difficulty: 'Medium', acceptance: 44.3, submissions: '5.6M' },
    { title: 'Trapping Rain Water', difficulty: 'Hard', acceptance: 38.7, submissions: '3.9M' },
  ];

  const [viewType, setViewType] = useState<'grid' | 'table'>('grid');

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-editor-background' : 'bg-background'}`}>
      <div className="container mx-auto px-4 pt-24 pb-20 max-w-7xl">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Coding Challenges</h1>
          <p className="text-muted-foreground">Sharpen your skills with our curated collection of coding problems</p>
        </div>

        <div className="flex gap-8">
          <div className="w-64 space-y-4">
            <div className="flex gap-2 mb-4">
              <Button
                variant={viewType === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewType('grid')}
              >
                Grid
              </Button>
              <Button
                variant={viewType === 'table' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewType('table')}
              >
                Table
              </Button>
            </div>
            <div className="relative flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search problems..."
                  className="pl-10 pr-4 py-2 w-full rounded-full bg-background border border-border focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <Button variant="outline" size="sm" className="px-3">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Difficulty</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">All</Button>
                <Button variant="ghost" className="w-full justify-start">Easy</Button>
                <Button variant="ghost" className="w-full justify-start">Medium</Button>
                <Button variant="ghost" className="w-full justify-start">Hard</Button>
              </div>
            </div>
          </div>

          {viewType === 'grid' ? (
            <div className="flex-1 grid md:grid-cols-2 gap-6">
              {challenges.map((challenge) => (
                <ProblemCard key={challenge.title} {...challenge} />
              ))}
            </div>
          ) : (
            <div className="flex-1 overflow-x-auto rounded-lg border border-border">
              <table className="w-full">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="p-4 text-left font-medium">Problem</th>
                    <th className="p-4 text-left font-medium">Difficulty</th>
                    <th className="p-4 text-left font-medium">Acceptance</th>
                    <th className="p-4 text-left font-medium">Submissions</th>
                  </tr>
                </thead>
                <tbody>
                  {challenges.map((challenge) => (
                    <tr key={challenge.title} className="border-t border-border hover:bg-card/50">
                      <td className="p-4 font-medium">{challenge.title}</td>
                      <td className="p-4">
                        <Badge 
                          variant={challenge.difficulty === 'Easy' ? 'secondary' : challenge.difficulty === 'Medium' ? 'outline' : 'destructive'}
                        >
                          {challenge.difficulty}
                        </Badge>
                      </td>
                      <td className="p-4">{challenge.acceptance}%</td>
                      <td className="p-4">{challenge.submissions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}