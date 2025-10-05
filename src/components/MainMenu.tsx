import { useState } from "react";
import { GameButton } from "./GameButton";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from "../context/LanguageContext";
import mapaInicial from '../assets/mapaInicial.jpg'; // <-- tu imagen local

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
          src={mapaInicial} // <-- imagen local
          alt="Mapa Inicial"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-tierra/40"></div>
        
        </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Logo and title */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="inline-block p-6 rounded-full bg-gradient-to-br from-primary to-accent game-shadow">
              <span className="text-6xl">☀️</span> {/* <-- sol en lugar de montaña */}
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.7)] mb-4">
            Apu Inti
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-[0_0_6px_rgba(0,0,0,0.6)]">
            {t.mainMenu.guardian}
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
          <p className="text-sm text-white/80">
            {t.mainMenu.footer}
          </p>
          <p className="text-xs text-white/60 mt-1">
            {t.mainMenu.footer2}
          </p>
        </div>
      </div>
    </div>
  );
}
