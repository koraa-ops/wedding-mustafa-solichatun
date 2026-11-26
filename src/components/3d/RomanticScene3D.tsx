import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RomanticPetals } from './RomanticPetals';
import { WaxSealEnvelope3D } from './WaxSealEnvelope3D';
import { FloatingFloralBlossoms } from './FloatingFloralBlossoms';

interface SparklesProps {
  count?: number;
}

function RomanticSparkles({ count = 50 }: SparklesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const goldColor = new THREE.Color('#ffd700');
    const roseColor = new THREE.Color('#ffb6c1');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;

      const mixed = goldColor.clone().lerp(roseColor, Math.random());
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.03;
    pointsRef.current.rotation.x = Math.sin(t * 0.02) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface SceneProps {
  showEnvelope?: boolean;
  isEnvelopeOpen?: boolean;
  onEnvelopeClick?: () => void;
  interactivePetalsOnly?: boolean;
  showFlowers?: boolean;
}

export function RomanticScene3D({
  showEnvelope = false,
  isEnvelopeOpen = false,
  onEnvelopeClick,
  interactivePetalsOnly = false,
  showFlowers = true,
}: SceneProps) {
  return (
    <div className="absolute inset-0 pointer-events-auto w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Warm Romantic Ambience */}
          <ambientLight intensity={0.9} color="#ffe5d9" />
          <directionalLight
            position={[4, 6, 5]}
            intensity={1.8}
            color="#fff2cc"
            castShadow
          />
          <pointLight position={[-4, -3, 2]} intensity={0.9} color="#e8707a" />
          <pointLight position={[3, 3, 3]} intensity={1.2} color="#ffd700" />

          {/* Golden Bokeh / Sparkles */}
          <RomanticSparkles count={45} />

          {/* Semi-realistic Floating 3D Flowers & Garlands (Only in Cover mode) */}
          {!interactivePetalsOnly && showFlowers && <FloatingFloralBlossoms />}

          {/* Falling Rose Petals in 3D */}
          <RomanticPetals count={interactivePetalsOnly ? 25 : 35} />

          {/* Interactive 3D Wax Sealed Envelope */}
          {showEnvelope && (
            <WaxSealEnvelope3D
              isOpen={isEnvelopeOpen}
              onClick={onEnvelopeClick}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
