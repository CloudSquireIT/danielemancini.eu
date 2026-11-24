import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function Wire() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    const mesh = meshRef.current
    if (!mesh) return
    mesh.rotation.y += delta * 0.07
    mesh.rotation.x = -0.35 + Math.sin(state.clock.elapsedTime * 0.12) * 0.08
    mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, state.pointer.x * 0.12, 0.05)
  })

  return (
    <mesh ref={meshRef} position={[0, 0.1, 0]}>
      <icosahedronGeometry args={[1.6, 1]} />
      <meshBasicMaterial color="#0a84ff" wireframe transparent opacity={0.22} />
    </mesh>
  )
}

function Dust({ count = 240 }: { count?: number }) {
  const positions = useMemo(() => {
    const array = new Float32Array(count * 3)
    for (let index = 0; index < count; index += 1) {
      const radius = 2.1 + Math.random() * 2.4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      array[index * 3] = radius * Math.sin(phi) * Math.cos(theta)
      array[index * 3 + 1] = radius * Math.cos(phi) * 0.65
      array[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)
    }
    return array
  }, [count])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((_state, delta) => {
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.015
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#ffffff"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/** Subtle WebGL layer for the hero. Rendered only on capable, non-reduced-motion devices. */
export default function HeroScene() {
  return (
    <Canvas
      className="hero__canvas"
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    >
      <Wire />
      <Dust />
    </Canvas>
  )
}
