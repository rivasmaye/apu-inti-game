import { useState } from "react";
import { GameButton } from "./GameButton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { useLanguage } from "../context/LanguageContext";

interface NASACenterProps {
  onNavigate: (scene: string) => void;
}

export function NASACenter({ onNavigate }: NASACenterProps) {
  const { t } = useLanguage();
  const [selectedData, setSelectedData] = useState<string | null>(null);

  const missionProgress = [
    { region: t.peruMap.costaScene.title, progress: 70, status: t.nasa.statusInProgress, color: "costa" },
    { region: t.peruMap.sierraScene.title, progress: 45, status: t.nasa.statusStarted, color: "sierra" },
    { region: t.peruMap.selvaScene.title, progress: 85, status: t.nasa.statusAlmostDone, color: "selva" }
  ];

  const satelliteData = [
    {
      id: "ndvi",
      title: t.nasa.ndviTitle,
      value: "0.65",
      description: t.nasa.ndviDescription,
      region: t.nasa.national,
      status: "good"
    },
    {
      id: "precipitation",
      title: t.nasa.precipitationTitle,
      value: "1,250 mm",
      description: t.nasa.precipitationDescription,
      region: t.nasa.national,
      status: "warning"
    },
    {
      id: "temperature",
      title: t.nasa.temperatureTitle,
      value: "18.5°C",
      description: t.nasa.temperatureDescription,
      region: t.nasa.national,
      status: "warning"
    },
    {
      id: "deforestation",
      title: t.nasa.deforestationTitle,
      value: "2.1%",
      description: t.nasa.deforestationDescription,
      region: t.nasa.amazon,
      status: "danger"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "bg-green-500";
      case "warning": return "bg-yellow-500";
      case "danger": return "bg-red-500";
      default: return "bg-blue-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Header */}
      <div className="relative z-10 p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-cyan-300 mb-4">
            {t.peruMap.nasaBtn}
          </h1>
          <p className="text-xl text-blue-200">{t.nasa.controlRoom}</p>
        </div>

        {/* Mission progress */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/80 backdrop-blur-sm border-cyan-400/30 game-shadow">
              <CardHeader>
                <CardTitle className="text-cyan-300 flex items-center gap-2">
                  🎯 {t.nasa.missionProgress}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {missionProgress.map((mission, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white font-medium">{mission.region}</span>
                      <Badge variant="secondary" className="text-xs">
                        {mission.status}
                      </Badge>
                    </div>
                    <Progress value={mission.progress} className="h-2" />
                    <div className="text-right text-sm text-blue-200">
                      {mission.progress}% {t.nasa.completed}
                    </div>
                  </div>
                ))}
                
                <div className="mt-6 p-4 bg-blue-900/50 rounded-lg">
                  <h4 className="text-cyan-300 font-medium mb-2">{t.nasa.totalImpact}</h4>
                  <div className="text-2xl font-bold text-white">67%</div>
                  <div className="text-sm text-blue-200">{t.nasa.ecosystemRestoration}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Satellite data */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/80 backdrop-blur-sm border-cyan-400/30 game-shadow">
              <CardHeader>
                <CardTitle className="text-cyan-300 flex items-center gap-2">
                  🌍 {t.nasa.satelliteData}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {satelliteData.map((data) => (
                    <div 
                      key={data.id}
                      className="p-4 bg-slate-700/50 rounded-lg border border-slate-600/50 hover:border-cyan-400/50 transition-all cursor-pointer"
                      onClick={() => setSelectedData(data.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">{data.title}</h4>
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(data.status)}`}></div>
                      </div>
                      <div className="text-2xl font-bold text-cyan-300 mb-1">{data.value}</div>
                      <p className="text-sm text-blue-200 mb-2">{data.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-400">{data.region}</span>
                        <span className="text-xs text-cyan-400">{t.nasa.viewDetails}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <GameButton variant="primary" onClick={() => onNavigate('map')} className="bg-cyan-600 hover:bg-cyan-700 text-white">
            🌍 {t.nasa.goToMissionMap}
          </GameButton>
          
          <GameButton variant="secondary" onClick={() => onNavigate('menu')} className="bg-slate-700 hover:bg-slate-600 text-white">
            ← {t.mainMenu.menuBtn}
          </GameButton>
        </div>
      </div>
    </div>
  );
}
