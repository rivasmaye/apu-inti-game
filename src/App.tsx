import { useState } from 'react';
import { MainMenu } from './components/MainMenu';
import { IntroScene } from './components/IntroScene';
import { PeruMap } from './components/PeruMap';
import { CostaScene } from './components/CostaScene';
import { SierraScene } from './components/SierraScene';
import { SelvaScene } from './components/SelvaScene';
import { NASACenter } from './components/NASACenter';
import { FinalScene } from './components/FinalScene';
import { CostaMission1 } from './components/CostaMission1';
import { CostaMission2 } from './components/CostaMission2';
import { CostaMission3 } from './components/CostaMission3';

type Scene =
  | 'menu'
  | 'intro'
  | 'map'
  | 'costa'
  | 'sierra'
  | 'selva'
  | 'nasa'
  | 'final'
  | 'costa-m1'
  | 'costa-m2'
  | 'costa-m3'
  | 'costa-m4';

export default function App() {
  const [currentScene, setCurrentScene] = useState<Scene>('menu');
  const [costaCompleted, setCostaCompleted] = useState<boolean>(false);
  const [sierraCompleted, setSierraCompleted] = useState<boolean>(false);

  // Estado para misiones individuales
  const [costaMissions, setCostaMissions] = useState({
    m1: false,
    m2: false,
    m3: false,
    m4: false,
  });

  const setCostaMissionComplete = (key: keyof typeof costaMissions) => {
    setCostaMissions(prev => {
      const next = { ...prev, [key]: true };
      if (next.m1 && next.m2 && next.m3 && next.m4) setCostaCompleted(true);
      return next;
    });
  };

  const handleNavigate = (scene: Scene) => {
    setCurrentScene(scene);
  };

  const renderScene = () => {
    switch (currentScene) {
      case 'menu':
        return <MainMenu onNavigate={handleNavigate} />;
      case 'intro':
        return <IntroScene onNavigate={handleNavigate} />;
      case 'map':
        return <PeruMap
          onNavigate={handleNavigate}
          costaCompleted={costaCompleted}
          sierraCompleted={sierraCompleted}
        />;
      case 'costa':
        return <CostaScene
          onNavigate={handleNavigate}
          missionsCompleted={costaMissions}
        />;

      // Misiones de Costa accesibles sin orden
      case 'costa-m1':
        return <CostaMission1
          onNavigate={handleNavigate}
          onComplete={() => { setCostaMissionComplete('m1'); handleNavigate('costa'); }}
        />;
      case 'costa-m2':
        return <CostaMission2
          onNavigate={handleNavigate}
          onComplete={() => { setCostaMissionComplete('m2'); handleNavigate('costa'); }}
        />;
      case 'costa-m3':
        return <CostaMission3
          onNavigate={handleNavigate}
          onComplete={() => { setCostaMissionComplete('m3'); handleNavigate('costa'); }}
        />;

      case 'sierra':
        return <SierraScene
          onNavigate={handleNavigate}
          onComplete={() => setSierraCompleted(true)}
        />;
      case 'selva':
        return <SelvaScene onNavigate={handleNavigate} />;
      case 'nasa':
        return <NASACenter onNavigate={handleNavigate} />;
      case 'final':
        return <FinalScene onNavigate={handleNavigate} />;
      default:
        return <MainMenu onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="size-full min-h-screen overflow-x-hidden">
      {renderScene()}
    </div>
  );
}
