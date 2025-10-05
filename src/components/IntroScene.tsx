import React, { useState, useEffect } from "react";
import { GameButton } from "./GameButton";
import { ImageWithFallback } from './figma/ImageWithFallback';
import personaje from '../assets/muñeco.png';

interface IntroSceneProps {
  onNavigate: (scene: string) => void;
}

export function IntroScene({ onNavigate }: IntroSceneProps) {
  const [currentText, setCurrentText] = useState(0);
  const [showContinue, setShowContinue] = useState(false);

  const storyTexts = [
    "En las altas montañas de los Andes, donde los antiguos dioses vigilan el equilibrio del mundo...",
    "Un joven cholito llamado Apu Inti recibe una visión del Oráculo Celeste.",
    "Los satélites de la NASA han detectado que el equilibrio ambiental del Perú está en peligro.",
    "La costa se está secando, las montañas pierden su nieve, y la selva se está fragmentando.",
    "Solo tú puedes restaurar la armonía entre la Pachamama y los datos del cielo.",
    "¡Acepta esta misión sagrada y conviértete en el Guardián del Perú!"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentText < storyTexts.length - 1) {
        setCurrentText(currentText + 1);
      } else {
        setShowContinue(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentText, storyTexts.length]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1670215945174-3b5c2f22aa8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQZXJ1JTIwbGFuZHNjYXBlJTIwQW5kZXMlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzU5NjE4OTY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Cordillera Andina"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60"></div>
        
        {/* Animated stars */}
        <div className="absolute top-10 left-10 text-2xl animate-pulse">⭐</div>
        <div className="absolute top-20 right-20 text-xl animate-pulse delay-500">✨</div>
        <div className="absolute top-32 left-1/4 text-lg animate-pulse delay-1000">⭐</div>
        <div className="absolute top-40 right-1/3 text-xl animate-pulse delay-1500">✨</div>
        
        {/* Satellite */}
        <div className="absolute top-24 right-1/4 text-3xl animate-bounce">🛰️</div>
      </div>

      {/* Character illustration */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20">
        <div className="relative">
          {/* Character silhouette */}
          <div className="w-32 h-48 bg-gradient-to-t from-tierra/80 to-primary/60 rounded-t-full relative">
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              <img src={personaje} alt="Apu Inti" className="h-12 w-auto object-contain select-none pointer-events-none" />
            </div>
            {/* Traditional poncho pattern */}
            <div className="absolute inset-x-4 top-16 h-8 bg-gradient-to-r from-primary via-accent to-secondary opacity-80 rounded"></div>
            <div className="absolute inset-x-6 top-20 h-2 bg-tierra/60 rounded"></div>
          </div>
          
          {/* Mystical aura */}
          <div className="absolute -inset-8 bg-gradient-radial from-primary/20 via-accent/10 to-transparent rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Oráculo Celeste */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-10">
        <div className="relative">
          <div className="text-6xl animate-pulse">🌟</div>
          <div className="absolute -inset-4 bg-gradient-radial from-yellow-400/30 via-blue-400/20 to-transparent rounded-full animate-ping"></div>
        </div>
      </div>

      {/* Story text container */}
      <div className="relative z-30 flex flex-col items-center justify-center min-h-screen p-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Story text */}
          <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 mb-8 game-shadow">
            <p className="text-lg md:text-xl text-white leading-relaxed font-medium">
              {storyTexts[currentText]}
            </p>
            
            {/* Progress indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {storyTexts.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index <= currentText ? 'bg-primary' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Continue / Skip buttons */}
          {showContinue && (
            <div className="space-y-4 animate-fade-in">
              <GameButton 
                variant="primary" 
                size="lg"
                onClick={() => onNavigate('map')}
                className="animate-pulse"
              >
                🌄 Comenzar Aventura
              </GameButton>
              
              <div className="flex gap-4 justify-center">
                <GameButton 
                  variant="secondary" 
                  size="md"
                  onClick={() => onNavigate('menu')}
                >
                  ← Volver al Menú
                </GameButton>
                
                <GameButton 
                  variant="costa" 
                  size="md"
                  onClick={() => setCurrentText(0)}
                >
                  🔄 Ver Otra Vez
                </GameButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}