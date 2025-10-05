import { useState } from "react";
import { GameButton } from "./GameButton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

interface NASACenterProps {
  onNavigate: (scene: string) => void;
}

export function NASACenter({ onNavigate }: NASACenterProps) {
  const [selectedData, setSelectedData] = useState<string | null>(null);

  const missionProgress = [
    { region: "Costa", progress: 70, status: "En progreso", color: "costa" },
    { region: "Sierra", progress: 45, status: "Iniciado", color: "sierra" },
    { region: "Selva", progress: 85, status: "Casi completo", color: "selva" }
  ];

  const satelliteData = [
    {
      id: "ndvi",
      title: "Índice de Vegetación (NDVI)",
      value: "0.65",
      description: "Salud de la vegetación medida por satélites",
      region: "Nacional",
      status: "good"
    },
    {
      id: "precipitation",
      title: "Precipitación",
      value: "1,250 mm",
      description: "Lluvia anual promedio",
      region: "Nacional",
      status: "warning"
    },
    {
      id: "temperature",
      title: "Temperatura",
      value: "18.5°C",
      description: "Temperatura promedio nacional",
      region: "Nacional",
      status: "warning"
    },
    {
      id: "deforestation",
      title: "Deforestación",
      value: "2.1%",
      description: "Pérdida de bosques anual",
      region: "Amazonía",
      status: "danger"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "bg-green-500";
      case "warning": return "bg-yellow-500";
      case "danger": return "bg-red-500";
      default: return "bg-blue-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Futuristic background elements */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-20" 
             style={{
               backgroundImage: 'linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)',
               backgroundSize: '50px 50px'
             }}>
        </div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-cyan-300 rounded-full animate-pulse delay-1000"></div>
        
        {/* Satellite orbital paths */}
        <div className="absolute top-16 right-16 text-3xl animate-bounce">🛰️</div>
        <div className="absolute top-32 left-16 text-2xl animate-bounce delay-1000">🛰️</div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-cyan-300 mb-4">
            📡 Centro NASA
          </h1>
          <p className="text-xl text-blue-200">
            Sala de Control de Monitoreo Satelital
          </p>
          <div className="flex items-center justify-center mt-4 gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-400">Sistema Operativo</span>
          </div>
        </div>

        {/* Main dashboard */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mission progress */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/80 backdrop-blur-sm border-cyan-400/30 game-shadow">
              <CardHeader>
                <CardTitle className="text-cyan-300 flex items-center gap-2">
                  🎯 Progreso de Misiones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {missionProgress.map((mission, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white font-medium">{mission.region}</span>
                      <Badge variant="secondary" className="text-xs">
                        {mission.status}
                      </Badge>
                    </div>
                    <Progress value={mission.progress} className="h-2" />
                    <div className="text-right text-sm text-blue-200">
                      {mission.progress}% completo
                    </div>
                  </div>
                ))}
                
                <div className="mt-6 p-4 bg-blue-900/50 rounded-lg">
                  <h4 className="text-cyan-300 font-medium mb-2">Impacto Total</h4>
                  <div className="text-2xl font-bold text-white">67%</div>
                  <div className="text-sm text-blue-200">Restauración del ecosistema peruano</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Satellite data panels */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/80 backdrop-blur-sm border-cyan-400/30 game-shadow">
              <CardHeader>
                <CardTitle className="text-cyan-300 flex items-center gap-2">
                  🌍 Datos Satelitales en Tiempo Real
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {satelliteData.map((data) => (
                    <div 
                      key={data.id}
                      className="p-4 bg-slate-700/50 rounded-lg border border-slate-600/50 hover:border-cyan-400/50 transition-all cursor-pointer"
                      onClick={() => setSelectedData(data.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">{data.title}</h4>
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(data.status)}`}></div>
                      </div>
                      
                      <div className="text-2xl font-bold text-cyan-300 mb-1">
                        {data.value}
                      </div>
                      
                      <p className="text-sm text-blue-200 mb-2">
                        {data.description}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-400">{data.region}</span>
                        <span className="text-xs text-cyan-400">Ver detalles →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Interactive map */}
        <div className="mt-8 max-w-4xl mx-auto">
          <Card className="bg-slate-800/80 backdrop-blur-sm border-cyan-400/30 game-shadow">
            <CardHeader>
              <CardTitle className="text-cyan-300 flex items-center gap-2">
                🗺️ Mapa Satelital Interactivo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-64 bg-gradient-to-br from-green-900 via-yellow-900 to-blue-900 rounded-lg overflow-hidden">
                {/* Stylized Peru map */}
                <div className="absolute inset-4 border-2 border-cyan-400/50 rounded-lg">
                  <div className="relative h-full">
                    {/* Costa region */}
                    <div className="absolute left-2 top-1/2 w-8 h-12 bg-costa/70 rounded transform -translate-y-1/2">
                      <div className="text-center pt-2 text-xs text-white">🏖️</div>
                    </div>
                    
                    {/* Sierra region */}
                    <div className="absolute left-1/2 top-1/3 w-8 h-12 bg-sierra/70 rounded transform -translate-x-1/2">
                      <div className="text-center pt-2 text-xs text-white">🏔️</div>
                    </div>
                    
                    {/* Selva region */}
                    <div className="absolute right-2 top-1/2 w-8 h-12 bg-selva/70 rounded transform -translate-y-1/2">
                      <div className="text-center pt-2 text-xs text-white">🌳</div>
                    </div>
                  </div>
                </div>
                
                {/* Data overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded p-2">
                  <div className="flex justify-between text-xs text-cyan-300">
                    <span>Cobertura: 98.5%</span>
                    <span>Resolución: 30m</span>
                    <span>Actualizado: Hoy</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <GameButton
            variant="primary"
            onClick={() => onNavigate('map')}
            className="bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            🌍 Ir al Mapa de Misiones
          </GameButton>
          
          <GameButton
            variant="secondary"
            onClick={() => onNavigate('menu')}
            className="bg-slate-700 hover:bg-slate-600 text-white"
          >
            ← Menú Principal
          </GameButton>
        </div>

        {/* Footer info */}
        <div className="text-center mt-8 text-slate-400 text-sm">
          <p>Datos proporcionados por NASA Earth Observing System</p>
          <p className="mt-1">🛰️ Landsat 8 • MODIS • VIIRS • GPM</p>
        </div>
      </div>
    </div>
  );
}