
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CodeBlock from './CodeBlock';

const sampleCode = `function debugLife(errors: string[]): void {
  if (errors.length === 0) {
    console.log("🚀 No errors found. Keep building, keep innovating!");
    return;
  }

  errors.forEach((error, index) => {
    console.log("Fixing issue #  \${index + 1}\: \${error}");
  });

  console.log("🔁 Refactoring mindset... Recompiling dreams... ✅");
  console.log("Success is just an optimized algorithm away! Keep coding. 💻🔥");
}

// Simulating life's challenges
const challenges = ["Imposter Syndrome", "Buggy Logic", "Lack of Motivation"];

debugLife(challenges);

`;

const HeroSection = () => {
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
    handleScroll(); // Trigger on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative pt-32 md:pt-40 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-dot-pattern bg-[length:20px_20px] opacity-5"></div>
      <div className="absolute inset-0 -z-10 bg-gradient-radial from-background to-transparent opacity-40"></div>
      
      {/* Animated floating circles */}
      <div className="absolute inset-0 -z-5 overflow-hidden">
        {/* Existing floating circles */}
        <div className="animate-float-slow absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/10 blur-xl"></div>
        <div className="animate-float-medium absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-primary/15 blur-lg"></div>
        <div className="animate-float-fast absolute bottom-1/4 right-1/4 w-16 h-16 rounded-full bg-primary/20 blur-md"></div>
        
        {/* New horizontal moving circles */}
        <div className="animate-move-right-slow animate-float-slow absolute top-1/5 left-0 w-40 h-40 rounded-full bg-primary/5 blur-2xl"></div>
        <div className="animate-move-right-medium animate-float-medium absolute top-1/3 left-0 w-24 h-24 rounded-full bg-primary/15 blur-lg"></div>
        <div className="animate-move-right-fast animate-float-fast absolute bottom-1/4 left-0 w-60 h-60 rounded-full bg-primary/10 blur-xl"></div>
        <div className="animate-move-right-slow animate-float-slow absolute bottom-1/3 left-0 w-32 h-32 rounded-full bg-primary/20 blur-md"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="animate-on-scroll appear">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Code, Compete, <span className="text-gradient">Conquer</span>
              </h1>
            </div>
            
            <div className="animate-on-scroll appear" style={{ transitionDelay: '200ms' }}>
              <p className="text-xl text-muted-foreground leading-relaxed">
                A cutting-edge coding platform designed for developers to practice, learn, 
                and compete. Master algorithms, ace interviews, and connect with a global 
                community of coders.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 animate-on-scroll appear" style={{ transitionDelay: '400ms' }}>
              <Button size="lg" asChild>
                <Link to="/dashboard">Start Coding</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/problems">Explore Challenges</Link>
              </Button>
            </div>
            
            <div className="pt-4 flex items-center gap-8 animate-on-scroll appear" style={{ transitionDelay: '600ms' }}>
              <div className="flex flex-col">
                <span className="text-3xl font-bold">500+</span>
                <span className="text-muted-foreground text-sm">Coding Challenges</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold">50K+</span>
                <span className="text-muted-foreground text-sm">Active Coders</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold">12</span>
                <span className="text-muted-foreground text-sm">Supported Languages</span>
              </div>
            </div>
          </div>
          
          <div className="animate-on-scroll appear" style={{ transitionDelay: '300ms' }}>
            <div className="transform lg:rotate-1 hover:rotate-0 transition-transform duration-500 shadow-glass-lg">
              <CodeBlock code={sampleCode} animated={false} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
