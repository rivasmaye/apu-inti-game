import { useState } from "react";
import { GameButton } from "./GameButton";
import { GameHUD } from "./GameHUD";
import { DataPanel } from "./DataPanel";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CostaSceneProps {
  onNavigate: (scene: string) => void;
}

export function CostaScene({ onNavigate }: CostaSceneProps) {
  const [showDataPanel, setShowDataPanel] = useState(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden cursor-[url('/cursor-apuinti.png'),_auto]">
      {/* HUD */}
      <GameHUD
        ecosystem={75}
        water={60}
        energy={70}
        biodiversity={80}
        sustainability={65}
        region="costa"
      />

      {/* Fondo */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1610046932034-fc8170d01155?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Costa peruana"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-200/40 via-transparent to-costa/40"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen p-8 pt-32 pb-24 overflow-y-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-tierra drop-shadow-lg mb-2">
            🏖️ Región Costa
          </h2>
          <p className="text-lg text-tierra/80">
            Misiones del Guardián Apu Inti para proteger los ecosistemas costeros del Perú
          </p>
        </div>

        {/* Misiones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Misión 1 */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 game-shadow border border-yellow-200/60 transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2">
            <h3 className="font-bold text-tierra text-xl mb-2">🌞 Misión 1: El Desafío del Saber</h3>
            <p className="text-sm text-tierra/70 mb-4">
              Responde correctamente las preguntas para evitar la sequía en los valles costeros.
            </p>
            <GameButton variant="primary" size="sm" onClick={() => onNavigate("costa-m1")} className="w-full">
              Iniciar misión
            </GameButton>
          </div>

          {/* Misión 2 */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 game-shadow border border-yellow-200/60 transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2">
            <h3 className="font-bold text-tierra text-xl mb-2">🐟 Misión 2: Pesca Responsable</h3>
            <p className="text-sm text-tierra/70 mb-4">
              Aprende sobre el impacto del calentamiento del mar en la pesca. Solo pesca lo necesario para mantener el equilibrio ecológico del océano.
            </p>
            <GameButton
              variant="primary"
              size="sm"
              onClick={() => onNavigate("costa-m2")}
              className="w-full"
            >
              Iniciar misión
            </GameButton>
          </div>

          {/* Misión 3 */}
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 game-shadow border border-yellow-200/60 transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2">
            <h3 className="font-bold text-tierra text-xl mb-2">🧹 Misión 3: Limpieza de Playas y Ríos</h3>
            <p className="text-sm text-tierra/70 mb-4">
              Elimina la basura de las playas antes de que llegue al mar y afecte la vida marina.
            </p>
            <GameButton variant="secondary" size="sm" onClick={() => onNavigate("costa-m3")} className="w-full">
              Iniciar misión
            </GameButton>
          </div>
        </div>
      </div>

      {/* Panel de datos */}
      <DataPanel
        title="Datos Satelitales - Costa"
        data={[
          { label: "Lluvia promedio Lima", value: "200 mm/año" },
          { label: "Temperatura El Niño", value: "+6 °C" },
          { label: "Basura marina", value: "80% proviene de tierra" },
        ]}
        isVisible={showDataPanel}
        onClose={() => setShowDataPanel(false)}
      />

      {/* Botón fijo para volver al mapa */}
      <div className="absolute bottom-8 left-8">
        <GameButton variant="secondary" onClick={() => onNavigate("map")}>
          ← Volver al Mapa
        </GameButton>
      </div>
    </div>
  );
}
