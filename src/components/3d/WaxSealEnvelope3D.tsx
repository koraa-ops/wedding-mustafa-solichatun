import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface EnvelopeProps {
  isOpen: boolean;
  onClick?: () => void;
}

export function WaxSealEnvelope3D({ isOpen, onClick }: EnvelopeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const flapRef = useRef<THREE.Group>(null);
  const cardRef = useRef<THREE.Group>(null);
  const sealRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Gentle hovering floating motion
    const t = state.clock.getElapsedTime();
    if (!isOpen) {
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.08;
      groupRef.current.rotation.y = Math.sin(t * 0.8) * 0.06;
      groupRef.current.rotation.x = Math.cos(t * 1.2) * 0.04;
    } else {
      // Zoom & tilt down smoothly on open
      groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, -0.3, 3, delta);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, -0.15, 3, delta);
    }

    // Flap opening rotation (folds up backwards: 0 to Math.PI * 0.85)
    if (flapRef.current) {
      const targetFlapRot = isOpen ? -Math.PI * 0.85 : 0;
      flapRef.current.rotation.x = THREE.MathUtils.damp(flapRef.current.rotation.x, targetFlapRot, 4, delta);
    }

    // Golden Letter sliding up from inside the envelope
    if (cardRef.current) {
      const targetCardY = isOpen ? 1.4 : 0;
      cardRef.current.position.y = THREE.MathUtils.damp(cardRef.current.position.y, targetCardY, 3.5, delta);
      const targetCardZ = isOpen ? 0.15 : 0.02;
      cardRef.current.position.z = THREE.MathUtils.damp(cardRef.current.position.z, targetCardZ, 3.5, delta);
    }

    // Wax seal fade/scale down slightly on open
    if (sealRef.current) {
      const targetSealScale = isOpen ? 0.7 : 1;
      sealRef.current.scale.setScalar(
        THREE.MathUtils.damp(sealRef.current.scale.x, targetSealScale, 5, delta)
      );
    }
  });

  return (
    <group
      ref={groupRef}
      onClick={onClick}
      scale={[1.15, 1.15, 1.15]}
    >
      {/* 1. Envelope Back Plate */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 2.4, 0.04]} />
        <meshStandardMaterial
          color="#22171c"
          roughness={0.4}
          metalness={0.2}
        />
      </mesh>

      {/* Gold Rim Border around back plate */}
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[3.68, 2.48, 0.02]} />
        <meshStandardMaterial
          color="#d4af37"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* 2. Inner Invitation Letter Card (Slides Up) */}
      <group ref={cardRef} position={[0, 0, 0.02]}>
        <mesh castShadow>
          <boxGeometry args={[3.3, 2.15, 0.02]} />
          <meshStandardMaterial
            color="#fffbf7"
            roughness={0.6}
            metalness={0.05}
          />
        </mesh>

        {/* Card Gold Foil Border */}
        <mesh position={[0, 0, 0.015]}>
          <planeGeometry args={[3.1, 1.95]} />
          <meshStandardMaterial
            color="#ecd6a5"
            roughness={0.4}
            metalness={0.4}
            wireframe={true}
          />
        </mesh>

        {/* Monogram emblem on inner card */}
        <mesh position={[0, 0.35, 0.018]}>
          <ringGeometry args={[0.22, 0.28, 32]} />
          <meshStandardMaterial
            color="#d4af37"
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
      </group>

      {/* 3. Envelope Front Left & Right Folds */}
      {/* Front bottom pocket */}
      <mesh position={[0, -0.4, 0.08]} receiveShadow>
        <planeGeometry args={[3.58, 1.6]} />
        <meshStandardMaterial
          color="#2b1d24"
          roughness={0.4}
          metalness={0.25}
        />
      </mesh>

      {/* 4. Top Flap (Hinged at top y = 1.2) */}
      <group ref={flapRef} position={[0, 1.2, 0.085]}>
        {/* Triangular/Trapezoidal Flap Geometry */}
        <mesh position={[0, -0.7, 0]} castShadow>
          <cylinderGeometry args={[0.01, 1.8, 1.4, 3]} />
          <meshStandardMaterial
            color="#34232c"
            roughness={0.35}
            metalness={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Golden Wax Seal with M&S Monogram */}
        <group ref={sealRef} position={[0, -1.35, 0.08]}>
          {/* Outer wax drip ring */}
          <mesh castShadow>
            <cylinderGeometry args={[0.38, 0.42, 0.08, 24]} />
            <meshStandardMaterial
              color="#b8860b" // Dark goldenrod wax
              roughness={0.3}
              metalness={0.85}
            />
          </mesh>

          {/* Inner wax core with embossed seal */}
          <mesh position={[0, 0, 0.045]}>
            <cylinderGeometry args={[0.32, 0.32, 0.02, 24]} />
            <meshStandardMaterial
              color="#ffd700" // Bright reflective gold
              roughness={0.2}
              metalness={0.95}
            />
          </mesh>

          {/* Golden Monogram Emblem */}
          <mesh position={[0, 0, 0.06]}>
            <ringGeometry args={[0.16, 0.22, 24]} />
            <meshStandardMaterial
              color="#fff0aa"
              roughness={0.1}
              metalness={1.0}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}
