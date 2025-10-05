import { useState } from "react";
import { GameButton } from "./GameButton";
import { GameHUD } from "./GameHUD";
import { DataPanel } from "./DataPanel";
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SierraSceneProps {
  onNavigate: (scene: string) => void;
  onComplete?: () => void;
}

export function SierraScene({ onNavigate, onComplete }: SierraSceneProps) {
  const [showDataPanel, setShowDataPanel] = useState(false);
  const [temperature, setTemperature] = useState(35);
  const [forestCover, setForestCover] = useState(40);
  const [ecosystem, setEcosystem] = useState(45);

  const nasaData = [
    { label: "Temperatura", value: "8.2", unit: "°C", status: "warning" },
    { label: "Cobertura de Nieve", value: "45", unit: "%", status: "danger" },
    { label: "Humedad del Suelo", value: "35", unit: "%", status: "warning" },
    { label: "Índice de Vegetación", value: "0.45", unit: "NDVI", status: "good" },
    { label: "Altitud Promedio", value: "3,850", unit: "m", status: "good" }
  ];

  const handleProtectCrops = () => {
    setTemperature(Math.min(100, temperature + 20));
    setEcosystem(Math.min(100, ecosystem + 15));
  };

  const handleReforest = () => {
    if (temperature > 30) {
      setTemperature(temperature - 10);
      setForestCover(Math.min(100, forestCover + 25));
      setEcosystem(Math.min(100, ecosystem + 20));
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Game HUD */}
      <GameHUD 
        ecosystem={ecosystem}
        water={60}
        energy={45}
        biodiversity={forestCover}
        sustainability={55}
        region="sierra"
      />

      {/* Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1670215945174-3b5c2f22aa8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQZXJ1JTIwbGFuZHNjYXBlJTIwQW5kZXMlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzU5NjE4OTY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Montañas andinas"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-200/30 via-transparent to-sierra/40"></div>
        
        {/* Snow particles */}
        <div className="absolute top-20 left-20 text-white text-lg animate-bounce">❄️</div>
        <div className="absolute top-32 right-32 text-white text-sm animate-bounce delay-500">❄️</div>
        <div className="absolute top-40 left-1/3 text-white text-base animate-bounce delay-1000">❄️</div>
      </div>

      {/* Scene elements */}
      <div className="relative z-10 h-screen p-8 pt-32">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">
            🏔️ Región Sierra
          </h2>
          <p className="text-lg text-white/90">
            Protege las terrazas andinas del cambio climático
          </p>
        </div>

        {/* Interactive elements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Thermal protection */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 game-shadow">
            <div className="text-center mb-4">
              <span className="text-4xl mb-2 block">🧥</span>
              <h3 className="font-bold text-tierra">Mantas Térmicas</h3>
              <p className="text-sm text-tierra/70">Protege cultivos de heladas</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Protección térmica:</span>
                <span className="font-bold">{temperature}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${temperature}%` }}
                ></div>
              </div>
              
              <GameButton
                variant="sierra"
                size="sm"
                onClick={handleProtectCrops}
                className="w-full"
                disabled={temperature >= 100}
              >
                🌡️ Instalar Protección
              </GameButton>
            </div>
          </div>

          {/* Andean terraces */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 game-shadow">
            <div className="text-center mb-4">
              <span className="text-4xl mb-2 block">🌾</span>
              <h3 className="font-bold text-tierra">Andenes</h3>
              <p className="text-sm text-tierra/70">Agricultura en terrazas</p>
            </div>
            
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-green-100 p-2 rounded">
                  <div className="text-lg">🥔</div>
                  <div className="text-xs">Papa</div>
                </div>
                <div className="bg-yellow-100 p-2 rounded">
                  <div className="text-lg">🌽</div>
                  <div className="text-xs">Maíz</div>
                </div>
                <div className="bg-red-100 p-2 rounded">
                  <div className="text-lg">🫘</div>
                  <div className="text-xs">Quinoa</div>
                </div>
              </div>
              
              <GameButton
                variant="primary"
                size="sm"
                onClick={() => setEcosystem(Math.min(100, ecosystem + 10))}
                className="w-full"
              >
                🌱 Cultivar Andenes
              </GameButton>
            </div>
          </div>

          {/* Reforestation */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 game-shadow">
            <div className="text-center mb-4">
              <span className="text-4xl mb-2 block">🌲</span>
              <h3 className="font-bold text-tierra">Reforestación</h3>
              <p className="text-sm text-tierra/70">Planta árboles nativos</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Cobertura forestal:</span>
                <span className="font-bold">{forestCover}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${forestCover}%` }}
                ></div>
              </div>
              
              <GameButton
                variant="selva"
                size="sm"
                onClick={handleReforest}
                className="w-full"
                disabled={temperature < 30 || forestCover >= 100}
              >
                🌳 Reforestar (Req: 30% temp)
              </GameButton>
            </div>
          </div>
        </div>

        {/* Wildlife section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 game-shadow max-w-2xl mx-auto mt-6">
          <h3 className="text-center font-bold text-tierra mb-4">🦙 Fauna Andina</h3>
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <span className="text-3xl block mb-1">🦙</span>
              <span className="text-xs text-tierra/70">Llama</span>
            </div>
            <div className="text-center">
              <span className="text-3xl block mb-1">🐇</span>
              <span className="text-xs text-tierra/70">Vizcacha</span>
            </div>
            <div className="text-center">
              <span className="text-3xl block mb-1">🦅</span>
              <span className="text-xs text-tierra/70">Cóndor</span>
            </div>
            <div className="text-center">
              <span className="text-3xl block mb-1">🐻</span>
              <span className="text-xs text-tierra/70">Oso Andino</span>
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
          
          {ecosystem >= 80 && (
            <GameButton
              variant="sierra"
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
            <GameButton variant="costa" onClick={() => onNavigate('costa')}>
              🏖️ Costa
            </GameButton>
            <GameButton variant="selva" onClick={() => onNavigate('selva')}>
              🌳 Selva
            </GameButton>
          </div>
        </div>
      </div>

      {/* Data panel */}
      <DataPanel
        title="Datos Satelitales - Sierra"
        data={nasaData}
        isVisible={showDataPanel}
        onClose={() => setShowDataPanel(false)}
      />
    </div>
  );
}