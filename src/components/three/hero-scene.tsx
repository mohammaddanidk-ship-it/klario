"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import * as THREE from "three";

/* -------------------------------------------------------------------------- */
/*  Floating document card                                                    */
/* -------------------------------------------------------------------------- */

interface DocumentCardProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
  delay?: number;
}

function DocumentCard({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  color = "#ffffff",
  delay = 0,
}: DocumentCardProps) {
  const mesh = React.useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime() + delay;
    mesh.current.rotation.z = rotation[2] + Math.sin(t * 0.4) * 0.04;
    mesh.current.rotation.x = rotation[0] + Math.cos(t * 0.3) * 0.03;
  });

  return (
    <group ref={mesh} position={position} rotation={rotation} scale={scale}>
      {/* Card body */}
      <mesh castShadow receiveShadow>
        <planeGeometry args={[1.4, 1.8]} />
        <meshStandardMaterial
          color={color}
          roughness={0.5}
          metalness={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Subtle border via slightly larger plane behind */}
      <mesh position={[0, 0, -0.001]}>
        <planeGeometry args={[1.42, 1.82]} />
        <meshStandardMaterial
          color="#0F1B2D"
          roughness={0.7}
          metalness={0.0}
          side={THREE.DoubleSide}
          transparent
          opacity={0.06}
        />
      </mesh>
      {/* Text lines — top accent bar */}
      <mesh position={[-0.45, 0.55, 0.01]}>
        <planeGeometry args={[0.5, 0.08]} />
        <meshBasicMaterial color="#2563EB" />
      </mesh>
      {/* Text lines */}
      {[-0.35, -0.2, -0.05, -0.35, -0.2, -0.05].map((y, i) => (
        <mesh
          key={`l1-${i}`}
          position={[-0.35, y - 0.45, 0.01]}
        >
          <planeGeometry args={[0.7, 0.025]} />
          <meshBasicMaterial color="#0F1B2D" transparent opacity={0.18} />
        </mesh>
      ))}
      {[-0.35, -0.2].map((y, i) => (
        <mesh
          key={`l2-${i}`}
          position={[-0.35, y - 0.7, 0.01]}
        >
          <planeGeometry args={[0.5, 0.025]} />
          <meshBasicMaterial color="#0F1B2D" transparent opacity={0.12} />
        </mesh>
      ))}
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Neural network — connected nodes                                          */
/* -------------------------------------------------------------------------- */

function NeuralNetwork() {
  const group = React.useRef<THREE.Group>(null);
  const nodes = React.useMemo<THREE.Vector3[]>(() => {
    const pts: THREE.Vector3[] = [];
    const layers = 3;
    const perLayer = [4, 5, 3];
    for (let l = 0; l < layers; l++) {
      const x = (l - 1) * 0.9;
      for (let i = 0; i < perLayer[l]; i++) {
        const y = (i - (perLayer[l] - 1) / 2) * 0.45;
        pts.push(new THREE.Vector3(x, y, 0.6));
      }
    }
    return pts;
  }, []);

  const edges = React.useMemo<[number, number][]>(() => {
    const e: [number, number][] = [];
    const perLayer = [4, 5, 3];
    let offset = 0;
    for (let l = 0; l < perLayer.length - 1; l++) {
      const aStart = offset;
      const bStart = offset + perLayer[l];
      for (let a = 0; a < perLayer[l]; a++) {
        for (let b = 0; b < perLayer[l + 1]; b++) {
          e.push([aStart + a, bStart + b]);
        }
      }
      offset += perLayer[l];
    }
    return e;
  }, []);

  const lineRef = React.useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.04;
    group.current.rotation.y = Math.cos(state.clock.getElapsedTime() * 0.12) * 0.06;

    if (lineRef.current) {
      const mat = lineRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.10 + Math.sin(state.clock.getElapsedTime() * 0.6) * 0.04;
    }
  });

  const lineGeometry = React.useMemo(() => {
    const positions: number[] = [];
    edges.forEach(([a, b]) => {
      positions.push(nodes[a].x, nodes[a].y, nodes[a].z);
      positions.push(nodes[b].x, nodes[b].y, nodes[b].z);
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [nodes, edges]);

  return (
    <group ref={group} position={[0, 0, -0.5]}>
      <lineSegments ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#2563EB" transparent opacity={0.14} />
      </lineSegments>
      {nodes.map((p, i) => (
        <PulseNode key={i} position={p} index={i} />
      ))}
    </group>
  );
}

function PulseNode({
  position,
  index,
}: {
  position: THREE.Vector3;
  index: number;
}) {
  const mesh = React.useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime() + index * 0.5;
    const s = 1 + Math.sin(t * 1.2) * 0.18;
    mesh.current.scale.setScalar(s);
  });
  return (
    <mesh ref={mesh} position={position}>
      <circleGeometry args={[0.045, 24]} />
      <meshBasicMaterial color="#2563EB" />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/*  Central shield                                                            */
/* -------------------------------------------------------------------------- */

function Shield() {
  const mesh = React.useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.15;
  });
  return (
    <group ref={mesh} position={[0, 0, 0.4]}>
      <mesh>
        <circleGeometry args={[0.32, 32]} />
        <meshBasicMaterial color="#2563EB" transparent opacity={0.10} />
      </mesh>
      <mesh>
        <ringGeometry args={[0.30, 0.32, 32]} />
        <meshBasicMaterial color="#2563EB" transparent opacity={0.5} />
      </mesh>
      <mesh>
        <circleGeometry args={[0.06, 24]} />
        <meshBasicMaterial color="#2563EB" />
      </mesh>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  Particle field                                                            */
/* -------------------------------------------------------------------------- */

function Particles({ count = 80 }: { count?: number }) {
  const points = React.useRef<THREE.Points>(null);

  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Sphere distribution
      const r = 4 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    points.current.rotation.x = state.clock.getElapsedTime() * 0.01;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#0F1B2D"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

/* -------------------------------------------------------------------------- */
/*  Mouse parallax rig                                                        */
/* -------------------------------------------------------------------------- */

function ParallaxRig({ children }: { children: React.ReactNode }) {
  const group = React.useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const target = React.useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (!group.current) return;
    target.current.x += (pointer.x * 0.25 - target.current.x) * 0.05;
    target.current.y += (pointer.y * 0.18 - target.current.y) * 0.05;
    group.current.rotation.y = target.current.x;
    group.current.rotation.x = -target.current.y;
  });

  return <group ref={group}>{children}</group>;
}

/* -------------------------------------------------------------------------- */
/*  Scene                                                                     */
/* -------------------------------------------------------------------------- */

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[3, 4, 5]}
        intensity={1.1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, -2, -3]} intensity={0.3} color="#2563EB" />

      <ParallaxRig>
        {/* Floating documents around the scene */}
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
          <DocumentCard position={[-2.4, 0.7, -0.4]} rotation={[0, 0.3, -0.08]} scale={0.85} delay={0} />
        </Float>
        <Float speed={1.0} rotationIntensity={0.2} floatIntensity={0.7}>
          <DocumentCard position={[2.3, 0.4, -0.2]} rotation={[0, -0.3, 0.1]} scale={0.78} delay={1.5} />
        </Float>
        <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.5}>
          <DocumentCard position={[-1.9, -1.1, 0.3]} rotation={[0.1, 0.2, 0.06]} scale={0.62} delay={3} />
        </Float>
        <Float speed={0.9} rotationIntensity={0.18} floatIntensity={0.6}>
          <DocumentCard position={[2.0, -1.0, 0.4]} rotation={[0.1, -0.25, -0.05]} scale={0.58} delay={2} />
        </Float>

        <NeuralNetwork />
        <Shield />
      </ParallaxRig>

      <Particles count={70} />

      <Environment preset="city" />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Public component                                                          */
