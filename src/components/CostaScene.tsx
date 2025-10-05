import { useState } from "react";
import { GameButton } from "./GameButton";
import { GameHUD } from "./GameHUD";
import { DataPanel } from "./DataPanel";
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CostaSceneProps {
  onNavigate: (scene: string) => void;
  onComplete?: () => void;
}

export function CostaScene({ onNavigate, onComplete }: CostaSceneProps) {
  const [showDataPanel, setShowDataPanel] = useState(false);
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Game HUD */}
      <GameHUD 
        ecosystem={ecosystem}
        water={waterLevel}
        energy={energy}
        biodiversity={25}
        sustainability={45}
        region="costa"
      />

      {/* Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1610046932034-fc8170d01155?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQZXJ1JTIwY29hc3QlMjBkZXNlcnQlMjBvY2VhbnxlbnwxfHx8fDE3NTk2MTg5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Costa peruana"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-200/30 via-transparent to-costa/40"></div>
      </div>

      {/* Scene elements */}
      <div className="relative z-10 h-screen p-8 pt-32">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-tierra drop-shadow-lg mb-2">
            🏖️ Región Costa
          </h2>
          <p className="text-lg text-tierra/80">
            Restaura los cultivos del desierto costero
          </p>
        </div>

        {/* Interactive elements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Irrigation channels */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 game-shadow">
            <div className="text-center mb-4">
              <span className="text-4xl mb-2 block">🌊</span>
              <h3 className="font-bold text-tierra">Canales de Riego</h3>
              <p className="text-sm text-tierra/70">Lleva agua a los cultivos</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Nivel de agua:</span>
                <span className="font-bold">{waterLevel}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${waterLevel}%` }}
                ></div>
              </div>
              
              <GameButton
                variant="costa"
                size="sm"
                onClick={handleIrrigate}
                className="w-full"
                disabled={waterLevel >= 100}
              >
                💧 Regar Cultivos
              </GameButton>
            </div>
          </div>

          {/* Solar energy */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 game-shadow">
            <div className="text-center mb-4">
              <span className="text-4xl mb-2 block">☀️</span>
              <h3 className="font-bold text-tierra">Energía Solar</h3>
              <p className="text-sm text-tierra/70">Aprovecha el sol del desierto</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Energía generada:</span>
                <span className="font-bold">{energy}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${energy}%` }}
                ></div>
              </div>
              
              <GameButton
                variant="primary"
                size="sm"
                onClick={() => setEnergy(Math.min(100, energy + 5))}
                className="w-full"
                disabled={energy >= 100}
              >
                🔆 Optimizar Paneles
              </GameButton>
            </div>
          </div>

          {/* Crops */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 game-shadow">
            <div className="text-center mb-4">
              <span className="text-4xl mb-2 block">🌾</span>
              <h3 className="font-bold text-tierra">Cultivos</h3>
              <p className="text-sm text-tierra/70">Siembra plantas resistentes</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Cobertura vegetal:</span>
                <span className="font-bold">{ecosystem}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${ecosystem}%` }}
                ></div>
              </div>
              
              <GameButton
                variant="selva"
                size="sm"
                onClick={handlePlant}
                className="w-full"
                disabled={waterLevel < 20 || ecosystem >= 100}
              >
                🌱 Sembrar (Req: 20% agua)
              </GameButton>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <GameButton
            variant="primary"
            onClick={() => setShowDataPanel(true)}
            className="flex items-center gap-2"
          >
            📡 Consultar Datos NASA
          </GameButton>
          
          {ecosystem >= 70 && (
            <GameButton
              variant="costa"
              onClick={() => { onComplete?.(); onNavigate('map'); }}
              className="animate-pulse"
            >
              ✅ Misión Completada
            </GameButton>
          )}
        </div>

        {/* Navigation */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between">
          <GameButton
            variant="secondary"
            onClick={() => onNavigate('map')}
          >
            ← Volver al Mapa
          </GameButton>
          
          <div className="flex gap-2">
            <GameButton variant="sierra" onClick={() => onNavigate('sierra')}>
              🏔️ Sierra
            </GameButton>
            <GameButton variant="selva" onClick={() => onNavigate('selva')}>
              🌳 Selva
            </GameButton>
          </div>
        </div>
      </div>

      {/* Data panel */}
      <DataPanel
        title="Datos Satelitales - Costa"
        data={nasaData}
        isVisible={showDataPanel}
        onClose={() => setShowDataPanel(false)}
      />
    </div>
  );
}