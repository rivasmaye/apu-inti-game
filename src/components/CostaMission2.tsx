import React, { useState } from "react";
import { GameButton } from "./GameButton";
import { GameHUD } from "./GameHUD";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Props {
  onNavigate: (scene: string) => void;
  onComplete: () => void;
}

interface Fish {
  id: number;
  name: string;
  icon: string;
  canCatch: boolean;
  info: string;
}

export function CostaMission2({ onNavigate, onComplete }: Props) {
  const [balance, setBalance] = useState(0); // inicia en 0%
  const [lives, setLives] = useState(5);
  const [caught, setCaught] = useState(0);
  const [fishes, setFishes] = useState<Fish[]>([]);
  const [missionStarted, setMissionStarted] = useState(false);
  const [selectedFish, setSelectedFish] = useState<Fish | null>(null);

  const maxCatch = 5; // mínimo para completar misión
  const totalCorrect = 6; // número total de peces correctos en la lista

  const startMission = () => {
    setMissionStarted(true);

    const fishList: Fish[] = [
      { id: 1, name: "Trucha", icon: "🐟", canCatch: true, info: "La trucha es abundante y su pesca es sostenible." },
      { id: 2, name: "Sardina", icon: "🐠", canCatch: true, info: "La sardina se reproduce rápido y su captura es permitida." },
      { id: 3, name: "Pejerrey", icon: "🐡", canCatch: true, info: "El pejerrey es importante para la alimentación local." },
      { id: 4, name: "Atún", icon: "🐟", canCatch: true, info: "El atún de tamaño permitido puede pescarse responsablemente." },
      { id: 5, name: "Caballa", icon: "🐠", canCatch: true, info: "La caballa es común y su pesca está regulada pero permitida." },
      { id: 6, name: "Lenguado", icon: "🐡", canCatch: true, info: "El lenguado puede capturarse sin afectar el ecosistema." },
      { id: 7, name: "Tiburón", icon: "🦈", canCatch: false, info: "El tiburón está protegido y no se debe pescar." },
      { id: 8, name: "Pez León", icon: "🦈", canCatch: false, info: "El pez león requiere precaución por espinas." },
      { id: 9, name: "Pez Globo", icon: "🦈", canCatch: false, info: "El pez globo es venenoso y su pesca es prohibida." },
      { id: 10, name: "Manta Ray", icon: "🦈", canCatch: false, info: "Las mantas son especies protegidas." },
      { id: 11, name: "Anguila", icon: "🦈", canCatch: false, info: "La anguila está en declive poblacional." },
      { id: 12, name: "Caballito de mar", icon: "🦈", canCatch: false, info: "El caballito de mar es especie protegida." },
    ];

    setFishes(fishList);
  };

  const handleFishClick = (fish: Fish) => {
    setSelectedFish(fish);
    setFishes(prev => prev.filter(f => f.id !== fish.id));

    if (fish.canCatch) {
      setCaught(prev => prev + 1);
      // Balance proporcional: 100% ÷ maxCatch = % por pez correcto capturado
      const increment = 100 / maxCatch;
      setBalance(prev => Math.min(100, prev + increment));
    } else {
      setLives(prev => Math.max(0, prev - 1));
      setBalance(prev => Math.max(0, prev - 20)); // penalización al equivocarse
    }
  };

  const complete = balance >= 100 || lives === 0;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* HUD */}
      <GameHUD
        ecosystem={balance}
        water={70}
        energy={60}
        biodiversity={80}
        sustainability={balance}
        region="costa"
      />

      {/* Fondo */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=60"
          alt="Mar peruano"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-800/40 via-transparent to-costa/40"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 min-h-screen p-8 pt-32 overflow-y-auto">
        <h2 className="text-3xl font-bold text-white mb-4">🐟 Pesca Responsable</h2>
        <p className="text-white/90 mb-4">
          Haz click sobre los peces que se pueden pescar. Los protegidos restan corazones y equilibrio.
        </p>

        {/* Barra de equilibrio y vidas */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-gray-900 game-shadow mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Equilibrio ecológico</span>
            <span className="font-bold">{Math.round(balance)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${balance}%` }}
            />
          </div>
          <div className="flex space-x-1 mt-2">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={`text-xl ${i < lives ? "text-red-500" : "text-gray-400"}`}>❤️</span>
            ))}
          </div>
          <p className="text-sm mt-2">Peces capturados: {caught} / {maxCatch}</p>
        </div>

        {/* Botón iniciar */}
        {!missionStarted && (
          <GameButton variant="primary" size="sm" onClick={startMission}>
            🎣 Iniciar misión
          </GameButton>
        )}

        {/* Área de juego: tarjetas de peces */}
        {missionStarted && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            {fishes.map(fish => (
              <div
                key={fish.id}
                onClick={() => handleFishClick(fish)}
                className="flex flex-col items-center justify-center cursor-pointer p-4 rounded-xl bg-white/80 text-gray-900 shadow-md transition-transform hover:scale-105"
              >
                <span className="text-3xl">{fish.icon}</span>
                <span className="mt-2 font-bold text-sm">{fish.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Modal de información */}
        {selectedFish && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-blue-200 rounded-xl p-6 max-w-sm w-full text-center shadow-lg relative">
              <h3 className="text-xl font-bold mb-2">{selectedFish.name}</h3>
              <p className="mb-4">{selectedFish.canCatch ? "✅ Puedes pescarlo" : "❌ No debes pescarlo"}</p>
              <p className="text-sm text-gray-800">{selectedFish.info}</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                onClick={() => setSelectedFish(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Botón completar */}
        <div className="flex justify-between mt-6">
          <GameButton variant="secondary" onClick={() => onNavigate("costa")}>
            ← Volver
          </GameButton>
          {complete && (
            <GameButton variant="costa" onClick={onComplete}>
              ✅ Completar Misión
            </GameButton>
          )}
        </div>
      </div>
    </div>
  );
}
