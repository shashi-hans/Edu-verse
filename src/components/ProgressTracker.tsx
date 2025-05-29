
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, BookOpen, Clock, Trophy } from 'lucide-react';
import { Course, Theme } from '@/pages/Index';

interface ProgressTrackerProps {
  courses: Course[];
  userProgress: Record<string, any>;
  theme: Theme;
}

const ProgressTracker = ({ courses, userProgress, theme }: ProgressTrackerProps) => {
  const totalLessons = courses.reduce((sum, course) => sum + course.totalLessons, 0);
  const completedLessons = courses.reduce((sum, course) => sum + course.completedLessons, 0);
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  const completedCourses = courses.filter(course => course.progress === 100).length;

  const getThemeColors = (theme: Theme) => {
    const colors = {
      kids: 'from-pink-400 to-red-400',
      adult: 'from-blue-500 to-purple-600',
      adventure: 'from-orange-400 to-red-500',
      academic: 'from-blue-600 to-green-500'
    };
    return colors[theme];
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Learning Progress</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${getThemeColors(theme)} opacity-10`} />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 mb-2">
              {Math.round(overallProgress)}%
            </div>
            <Progress value={overallProgress} className="h-2" />
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${getThemeColors(theme)} opacity-10`} />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Lessons Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {completedLessons}
            </div>
            <p className="text-sm text-gray-600">of {totalLessons} total</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${getThemeColors(theme)} opacity-10`} />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Courses Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {completedCourses}
            </div>
            <p className="text-sm text-gray-600">of {courses.length} enrolled</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${getThemeColors(theme)} opacity-10`} />
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Active Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {courses.filter(course => course.progress > 0 && course.progress < 100).length}
            </div>
            <p className="text-sm text-gray-600">in progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {courses
              .filter(course => course.lastAccessed)
              .sort((a, b) => new Date(b.lastAccessed!).getTime() - new Date(a.lastAccessed!).getTime())
              .slice(0, 3)
              .map(course => (
                <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getThemeColors(course.genre)} flex items-center justify-center text-white font-bold text-sm`}>
                      {course.title.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{course.title}</div>
                      <div className="text-sm text-gray-600">
                        Last accessed: {new Date(course.lastAccessed!).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{course.progress}%</div>
                    <Progress value={course.progress} className="w-20 h-2" />
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracker;
