import React, { useRef, useState } from "react";
import { GameButton } from "./GameButton";
import { GameHUD } from "./GameHUD";
import { ImageWithFallback } from './figma/ImageWithFallback';
import personaje from '../assets/muñeco.png';
import mapaPeru from '../assets/mapaPeru.jpg';
import { useLanguage } from "../context/LanguageContext";

interface PeruMapProps {
  onNavigate: (scene: string) => void;
}

export function PeruMap({ onNavigate }: PeruMapProps) {
  const { t } = useLanguage();

  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [characterPos, setCharacterPos] = useState<{ left: string; top: string; offsetY: number }>({ left: '50%', top: '80%', offsetY: 0 });
  const [footprints, setFootprints] = useState<Array<{ left: string; top: string; rotate: number; scale: number; opacity: number }>>([]);
  const isAnimatingRef = useRef(false);

  const regions = [
    { id: "costa", name: t.peruMap.costaScene.title, emoji: "🏖️", description: t.peruMap.costaScene.description, leftP: 7, topP: 45, color: "costa" },
    { id: "sierra", name: t.peruMap.sierraScene.title, emoji: "🏔️", description: t.peruMap.sierraScene.description, leftP: 50, topP: 15, color: "sierra" },
    { id: "selva", name: t.peruMap.selvaScene.title, emoji: "🌳", description: t.peruMap.selvaScene.description, leftP: 92, topP: 50, color: "selva" }
  ];

  const moveCharacterToRegion = (regionId: string) => {
    if (isAnimatingRef.current) return;
    const targets: Record<string, { leftP: number; topP: number }> = {
      costa: { leftP: 25, topP: 50 },
      sierra: { leftP: 50, topP: 33 },
      selva: { leftP: 75, topP: 50 },
    };
    const startLeft = parseFloat(characterPos.left);
    const startTop = parseFloat(characterPos.top);
    const target = targets[regionId];
    if (!target) return;

    const cp = { x: (startLeft + target.leftP) / 2 + (Math.random() * 10 - 5), y: (startTop + target.topP) / 2 - 10 - (Math.random() * 6) };
    const durationMs = 1000;
    const hopHeightPx = 22;
    const steps = 32;
    const startTime = performance.now();
    isAnimatingRef.current = true;

    const makeFoot = (xP: number, yP: number) => {
      setFootprints(prev => [...prev, { left: `${xP}%`, top: `${yP}%`, rotate: Math.random() * 40 - 20, scale: 0.8 + Math.random() * 0.4, opacity: 0.9 + Math.random() * 0.1 }]);
    };

    let lastPlaced = -1;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / durationMs);
      const oneMinusT = 1 - t;
      const x = oneMinusT * oneMinusT * startLeft + 2 * oneMinusT * t * cp.x + t * t * target.leftP;
      const y = oneMinusT * oneMinusT * startTop + 2 * oneMinusT * t * cp.y + t * t * target.topP;
      const offsetY = -Math.sin(Math.PI * t) * hopHeightPx;
      setCharacterPos({ left: `${x}%`, top: `${y}%`, offsetY });

      const stepIndex = Math.floor(t * steps);
      if (stepIndex !== lastPlaced && stepIndex % 3 === 0) {
        lastPlaced = stepIndex;
        makeFoot(x + (Math.random() * 2 - 1), y + (Math.random() * 2 - 1));
      }

      if (t < 1) requestAnimationFrame(tick);
      else isAnimatingRef.current = false;
    };

    requestAnimationFrame(tick);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <GameHUD ecosystem={25} water={60} energy={40} biodiversity={30} sustainability={35} showCompass={true} />

      {/* Fondo con imagen local */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={mapaPeru}
          alt="Mapa satelital del Perú"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-tierra/30"></div>
      </div>

      {/* Huellas */}
      {footprints.map((fp, idx) => (
        <div key={idx} className="absolute z-10 select-none pointer-events-none" style={{ left: fp.left, top: fp.top, transform: `translate(-50%, -50%) rotate(${fp.rotate}deg) scale(${fp.scale})`, opacity: fp.opacity }}>
          <div className="relative drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]">
            <div className="w-2 h-3 bg-cyan-400 rounded-full"></div>
            <div className="w-1 h-1 bg-cyan-300 rounded-full absolute -top-1 left-1/2 -translate-x-1/2"></div>
          </div>
        </div>
      ))}

      {/* Personaje */}
      <div className="absolute z-20" style={{ left: characterPos.left, top: characterPos.top, transform: `translate(-50%, -50%) translateY(${characterPos.offsetY}px)` }}>
        <div className="relative">
          <img src={personaje} alt="Apu Inti" className="h-16 max-h-20 min-h-12 w-auto object-contain select-none pointer-events-none" />
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-black/20 rounded-full blur-sm"></div>
        </div>
      </div>

      {/* Título y subtítulo del mapa */}
      <div className="relative z-10 h-screen p-8 pt-32">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.7)] mb-2">{t.peruMap.mapTitle}</h2>
          <p className="text-lg text-white drop-shadow-[0_0_6px_rgba(0,0,0,0.6)]">{t.peruMap.chooseRegion}</p>
        </div>

        {/* Regiones */}
        <div className="relative h-96 max-w-4xl mx-auto">
          {regions.map((region) => (
            <div key={region.id} className="absolute transform -translate-x-1/2 -translate-y-1/2" style={{ left: `${region.leftP}%`, top: `${region.topP}%` }}>
              <div className="relative cursor-pointer transition-all duration-300" onClick={() => { setSelectedRegion(region.id); moveCharacterToRegion(region.id); }}>
                <div className={`absolute inset-0 bg-${region.color} rounded-full animate-ping opacity-30`}></div>
                <div className={`relative w-16 h-16 bg-${region.color} rounded-full flex items-center justify-center game-shadow`}>
                  <span className="text-2xl">{region.emoji}</span>
                </div>
              </div>

              {selectedRegion === region.id && (
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-64 bg-white/95 backdrop-blur-sm rounded-xl p-4 game-shadow animate-fade-in">
                  <h3 className="font-bold text-tierra mb-2">{region.name}</h3>
                  <p className="text-sm text-tierra/70 mb-4">{region.description}</p>
                  <div className="space-y-2">
                    <GameButton variant={region.color as 'costa' | 'sierra' | 'selva'} size="sm" onClick={() => onNavigate(region.id)} className="w-full">
                      {t.peruMap.goToRegion} {region.name}
                    </GameButton>
                    <GameButton variant="secondary" size="sm" onClick={() => setSelectedRegion(null)} className="w-full">
                      ← Cerrar
                    </GameButton>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Botones fijos abajo */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between">
          <GameButton variant="secondary" onClick={() => onNavigate('menu')}>{t.peruMap.mainMenuBtn}</GameButton>
          <GameButton variant="primary" onClick={() => onNavigate('nasa')}>{t.peruMap.nasaBtn}</GameButton>
        </div>
      </div>
    </div>
  );
}
