
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, BookOpen, CheckCircle, Circle, Clock } from 'lucide-react';
import { Course, Theme } from '@/pages/Index';

interface MaterialViewerProps {
  course: Course;
  onClose: () => void;
  onProgressUpdate: (progress: any) => void;
  theme: Theme;
}

interface Lesson {
  id: string;
  title: string;
  content: string;
  duration: string;
  completed: boolean;
}

const MaterialViewer = ({ course, onClose, onProgressUpdate, theme }: MaterialViewerProps) => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [readingPosition, setReadingPosition] = useState(0);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  // Sample lesson content
  useEffect(() => {
    const sampleLessons: Lesson[] = [
      {
        id: '1',
        title: 'Introduction to the Subject',
        content: `Welcome to this comprehensive course! In this first lesson, we'll explore the fundamentals and set the foundation for your learning journey.

Learning is a continuous process that requires dedication, curiosity, and practice. Throughout this course, you'll discover new concepts, engage with interactive materials, and build practical skills.

Key Points to Remember:
• Stay curious and ask questions
• Practice regularly to reinforce learning
• Connect new concepts to your existing knowledge
• Don't hesitate to revisit previous lessons

As we progress through the course, each lesson will build upon the previous one, creating a solid understanding of the subject matter. Take your time with each section and make sure you're comfortable before moving forward.

Remember, this platform automatically saves your reading position, so you can always pick up where you left off. Your progress is tracked, and you can see how far you've come at any time.

Let's begin this exciting learning adventure together!`,
        duration: '15 min',
        completed: false
      },
      {
        id: '2',
        title: 'Core Concepts',
        content: `Now that we've established the foundation, let's dive into the core concepts that will be essential throughout your learning journey.

Understanding these fundamental principles is crucial for building more advanced knowledge later. Each concept we discuss here will be referenced and expanded upon in subsequent lessons.

Core Concept 1: Foundation Building
Every expert was once a beginner. The key to mastery is building a strong foundation. Take time to understand each concept thoroughly before moving on.

Core Concept 2: Active Learning
Passive reading isn't enough. Engage with the material by:
• Taking notes in your own words
• Asking yourself questions about the content
• Relating new information to what you already know
• Practicing with examples

Core Concept 3: Spaced Repetition
Research shows that reviewing material at increasing intervals helps cement knowledge in long-term memory. This platform helps you track what you've learned and when to review.

Core Concept 4: Application
Knowledge becomes wisdom when applied. Look for opportunities to use what you're learning in real-world scenarios.

As you progress through this lesson, notice how these concepts interconnect and support each other. This holistic understanding will serve you well throughout the course.`,
        duration: '20 min',
        completed: false
      },
      {
        id: '3',
        title: 'Practical Applications',
        content: `In this lesson, we'll explore how to apply the concepts you've learned in real-world scenarios. Theory is important, but application is where true learning happens.

Real-World Scenarios:
Let's examine several case studies that demonstrate how these principles work in practice. Each scenario will help you understand the practical implications of what you've learned.

Scenario 1: Problem-Solving Approach
When faced with a challenge, follow this systematic approach:
1. Define the problem clearly
2. Gather relevant information
3. Generate multiple solutions
4. Evaluate each option
5. Implement the best solution
6. Monitor and adjust as needed

Scenario 2: Decision Making
Effective decision making involves:
• Considering multiple perspectives
• Weighing pros and cons
• Understanding potential consequences
• Making timely decisions with available information

Practice Exercise:
Think of a current challenge you're facing and apply the problem-solving approach. Write down each step and your thoughts. This exercise will help you internalize the process.

Interactive Elements:
Throughout this course, you'll encounter various interactive elements designed to reinforce your learning. Engage with each one to maximize your understanding.

Remember, the goal isn't just to complete the course, but to develop skills and knowledge you can use long after you've finished.`,
        duration: '25 min',
        completed: false
      }
    ];

    setLessons(sampleLessons);
  }, []);

  // Load saved reading position
  useEffect(() => {
    const saved = localStorage.getItem(`course_${course.id}_lesson_${currentLesson}`);
    if (saved) {
      setReadingPosition(parseInt(saved));
    } else {
      setReadingPosition(0);
    }
  }, [course.id, currentLesson]);

  // Save reading position
  const saveReadingPosition = (position: number) => {
    setReadingPosition(position);
    localStorage.setItem(`course_${course.id}_lesson_${currentLesson}`, position.toString());
  };

  const completeLesson = () => {
    const updatedLessons = [...lessons];
    updatedLessons[currentLesson].completed = true;
    setLessons(updatedLessons);
    
    const completedCount = updatedLessons.filter(l => l.completed).length;
    const progress = (completedCount / updatedLessons.length) * 100;
    
    onProgressUpdate({
      progress,
      completedLessons: completedCount,
      lastAccessed: new Date().toISOString(),
      bookmark: currentLesson
    });

    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const getThemeColors = (theme: Theme) => {
    const colors = {
      kids: 'from-pink-400 to-red-400',
      free: 'from-blue-500 to-purple-600',
      adventure: 'from-orange-400 to-red-500',
      academic: 'from-blue-600 to-green-500'
    };
    return colors[theme];
  };

  if (lessons.length === 0) {
    return <div>Loading...</div>;
  }

  const currentLessonData = lessons[currentLesson];
  const progressPercentage = ((currentLesson + 1) / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getThemeColors(theme)} text-white p-4 shadow-lg`}>
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Courses
              </Button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold">{course.title}</h1>
                <p className="text-white/80 text-sm">
                  Lesson {currentLesson + 1} of {lessons.length}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/80">Course Progress</div>
              <div className="text-lg font-semibold">{Math.round(progressPercentage)}%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Lesson Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Course Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lessons.map((lesson, index) => (
                    <Button
                      key={lesson.id}
                      variant={index === currentLesson ? "default" : "ghost"}
                      className="w-full justify-start text-left h-auto p-3"
                      onClick={() => setCurrentLesson(index)}
                    >
                      <div className="flex items-center gap-2 w-full">
                        {lesson.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">
                            {lesson.title}
                          </div>
                          <div className="text-xs opacity-60 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {lesson.duration}
                          </div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
                <div className="mt-4">
                  <div className="text-sm text-gray-600 mb-2">Overall Progress</div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lesson Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{currentLessonData.title}</span>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {currentLessonData.duration}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                    {currentLessonData.content}
                  </div>
                </div>

                <div className="mt-8 flex justify-between items-center">
                  <Button
                    variant="outline"
                    disabled={currentLesson === 0}
                    onClick={() => setCurrentLesson(currentLesson - 1)}
                  >
                    Previous Lesson
                  </Button>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => saveReadingPosition(100)}
                      variant="outline"
                    >
                      Save Progress
                    </Button>
                    
                    {!currentLessonData.completed && (
                      <Button onClick={completeLesson}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Complete Lesson
                      </Button>
                    )}

                    {currentLesson < lessons.length - 1 && (
                      <Button
                        onClick={() => setCurrentLesson(currentLesson + 1)}
                      >
                        Next Lesson
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialViewer;
