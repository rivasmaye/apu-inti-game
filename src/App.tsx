import { useState } from 'react';
import { MainMenu } from './components/MainMenu';
import { IntroScene } from './components/IntroScene';
import { PeruMap } from './components/PeruMap';
import { CostaScene } from './components/CostaScene';
import { SierraScene } from './components/SierraScene';
import { SelvaScene } from './components/SelvaScene';
import { NASACenter } from './components/NASACenter';
import { FinalScene } from './components/FinalScene';

type Scene = 'menu' | 'intro' | 'map' | 'costa' | 'sierra' | 'selva' | 'nasa' | 'final';

export default function App() {
  const [currentScene, setCurrentScene] = useState<Scene>('menu');
  const [costaCompleted, setCostaCompleted] = useState<boolean>(false);
  const [sierraCompleted, setSierraCompleted] = useState<boolean>(false);

  const handleNavigate = (scene: string) => {
    setCurrentScene(scene as Scene);
  };

  const renderScene = () => {
    switch (currentScene) {
      case 'menu':
        return <MainMenu onNavigate={handleNavigate} />;
      case 'intro':
        return <IntroScene onNavigate={handleNavigate} />;
      case 'map':
        return <PeruMap onNavigate={handleNavigate} costaCompleted={costaCompleted} sierraCompleted={sierraCompleted} />;
      case 'costa':
        return <CostaScene onNavigate={handleNavigate} onComplete={() => setCostaCompleted(true)} />;
      case 'sierra':
        return <SierraScene onNavigate={handleNavigate} onComplete={() => setSierraCompleted(true)} />;
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