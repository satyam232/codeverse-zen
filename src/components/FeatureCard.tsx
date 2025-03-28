
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <div 
      className="group p-6 bg-card rounded-lg border border-border/50 shadow-subtle hover:shadow-glass transition-all duration-200 hover:-translate-y-1 relative hover:animate-blue-glow hover:border-primary/50 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-blue-900/10 hover:bg-[length:200%_200%] hover:animate-gradient-shift" style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="floating-circle floating-circle-1 group-hover:animate-float-slow"></div>
      <div className="floating-circle floating-circle-2 group-hover:animate-float-medium"></div>
      <div className="floating-circle floating-circle-3 group-hover:animate-float-fast"></div>
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
