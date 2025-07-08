import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Navigation from "@/components/Navigation";
import GenreSelector from "@/components/GenreSelector";
import ResourceLibrary from "@/components/ResourceLibrary";
import ProgressTracker from "@/components/ProgressTracker";
import BookResources from "@/components/BookResources";

export type Theme = "kids" | "library" | "academic";

export interface Course {
  id: string;
  title: string;
  description: string;
  genre: Theme;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  lastAccessed?: string;
  bookmark?: number;
  estimatedTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  image: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "website" | "pdf" | "video" | "interactive" | "free books";
  genre: Theme;
  rating: number;
}

const Index = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>("kids");
  const [showResources, setShowResources] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("preferredTheme") as Theme;
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const getThemeColors = (theme: Theme) => {
    const colors = {
      kids: "from-pink-400 to-red-400",
      library: "from-blue-500 to-purple-600",
      academic: "from-orange-400 to-red-500",
    };
    return colors[theme];
  };

  if (showResources) {
    return (
      <ResourceLibrary
        resources={BookResources}
        theme={currentTheme}
        onClose={() => setShowResources(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation
        currentTheme={currentTheme}
        onShowResources={() => setShowResources(true)}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            EduVerse
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your learning journey starts here.
          </p>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore courses, books and unlock your potential.
          </p>
        </div>

        {/* Genre Selector */}
        <GenreSelector
          currentTheme={currentTheme}
          onThemeChange={(theme) => {
            setCurrentTheme(theme);
            localStorage.setItem("preferredTheme", theme);
          }}
        />
        <div className="flex justify-center align-items-center">
          <Button
            onClick={() => setShowResources(true)}
            variant="ghost"
            className={`bg-gradient-to-r ${getThemeColors(
              currentTheme
            )} text-white p-4 shadow-lg font-bold mb-8`}
          >
            <Search className="w-4 h-4" />
            Explore New Resources
          </Button>
        </div>

        {/* Progress Overview */}
        <ProgressTracker />
      </div>
    </div>
  );
};

export default Index;
