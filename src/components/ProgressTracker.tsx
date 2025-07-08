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

  // Get last visited resources from localStorage
      const getLastVisitedResources = () => {
      try {
      const stored = localStorage.getItem("lastVisitedResources");
      if (stored) {
        return JSON.parse(stored);
      }
      } catch {
      // Ignore JSON parse errors
      }
      return [];
    };

  const sites = getLastVisitedResources();

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
            {sites &&
              sites.map((site) => (
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
                        {site.accessedAt}
                      </div>
                    </div>
                  </div>
                  {/* <div className="text-right">
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
                  </div> */}
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracker;
