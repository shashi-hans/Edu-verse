
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookOpen, User, Search, Menu, X } from 'lucide-react';
import { Theme } from '@/pages/Index';

interface NavigationProps {
  currentTheme: Theme;
  onShowResources: () => void;
}

const Navigation = ({ currentTheme, onShowResources }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getThemeColor = (theme: Theme) => {
    const colors = {
      kids: 'bg-pink-500',
      library: 'bg-blue-600',
      academic: 'bg-orange-500',
    };
    return colors[theme];
  };

  return (
    <nav className={`${getThemeColor(currentTheme)} text-white shadow-lg sticky top-0 z-50`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src='../public/open-book.jpg' className="w-12 h-8" />
            <span className="text-xl font-bold">EduVerse</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden text-white hover:bg-white/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-2">
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/20 justify-start"
                onClick={() => {
                  onShowResources();
                  setIsMenuOpen(false);
                }}
              >
                <Search className="w-4 h-4 mr-2" />
                Resources
              </Button>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/20 justify-start"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
