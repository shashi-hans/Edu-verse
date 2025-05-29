
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Star, Globe, FileText, Video, Gamepad2, BookOpen } from 'lucide-react';
import { Resource, Theme } from '@/pages/Index';

interface ResourceLibraryProps {
  resources: Resource[];
  theme: Theme;
  onClose: () => void;
}

const ResourceLibrary = ({ resources, theme, onClose }: ResourceLibraryProps) => {
  const [selectedGenre, setSelectedGenre] = useState<Theme | 'all' | 'books'>('all');

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
      case 'books':
        return <BookOpen className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  // Free book websites
  const bookResources = [
    {
      id: 'book1',
      title: 'Project Gutenberg',
      description: 'Over 70,000 free eBooks including classics and public domain works',
      url: 'https://www.gutenberg.org',
      type: 'books' as const,
      genre: 'academic' as Theme,
      rating: 4.9
    },
    {
      id: 'book2',
      title: 'Open Library',
      description: 'Internet Archive\'s open library with millions of free books',
      url: 'https://openlibrary.org',
      type: 'books' as const,
      genre: 'academic' as Theme,
      rating: 4.8
    },
    {
      id: 'book3',
      title: 'ManyBooks',
      description: 'Free eBooks in multiple formats with great categorization',
      url: 'https://manybooks.net',
      type: 'books' as const,
      genre: 'adventure' as Theme,
      rating: 4.7
    },
    {
      id: 'book4',
      title: 'Free-eBooks.net',
      description: 'Large collection of free eBooks across all genres',
      url: 'https://www.free-ebooks.net',
      type: 'books' as const,
      genre: 'adult' as Theme,
      rating: 4.6
    },
    {
      id: 'book5',
      title: 'Feedbooks',
      description: 'Public domain books and original works by new authors',
      url: 'https://www.feedbooks.com/publicdomain',
      type: 'books' as const,
      genre: 'adventure' as Theme,
      rating: 4.5
    },
    {
      id: 'book6',
      title: 'BookBoon',
      description: 'Free textbooks for students - business, engineering, IT',
      url: 'https://bookboon.com',
      type: 'books' as const,
      genre: 'academic' as Theme,
      rating: 4.7
    },
    {
      id: 'book7',
      title: 'Internet Archive Books',
      description: 'Massive digital library with books, movies, music, and more',
      url: 'https://archive.org/details/books',
      type: 'books' as const,
      genre: 'academic' as Theme,
      rating: 4.8
    },
    {
      id: 'book8',
      title: 'Smashwords',
      description: 'Independent authors and publishers - many free books',
      url: 'https://www.smashwords.com/books/category/1/newest/0/free/any',
      type: 'books' as const,
      genre: 'adventure' as Theme,
      rating: 4.4
    },
    {
      id: 'book9',
      title: 'Google Books',
      description: 'Many free books and previews from Google\'s vast collection',
      url: 'https://books.google.com',
      type: 'books' as const,
      genre: 'academic' as Theme,
      rating: 4.6
    },
    {
      id: 'book10',
      title: 'Loyal Books',
      description: 'Free audiobooks and eBooks of classic literature',
      url: 'https://loyalbooks.com',
      type: 'books' as const,
      genre: 'adventure' as Theme,
      rating: 4.5
    },
    {
      id: 'book11',
      title: 'Planet eBook',
      description: 'Classic literature with beautiful PDF formatting',
      url: 'https://www.planetebook.com',
      type: 'books' as const,
      genre: 'academic' as Theme,
      rating: 4.7
    },
    {
      id: 'book12',
      title: 'Standard Ebooks',
      description: 'High-quality, carefully formatted public domain books',
      url: 'https://standardebooks.org',
      type: 'books' as const,
      genre: 'academic' as Theme,
      rating: 4.8
    },
    {
      id: 'book13',
      title: 'Children\'s Books Online',
      description: 'Free illustrated children\'s books and stories',
      url: 'https://www.childrensbooksonline.org',
      type: 'books' as const,
      genre: 'kids' as Theme,
      rating: 4.6
    },
    {
      id: 'book14',
      title: 'International Children\'s Digital Library',
      description: 'Children\'s books from around the world in multiple languages',
      url: 'http://en.childrenslibrary.org',
      type: 'books' as const,
      genre: 'kids' as Theme,
      rating: 4.7
    },
    {
      id: 'book15',
      title: 'MIT Press Direct',
      description: 'Free academic books and journals from MIT Press',
      url: 'https://direct.mit.edu',
      type: 'books' as const,
      genre: 'academic' as Theme,
      rating: 4.8
    },
    {
      id: 'book16',
      title: 'OAPEN Library',
      description: 'Open access academic books across various disciplines',
      url: 'https://oapen.org',
      type: 'books' as const,
      genre: 'academic' as Theme,
      rating: 4.7
    },
    {
      id: 'book17',
      title: 'Wikibooks',
      description: 'Collaborative textbooks and educational resources',
      url: 'https://en.wikibooks.org',
      type: 'books' as const,
      genre: 'academic' as Theme,
      rating: 4.5
    },
    {
      id: 'book18',
      title: 'HathiTrust Digital Library',
      description: 'Millions of books from academic and research libraries',
      url: 'https://www.hathitrust.org',
      type: 'books' as const,
      genre: 'academic' as Theme,
      rating: 4.6
    }
  ];

  const allResources = [...resources, ...bookResources];

  const filteredResources = selectedGenre === 'all' 
    ? allResources
    : selectedGenre === 'books'
    ? bookResources
    : allResources.filter(resource => resource.genre === selectedGenre);

  const genres = [
    { id: 'all' as const, name: 'All Resources', icon: '🌐' },
    { id: 'books' as const, name: 'Free Books', icon: '📚' },
    { id: 'kids' as const, name: 'Kids', icon: '🎨' },
    { id: 'adult' as const, name: 'Adult', icon: '💼' },
    { id: 'adventure' as const, name: 'Adventure', icon: '🌟' },
    { id: 'academic' as const, name: 'Academic', icon: '🎓' }
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
                  Curated collection of free educational materials and books
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

        {/* Highlighted Books Section */}
        {selectedGenre === 'books' && (
          <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Free Book Websites Collection
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">📖 Classic Literature</h4>
                <p className="text-blue-700">Project Gutenberg, Standard Ebooks, Planet eBook</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">🎓 Academic Texts</h4>
                <p className="text-green-700">MIT Press, OAPEN, BookBoon, Wikibooks</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">👶 Children's Books</h4>
                <p className="text-purple-700">Children's Books Online, International Children's Library</p>
              </div>
            </div>
          </div>
        )}

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(resource.type)}
                    <Badge variant="secondary" className="text-xs">
                      {resource.type === 'books' ? 'Free Books' : resource.type}
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
          <p className="text-blue-800 text-sm leading-relaxed mb-4">
            These carefully curated resources provide free access to high-quality educational content and books. 
            Each platform offers unique learning experiences, from interactive coding environments to 
            comprehensive university courses and extensive book collections.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-blue-700">
            <div>
              <strong>🌐 Learning Platforms:</strong> Full-featured educational websites
            </div>
            <div>
              <strong>📚 Free Books:</strong> Classic literature, textbooks, and modern works
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
            <div>
              <strong>🎓 Academic:</strong> University-level courses and research
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceLibrary;
