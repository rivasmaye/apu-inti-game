import React, { useState } from "react";
import { GameButton } from "./GameButton";
import { GameHUD } from "./GameHUD";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Props {
  onNavigate: (scene: string) => void;
  onComplete: () => void;
}

interface Trash {
  id: number;
  type: "bueno" | "malo";
  name: string;
  info: string;
}

export function CostaMission3({ onNavigate, onComplete }: Props) {
  const [cleaned, setCleaned] = useState(0);
  const [lives, setLives] = useState(5);

  const [trashItems, setTrashItems] = useState<Trash[]>([
    // 15 buenos
    { id: 1, type: "bueno", name: "Botella de plástico", info: "Si no se recoge, contamina la playa y afecta la vida marina." },
    { id: 2, type: "bueno", name: "Bolsa de plástico", info: "Se descompone muy lentamente y provoca daño a aves y peces." },
    { id: 3, type: "bueno", name: "Red de pesca", info: "Atrapa peces y tortugas si queda en el mar." },
    { id: 4, type: "bueno", name: "Lata de bebida", info: "El metal puede oxidarse y liberar toxinas al agua." },
    { id: 5, type: "bueno", name: "Envase de yogurt", info: "Si se acumula en la arena, afecta el ecosistema local." },
    { id: 6, type: "bueno", name: "Envase de jugo", info: "Desechos químicos afectan la fauna marina." },
    { id: 7, type: "bueno", name: "Tapas de plástico", info: "Si no se retiran, terminan en el mar y afectan peces." },
    { id: 8, type: "bueno", name: "Papel aluminio", info: "No biodegradable, puede lastimar animales." },
    { id: 9, type: "bueno", name: "Envase de detergente", info: "Libera químicos si queda en el agua." },
    { id: 10, type: "bueno", name: "Tetra pack", info: "Plástico y cartón afectan la arena y la fauna." },
    { id: 11, type: "bueno", name: "Botella de vidrio", info: "Si se rompe, lastima animales y personas." },
    { id: 12, type: "bueno", name: "Bolsita de snack", info: "No se descompone y contamina." },
    { id: 13, type: "bueno", name: "Envase de leche", info: "Químicos afectan la vida marina." },
    { id: 14, type: "bueno", name: "Papel de dulce", info: "Si queda en la arena, es basura que contamina." },
    { id: 15, type: "bueno", name: "Caja de cartón", info: "Puede mojarse y liberar residuos que afectan fauna." },

    // 5 malos
    { id: 16, type: "malo", name: "Concha natural", info: "No se debe recoger, son parte del ecosistema." },
    { id: 17, type: "malo", name: "Algas", info: "Alimento natural de peces, no las retires." },
    { id: 18, type: "malo", name: "Piedra", info: "Parte natural de la playa, no es basura." },
    { id: 19, type: "malo", name: "Arena", info: "Elemento natural, no se debe recoger." },
    { id: 20, type: "malo", name: "Pequeño tronco", info: "Forma parte del ecosistema costero." },
  ]);

  const [selectedTrash, setSelectedTrash] = useState<Trash | null>(null);

  const handleTrashClick = (trash: Trash) => {
    setSelectedTrash(trash);

    if (trash.type === "bueno") {
      setTrashItems(prev => prev.filter(t => t.id !== trash.id));
      setCleaned(prev => Math.min(100, prev + Math.round(100 / 15))); // 15 objetos buenos = 100%
    } else {
      setLives(prev => Math.max(0, prev - 1)); // cada error quita 1 vida
    }
  };

  const complete = cleaned === 100;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* HUD */}
      <GameHUD
        ecosystem={cleaned}
        water={70}
        energy={60}
        biodiversity={80}
        sustainability={cleaned}
        region="costa"
      />

      {/* Fondo de playa */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=60"
          alt="Playa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 via-transparent to-yellow-200/40"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 min-h-screen p-8 pt-32 overflow-y-auto">
        <h2 className="text-3xl font-bold text-white mb-4">🧹 Limpieza de Playas y Ríos</h2>
        <p className="text-white/90 mb-6">
          Haz click sobre los objetos que se deben recoger. Los objetos que no se deben recoger restan vidas.
        </p>

        {/* Barra de limpieza y vidas */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-gray-900 game-shadow mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Limpieza</span>
            <span className="font-bold">{cleaned}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${cleaned}%` }}
            />
          </div>
          <div className="flex space-x-1 mt-2">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className={`text-xl ${i < lives ? "text-red-500" : "text-gray-400"}`}>❤️</span>
            ))}
          </div>
        </div>

        {/* Área de objetos en matriz 4x5 */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {trashItems.map(trash => (
            <div
              key={trash.id}
              onClick={() => handleTrashClick(trash)}
              className="bg-white/80 backdrop-blur-sm rounded-lg p-3 text-center cursor-pointer hover:scale-105 transition-transform shadow-lg"
            >
              <span className="block text-xl">🗑️</span>
              <span className="text-sm mt-1">{trash.name}</span>
            </div>
          ))}
        </div>

        {/* Contenedor */}
        <div className="bg-blue-700/50 p-6 rounded-xl text-center text-white font-bold mb-6">
          Contenedor de basura 🗑️
        </div>

        {/* Mensaje final */}
        {complete && (
          <div className="bg-green-500/90 text-white p-6 rounded-xl text-center font-bold mb-6 animate-bounce">
            🎉 ¡Las olas agradecen! La costa brilla limpia y la vida marina vuelve a respirar.
          </div>
        )}

        {/* Cuadro de información de basura */}
        {selectedTrash && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full text-center shadow-lg">
              <h3 className="text-xl font-bold mb-2">{selectedTrash.name}</h3>
              <p className="text-gray-800 mb-4">{selectedTrash.info}</p>
              <GameButton
                variant="primary"
                size="sm"
                onClick={() => setSelectedTrash(null)}
              >
                Cerrar
              </GameButton>
            </div>
          </div>
        )}

        {/* Botones */}
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
