import { ResourceIcon } from "./ResourceIcon";
import { Progress } from "./ui/progress";
import { useLanguage } from "../context/LanguageContext";

interface GameHUDProps {
  ecosystem?: number;
  water?: number;
  energy?: number;
  biodiversity?: number;
  sustainability?: number;
  region?: "costa" | "sierra" | "selva";
  showCompass?: boolean;
}

export function GameHUD({ 
  ecosystem = 0, 
  water = 0, 
  energy = 0, 
  biodiversity = 0,
  sustainability = 0,
  region,
  showCompass = false 
}: GameHUDProps) {
  const { t } = useLanguage();

  const getRegionColor = () => {
    switch (region) {
      case "costa": return "bg-costa";
      case "sierra": return "bg-sierra";
      case "selva": return "bg-selva";
      default: return "bg-primary";
    }
  };

  const getRegionName = () => {
    if (!region) return t.peruMap.mapTitle;
    switch (region) {
      case "costa": return t.peruMap.costaScene.title;
      case "sierra": return t.peruMap.sierraScene.title;
      case "selva": return t.peruMap.selvaScene.title;
      default: return t.peruMap.mapTitle;
    }
  };

  return (
    <div className="fixed top-4 left-4 right-4 z-50">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left side - Resources */}
        <div className="flex flex-wrap items-center gap-3">
          <ResourceIcon type="water" value={water} label={t.resources.water} showValue />
          <ResourceIcon type="solar" value={energy} label={t.resources.energy} showValue />
          <ResourceIcon type="biodiversity" value={biodiversity} label={t.resources.biodiversity} showValue />
          <ResourceIcon type="sustainability" value={sustainability} label={t.resources.sustainability} showValue />
        </div>

        {/* Right side - Region info */}
        <div className="flex items-center gap-3">
          {showCompass && (
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 game-shadow">
              <div className="text-2xl">🧭</div>
            </div>
          )}
          
          {region && (
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 game-shadow">
              <p className="text-sm font-medium text-tierra">{t.peruMap.chooseRegion}</p>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getRegionColor()}`}></div>
                <span className="text-sm font-medium text-tierra">{getRegionName()}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ecosystem progress bar */}
      {ecosystem > 0 && (
        <div className="mt-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 game-shadow max-w-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-tierra">🌱 {t.resources.ecosystem}</span>
            <span className="text-sm text-tierra/70">{ecosystem}%</span>
          </div>
          <Progress value={ecosystem} className="h-2" />
        </div>
      )}
    </div>
  );
}
