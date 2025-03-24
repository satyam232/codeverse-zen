
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import CodeBlock from '@/components/CodeBlock';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Code, 
  Brain, 
  Users, 
  Trophy, 
  Zap, 
  Database, 
  Shield, 
  Activity 
} from 'lucide-react';

const problemExample = `/*
Problem: Two Sum
Difficulty: Easy

Given an array of integers nums and an integer target, 
return indices of the two numbers such that they add up 
to target.

You may assume that each input would have exactly one 
solution, and you may not use the same element twice.

Example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
*/`;

const Index = () => {
  useEffect(() => {
    const handleScroll = () => {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      
      animatedElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('appear');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial check on page load
    setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main>
        <HeroSection />
        
        {/* Features Section */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Developers</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Everything you need to code, practice, and excel in your programming journey
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard 
                icon={Code}
                title="Advanced Editor"
                description="Full-featured code editor with syntax highlighting, autocompletion, and multi-language support."
                delay={100}
              />
              <FeatureCard 
                icon={Brain}
                title="AI Assistance"
                description="Get hints, code optimizations, and learn best practices with our AI assistant."
                delay={200}
              />
              <FeatureCard 
                icon={Users}
                title="Collaboration"
                description="Work together with friends and colleagues in real-time pair programming sessions."
                delay={300}
              />
              <FeatureCard 
                icon={Trophy}
                title="Competitions"
                description="Participate in coding contests, climb the leaderboard, and win prizes."
                delay={400}
              />
              <FeatureCard 
                icon={Zap}
                title="Fast Execution"
                description="Run your code with lightning-fast execution times and see results instantly."
                delay={500}
              />
              <FeatureCard 
                icon={Database}
                title="Progress Tracking"
                description="Track your coding progress, strengths, and areas for improvement."
                delay={600}
              />
              <FeatureCard 
                icon={Shield}
                title="Interview Prep"
                description="Practice with common interview questions from top tech companies."
                delay={700}
              />
              <FeatureCard 
                icon={Activity}
                title="Performance Analysis"
                description="Analyze your code's time and space complexity with detailed metrics."
                delay={800}
              />
            </div>
          </div>
        </section>
        
        {/* Problem Demo Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 animate-on-scroll">
                <CodeBlock code={problemExample} language="javascript" />
              </div>
              
              <div className="order-1 lg:order-2 animate-on-scroll">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Master Algorithms & Data Structures</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Practice with over 500 hand-picked coding challenges, from easy warm-ups to 
                  complex algorithm problems that will test your limits. Each problem comes with 
                  detailed explanations and multiple approaches.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Arrays & Strings', 'Linked Lists', 'Trees & Graphs', 'Dynamic Programming', 'System Design'].map((item) => (
                    <li key={item} className="flex items-center">
                      <span className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Button asChild>
                  <Link to="/problems">Browse Problems</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-primary/5 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-dot-pattern bg-[length:20px_20px] opacity-5"></div>
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Level Up Your Coding Skills?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of developers who are using CodeVerse to improve their coding skills, 
                prepare for interviews, and connect with a global community.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to="/dashboard">Start Coding Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
