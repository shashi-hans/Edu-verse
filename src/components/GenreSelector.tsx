
import { Button } from '@/components/ui/button';
import { Theme } from '@/pages/Index';

interface GenreSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const GenreSelector = ({ currentTheme, onThemeChange }: GenreSelectorProps) => {
  const themes = [
    {
      id: 'kids' as Theme,
      name: 'Kids',
      description: 'Fun and interactive learning',
      color: 'from-pink-400 to-red-400',
      icon: '🎨'
    },
        {
      id: 'academic' as Theme,
      name: 'Academic',
      description: 'Structured learning',
      color: 'from-orange-400 to-red-500',
      icon: '📖'
    },
    {
      id: 'library' as Theme,
      name: 'Library',
      description: 'Dive in Ocean of Knowledge',
      color: 'from-blue-500 to-purple-600',
      icon: '📚'
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Choose Your Learning Style
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {themes.map((theme) => (
          <Button
            key={theme.id}
            onClick={() => onThemeChange(theme.id)}
            variant={currentTheme === theme.id ? "default" : "outline"}
            className={`h-auto p-4 flex flex-col items-center space-y-2 transition-all duration-300 ${
              currentTheme === theme.id 
                ? `bg-gradient-to-br ${theme.color} text-white border-0 shadow-lg scale-105` 
                : 'hover:scale-105 hover:shadow-md'
            }`}
          >
            <span className="text-2xl">{theme.icon}</span>
            <div className="text-center word-normal">
              <div className="font-semibold">{theme.name}</div>
              <div className="text-xs opacity-80">{theme.description}</div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GenreSelector;
