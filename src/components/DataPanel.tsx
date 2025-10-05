import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface DataPanelProps {
  title: string;
  data: {
    label: string;
    value: string;
    unit?: string;
    status?: "good" | "warning" | "danger";
  }[];
  isVisible: boolean;
  onClose: () => void;
}

export function DataPanel({ title, data, isVisible, onClose }: DataPanelProps) {
  if (!isVisible) return null;

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "good":
        return "bg-green-500";
      case "warning":
        return "bg-yellow-500";
      case "danger":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md game-shadow">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            📡 {title}
          </CardTitle>
          <button 
            onClick={onClose}
            className="text-tierra/60 hover:text-tierra transition-colors"
          >
            ✕
          </button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-tierra/70">Datos en tiempo real de NASA</span>
          </div>
          
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-tierra">{item.label}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg font-bold text-primary">
                    {item.value}
                  </span>
                  {item.unit && (
                    <span className="text-sm text-tierra/70">{item.unit}</span>
                  )}
                  {item.status && (
                    <Badge variant="secondary" className="ml-auto">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(item.status)} mr-1`}></div>
                      {item.status}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-tierra/60 text-center">
              Fuente: NASA Earth Observing System
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}