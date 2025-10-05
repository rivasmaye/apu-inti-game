import { GameButton } from "./GameButton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FinalSceneProps {
  onNavigate: (scene: string) => void;
}

export function FinalScene({ onNavigate }: FinalSceneProps) {
  const finalStats = [
    { label: "Ecosistema Restaurado", value: 87, icon: "🌿", color: "green" },
    { label: "Agua Conservada", value: 92, icon: "💧", color: "blue" },
    { label: "Biodiversidad Protegida", value: 78, icon: "🦋", color: "purple" },
    { label: "CO₂ Capturado", value: 85, icon: "🌳", color: "green" },
    { label: "Comunidades Beneficiadas", value: 156, icon: "👥", color: "orange", isCount: true },
    { label: "Hectáreas Restauradas", value: 2845, icon: "🌱", color: "green", isCount: true }
  ];

  const achievements = [
    { title: "Guardián de la Costa", description: "Restauraste los cultivos del desierto", icon: "🏖️" },
    { title: "Protector de los Andes", description: "Salvaste las terrazas andinas", icon: "🏔️" },
    { title: "Héroe del Amazonas", description: "Protegiste la biodiversidad", icon: "🌳" },
    { title: "Maestro de Datos", description: "Usaste tecnología NASA", icon: "📡" },
    { title: "Embajador Ambiental", description: "Completaste todas las misiones", icon: "🏆" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background - Restored Peru landscape */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1670215945174-3b5c2f22aa8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQZXJ1JTIwbGFuZHNjYXBlJTIwQW5kZXMlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzU5NjE4OTY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Perú restaurado"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/30 via-transparent to-primary/40"></div>
        
        {/* Celebration particles */}
        <div className="absolute top-20 left-20 text-3xl animate-bounce">⭐</div>
        <div className="absolute top-32 right-32 text-2xl animate-bounce delay-300">✨</div>
        <div className="absolute top-40 left-1/3 text-3xl animate-bounce delay-600">🎉</div>
        <div className="absolute bottom-32 right-1/4 text-2xl animate-bounce delay-900">🌟</div>
        
        {/* Rainbow */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-6xl">🌈</div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen p-8 pt-24">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="inline-block p-6 rounded-full bg-gradient-to-br from-yellow-400 to-green-500 game-shadow animate-pulse">
              <span className="text-6xl">🏆</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-tierra mb-4 drop-shadow-2xl">
            ¡Misión Cumplida!
          </h1>
          <p className="text-xl md:text-2xl text-tierra/80 font-medium drop-shadow-lg">
            Has restaurado el equilibrio del Perú
          </p>
          
          {/* Character celebration */}
          <div className="mt-8 flex justify-center">
            <div className="relative">
              <span className="text-6xl animate-bounce">🧑‍🌾</span>
              <div className="absolute -top-4 -right-2 text-2xl animate-spin">✨</div>
              <div className="absolute -top-2 -left-4 text-xl animate-ping">🌟</div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="max-w-6xl mx-auto mb-8">
          <Card className="game-shadow bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center text-tierra flex items-center justify-center gap-2">
                📊 Impacto de tu Misión
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {finalStats.map((stat, index) => (
                  <div key={index} className="text-center space-y-3">
                    <div className="text-4xl">{stat.icon}</div>
                    <h3 className="font-semibold text-tierra">{stat.label}</h3>
                    
                    {stat.isCount ? (
                      <div className="text-3xl font-bold text-primary">
                        {stat.value.toLocaleString()}
                      </div>
                    ) : (
                      <>
                        <Progress value={stat.value} className="h-3" />
                        <div className="text-2xl font-bold text-primary">
                          {stat.value}%
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="game-shadow bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-center text-tierra flex items-center justify-center gap-2">
                🏅 Logros Desbloqueados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div>
                      <h4 className="font-semibold text-tierra">{achievement.title}</h4>
                      <p className="text-sm text-tierra/70">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-4">
            <GameButton
              variant="primary"
              size="lg"
              onClick={() => onNavigate('map')}
              className="animate-pulse"
            >
              🔄 Jugar de Nuevo
            </GameButton>
            
            <GameButton
              variant="secondary"
              size="lg"
              onClick={() => onNavigate('nasa')}
            >
              📊 Ver Datos Reales
            </GameButton>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            <GameButton
              variant="costa"
              onClick={() => alert('¡Logro compartido en redes sociales!')}
            >
              📱 Compartir Logro
            </GameButton>
            
            <GameButton
              variant="selva"
              onClick={() => alert('¡Certificado de Guardián del Perú descargado!')}
            >
              📜 Descargar Certificado
            </GameButton>
            
            <GameButton
              variant="sierra"
              onClick={() => onNavigate('menu')}
            >
              🏠 Menú Principal
            </GameButton>
          </div>
        </div>

        {/* Final message */}
        <div className="text-center mt-12 max-w-2xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 game-shadow">
            <h3 className="font-bold text-tierra mb-3">🌍 Mensaje Final</h3>
            <p className="text-tierra/80 leading-relaxed">
              Gracias a tu dedicación como <strong>Apu Inti</strong>, el Guardián del Perú, 
              has demostrado que la tecnología y la sabiduría ancestral pueden trabajar juntas 
              para proteger nuestro planeta. Los datos de la NASA y el conocimiento de nuestros 
              ancestros nos muestran el camino hacia un futuro sostenible.
            </p>
            
            <div className="mt-4 p-3 bg-primary/10 rounded-lg">
              <p className="text-sm text-tierra/70">
                🛰️ <strong>Datos reales de NASA</strong> • 🌿 <strong>Cultura peruana</strong> • 
                🎮 <strong>Educación ambiental</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}