/* -------------------------------------------------------------------------- */

export function HeroScene() {
  return (
    <Canvas
      shadows={false}
      dpr={[1, 1.8]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      camera={{ position: [0, 0, 6], fov: 42 }}
      style={{ pointerEvents: "none" }}
      // Pause rendering when off-screen to save battery
      frameloop="always"
    >
      <Scene />
    </Canvas>
  );
}

/* Lightweight premium fallback shown on reduced-motion / mobile.
   A stylized shield with orbiting document chips — same visual language
   as the 3D scene, just rendered as SVG. Keeps the hero feeling rich
   without any GPU cost. */
export function HeroSceneFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* Soft glow */}
      <div className="absolute h-56 w-56 rounded-full bg-brand/15 blur-[80px]" />

      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative h-full w-full max-w-[440px]"
        role="img"
        aria-label="Encrypted document analysis illustration"
      >
        <defs>
          <linearGradient id="fallbackShield" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="fallbackDoc" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f5f7fa" />
          </linearGradient>
        </defs>

        {/* Outer concentric rings */}
        {[180, 140, 100].map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            stroke="#2563EB"
            strokeOpacity={0.08 + i * 0.04}
            strokeWidth="1"
            fill="none"
          />
        ))}

        {/* Orbital dashed ring */}
        <circle
          cx="200"
          cy="200"
          r="160"
          stroke="#2563EB"
          strokeOpacity="0.18"
          strokeWidth="1"
          strokeDasharray="2 6"
          fill="none"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 200 200"
            to="360 200 200"
            dur="60s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Floating document chips — 4 corners */}
        {[
          { x: 80, y: 110, rot: -8, delay: "0s" },
          { x: 290, y: 90, rot: 6, delay: "0.8s" },
          { x: 70, y: 270, rot: 8, delay: "1.4s" },
          { x: 300, y: 280, rot: -6, delay: "2.1s" },
        ].map((d, i) => (
          <g key={i} transform={`translate(${d.x} ${d.y}) rotate(${d.rot})`}>
            <rect
              x="-26"
              y="-34"
              width="52"
              height="68"
              rx="4"
              fill="url(#fallbackDoc)"
              stroke="#0F1B2D"
              strokeOpacity="0.10"
              strokeWidth="1"
            />
            <rect x="-18" y="-26" width="18" height="3" rx="1.5" fill="#2563EB" />
            <rect x="-18" y="-18" width="30" height="1.5" rx="0.75" fill="#0F1B2D" fillOpacity="0.18" />
            <rect x="-18" y="-13" width="26" height="1.5" rx="0.75" fill="#0F1B2D" fillOpacity="0.18" />
            <rect x="-18" y="-8" width="28" height="1.5" rx="0.75" fill="#0F1B2D" fillOpacity="0.18" />
            <rect x="-18" y="-3" width="22" height="1.5" rx="0.75" fill="#0F1B2D" fillOpacity="0.14" />
            <rect x="-18" y="2" width="26" height="1.5" rx="0.75" fill="#0F1B2D" fillOpacity="0.14" />
          </g>
        ))}

        {/* Central shield */}
        <g transform="translate(200 200)">
          {/* Shield backdrop */}
          <path
            d="M0 -56 L48 -38 L48 8 C48 38 28 56 0 64 C-28 56 -48 38 -48 8 L-48 -38 Z"
            fill="url(#fallbackShield)"
            stroke="#2563EB"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />
          {/* Inner shield */}
          <path
            d="M0 -38 L32 -25 L32 4 C32 24 18 38 0 44 C-18 38 -32 24 -32 4 L-32 -25 Z"
            fill="#2563EB"
            fillOpacity="0.08"
            stroke="#2563EB"
            strokeWidth="1.25"
            strokeOpacity="0.5"
          />
          {/* Neural core */}
          <circle cx="0" cy="2" r="8" fill="#2563EB" />
          <circle cx="0" cy="2" r="14" stroke="#2563EB" strokeOpacity="0.3" strokeWidth="1" fill="none">
            <animate attributeName="r" values="10;18;10" dur="3s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Particle dots */}
        {[
          [60, 60], [340, 70], [50, 340], [350, 330], [110, 200], [290, 200],
          [200, 60], [200, 340], [85, 165], [315, 235],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1.4" fill="#0F1B2D" fillOpacity="0.25">
            <animate
              attributeName="fill-opacity"
              values="0.1;0.4;0.1"
              dur={`${2 + (i % 4) * 0.5}s`}
              begin={`${i * 0.2}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  );
}
