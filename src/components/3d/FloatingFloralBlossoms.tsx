import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

export function FloatingFloralBlossoms() {
  const bloomTexture = useLoader(THREE.TextureLoader, './images/floral_bloom.jpg');
  const garlandTexture = useLoader(THREE.TextureLoader, './images/floral_garland.jpg');
  const cornerTexture = useLoader(THREE.TextureLoader, './images/floral_corner.jpg');

  const groupRef = useRef<THREE.Group>(null);
  const leftCornerRef = useRef<THREE.Mesh>(null);
  const rightCornerRef = useRef<THREE.Mesh>(null);
  const centerBloomRef = useRef<THREE.Mesh>(null);
  const floatingRoseRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    // Subtle 3D parallax responsive to mouse / movement
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.1, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY * 0.1, 0.05);
    }

    // Top Right Corner Arch gentle breathing
    if (rightCornerRef.current) {
      rightCornerRef.current.position.y = 2.4 + Math.sin(t * 0.8) * 0.06;
      rightCornerRef.current.rotation.z = Math.sin(t * 0.5) * 0.03;
    }

    // Top Left Corner gentle breathing
    if (leftCornerRef.current) {
      leftCornerRef.current.position.y = 2.5 + Math.cos(t * 0.9) * 0.06;
      leftCornerRef.current.rotation.z = Math.cos(t * 0.6) * 0.03;
    }

    // Central 3D floating rose with depth tilt
    if (centerBloomRef.current) {
      centerBloomRef.current.position.y = Math.sin(t * 1.2) * 0.12 - 0.2;
      centerBloomRef.current.rotation.z = Math.sin(t * 0.6) * 0.1;
      centerBloomRef.current.rotation.y = Math.cos(t * 0.7) * 0.15;
    }

    // Secondary floating rose on the side
    if (floatingRoseRef.current) {
      floatingRoseRef.current.position.y = -1.6 + Math.sin(t * 1.5 + 1) * 0.09;
      floatingRoseRef.current.rotation.z = t * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Top-Right Romantic Floral Corner Arch (Deep Layer z = -0.5) */}
      <mesh
        ref={rightCornerRef}
        position={[3.2, 2.4, -0.5]}
        scale={[3.4, 3.4, 1]}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={cornerTexture}
          transparent
          blending={THREE.AdditiveBlending}
          opacity={0.88}
          depthWrite={false}
        />
      </mesh>

      {/* 2. Top-Left Mirrored Floral Arch (z = -0.8) */}
      <mesh
        ref={leftCornerRef}
        position={[-3.3, 2.5, -0.8]}
        scale={[-3.2, 3.2, 1]} // mirrored horizontally
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={cornerTexture}
          transparent
          blending={THREE.AdditiveBlending}
          opacity={0.75}
          depthWrite={false}
        />
      </mesh>

      {/* 3. Top Center Horizontal Floral Garland Banner (z = -0.2) */}
      <mesh position={[0, 2.7, -0.2]} scale={[4.5, 2.5, 1]}>
        <planeGeometry args={[1, 0.56]} />
        <meshBasicMaterial
          map={garlandTexture}
          transparent
          blending={THREE.AdditiveBlending}
          opacity={0.8}
          depthWrite={false}
        />
      </mesh>

      {/* 4. Single 3D Blooming Rose Floating in Foreground (z = 0.8) */}
      <mesh
        ref={centerBloomRef}
        position={[-2.4, -0.4, 0.8]}
        scale={[1.6, 1.6, 1]}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={bloomTexture}
          transparent
          blending={THREE.AdditiveBlending}
          opacity={0.85}
          depthWrite={false}
        />
      </mesh>

      {/* 5. Delicate Floating Rose in Bottom-Right (z = 0.5) */}
      <mesh
        ref={floatingRoseRef}
        position={[2.5, -1.6, 0.5]}
        scale={[1.3, 1.3, 1]}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          map={bloomTexture}
          transparent
          blending={THREE.AdditiveBlending}
          opacity={0.75}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
