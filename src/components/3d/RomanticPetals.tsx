import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PetalsProps {
  count?: number;
}

export function RomanticPetals({ count = 40 }: PetalsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate petal initial positions, velocities, and rotation speeds
  const petals = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        Math.random() * 12 - 2,
        (Math.random() - 0.5) * 8
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.008,
        -(Math.random() * 0.012 + 0.008),
        (Math.random() - 0.5) * 0.008
      ),
      rotation: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      rotSpeed: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ),
      scale: Math.random() * 0.12 + 0.14,
    }));
  }, [count]);

  // Petal curved geometry
  const petalGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.2, 0.4, 0.4, 0.9, 0, 1.2);
    shape.bezierCurveTo(-0.4, 0.9, -0.2, 0.4, 0, 0);

    const geom = new THREE.ShapeGeometry(shape, 12);
    // slightly curve the vertices for 3D realism
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      pos.setZ(i, Math.sin(y * 2) * 0.15);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    petals.forEach((p, i) => {
      // Wind oscillation
      p.position.x += p.velocity.x + Math.sin(time * 0.8 + i) * 0.004;
      p.position.y += p.velocity.y;
      p.position.z += p.velocity.z + Math.cos(time * 0.5 + i) * 0.003;

      p.rotation.x += p.rotSpeed.x;
      p.rotation.y += p.rotSpeed.y;
      p.rotation.z += p.rotSpeed.z;

      // Reset when falling out of view
      if (p.position.y < -5) {
        p.position.y = 7;
        p.position.x = (Math.random() - 0.5) * 12;
        p.position.z = (Math.random() - 0.5) * 8;
      }

      dummy.position.copy(p.position);
      dummy.rotation.copy(p.rotation);
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[petalGeometry, undefined, count]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color="#e8707a"
        roughness={0.4}
        metalness={0.1}
        side={THREE.DoubleSide}
        transparent
        opacity={0.92}
      />
    </instancedMesh>
  );
}
