import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function Particles() {
  const points = useRef<THREE.Points>(null);
  const count = 3000;

  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const c1 = new THREE.Color('#b8ff3c');
    const c2 = new THREE.Color('#6c6cff');
    const c3 = new THREE.Color('#78ff9a');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = Math.random() * 15 + 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi) - 3;

      const t = Math.random();
      let col: THREE.Color;
      if (t < 0.5) col = c1.clone().lerp(c2, t * 2);
      else col = c2.clone().lerp(c3, (t - 0.5) * 2);
      colors[i3] = col.r; colors[i3+1] = col.g; colors[i3+2] = col.b;
      sizes[i] = Math.random() * 0.04 + 0.01;
    }
    return [positions, colors, sizes];
  }, []);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.x = state.clock.elapsedTime * 0.015;
    points.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.85} sizeAttenuation />
    </points>
  );
}

function Grid() {
  const gridRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!gridRef.current) return;
    gridRef.current.position.z = (state.clock.elapsedTime * 0.3) % 2;
  });

  const lines = useMemo(() => {
    const arr = [];
    const size = 20;
    const divisions = 10;
    const step = size / divisions;
    for (let i = -divisions/2; i <= divisions/2; i++) {
      arr.push({ start: [-size/2, 0, i * step], end: [size/2, 0, i * step] });
      arr.push({ start: [i * step, 0, -size/2], end: [i * step, 0, size/2] });
    }
    return arr;
  }, []);

  return (
    <group ref={gridRef} position={[0, -4, -5]} rotation={[0, 0, 0]}>
      {lines.map((line, i) => {
        const points = [new THREE.Vector3(...(line.start as [number,number,number])), new THREE.Vector3(...(line.end as [number,number,number]))];
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <primitive key={i} object={new THREE.Line(geo, new THREE.LineBasicMaterial({ color: "#b8ff3c", transparent: true, opacity: 0.06 }))} />
        );
      })}
    </group>
  );
}

function FloatingShapes() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.04;
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[-3.5, 1.5, -2]}>
          <octahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial color="#b8ff3c" emissive="#b8ff3c" emissiveIntensity={1.2} wireframe transparent opacity={0.8} />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[3.5, -1, -3]}>
          <torusKnotGeometry args={[0.6, 0.18, 128, 16]} />
          <meshStandardMaterial color="#6c6cff" emissive="#6c6cff" emissiveIntensity={1} wireframe transparent opacity={0.7} />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={2} floatIntensity={3}>
        <mesh position={[1, 3, -4]}>
          <icosahedronGeometry args={[0.7, 1]} />
          <meshStandardMaterial color="#78ff9a" emissive="#78ff9a" emissiveIntensity={0.8} wireframe transparent opacity={0.6} />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={2}>
        <Sphere position={[-2, -2.5, -3]} args={[0.5, 32, 32]}>
          <MeshDistortMaterial color="#b8ff3c" emissive="#b8ff3c" emissiveIntensity={0.6} distort={0.5} speed={3} transparent opacity={0.5} />
        </Sphere>
      </Float>

      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[3, 2.5, -5]}>
          <dodecahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial color="#00ffaa" emissive="#00ffaa" emissiveIntensity={0.8} wireframe transparent opacity={0.5} />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[-4, 0, -6]}>
          <tetrahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color="#6c6cff" emissive="#6c6cff" emissiveIntensity={1} wireframe transparent opacity={0.7} />
        </mesh>
      </Float>
    </group>
  );
}

function EnergyRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) { ring1.current.rotation.z = t * 0.3; ring1.current.rotation.x = t * 0.1; }
    if (ring2.current) { ring2.current.rotation.z = -t * 0.2; ring2.current.rotation.y = t * 0.15; }
    if (ring3.current) { ring3.current.rotation.x = t * 0.25; ring3.current.rotation.y = -t * 0.1; }
  });

  return (
    <group position={[0, 0, -2]}>
      <mesh ref={ring1}>
        <torusGeometry args={[2.5, 0.008, 16, 100]} />
        <meshBasicMaterial color="#b8ff3c" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[3.2, 0.006, 16, 100]} />
        <meshBasicMaterial color="#6c6cff" transparent opacity={0.2} />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[4, 0.005, 16, 100]} />
        <meshBasicMaterial color="#78ff9a" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

function MouseCamera() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.8 - camera.position.x) * 0.04;
    camera.position.y += (-mouse.current.y * 0.5 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Lights() {
  const light1 = useRef<THREE.PointLight>(null);
  const light2 = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (light1.current) {
      light1.current.position.x = Math.sin(t * 0.5) * 5;
      light1.current.position.y = Math.cos(t * 0.3) * 3;
    }
    if (light2.current) {
      light2.current.position.x = Math.cos(t * 0.4) * 5;
      light2.current.position.z = Math.sin(t * 0.6) * 3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight ref={light1} position={[5, 5, 3]} intensity={2} color="#b8ff3c" />
      <pointLight ref={light2} position={[-5, -3, -5]} intensity={2} color="#6c6cff" />
      <pointLight position={[0, 5, -5]} intensity={1} color="#78ff9a" />
      <pointLight position={[0, -5, 5]} intensity={0.5} color="#00ffaa" />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 7], fov: 55 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <fog attach="fog" args={['#060608', 10, 30]} />
        <Lights />
        <MouseCamera />
        <Particles />
        <FloatingShapes />
        <EnergyRings />
        <Grid />
      </Canvas>
    </div>
  );
}
