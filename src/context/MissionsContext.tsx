import React, { createContext, useContext, ReactNode } from "react";
import { useLanguage } from "./LanguageContext";

// Preguntas de misiones traducibles
const missionsTranslations = {
  es: {
    costa: {
      m1: [
        {
          q: "Según el texto de la NASA, ¿qué dos factores relacionados con la gestión del agua y la agricultura pueden ser impulsados por los datos satelitales?",
          options: [
            "El precio de los fertilizantes y el costo del transporte",
            "La toma de decisiones y el cálculo de la producción de cultivos",
            "El rastreo de plagas y la instalación de paneles solares",
          ],
          correct: 1,
        },
        {
          q: "Los satélites de la NASA miden la 'verdosidad de la vegetación' y la 'temperatura de la tierra'. ¿Qué factor crucial se calcula con estos datos?",
          options: [
            "La velocidad del viento andino",
            "Los patrones de evaporación y la escorrentía del agua",
            "El nivel de dióxido de carbono en la atmósfera",
          ],
          correct: 1,
        },
        {
          q: "¿Cómo ayuda la información sobre eventos meteorológicos severos a proteger comunidades en la Amazonía?",
          options: [
            "Permite identificar especies de peces migrantes",
            "Ayuda a determinar las condiciones de cultivo y amenazas por inundaciones y sequías",
            "Mide la altura de los árboles para prevenir la tala ilegal",
          ],
          correct: 1,
        },
        {
          q: "¿Cuál es la vía principal por la cual la NASA hace disponibles sus datos medidos y modelados sobre la Tierra?",
          options: [
            "Solo informes confidenciales del gobierno",
            "Solo publicaciones científicas",
            "A través de los archivos de Datos de la Tierra (Earth Data archives)",
          ],
          correct: 2,
        },
        {
          q: "Además del clima, ¿qué miden los satélites que es vital para entender el uso de la tierra y la agricultura?",
          options: [
            "La composición química de los alimentos envasados",
            "Reflectancia de la superficie, temperatura y extensión de cultivos",
            "Consumo eléctrico en zonas rurales",
          ],
          correct: 1,
        },
      ],
      m2: [], // puedes llenar más adelante
      m3: [],
    },
    sierra: { m1: [], m2: [], m3: [] },
    selva: { m1: [], m2: [], m3: [] },
  },
  en: {
    costa: {
      m1: [
        {
          q: "According to the NASA text, which two factors related to water management and agriculture can be influenced by satellite data?",
          options: [
            "Fertilizer prices and transportation costs",
            "Decision-making and crop yield calculation",
            "Pest tracking and solar panel installation",
          ],
          correct: 1,
        },
        {
          q: "NASA satellites measure 'vegetation greenness' and 'land surface temperature.' What crucial factor is calculated from this data?",
          options: [
            "Andean wind speed",
            "Evaporation patterns and water runoff",
            "Carbon dioxide levels in the atmosphere",
          ],
          correct: 1,
        },
        {
          q: "How does information about severe weather events help protect communities in the Amazon?",
          options: [
            "Identifies migrating fish species",
            "Helps determine crop conditions and flood/drought threats",
            "Measures tree height to prevent illegal logging",
          ],
          correct: 1,
        },
        {
          q: "What is the main way NASA makes its measured and modeled Earth data available?",
          options: [
            "Only confidential government reports",
            "Only scientific publications",
            "Through Earth Data archives",
          ],
          correct: 2,
        },
        {
          q: "Besides climate, what do satellites measure that is vital for understanding land use and agriculture?",
          options: [
            "Chemical composition of packaged food",
            "Surface reflectance, temperature, and crop extent",
            "Electricity consumption in rural areas",
          ],
          correct: 1,
        },
      ],
      m2: [],
      m3: [],
    },
    sierra: { m1: [], m2: [], m3: [] },
    selva: { m1: [], m2: [], m3: [] },
  },
};

interface Question {
  q: string;
  options: string[];
  correct: number;
}

interface MissionsContextType {
  missions: {
    costa: { m1: Question[]; m2: Question[]; m3: Question[] };
    sierra: { m1: Question[]; m2: Question[]; m3: Question[] };
    selva: { m1: Question[]; m2: Question[]; m3: Question[] };
  };
}

const MissionsContext = createContext<MissionsContextType | undefined>(undefined);

export const MissionsProvider = ({ children }: { children: ReactNode }) => {
  const { language } = useLanguage(); // 'es' o 'en'
  const missions = missionsTranslations[language];

  return <MissionsContext.Provider value={{ missions }}>{children}</MissionsContext.Provider>;
};

export const useMissions = () => {
  const context = useContext(MissionsContext);
  if (!context) throw new Error("useMissions must be used within a MissionsProvider");
  return context;
};
