import { useState } from "react";
import { GameButton } from "./GameButton";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from "../context/LanguageContext";

interface MainMenuProps {
  onNavigate: (scene: string) => void;
}

export function MainMenu({ onNavigate }: MainMenuProps) {
  const { language, setLanguage, t } = useLanguage();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const toggleLanguageMenu = () => setShowLangMenu(prev => !prev);

  const changeLanguage = (lang: "es" | "en") => {
    setLanguage(lang);
    setShowLangMenu(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1580380598975-31777043edc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Mapa del Perú"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-tierra/40"></div>
        
        {/* Animated clouds */}
        <div className="absolute top-20 left-10 text-6xl opacity-70 animate-pulse">☁️</div>
        <div className="absolute top-32 right-20 text-4xl opacity-60 animate-pulse delay-1000">☁️</div>
        <div className="absolute top-40 left-1/3 text-5xl opacity-50 animate-pulse delay-2000">☁️</div>
        
        {/* Animated sun */}
        <div className="absolute top-16 right-16 text-8xl animate-pulse">☀️</div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Logo and title */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="inline-block p-6 rounded-full bg-gradient-to-br from-primary to-accent game-shadow">
              <span className="text-6xl">🏔️</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-tierra mb-4 drop-shadow-2xl">
            Apu Inti
          </h1>
          <p className="text-xl md:text-2xl text-tierra/80 font-medium drop-shadow-lg">
            Guardián del Perú
          </p>
          
          <div className="flex items-center justify-center mt-4 gap-4">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <span className="text-2xl">🌿</span>
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </div>
        </div>

        {/* Menu buttons */}
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <GameButton 
            variant="primary" 
            size="lg"
            onClick={() => onNavigate('intro')}
            className="w-full"
          >
            {t.mainMenu.play}
          </GameButton>
          
          <GameButton 
            variant="secondary" 
            size="lg"
            onClick={() => onNavigate('nasa')}
            className="w-full"
          >
            {t.mainMenu.nasa}
          </GameButton>
          
          {/* Botón de Lenguaje */}
          <div className="relative w-full">
            <GameButton 
              variant="costa" 
              size="md"
              onClick={toggleLanguageMenu}
              className="w-full"
            >
              {t.mainMenu.language}
            </GameButton>

            {showLangMenu && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white/90 backdrop-blur-sm rounded-xl p-2 flex flex-col gap-2 game-shadow z-20">
                <GameButton variant="secondary" size="sm" onClick={() => changeLanguage("es")}>
                  Español
                </GameButton>
                <GameButton variant="secondary" size="sm" onClick={() => changeLanguage("en")}>
                  English
                </GameButton>
              </div>
            )}
          </div>
          
          <GameButton 
            variant="selva" 
            size="md"
            onClick={() => {}}
            className="w-full"
          >
            {t.mainMenu.credits}
          </GameButton>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-sm text-tierra/60">
            {t.mainMenu.footer}
          </p>
          <p className="text-xs text-tierra/40 mt-1">
            {t.mainMenu.footer2}
          </p>
        </div>
      </div>
    </div>
  );
}
