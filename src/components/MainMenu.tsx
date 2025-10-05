import { GameButton } from "./GameButton";
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MainMenuProps {
  onNavigate: (scene: string) => void;
}

export function MainMenu({ onNavigate }: MainMenuProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1580380598975-31777043edc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQZXJ1JTIwbWFwJTIwc2F0ZWxsaXRlJTIwdmlld3xlbnwxfHx8fDE3NTk2MTg5Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
          
          {/* Decorative elements */}
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
            🎮 Jugar
          </GameButton>
          
          <GameButton 
            variant="secondary" 
            size="lg"
            onClick={() => onNavigate('nasa')}
            className="w-full"
          >
            📡 Centro NASA
          </GameButton>
          
          <GameButton 
            variant="costa" 
            size="md"
            onClick={() => {}}
            className="w-full"
          >
            ⚙️ Opciones
          </GameButton>
          
          <GameButton 
            variant="selva" 
            size="md"
            onClick={() => {}}
            className="w-full"
          >
            ℹ️ Créditos
          </GameButton>
        </div>

        {/* Bottom decorative text */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-sm text-tierra/60">
            Un juego educativo sobre conservación ambiental
          </p>
          <p className="text-xs text-tierra/40 mt-1">
            Con datos reales de la NASA 🛰️
          </p>
        </div>
      </div>
    </div>
  );
}