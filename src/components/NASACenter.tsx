// NASACenter.tsx
import { useMemo, useState } from "react";
import { GameButton } from "./GameButton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";

interface NASACenterProps {
  onNavigate: (scene: string) => void;
}

type SatelliteStatus = "good" | "warning" | "danger" | "info";

export function NASACenter({ onNavigate }: NASACenterProps) {
  const [selectedData, setSelectedData] = useState<string | null>(null);

  const missionProgress = [
    { region: "Costa", progress: 70, status: "En progreso", color: "costa" },
    { region: "Sierra", progress: 45, status: "Iniciado", color: "sierra" },
    { region: "Selva", progress: 85, status: "Casi completo", color: "selva" }
  ];

  const satelliteData: Array<{
    id: string;
    title: string;
    value: string;
    description: string;
    region: string;
    status: SatelliteStatus;
  }> = [
    {
      id: "ndvi",
      title: "Índice de Vegetación (NDVI)",
      value: "0.65",
      description: "Salud de la vegetación medida por satélites",
      region: "Nacional",
      status: "good",
    },
    {
      id: "precipitation",
      title: "Precipitación",
      value: "1,250 mm",
      description: "Lluvia anual promedio",
      region: "Nacional",
      status: "warning",
    },
    {
      id: "temperature",
      title: "Temperatura",
      value: "18.5°C",
      description: "Temperatura promedio nacional",
      region: "Nacional",
      status: "warning",
    },
    {
      id: "deforestation",
      title: "Deforestación",
      value: "2.1%",
      description: "Pérdida de bosques anual",
      region: "Amazonía",
      status: "danger",
    },
    {
      id: "estres_hidrico",
      title: "Estrés Hídrico",
      value: "800 m³",
      description: "Disminución de producción agrícola",
      region: "Amazonía",
      status: "danger",
    },
  ];

  const dataAssets = useMemo(() => ({
    ndvi: {
      src: "/maps/ndvi.jpg",
      legend: "NDVI (0–1) • Verde = vegetación sana",
      resolution: "250–500 m (ej.)",
      source: "MODIS / VIIRS",
    },
    precipitation: {
      src: "/maps/precipitation.jpg",
      legend: "Precipitación acumulada",
      resolution: "10–25 km (ej.)",
      source: "GPM IMERG",
    },
    temperature: {
      src: "/maps/temperature.jpg",
      legend: "Temperatura superficial (°C)",
      resolution: "1 km (ej.)",
      source: "MODIS LST",
    },
    deforestation: {
      src: "/maps/deforestation.jpg",
      legend: "Pérdida de cobertura (año)",
      resolution: "30 m (ej.)",
      source: "Landsat",
    },
    estres_hidrico: {
      src: "/maps/estres_hidrico.jpg",
      legend: "Índice de estrés hídrico",
      resolution: "9–36 km (ej.)",
      source: "SMAP/Modelos",
    },
  }), []);

  const getStatusColor = (status: SatelliteStatus) => {
    switch (status) {
      case "good": return "bg-green-500";
      case "warning": return "bg-yellow-500";
      case "danger": return "bg-red-500";
      default: return "bg-blue-500";
    }
  };

  const selectedItem = selectedData
    ? satelliteData.find(d => d.id === selectedData)
    : null;

  const asset = selectedData ? (dataAssets as any)[selectedData] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Header */}
      <div className="relative z-10 p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-cyan-300 mb-4">📡 Centro NASA</h1>
          <p className="text-xl text-blue-200">Sala de Control de Monitoreo Satelital</p>
          <div className="flex items-center justify-center mt-4 gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-green-400">Sistema Operativo</span>
          </div>
        </div>

        {/* Dashboard principal */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Progreso de misiones */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/80 backdrop-blur-sm border-cyan-400/30 game-shadow">
              <CardHeader>
                <CardTitle className="text-cyan-300 flex items-center gap-2">🎯 Progreso de Misiones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {missionProgress.map((mission, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white font-medium">{mission.region}</span>
                      <Badge variant="secondary" className="text-xs">{mission.status}</Badge>
                    </div>
                    <Progress value={mission.progress} className="h-2" />
                    <div className="text-right text-sm text-blue-200">{mission.progress}% completo</div>
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

          {/* Paneles de datos */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/80 backdrop-blur-sm border-cyan-400/30 game-shadow">
              <CardHeader>
                <CardTitle className="text-cyan-300 flex items-center gap-2">🌍 Datos Satelitales en Tiempo Real</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {satelliteData.map((data) => (
                    <button
                      key={data.id}
                      className="text-left p-4 bg-slate-700/50 rounded-lg border border-slate-600/50 hover:border-cyan-400/50 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      onClick={() => setSelectedData(data.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">{data.title}</h4>
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(data.status)}`} />
                      </div>
                      <div className="text-2xl font-bold text-cyan-300 mb-1">{data.value}</div>
                      <p className="text-sm text-blue-200 mb-2">{data.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-400">{data.region}</span>
                        <span className="text-xs text-cyan-400 underline underline-offset-2">
                          Ver detalles →
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-center gap-4 mt-8">
          <GameButton
            variant="primary"
            onClick={() => onNavigate("map")}
            className="bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            🌍 Ir al Mapa de Misiones
          </GameButton>
          <GameButton
            variant="secondary"
            onClick={() => onNavigate("menu")}
            className="bg-slate-700 hover:bg-slate-600 text-white"
          >
            ← Menú Principal
          </GameButton>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-400 text-sm">
          <p>Datos proporcionados por NASA Earth Observing System</p>
          <p className="mt-1">🛰️ Landsat 8 • MODIS • VIIRS • GPM</p>
        </div>
      </div>

      {/* ===== Modal de Detalles con Mapa Centrado ===== */}
      {selectedItem && asset && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-4xl bg-slate-900 border border-cyan-400/30 rounded-xl overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
              <h3 className="text-lg md:text-xl font-semibold text-cyan-300 flex items-center gap-2">
                🛰️ {selectedItem.title}
              </h3>
              <button
                className="text-slate-300 hover:text-white px-3 py-1 rounded-md hover:bg-slate-800"
                onClick={() => setSelectedData(null)}
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            <div className="p-4 md:p-6">
              <div className="relative w-full flex justify-center items-center">
                <div className="max-w-full max-h-[60vh] overflow-hidden rounded-lg bg-black flex justify-center items-center">
                  <img
                    src={asset.src}
                    alt={`Mapa satelital: ${selectedItem.title}`}
                    className="w-auto h-auto max-w-full max-h-[60vh] object-contain"
                  />
                </div>

                {/* Leyenda flotante */}
                <div className="absolute bottom-3 left-3 right-3 bg-black/60 text-cyan-200 text-xs md:text-sm rounded-md px-3 py-2 backdrop-blur">
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    <span className="font-medium">{asset.legend}</span>
                    <span>• Resolución: {asset.resolution}</span>
                    <span>• Fuente: {asset.source}</span>
                  </div>
                </div>
              </div>

              {/* Metadatos y acciones */}
              <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="text-sm text-blue-200">
                  {selectedItem.description} — Región: {selectedItem.region}
                </div>
                <div className="flex gap-2">
                  <GameButton
                    variant="primary"
                    onClick={() => { setSelectedData(null); onNavigate("map"); }}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white"
                  >
                    🗺️ Ver en Mapa de Misiones
                  </GameButton>x
                  <GameButton
                    variant="secondary"
                    onClick={() => setSelectedData(null)}
                    className="bg-slate-700 hover:bg-slate-600 text-white"
                  >
                    Cerrar
                  </GameButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ===== Fin Modal ===== */}
    </div>
  );
}
