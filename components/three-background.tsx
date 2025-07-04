"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import type * as THREE from "three"

function ParticleField() {
  const ref = useRef<THREE.Points>(null)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3)

    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }

    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1
    }
  })

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#ff8c00" size={0.02} sizeAttenuation={true} depthWrite={false} opacity={0.3} />
    </Points>
  )
}

function NetworkNodes() {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  const nodes = useMemo(() => {
    const nodePositions = []
    for (let i = 0; i < 50; i++) {
      nodePositions.push({
        position: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15],
        scale: Math.random() * 0.5 + 0.2,
      })
    }
    return nodePositions
  }, [])

  return (
    <group ref={ref}>
      {nodes.map((node, index) => (
        <mesh key={index} position={node.position as [number, number, number]}>
          <sphereGeometry args={[node.scale, 8, 8]} />
          <meshBasicMaterial color="#ff8c00" transparent opacity={0.1} wireframe />
        </mesh>
      ))}
    </group>
  )
}

export function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} style={{ background: "transparent" }}>
        <ambientLight intensity={0.5} />
        <ParticleField />
        <NetworkNodes />
      </Canvas>
    </div>
  )
}
