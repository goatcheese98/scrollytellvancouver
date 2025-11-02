'use client';

import { useLenis } from '@/lib/lenis';
import Scene1 from '@/components/scenes/Scene1';
import Scene2 from '@/components/scenes/Scene2';
import Scene3 from '@/components/scenes/Scene3';
import Scene4 from '@/components/scenes/Scene4';
import Scene7 from '@/components/scenes/Scene7';
import Scene8 from '@/components/scenes/Scene8';
import Scene9 from '@/components/scenes/Scene9';
import Scene10 from '@/components/scenes/Scene10';

export default function Home() {
  useLenis();

  return (
    <main className="relative bg-background">
      <Scene1 />
      <Scene2 />
      <Scene3 />
      <Scene4 />
      <Scene7 />
      <Scene8 />
      <Scene9 />
      <Scene10 />
    </main>
  );
}
