import { useState } from "react";
import { GameButton } from "./GameButton";
import { GameHUD } from "./GameHUD";
import { DataPanel } from "./DataPanel";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../context/LanguageContext";

interface CostaSceneProps {
  onNavigate: (scene: string) => void;
}

export function CostaScene({ onNavigate }: CostaSceneProps) {
  const { t } = useLanguage();
  const [showDataPanel, setShowDataPanel] = useState(false);

  // Estados de HUD e interacciones
  const [waterLevel, setWaterLevel] = useState(45);
  const [energy, setEnergy] = useState(75);
  const [ecosystem, setEcosystem] = useState(30);

  const nasaData = [
    { label: "Temperatura", value: "28.5", unit: "°C", status: "warning" },
    { label: "Humedad del Suelo", value: "15", unit: "%", status: "danger" },
    { label: "Precipitación", value: "2.1", unit: "mm", status: "danger" },
    { label: "Índice de Vegetación", value: "0.23", unit: "NDVI", status: "warning" },
    { label: "Radiación Solar", value: "850", unit: "W/m²", status: "good" }
  ];

  const handleIrrigate = () => {
    setWaterLevel(Math.min(100, waterLevel + 15));
    setEcosystem(Math.min(100, ecosystem + 10));
  };

  const handlePlant = () => {
    if (waterLevel > 20) {
      setWaterLevel(waterLevel - 10);
      setEcosystem(Math.min(100, ecosystem + 20));
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden cursor-[url('/cursor-apuinti.png'),_auto]">
      
      {/* HUD */}
      <GameHUD
        ecosystem={ecosystem}
        water={waterLevel}
        energy={energy}
        biodiversity={25}
        sustainability={45}
        region="costa"
      />

      {/* Fondo */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1610046932034-fc8170d01155?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt={t.peruMap.costaScene.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-200/30 via-transparent to-costa/40"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen p-8 pt-32 pb-24 overflow-y-auto">
        
        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-tierra drop-shadow-lg mb-2">
            🏖️ {t.peruMap.costaScene.title}
          </h2>
          <p className="text-lg text-tierra/80">
            {t.peruMap.costaScene.description}
          </p>
        </div>

        {/* Misiones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1,2,3].map((m) => (
            <div key={m} className="bg-white/90 backdrop-blur-sm rounded-xl p-6 game-shadow border border-yellow-200/60 transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2">
              <h3 className="font-bold text-tierra text-xl mb-2">
                {m === 1 ? "🌞" : m === 2 ? "🐟" : "🧹"} {t.missions.costa[`m${m}`].title}
              </h3>
              <p className="text-sm text-tierra/70 mb-4">
                {t.missions.costa[`m${m}`].description}
              </p>
              <GameButton
                variant={m===3 ? "secondary" : "primary"}
                size="sm"
                onClick={() => onNavigate(`costa-m${m}`)}
                className="w-full"
              >
                {t.missions.startMission}
              </GameButton>
            </div>
          ))}
        </div>

        {/* Interacciones: Agua, Plantación, Energía */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
          {/* Riego */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 game-shadow">
            <div className="text-center mb-4">
              <span className="text-4xl mb-2 block">💧</span>
              <h3 className="font-bold text-tierra">Regar Cultivos</h3>
            </div>
            <div className="flex justify-between mb-2 text-sm">
              <span>Nivel de agua:</span>
              <span className="font-bold">{waterLevel}%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div style={{ width: `${waterLevel}%` }} className="bg-blue-500 h-2 rounded-full transition-all duration-500"></div>
            </div>
            <GameButton variant="costa" size="sm" onClick={handleIrrigate} className="w-full mt-2" disabled={waterLevel >= 100}>
              💦 Regar
            </GameButton>
          </div>

          {/* Plantación */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 game-shadow">
            <div className="text-center mb-4">
              <span className="text-4xl mb-2 block">🌱</span>
              <h3 className="font-bold text-tierra">Sembrar Plantas</h3>
            </div>
            <div className="flex justify-between mb-2 text-sm">
              <span>Ecosistema:</span>
              <span className="font-bold">{ecosystem}%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div style={{ width: `${ecosystem}%` }} className="bg-green-500 h-2 rounded-full transition-all duration-500"></div>
            </div>
            <GameButton variant="selva" size="sm" onClick={handlePlant} className="w-full mt-2" disabled={waterLevel < 20 || ecosystem >= 100}>
              🌿 Sembrar
            </GameButton>
          </div>

          {/* Energía */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 game-shadow">
            <div className="text-center mb-4">
              <span className="text-4xl mb-2 block">☀️</span>
              <h3 className="font-bold text-tierra">Optimizar Energía</h3>
            </div>
            <div className="flex justify-between mb-2 text-sm">
              <span>Energía:</span>
              <span className="font-bold">{energy}%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div style={{ width: `${energy}%` }} className="bg-yellow-500 h-2 rounded-full transition-all duration-500"></div>
            </div>
            <GameButton variant="primary" size="sm" onClick={() => setEnergy(Math.min(100, energy + 5))} className="w-full mt-2" disabled={energy >= 100}>
              ⚡ Cargar Paneles
            </GameButton>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-center gap-4 mt-8">
          <GameButton variant="primary" onClick={() => setShowDataPanel(true)} className="flex items-center gap-2">
            📡 Consultar Datos NASA
          </GameButton>

          {ecosystem >= 70 && (
            <GameButton variant="costa" onClick={() => onNavigate('map')} className="animate-pulse">
              ✅ Misión Completada
            </GameButton>
          )}
        </div>

      </div>

      {/* Panel de datos */}
      <DataPanel title={t.dataPanel.costa.title} data={nasaData} isVisible={showDataPanel} onClose={() => setShowDataPanel(false)} />

      {/* Botón volver al mapa */}
      <div className="absolute bottom-8 left-8">
        <GameButton variant="secondary" onClick={() => onNavigate("map")}>
          {t.peruMap.mainMenuBtn}
        </GameButton>
      </div>
    </div>
  );
}
