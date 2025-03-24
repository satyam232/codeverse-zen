
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Code, 
  Home, 
  FileText, 
  Users, 
  Trophy, 
  User, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const links = [
    { name: 'Home', path: '/dashboard', icon: Home },
    { name: 'Editor', path: '/editor', icon: Code },
    { name: 'Problems', path: '/problems', icon: FileText },
    { name: 'Submissions', path: '/submissions', icon: FileText },
    { name: 'Leaderboard', path: '/leaderboard', icon: Trophy },
    { name: 'Community', path: '/community', icon: Users },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      <div className={`fixed left-0 top-0 bottom-0 z-40 w-64 bg-sidebar transform transition-transform duration-300 ease-in-out border-r border-sidebar-border ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
            <Link to="/" className="flex items-center gap-2">
              <Code className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">CodeVerse</span>
            </Link>
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                const Icon = link.icon;
                
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`sidebar-link ${isActive ? 'active' : ''}`}
                      onClick={isMobile ? toggleSidebar : undefined}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          
          <div className="p-4 border-t border-sidebar-border">
            <Button variant="secondary" className="w-full">
              <User className="h-4 w-4 mr-2" />
              <span>John Doe</span>
            </Button>
          </div>
        </div>
      </div>
      
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {isMobile && (
        <Button 
          variant="outline" 
          size="icon" 
          className="fixed bottom-6 right-6 z-20 rounded-full shadow-lg lg:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
    </>
  );
};

export default Sidebar;
