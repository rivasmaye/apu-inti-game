import React, { useState } from "react";
import { GameButton } from "./GameButton";
import { GameHUD } from "./GameHUD";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// 🧩 Preguntas de la Misión Costa
const questions = [
  {
    q: "Según el texto de la NASA, ¿qué dos factores relacionados con la gestión del agua y la agricultura pueden ser impulsados por los datos satelitales?",
    options: [
      "El precio de los fertilizantes y el costo del transporte",
      "La toma de decisiones y el cálculo de la producción de cultivos", // correcta
      "El rastreo de plagas y la instalación de paneles solares",
    ],
    correct: 1,
  },
  {
    q: "Los satélites de la NASA miden la 'verdosidad de la vegetación' y la 'temperatura de la tierra'. ¿Qué factor crucial se calcula con estos datos?",
    options: [
      "La velocidad del viento andino",
      "Los patrones de evaporación y la escorrentía del agua", // correcta
      "El nivel de dióxido de carbono en la atmósfera",
    ],
    correct: 1,
  },
  {
    q: "¿Cómo ayuda la información sobre eventos meteorológicos severos a proteger comunidades en la Amazonía?",
    options: [
      "Permite identificar especies de peces migrantes",
      "Ayuda a determinar las condiciones de cultivo y amenazas por inundaciones y sequías", // correcta
      "Mide la altura de los árboles para prevenir la tala ilegal",
    ],
    correct: 1,
  },
  {
    q: "¿Cuál es la vía principal por la cual la NASA hace disponibles sus datos medidos y modelados sobre la Tierra?",
    options: [
      "Solo informes confidenciales del gobierno",
      "Solo publicaciones científicas",
      "A través de los archivos de Datos de la Tierra (Earth Data archives)", // correcta
    ],
    correct: 2,
  },
  {
    q: "Además del clima, ¿qué miden los satélites que es vital para entender el uso de la tierra y la agricultura?",
    options: [
      "La composición química de los alimentos envasados",
      "Reflectancia de la superficie, temperatura y extensión de cultivos", // correcta
      "Consumo eléctrico en zonas rurales",
    ],
    correct: 1,
  },
];

interface Props {
  onNavigate: (scene: string) => void;
}

export function CostaMission1({ onNavigate }: Props) {
  const [lives, setLives] = useState(5);
  const [score, setScore] = useState(0);
  const [ecosystem, setEcosystem] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");

  const question = questions[currentQ];

  const handleAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);

    if (index === question.correct) {
      setScore(score + 1);
      setEcosystem((prev) => Math.min(prev + 20, 100));
      setFeedback("✅ ¡Correcto! +1 Gota y +20% Ecosistema");
    } else {
      setLives((prev) => Math.max(prev - 1, 0));
      setFeedback("❌ Incorrecto... -1 Vida");
    }
  };

  const handleNext = () => {
    setSelected(null);
    setFeedback("");
    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setFeedback(
        "🌊 ¡Bien hecho! El conocimiento fortalece al Guardián Apu Inti para enfrentar los retos climáticos."
      );
      setTimeout(() => {
        onNavigate("costa"); // Regresa a la interfaz CostaScene
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden cursor-[url('/cursor-apuinti.png'),_auto]">
      {/* HUD superior */}
      <GameHUD
        ecosystem={ecosystem}
        water={score}
        energy={75}
        biodiversity={25}
        sustainability={ecosystem}
        region="costa"
      />

      {/* Fondo */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1610046932034-fc8170d01155?auto=format&fit=crop&w=1400&q=60"
          alt="Costa peruana"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-100/40 via-transparent to-blue-200/50"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen p-8 pt-32 pb-24 overflow-y-auto">
        {/* Botón de volver a misiones */}
        <div className="mb-4">
          <GameButton variant="secondary" onClick={() => onNavigate("costa")}>
            ← Volver
          </GameButton>
        </div>

        <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-lg border border-yellow-300/50">
          <h1 className="text-2xl font-bold text-center text-tierra mb-6">
            🌞 Misión 1: El Desafío del Saber
          </h1>

          <p className="text-center text-gray-700 mb-4">
            Objetivo: Responde correctamente para evitar la sequía en los valles costeros del Perú.
          </p>

          {/* HUD visual (vidas, gotas, ecosistema) */}
          <div className="flex items-center justify-between mb-6">
            {/* ❤️ Vidas */}
            <div className="flex items-center gap-1">
              {Array.from({ length: lives }).map((_, i) => (
                <span key={i} className="text-red-500 text-2xl">❤️</span>
              ))}
            </div>

            {/* 💧 Gotas */}
            <div className="flex items-center gap-1">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2910/2910768.png"
                alt="Gota"
                className="w-6 h-6"
              />
              <span className="font-bold text-blue-600">{score}</span>
            </div>

            {/* 🌱 Ecosistema */}
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-bold">{ecosystem}% 🌱</span>
            </div>
          </div>

          {/* Pregunta actual */}
          <h2 className="text-xl font-semibold text-tierra mb-4">{question.q}</h2>

          <div className="space-y-3">
            {question.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={selected !== null}
                className={`w-full text-left px-4 py-2 rounded-lg border transition ${
                  selected === i
                    ? i === question.correct
                      ? "bg-green-200 border-green-500"
                      : "bg-red-200 border-red-500"
                    : "bg-white hover:bg-gray-100 border-gray-300"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Feedback */}
          {feedback && (
            <p className="mt-4 text-center font-bold text-gray-800">
              {feedback}
            </p>
          )}

          {/* Botón siguiente */}
          {selected !== null && (
            <div className="mt-6 flex justify-end">
              <GameButton variant="costa" onClick={handleNext}>
                {currentQ + 1 < questions.length
                  ? "Siguiente →"
                  : "✅ Completar Misión"}
              </GameButton>
            </div>
          )}

          {/* 🌳 Animación de éxito */}
          {ecosystem === 100 && (
            <div className="mt-8 flex flex-col items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/765/765613.png"
                alt="Árbol creciendo"
                className="w-32 h-32 animate-bounce"
              />
              <p className="text-green-700 font-bold mt-2 text-center">
                ¡La costa reverdece gracias a ti, Guardián Apu Inti! 🌳
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
