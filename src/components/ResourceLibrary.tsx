
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Star, Globe, FileText, Video, Gamepad2 } from 'lucide-react';
import { Resource, Theme } from '@/pages/Index';

interface ResourceLibraryProps {
  resources: Resource[];
  theme: Theme;
  onClose: () => void;
}

const ResourceLibrary = ({ resources, theme, onClose }: ResourceLibraryProps) => {
  const [selectedGenre, setSelectedGenre] = useState<Theme | 'all'>('all');

  const getThemeColors = (theme: Theme) => {
    const colors = {
      kids: 'from-pink-400 to-red-400',
      adult: 'from-blue-500 to-purple-600',
      adventure: 'from-orange-400 to-red-500',
      academic: 'from-blue-600 to-green-500'
    };
    return colors[theme];
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'website':
        return <Globe className="w-4 h-4" />;
      case 'pdf':
        return <FileText className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'interactive':
        return <Gamepad2 className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const filteredResources = selectedGenre === 'all' 
    ? resources 
    : resources.filter(resource => resource.genre === selectedGenre);

  const genres = [
    { id: 'all' as const, name: 'All Resources', icon: '🌐' },
    { id: 'kids' as const, name: 'Kids', icon: '🎨' },
    { id: 'adult' as const, name: 'Adult', icon: '💼' },
    { id: 'adventure' as const, name: 'Adventure', icon: '🌟' },
    { id: 'academic' as const, name: 'Academic', icon: '📚' }
  ];

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
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold">Free Learning Resources</h1>
                <p className="text-white/80 text-sm">
                  Curated collection of free educational materials
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Genre Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Button
                key={genre.id}
                onClick={() => setSelectedGenre(genre.id)}
                variant={selectedGenre === genre.id ? "default" : "outline"}
                className="flex items-center gap-2"
              >
                <span>{genre.icon}</span>
                {genre.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(resource.type)}
                    <Badge variant="secondary" className="text-xs">
                      {resource.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{resource.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge 
                    className={`bg-gradient-to-r ${getThemeColors(resource.genre)} text-white border-0`}
                  >
                    {resource.genre.charAt(0).toUpperCase() + resource.genre.slice(1)}
                  </Badge>
                  
                  <Button
                    onClick={() => window.open(resource.url, '_blank')}
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Site
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Educational Note */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            📚 About These Resources
          </h3>
          <p className="text-blue-800 text-sm leading-relaxed">
            These carefully curated resources provide free access to high-quality educational content. 
            Each platform offers unique learning experiences, from interactive coding environments to 
            comprehensive university courses. We regularly update this collection to ensure you have 
            access to the best free learning materials available online.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <strong>🌐 Websites:</strong> Full-featured learning platforms
            </div>
            <div>
              <strong>🎮 Interactive:</strong> Hands-on learning experiences
            </div>
            <div>
              <strong>🎥 Videos:</strong> Visual and audio learning content
            </div>
            <div>
              <strong>📄 PDFs:</strong> Downloadable study materials
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceLibrary;
