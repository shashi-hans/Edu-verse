import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Star,
  Globe,
  FileText,
  Video,
  Gamepad2,
  BookOpen,
  Home,
} from "lucide-react";
import { Resource, Theme } from "@/pages/Index";

interface LibraryProps {
  resources: Resource[];
  theme: Theme;
  onClose: () => void;
}

const ResourceLibrary = ({ resources, theme, onClose }: LibraryProps) => {
  const [selectedGenre, setSelectedGenre] = useState<Theme | "kids">(theme);
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);

  useEffect(() => {
    setSelectedGenre(theme);
  }, [theme]);

  const getThemeColors = (theme: Theme) => {
    const colors = {
      kids: "from-pink-400 to-red-400",
      library: "from-blue-500 to-purple-600",
      academic: "from-orange-400 to-red-500",
    };
    return colors[theme];
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "website":
        return <Globe className="w-4 h-4" />;
      case "pdf":
        return <FileText className="w-4 h-4" />;
      case "video":
        return <Video className="w-4 h-4" />;
      case "interactive":
        return <Gamepad2 className="w-4 h-4" />;
      case "books":
        return <BookOpen className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  // Store last 3 visited resources (as objects) in localStorage, including accessed date
  const storeVisitedLink = (url: string) => {
    const key = "lastVisitedResources";
    let resourcesArr: Array<Resource & { accessedAt: string }> = [];
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        resourcesArr = JSON.parse(stored);
      }
    } catch {
      // Ignore JSON parse errors
    }
    // Find the resource by url
    const resource = resources.find((r) => r.url === url);
    if (!resource) return;
    // Remove if already present
    resourcesArr = resourcesArr.filter((r) => r.url !== url);
    // Add to front as object with accessedAt
    const now = new Date();
    const accessedAt = `${now.getDate().toString().padStart(2, "0")}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${now.getFullYear()}`;
    resourcesArr.unshift({ ...resource, accessedAt });
    // Keep only last 3
    resourcesArr = resourcesArr.slice(0, 3);
    localStorage.setItem(key, JSON.stringify(resourcesArr));
  };

  const allResources = [...resources];

  const filteredResources = allResources.filter(
    (resource) => resource.genre === selectedGenre
  );

return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Iframe Modal */}
        {iframeUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="relative w-full h-[100vh] max-w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
          <div className="flex justify-end p-2 bg-white z-10">
            <button
              className="bg-gray-200 rounded-full p-2 hover:bg-gray-300 shadow"
              onClick={() => setIframeUrl(null)}
            >
              Close
            </button>
          </div>
          <div className="flex-1">
            <iframe
              src={iframeUrl}
              title="External Resource"
              className="w-full h-full border-0"
            />
          </div>
            </div>
          </div>
        )}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div
          className={`bg-gradient-to-r ${getThemeColors(
            theme
          )} text-white p-4 shadow-lg mb-8 top-0 z-50 `}
        >
          <div className="flex items-space justify-between space-x-4">
            <Button
              onClick={onClose}
              variant="ghost"
              className="flex items-center gap-2 md:text-2xl font-bold"
            >
              <Home />
              Home
            </Button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold">
                {theme.charAt(0).toUpperCase() + theme.slice(1)} Resources
              </h1>
              <p className="text-white/80 text-sm">
                Curated collection of free educational materials and books
              </p>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <Card
              key={resource.id}
              className="group hover:shadow-lg transition-all duration-300"
            >
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
                    <span className="text-sm font-medium">
                      {resource.rating}
                    </span>
                  </div>
                </div>
                <CardTitle className="text-lg">
                  <Badge
                    className={`bg-gradient-to-r ${getThemeColors(
                      resource.genre
                    )} text-white border-0 text-sm`}
                  >
                    {resource.title}
                  </Badge>
                </CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between">
                  <Button
                    onClick={() => {
                      storeVisitedLink(resource.url);
                      window.open(resource.url, "_blank");
                    }}
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Site
                  </Button>
                  <Button
                    onClick={() => {
                      storeVisitedLink(resource.url);
                      setIframeUrl(resource.url);
                    }}
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Globe className="w-4 h-4" />
                    Open in Page
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
            These carefully curated resources provide free access to
            high-quality educational content and books. Each platform offers
            unique learning experiences, from interactive coding environments to
            comprehensive university courses and extensive book collections.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-blue-700">
            <div>
              <strong>🌐 Learning Platforms:</strong> Full-featured educational
              websites
            </div>
            <div>
              <strong>📚 Free Books:</strong> Classic literature, textbooks, and
              modern works
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
              <strong>🎓 Academic:</strong> University-level courses and
              research
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceLibrary;
