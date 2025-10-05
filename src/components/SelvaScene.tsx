import { useState } from "react";
import { GameButton } from "./GameButton";
import { GameHUD } from "./GameHUD";
import { DataPanel } from "./DataPanel";
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SelvaSceneProps {
  onNavigate: (scene: string) => void;
}

export function SelvaScene({ onNavigate }: SelvaSceneProps) {
  const [showDataPanel, setShowDataPanel] = useState(false);
  const [biodiversity, setBiodiversity] = useState(65);
  const [co2Level, setCo2Level] = useState(40);
  const [ecosystem, setEcosystem] = useState(55);
  const [deforestation, setDeforestation] = useState(30);

  const nasaData = [
    { label: "Deforestación", value: "2.1", unit: "%/año", status: "danger" },
    { label: "Biodiversidad", value: "8,500", unit: "especies", status: "good" },
    { label: "Captura de CO₂", value: "15.2", unit: "ton/ha", status: "good" },
    { label: "Cobertura Forestal", value: "78", unit: "%", status: "warning" },
    { label: "Precipitación", value: "2,800", unit: "mm/año", status: "good" }
  ];

  const handleStopDeforestation = () => {
    setDeforestation(Math.max(0, deforestation - 15));
    setEcosystem(Math.min(100, ecosystem + 20));
    setBiodiversity(Math.min(100, biodiversity + 10));
  };

  const handlePlantTrees = () => {
    if (deforestation < 20) {
      setCo2Level(Math.min(100, co2Level + 25));
      setBiodiversity(Math.min(100, biodiversity + 15));
      setEcosystem(Math.min(100, ecosystem + 15));
    }
  };

  const handleDrones = () => {
    setBiodiversity(Math.min(100, biodiversity + 5));
    setEcosystem(Math.min(100, ecosystem + 5));
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Game HUD */}
      <GameHUD 
        ecosystem={ecosystem}
        water={85}
        energy={30}
        biodiversity={biodiversity}
        sustainability={70}
        region="selva"
      />

      {/* Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1699575947488-30f08e71896b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQZXJ1JTIwQW1hem9uJTIwcmFpbmZvcmVzdHxlbnwxfHx8fDE3NTk2MTg5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Selva amazónica"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-800/30 via-transparent to-selva/40"></div>
        
        {/* Animated wildlife */}
        <div className="absolute top-20 left-20 text-2xl animate-bounce">🦜</div>
        <div className="absolute top-32 right-32 text-2xl animate-bounce delay-500">🐒</div>
        <div className="absolute top-40 left-1/3 text-xl animate-bounce delay-1000">🦋</div>
        <div className="absolute bottom-32 right-1/4 text-2xl animate-bounce delay-1500">🐍</div>
      </div>

      {/* Scene elements */}
      <div className="relative z-10 h-screen p-8 pt-32">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">
            🌳 Región Selva
          </h2>
          <p className="text-lg text-white/90">
            Protege la biodiversidad del Amazonas
          </p>
        </div>

        {/* Interactive elements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {/* Deforestation control */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 game-shadow">
            <div className="text-center mb-3">
              <span className="text-3xl mb-2 block">🪓</span>
              <h4 className="font-bold text-tierra text-sm">Anti-Deforestación</h4>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Deforestación:</span>
                <span className="font-bold text-red-600">{deforestation}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-red-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${deforestation}%` }}
                ></div>
              </div>
              
              <GameButton
                variant="selva"
                size="sm"
                onClick={handleStopDeforestation}
                className="w-full text-xs"
                disabled={deforestation <= 0}
              >
                🛑 Detener Tala
              </GameButton>
            </div>
          </div>

          {/* CO2 absorption */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 game-shadow">
            <div className="text-center mb-3">
              <span className="text-3xl mb-2 block">🌱</span>
              <h4 className="font-bold text-tierra text-sm">Captura CO₂</h4>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Absorción:</span>
                <span className="font-bold text-green-600">{co2Level}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${co2Level}%` }}
                ></div>
              </div>
              
              <GameButton
                variant="primary"
                size="sm"
                onClick={handlePlantTrees}
                className="w-full text-xs"
                disabled={deforestation >= 20 || co2Level >= 100}
              >
                🌳 Plantar (Req: &lt;20% defor.)
              </GameButton>
            </div>
          </div>

          {/* Biodiversity */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 game-shadow">
            <div className="text-center mb-3">
              <span className="text-3xl mb-2 block">🦋</span>
              <h4 className="font-bold text-tierra text-sm">Biodiversidad</h4>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Especies:</span>
                <span className="font-bold text-blue-600">{biodiversity}%</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${biodiversity}%` }}
                ></div>
              </div>
              
              <div className="grid grid-cols-2 gap-1 text-xs">
                <div className="bg-yellow-100 p-1 rounded text-center">🐸</div>
                <div className="bg-green-100 p-1 rounded text-center">🦜</div>
              </div>
            </div>
          </div>

          {/* Monitoring */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 game-shadow">
            <div className="text-center mb-3">
              <span className="text-3xl mb-2 block">🚁</span>
              <h4 className="font-bold text-tierra text-sm">Monitoreo</h4>
            </div>
            
            <div className="space-y-2">
              <div className="text-xs text-center text-tierra/70 mb-2">
                Drones de vigilancia
              </div>
              
              <GameButton
                variant="secondary"
                size="sm"
                onClick={handleDrones}
                className="w-full text-xs"
              >
                📡 Activar Sensores
              </GameButton>
              
              <div className="text-xs text-center text-green-600">
                ✅ Sistema activo
              </div>
            </div>
          </div>
        </div>

        {/* Wildlife showcase */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 game-shadow max-w-4xl mx-auto mt-6">
          <h3 className="text-center font-bold text-tierra mb-4">🌿 Fauna Amazónica</h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {[
              { emoji: "🦜", name: "Guacamayo" },
              { emoji: "🐒", name: "Mono" },
              { emoji: "🦋", name: "Mariposa" },
              { emoji: "🐸", name: "Rana" },
              { emoji: "🐍", name: "Serpiente" },
              { emoji: "🦥", name: "Perezoso" },
              { emoji: "🐆", name: "Jaguar" },
              { emoji: "🐊", name: "Caimán" }
            ].map((animal, index) => (
              <div key={index} className="text-center">
                <span className="text-2xl block mb-1">{animal.emoji}</span>
                <span className="text-xs text-tierra/70">{animal.name}</span>
              </div>
            ))}
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
          
          {ecosystem >= 85 && deforestation < 10 && (
            <GameButton
              variant="selva"
              onClick={() => onNavigate('map')}
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
            <GameButton variant="sierra" onClick={() => onNavigate('sierra')}>
              🏔️ Sierra
            </GameButton>
          </div>
        </div>
      </div>

      {/* Data panel */}
      <DataPanel
        title="Datos Satelitales - Selva"
        data={nasaData}
        isVisible={showDataPanel}
        onClose={() => setShowDataPanel(false)}
      />
    </div>
  );
}