
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, User, Search, Calendar } from 'lucide-react';
import Navigation from '@/components/Navigation';
import GenreSelector from '@/components/GenreSelector';
import MaterialViewer from '@/components/MaterialViewer';
import ResourceLibrary from '@/components/ResourceLibrary';
import ProgressTracker from '@/components/ProgressTracker';

export type Theme = 'kids' | 'adult' | 'adventure' | 'academic';

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
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'website' | 'pdf' | 'video' | 'interactive';
  genre: Theme;
  rating: number;
}

const Index = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('adult');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showViewer, setShowViewer] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [userProgress, setUserProgress] = useState<Record<string, any>>({});

  // Sample courses data
  const courses: Course[] = [
    {
      id: '1',
      title: 'Introduction to React',
      description: 'Learn the fundamentals of React and build interactive user interfaces',
      genre: 'academic',
      progress: 65,
      totalLessons: 12,
      completedLessons: 8,
      lastAccessed: '2024-01-15',
      estimatedTime: '4 hours',
      difficulty: 'Beginner',
      image: 'photo-1461749280684-dccba630e2f6'
    },
    {
      id: '2',
      title: 'Creative Writing Adventure',
      description: 'Embark on a journey of storytelling and creative expression',
      genre: 'adventure',
      progress: 40,
      totalLessons: 10,
      completedLessons: 4,
      lastAccessed: '2024-01-14',
      estimatedTime: '6 hours',
      difficulty: 'Intermediate',
      image: 'photo-1486312338219-ce68d2c6f44d'
    },
    {
      id: '3',
      title: 'Fun with Numbers',
      description: 'Make math exciting with games, puzzles, and interactive activities',
      genre: 'kids',
      progress: 80,
      totalLessons: 15,
      completedLessons: 12,
      lastAccessed: '2024-01-16',
      estimatedTime: '3 hours',
      difficulty: 'Beginner',
      image: 'photo-1649972904349-6e44c42644a7'
    },
    {
      id: '4',
      title: 'Professional Development',
      description: 'Advance your career with essential business and leadership skills',
      genre: 'adult',
      progress: 25,
      totalLessons: 20,
      completedLessons: 5,
      lastAccessed: '2024-01-13',
      estimatedTime: '8 hours',
      difficulty: 'Advanced',
      image: 'photo-1581091226825-a6a2a5aee158'
    }
  ];

  // Free educational resources
  const resources: Resource[] = [
    {
      id: 'r1',
      title: 'Khan Academy',
      description: 'Free online courses, lessons and practice',
      url: 'https://www.khanacademy.org',
      type: 'website',
      genre: 'academic',
      rating: 4.8
    },
    {
      id: 'r2',
      title: 'Coursera Free Courses',
      description: 'Access thousands of free courses from top universities',
      url: 'https://www.coursera.org/courses?query=free',
      type: 'website',
      genre: 'adult',
      rating: 4.7
    },
    {
      id: 'r3',
      title: 'Scratch Programming',
      description: 'Learn to code with visual programming blocks',
      url: 'https://scratch.mit.edu',
      type: 'interactive',
      genre: 'kids',
      rating: 4.9
    },
    {
      id: 'r4',
      title: 'TED-Ed',
      description: 'Educational videos and interactive lessons',
      url: 'https://ed.ted.com',
      type: 'video',
      genre: 'adventure',
      rating: 4.6
    },
    {
      id: 'r5',
      title: 'MIT OpenCourseWare',
      description: 'Free lecture notes, exams, and videos from MIT',
      url: 'https://ocw.mit.edu',
      type: 'website',
      genre: 'academic',
      rating: 4.8
    },
    {
      id: 'r6',
      title: 'Duolingo',
      description: 'Learn languages for free with game-like lessons',
      url: 'https://www.duolingo.com',
      type: 'interactive',
      genre: 'adventure',
      rating: 4.5
    }
  ];

  // Load user progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('learningProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }

    const savedTheme = localStorage.getItem('preferredTheme') as Theme;
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Save progress to localStorage
  const updateProgress = (courseId: string, progress: any) => {
    const newProgress = { ...userProgress, [courseId]: progress };
    setUserProgress(newProgress);
    localStorage.setItem('learningProgress', JSON.stringify(newProgress));
  };

  const filteredCourses = courses.filter(course => course.genre === currentTheme);

  const openCourse = (course: Course) => {
    setSelectedCourse(course);
    setShowViewer(true);
  };

  const getThemeColors = (theme: Theme) => {
    const colors = {
      kids: 'from-pink-400 to-red-400',
      adult: 'from-blue-500 to-purple-600',
      adventure: 'from-orange-400 to-red-500',
      academic: 'from-blue-600 to-green-500'
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
        onProgressUpdate={(progress) => updateProgress(selectedCourse.id, progress)}
        theme={currentTheme}
      />
    );
  }

  if (showResources) {
    return (
      <ResourceLibrary
        resources={resources}
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
            Your personalized learning journey starts here. Explore courses, track progress, and unlock your potential.
          </p>
        </div>

        {/* Genre Selector */}
        <GenreSelector 
          currentTheme={currentTheme}
          onThemeChange={(theme) => {
            setCurrentTheme(theme);
            localStorage.setItem('preferredTheme', theme);
          }}
        />

        {/* Progress Overview */}
        <ProgressTracker 
          courses={courses}
          userProgress={userProgress}
          theme={currentTheme}
        />

        {/* Course Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)} Courses
            </h2>
            <Button
              onClick={() => setShowResources(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Free Resources
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card 
                key={course.id} 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 overflow-hidden"
                onClick={() => openCourse(course)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`https://images.unsplash.com/${course.image}?w=400&h=200&fit=crop`}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${getThemeColors(course.genre)} opacity-20`} />
                  <Badge className="absolute top-4 right-4 bg-white/90 text-gray-800">
                    {course.difficulty}
                  </Badge>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {course.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    <div className="flex justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.estimatedTime}</span>
                      </div>
                    </div>

                    {course.lastAccessed && (
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>Last accessed: {new Date(course.lastAccessed).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">
              {courses.reduce((sum, course) => sum + course.completedLessons, 0)}
            </div>
            <div className="text-sm text-gray-600">Lessons Completed</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {courses.filter(course => course.progress === 100).length}
            </div>
            <div className="text-sm text-gray-600">Courses Finished</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length)}%
            </div>
            <div className="text-sm text-gray-600">Average Progress</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-orange-600">{courses.length}</div>
            <div className="text-sm text-gray-600">Active Courses</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
