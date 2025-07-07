import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, User, Search, Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";
import GenreSelector from "@/components/GenreSelector";
import MaterialViewer from "@/components/MaterialViewer";
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
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showViewer, setShowViewer] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [userProgress, setUserProgress] = useState<Record<string, number>>({});

  // Load user progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem("learningProgress");
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }

    const savedTheme = localStorage.getItem("preferredTheme") as Theme;
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Save progress to localStorage
  const updateProgress = (courseId: string, progress: number) => {
    const newProgress = { ...userProgress, [courseId]: progress };
    setUserProgress(newProgress);
    localStorage.setItem("learningProgress", JSON.stringify(newProgress));
  };

  const getThemeColors = (theme: Theme) => {
    const colors = {
      kids: "from-pink-400 to-red-400",
      library: "from-blue-500 to-purple-600",
      academic: "from-orange-400 to-red-500",
    };
    return colors[theme];
  };

  if (showViewer && selectedCourse) {
    return (
      <MaterialViewer
        course={selectedCourse}
        onClose={() => {
          setShowViewer(false);
          setSelectedCourse(null);
        }}
        onProgressUpdate={(progress) =>
          updateProgress(selectedCourse.id, progress)
        }
        theme={currentTheme}
      />
    );
  }

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
