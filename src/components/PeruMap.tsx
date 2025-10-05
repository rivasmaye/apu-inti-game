import React, { useRef } from "react";
import { useState } from "react";
import { GameButton } from "./GameButton";
import { GameHUD } from "./GameHUD";
import { ImageWithFallback } from './figma/ImageWithFallback';
import personaje from '../assets/muñeco.png';


interface PeruMapProps {
  onNavigate: (scene: string) => void;
  costaCompleted?: boolean;
  sierraCompleted?: boolean;
}

export function PeruMap({ onNavigate, costaCompleted = false, sierraCompleted = false }: PeruMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [characterPos, setCharacterPos] = useState<{ left: string; top: string; offsetY: number }>({ left: '50%', top: '80%', offsetY: 0 });
  const [footprints, setFootprints] = useState<Array<{ left: string; top: string; rotate: number; scale: number; opacity: number }>>([]);
  const isAnimatingRef = useRef(false);

  const regions = [
    {
      id: "costa",
      name: "Costa",
      emoji: "🏖️",
      description: "Desierto costero con cultivos de irrigación",
      leftP: 7,
      topP: 45,
      color: "costa",
      completion: 0
    },
    {
      id: "sierra",
      name: "Sierra",
      emoji: "🏔️",
      description: "Montañas andinas con terrazas agrícolas",
      leftP: 50,
      topP: 15,
      color: "sierra",
      completion: 0
    },
    {
      id: "selva",
      name: "Selva",
      emoji: "🌳",
      description: "Bosque amazónico biodiverso",
      leftP: 92,
      topP: 50,
      color: "selva",
      completion: 0
    }
  ];

  // Update marker accessibility based on costaCompleted
  const isRegionLocked = (regionId: string) => {
    if (regionId === 'costa') return false;
    if (regionId === 'sierra') return !costaCompleted;
    if (regionId === 'selva') return !(costaCompleted && sierraCompleted);
    return false;
  };

  const getLockText = (regionId: string) => {
    if (regionId === 'sierra') return '🔒 Completa Costa primero';
    if (regionId === 'selva') return '🔒 Completa Sierra primero';
    return '🔒 Bloqueado';
  };

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

    // Quadratic Bezier control point (adds curve/irregularity)
    const cp = {
      x: (startLeft + target.leftP) / 2 + (Math.random() * 10 - 5),
      y: (startTop + target.topP) / 2 - 10 - (Math.random() * 6),
    };

    const durationMs = 1000;
    const hopHeightPx = 22;
    const steps = 32;
    const startTime = performance.now();
    isAnimatingRef.current = true;

  const makeFoot = (xP: number, yP: number) => {
      setFootprints(prev => [
        ...prev,
        {
          left: `${xP}%`,
          top: `${yP}%`,
          rotate: Math.random() * 40 - 20,
          scale: 0.8 + Math.random() * 0.4,
          opacity: 0.9 + Math.random() * 0.1,
        }
      ]);
    };

    let lastPlaced = -1;

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / durationMs);
      // Quadratic Bezier interpolation
      const oneMinusT = 1 - t;
      const x = oneMinusT * oneMinusT * startLeft + 2 * oneMinusT * t * cp.x + t * t * target.leftP;
      const y = oneMinusT * oneMinusT * startTop + 2 * oneMinusT * t * cp.y + t * t * target.topP;
      const offsetY = -Math.sin(Math.PI * t) * hopHeightPx; // jump arc
      setCharacterPos({ left: `${x}%`, top: `${y}%`, offsetY });

      // Drop footprints every few steps on the ground path (without hop offset)
      const stepIndex = Math.floor(t * steps);
      if (stepIndex !== lastPlaced && stepIndex % 3 === 0) {
        lastPlaced = stepIndex;
        // Slight jitter to avoid a perfect straight line
        const jitterX = x + (Math.random() * 2 - 1);
        const jitterY = y + (Math.random() * 2 - 1);
        makeFoot(jitterX, jitterY);
      }

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        isAnimatingRef.current = false;
      }
    };

    requestAnimationFrame(tick);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Game HUD */}
      <GameHUD 
        ecosystem={25}
        water={60}
        energy={40}
        biodiversity={30}
        sustainability={35}
        showCompass={true}
      />

      {/* Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1580380598975-31777043edc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQZXJ1JTIwbWFwJTIwc2F0ZWxsaXRlJTIwdmlld3xlbnwxfHx8fDE3NTk2MTg5Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Mapa satelital del Perú"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-tierra/30"></div>
      </div>

      {/* Character Apu Inti */}
      {/* Footprints trail */}
      {footprints.map((fp, idx) => (
        <div
          key={idx}
          className="absolute z-10 select-none pointer-events-none"
          style={{ left: fp.left, top: fp.top, transform: `translate(-50%, -50%) rotate(${fp.rotate}deg) scale(${fp.scale})`, opacity: fp.opacity }}
        >
          <div className="relative drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]">
            <div className="w-2 h-3 bg-cyan-400 rounded-full"></div>
            <div className="w-1 h-1 bg-cyan-300 rounded-full absolute -top-1 left-1/2 -translate-x-1/2"></div>
          </div>
        </div>
      ))}

      {/* Character with hop offset */}
      <div className="absolute z-20" style={{ left: characterPos.left, top: characterPos.top, transform: `translate(-50%, -50%) translateY(${characterPos.offsetY}px)` }}>
        <div className="relative">
          <img src={personaje} alt="Apu Inti" className="h-16 max-h-20 min-h-12 w-auto object-contain select-none pointer-events-none" />
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-black/20 rounded-full blur-sm"></div>
        </div>
      </div>

      {/* Map content */}
      <div className="relative z-10 h-screen p-8 pt-32">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-tierra drop-shadow-lg mb-2">
            Mapa del Perú
          </h2>
          <p className="text-lg text-tierra/80">
            Elige una región para comenzar tu misión
          </p>
        </div>

        {/* Regions */}
        <div className="relative h-96 max-w-4xl mx-auto">
          {regions.map((region) => (
            <div
              key={region.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${region.leftP}%`, top: `${region.topP}%` }}
            >
              {/* Region marker */}
              <div
                className={`relative cursor-pointer transition-all duration-300 ${
                  selectedRegion === region.id ? 'scale-125' : 'hover:scale-110'
                }`}
                onClick={() => { setSelectedRegion(region.id); moveCharacterToRegion(region.id); }}
              >
                {/* Pulsing circle */}
                <div className={`absolute inset-0 bg-${region.color} rounded-full animate-ping opacity-30`}></div>
                
                {/* Main marker */}
                <div className={`relative w-16 h-16 ${isRegionLocked(region.id) ? 'bg-gray-400' : `bg-${region.color}`} rounded-full flex items-center justify-center game-shadow`}>
                  <span className="text-2xl" title={isRegionLocked(region.id) ? 'Bloqueado' : region.name}>{isRegionLocked(region.id) ? '🔒' : region.emoji}</span>
                </div>
                
                {/* Completion indicator */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center game-shadow">
                  <span className="text-xs font-bold text-tierra">{region.completion}%</span>
                </div>
              </div>

              {/* Region info panel */}
              {selectedRegion === region.id && (
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-64 bg-white/95 backdrop-blur-sm rounded-xl p-4 game-shadow animate-fade-in">
                  <h3 className="font-bold text-tierra mb-2">{region.name}</h3>
                  <p className="text-sm text-tierra/70 mb-4">{region.description}</p>
                  
                  <div className="space-y-2">
                    <GameButton
                      variant={region.color as 'costa' | 'sierra' | 'selva'}
                      size="sm"
                      onClick={() => { moveCharacterToRegion(region.id); if (!isRegionLocked(region.id)) onNavigate(region.id); }}
                      className="w-full"
                      disabled={isRegionLocked(region.id)}
                     >
                      {isRegionLocked(region.id) ? getLockText(region.id) : `🎯 Ir a ${region.name}`}
                    </GameButton>
                    
                    <GameButton
                      variant="secondary"
                      size="sm"
                      onClick={() => setSelectedRegion(null)}
                      className="w-full"
                     >
                      ← Cerrar
                    </GameButton>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Connection paths */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <path id="path1" d="M 25% 50% Q 37.5% 25% 50% 33%" fill="none" stroke="#573C26" strokeWidth="3" strokeDasharray="5,5" opacity="0.5"/>
              <path id="path2" d="M 50% 33% Q 62.5% 25% 75% 50%" fill="none" stroke="#573C26" strokeWidth="3" strokeDasharray="5,5" opacity="0.5"/>
            </defs>
            <use href="#path1"/>
            <use href="#path2"/>
          </svg>
        </div>

        {/* Navigation buttons */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between">
          <GameButton
            variant="secondary"
            onClick={() => onNavigate('menu')}
           >
            ← Menú Principal
          </GameButton>
          
          <GameButton
            variant="primary"
            onClick={() => onNavigate('nasa')}
           >
            📡 Centro NASA
          </GameButton>
        </div>
      </div>
    </div>
  );
}