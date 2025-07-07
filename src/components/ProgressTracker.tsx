import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ExternalLink } from "lucide-react";
import { Theme } from "@/pages/Index";

const ProgressTracker = () => {
  const getThemeColors = (theme: Theme) => {
    const colors = {
      kids: "from-pink-400 to-red-400",
      library: "from-blue-500 to-purple-600",
      academic: "from-orange-400 to-red-500",
    };
    return colors[theme];
  };

  // Sample Sites data
  const sites = [
    {
      id: "1",
      title: "PBS Kids",
      description: "Educational games and videos featuring popular characters.",
      url: "https://pbskids.org/",
      type: "interactive",
      genre: "kids",
      rating: 4.8,
      lastAccessed: "2025-06-15",
    },
    {
      id: "2",
      title: "Duolingo",
      description: "Learn languages for free with game-like lessons",
      url: "https://www.duolingo.com",
      type: "interactive",
      genre: "academic",
      rating: 4.5,
      lastAccessed: "2025-06-14",
    },
    {
      id: "3",
      title: "Wikibooks",
      description: "Collaborative textbooks and educational resources",
      url: "https://en.wikibooks.org",
      type: "free books",
      genre: "library",
      rating: 4.5,
      lastAccessed: "2025-04-16",
    },
  ];

  return (
    <div className="mb-8">
      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recently Visited Learning Sites
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sites
              .filter((site) => site.lastAccessed)
              .sort(
                (a, b) =>
                  new Date(b.lastAccessed!).getTime() -
                  new Date(a.lastAccessed!).getTime()
              )
              .slice(0, 3)
              .map((site) => (
                <div
                  key={site.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getThemeColors(
                        site.genre as Theme
                      )} flex items-center justify-center text-white font-bold text-sm`}
                    >
                      {site.title.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {site.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        Last accessed:{" "}
                        {new Date(site.lastAccessed!).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        visit site
                      </a>
                    </div>
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
