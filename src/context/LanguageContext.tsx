import React, { createContext, useContext, useState, ReactNode } from "react";

// Textos de cada idioma
const translations = {
  es: {
    mainMenu: {
      play: "🎮 Jugar",
      nasa: "📡 Centro NASA",
      language: "🌐 Idioma",
      credits: "ℹ️ Créditos",
      footer: "© 2025 Apu Inti",
      footer2: "Desarrollado por tu equipo educativo"
    },
    introScene: {
      storyTexts: [
        "En las altas montañas de los Andes, donde los antiguos dioses vigilan el equilibrio del mundo...",
        "Un joven cholito llamado Apu Inti recibe una visión del Oráculo Celeste.",
        "Los satélites de la NASA han detectado que el equilibrio ambiental del Perú está en peligro.",
        "La costa se está secando, las montañas pierden su nieve, y la selva se está fragmentando.",
        "Solo tú puedes restaurar la armonía entre la Pachamama y los datos del cielo.",
        "¡Acepta esta misión sagrada y conviértete en el Guardián del Perú!"
      ],
      startAdventure: "🌄 Comenzar Aventura",
      backToMenu: "← Volver al Menú",
      replay: "🔄 Ver Otra Vez"
    },
    peruMap: {
      costaScene: {
        title: "🏖️ Región Costa",
        description: "Desierto costero con cultivos de irrigación",
      },
      sierraScene: {
        title: "🏔️ Región Sierra",
        description: "Montañas andinas con terrazas agrícolas",
      },
      selvaScene: {
        title: "🌳 Región Selva",
        description: "Bosque amazónico biodiverso",
      },
      chooseRegion: "Elige una región para comenzar tu misión",
      mapTitle: "Mapa del Perú",
      mainMenuBtn: "← Menú Principal",
      nasaBtn: "📡 Centro NASA",
      goToRegion: "🎯 Ir a"
    },
    resources: {
      ecosystem: "Ecosistema",
      water: "Agua",
      energy: "Energía",
      biodiversity: "Biodiversidad",
      sustainability: "Sostenibilidad"
    }
  },
  en: {
    mainMenu: {
      play: "🎮 Play",
      nasa: "📡 NASA Center",
      language: "🌐 Language",
      credits: "ℹ️ Credits",
      footer: "© 2025 Apu Inti",
      footer2: "Developed by your educational team"
    },
    introScene: {
      storyTexts: [
        "In the high mountains of the Andes, where ancient gods watch over the world's balance...",
        "A young boy named Apu Inti receives a vision from the Celestial Oracle.",
        "NASA satellites have detected that Peru's environmental balance is at risk.",
        "The coast is drying up, mountains are losing snow, and the jungle is fragmenting.",
        "Only you can restore harmony between Pachamama and the data from the sky.",
        "Accept this sacred mission and become the Guardian of Peru!"
      ],
      startAdventure: "🌄 Start Adventure",
      backToMenu: "← Back to Menu",
      replay: "🔄 Watch Again"
    },
    peruMap: {
      costaScene: {
        title: "🏖️ Coastal Region",
        description: "Coastal desert with irrigation crops",
      },
      sierraScene: {
        title: "🏔️ Mountain Region",
        description: "Andean mountains with agricultural terraces",
      },
      selvaScene: {
        title: "🌳 Jungle Region",
        description: "Biodiverse Amazon forest",
      },
      chooseRegion: "Choose a region to start your mission",
      mapTitle: "Map of Peru",
      mainMenuBtn: "← Main Menu",
      nasaBtn: "📡 NASA Center",
      goToRegion: "🎯 Go to"
    },
    resources: {
      ecosystem: "Ecosystem",
      water: "Water",
      energy: "Energy",
      biodiversity: "Biodiversity",
      sustainability: "Sustainability"
    }
  }
};

interface LanguageContextType {
  language: "es" | "en";
  setLanguage: (lang: "es" | "en") => void;
  t: typeof translations.es;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "es",
  setLanguage: () => {},
  t: translations.es
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<"es" | "en">("es");
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
