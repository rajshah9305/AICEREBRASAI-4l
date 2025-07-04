"use client"

import { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, Environment, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

// Floating particles component
function ParticleField() {
  const ref = useRef<THREE.Points>(null)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(1500 * 3)
    for (let i = 0; i < 1500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25
    }
    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.1
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.5
    }
  })

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ff8c00"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Geometric shapes component
function GeometricShapes() {
  const groupRef = useRef<THREE.Group>(null)

  const shapes = useMemo(() => {
    const shapeArray = []
    for (let i = 0; i < 8; i++) {
      shapeArray.push({
        position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20] as [
          number,
          number,
          number,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [
          number,
          number,
          number,
        ],
        scale: Math.random() * 0.5 + 0.3,
        type: Math.floor(Math.random() * 3), // 0: box, 1: sphere, 2: octahedron
      })
    }
    return shapeArray
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {shapes.map((shape, index) => {
        const ShapeComponent = () => {
          const meshRef = useRef<THREE.Mesh>(null)

          useFrame((state) => {
            if (meshRef.current) {
              meshRef.current.rotation.x += 0.01
              meshRef.current.rotation.y += 0.01
              meshRef.current.position.y += Math.sin(state.clock.elapsedTime + index) * 0.001
            }
          })

          return (
            <mesh ref={meshRef} position={shape.position} rotation={shape.rotation} scale={shape.scale}>
              {shape.type === 0 && <boxGeometry args={[1, 1, 1]} />}
              {shape.type === 1 && <sphereGeometry args={[0.5, 16, 16]} />}
              {shape.type === 2 && <octahedronGeometry args={[0.7]} />}
              <meshStandardMaterial
                color="#ff8c00"
                transparent
                opacity={0.1}
                wireframe
                emissive="#ff4400"
                emissiveIntensity={0.1}
              />
            </mesh>
          )
        }

        return <ShapeComponent key={index} />
      })}
    </group>
  )
}

// Neural network visualization
function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null)

  const nodes = useMemo(() => {
    const nodeArray = []
    for (let i = 0; i < 12; i++) {
      nodeArray.push({
        position: [(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15] as [
          number,
          number,
          number,
        ],
        scale: Math.random() * 0.3 + 0.1,
      })
    }
    return nodeArray
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      {nodes.map((node, index) => (
        <mesh key={index} position={node.position}>
          <sphereGeometry args={[node.scale, 8, 8]} />
          <meshBasicMaterial color="#ff8c00" transparent opacity={0.15} wireframe />
        </mesh>
      ))}

      {/* Connection lines */}
      {nodes.map((node, i) =>
        nodes.slice(i + 1).map((otherNode, j) => {
          const distance = Math.sqrt(
            Math.pow(node.position[0] - otherNode.position[0], 2) +
              Math.pow(node.position[1] - otherNode.position[1], 2) +
              Math.pow(node.position[2] - otherNode.position[2], 2),
          )

          if (distance < 8) {
            const midPoint = [
              (node.position[0] + otherNode.position[0]) / 2,
              (node.position[1] + otherNode.position[1]) / 2,
              (node.position[2] + otherNode.position[2]) / 2,
            ] as [number, number, number]

            return (
              <line key={`${i}-${j}`}>
                <bufferGeometry>
                  <bufferAttribute
                    attach="attributes-position"
                    count={2}
                    array={new Float32Array([...node.position, ...otherNode.position])}
                    itemSize={3}
                  />
                </bufferGeometry>
                <lineBasicMaterial color="#ff8c00" transparent opacity={0.1} />
              </line>
            )
          }
          return null
        }),
      )}
    </group>
  )
}

// Main 3D scene component
function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#ff8c00" />

      {/* Environment */}
      <Environment preset="city" background={false} />

      {/* 3D Elements */}
      <ParticleField />
      <GeometricShapes />
      <NeuralNetwork />

      {/* Controls (disabled for background use) */}
      <OrbitControls enabled={false} enableZoom={false} enablePan={false} enableRotate={false} />
    </>
  )
}

// Loading fallback for 3D scene
function SceneLoading() {
  return <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 to-transparent" />
}

// Error boundary for 3D scene
function SceneError() {
  return <div className="absolute inset-0 bg-gradient-to-br from-orange-50/10 to-transparent" />
}

// Main Three.js background component
export function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Suspense fallback={<SceneLoading />}>
        <Canvas
          camera={{
            position: [0, 0, 15],
            fov: 60,
            near: 0.1,
            far: 1000,
          }}
          style={{ background: "transparent" }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0)
          }}
          onError={() => <SceneError />}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  )
}
