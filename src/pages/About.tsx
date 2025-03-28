import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeProvider';
import { Github, Twitter, Linkedin, Trophy, Code2, Users, Rocket } from 'lucide-react';

export default function About() {
  const { theme } = useTheme();

  const team = [
    { name: 'Satyam Rana', role: 'Founder & CEO', bio: 'Full-stack architect with passion for developer tools' },
    { name: 'Tech Lead', role: 'Engineering', bio: 'Systems expert focused on performance optimization' },
    { name: 'UI Expert', role: 'Design', bio: 'Creating intuitive developer experiences' },
  ];

  const milestones = [
    { year: '2022', title: 'Platform Concept', description: 'Initial prototype development' },
    { year: '2023', title: 'Launch Beta', description: 'First 1000 developers onboarded' },
    { year: '2024', title: 'Global Reach', description: 'Supported 50+ programming languages' },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-editor-background' : 'bg-background'}`}>
      <div className="container mx-auto px-4 pt-24 pb-20 max-w-7xl">
        <div className="mb-16 text-center">
          <Badge variant="outline" className="mb-4 mx-auto">
            <Rocket className="h-4 w-4 mr-2" />
            Empowering Developers
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Driving Coding Excellence</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            At CodeVerse, we're building the ultimate platform for developers to master their craft through
            immersive coding experiences and real-world challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
            <div className="space-y-4">
              <div className="p-6 rounded-xl bg-card border border-border/50">
                <div className="flex items-center gap-4">
                  <Code2 className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-medium mb-1">Code Without Limits</h3>
                    <p className="text-muted-foreground text-sm">
                      Create, experiment, and solve problems in our feature-rich environment
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border/50">
                <div className="flex items-center gap-4">
                  <Users className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-medium mb-1">Community Driven</h3>
                    <p className="text-muted-foreground text-sm">
                      Learn from and collaborate with developers worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Key Milestones</h2>
            <div className="space-y-4">
              {milestones.map((milestone) => (
                <div key={milestone.year} className="p-6 rounded-xl bg-card border border-border/50">
                  <div className="flex items-center gap-4">
                    <Trophy className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-medium mb-1">{milestone.year} - {milestone.title}</h3>
                      <p className="text-muted-foreground text-sm">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-8">Core Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="p-6 rounded-xl bg-card border border-border/50 hover:bg-card/80 transition-colors">
                <div className="h-20 w-20 rounded-full bg-primary/10 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-1">{member.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">{member.role}</p>
                <p className="text-sm mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-4">
                  <Button variant="ghost" size="icon">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}