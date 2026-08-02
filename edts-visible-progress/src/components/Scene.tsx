import { useFrame, useThree } from '@react-three/fiber'
import { type ThreeEvent } from '@react-three/fiber'
import {
  ContactShadows,
  Html,
  Line,
  OrbitControls,
  RoundedBox,
} from '@react-three/drei'
import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import * as THREE from 'three'
import { useDemo } from '../DemoContext'
import { HEATMAP_COLORS, IN_TO_M, type TwinComponent, type VehicleState, type ViewMode } from '../types'
import { registerMesh } from '../data/meshRegistry'

/** ASSERTION_EXTRACTED layout dims only (SRC-CAND-000010). Cross-sections are placeholders. */
const WB = 145.3 * IN_TO_M
const TRACK = 74.8 * IN_TO_M
const FRAME_W = 34.2 * IN_TO_M
const FRONT_OH = 38.3 * IN_TO_M
const BOC = 123.7 * IN_TO_M

const FRONT_AXLE_X = WB / 2
const REAR_AXLE_X = -WB / 2
const FRONT_BUMPER_X = FRONT_AXLE_X + FRONT_OH
const BACK_OF_CAB_X = FRONT_BUMPER_X - BOC

const COLORS = {
  oem: '#6b7585',
  oemLight: '#9aa3b2',
  glass: '#8ec8ff',
  ev: '#A855F7',
  evAlt: '#F97316',
  blocked: '#DC2626',
  retained: '#10B981',
  extracted: '#EF4444',
  mutedFactory: '#4b5563',
  ground: '#0a1218',
}

export const ROLE_ANCHOR: Record<string, [number, number, number]> = {
  frame: [0, 0.55, 0],
  cab: [(FRONT_BUMPER_X + BACK_OF_CAB_X) / 2, 1.15, 0],
  front_axle: [FRONT_AXLE_X, 0.5, 0],
  rear_axle: [REAR_AXLE_X, 0.5, 0],
  wheels: [0, 0.42, 0],
  engine: [FRONT_AXLE_X + 0.35, 0.95, 0],
  transmission: [FRONT_AXLE_X - 0.55, 0.75, 0],
  driveshaft: [(FRONT_AXLE_X + REAR_AXLE_X) / 2, 0.48, 0],
  radiator: [FRONT_BUMPER_X - 0.25, 0.9, 0],
  fuel_tank: [REAR_AXLE_X - 0.85, 0.55, 0],
  exhaust: [0.2, 0.45, -FRAME_W / 2 - 0.15],
  steering: [FRONT_AXLE_X + 0.15, 0.7, FRAME_W / 2 + 0.05],
  ev_battery: [REAR_AXLE_X - 0.15, 0.5, 0],
  ev_edu: [REAR_AXLE_X + 0.55, 0.65, 0],
  ev_inverter: [FRONT_AXLE_X + 0.2, 0.95, 0],
  ev_dcdc: [FRONT_AXLE_X - 0.35, 1.05, 0.35],
  ev_ltr: [FRONT_BUMPER_X - 0.2, 0.85, 0],
  ev_ccs: [BACK_OF_CAB_X + 0.05, 1.05, TRACK * 0.38],
  lv_gateway: [BACK_OF_CAB_X + 0.15, 0.95, 0.25],
}

type VisualModeResult = {
  color: string
  opacity: number
  emissive: string
  emissiveIntensity: number
  pulse: boolean
}

function visualFor(
  component: TwinComponent,
  state: VehicleState,
  viewMode: ViewMode,
): VisualModeResult {
  if (viewMode === 'HEATMAP') {
    const color =
      component.confidence_overlay_color ?? HEATMAP_COLORS[component.data_status]
    return {
      color,
      opacity: 0.92,
      emissive: color,
      emissiveIntensity: 0.45,
      pulse: component.data_status === 'BLOCKED' || component.data_status === 'UNKNOWN',
    }
  }

  if (state === 'DECONSTRUCTION') {
    if (component.decon_group === 'EXTRACTED') {
      return {
        color: COLORS.extracted,
        opacity: 0.85,
        emissive: COLORS.extracted,
        emissiveIntensity: 0.35,
        pulse: true,
      }
    }
    return {
      color: COLORS.retained,
      opacity: 0.4,
      emissive: COLORS.retained,
      emissiveIntensity: 0.1,
      pulse: false,
    }
  }
  if (state === 'EV_PROPOSAL') {
    if (component.family === 'EV_PROPOSAL') {
      return {
        color: component.geometry_role === 'ev_battery' ? COLORS.ev : COLORS.evAlt,
        opacity: 0.95,
        emissive: COLORS.ev,
        emissiveIntensity: 0.28,
        pulse: false,
      }
    }
    return {
      color: COLORS.mutedFactory,
      opacity: 0.5,
      emissive: '#000000',
      emissiveIntensity: 0,
      pulse: false,
    }
  }
  if (component.data_status === 'BLOCKED') {
    return {
      color: COLORS.blocked,
      opacity: 0.9,
      emissive: '#5a2020',
      emissiveIntensity: 0.35,
      pulse: false,
    }
  }
  return {
    color: component.decon_group === 'EXTRACTED' ? COLORS.oem : COLORS.oemLight,
    opacity: 0.92,
    emissive: '#1a2030',
    emissiveIntensity: 0.1,
    pulse: false,
  }
}

type PartProps = {
  component: TwinComponent
  selected: boolean
  hovered: boolean
  dimmed: boolean
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
  explode: number
  state: VehicleState
  viewMode: ViewMode
}

function GlassOutline({ active }: { active: boolean }) {
  if (!active) return null
  return (
    <mesh>
      <sphereGeometry args={[0.55, 24, 24]} />
      <meshBasicMaterial
        color="#93C5FD"
        transparent
        opacity={0.12}
        depthWrite={false}
        wireframe={false}
      />
    </mesh>
  )
}

function Selectable({
  component,
  selected,
  hovered,
  dimmed,
  onSelect,
  onHover,
  explode,
  state,
  viewMode,
  children,
  position = [0, 0, 0],
}: PartProps & {
  children: ReactNode
  position?: [number, number, number]
}) {
  const groupRef = useRef<THREE.Group>(null)
  const visual = visualFor(component, state, viewMode)
  const ex = component.explode_vector[0] ?? 0
  const ey = component.explode_vector[1] ?? 0
  const ez = component.explode_vector[2] ?? 0
  const offset = useMemo(
    () => new THREE.Vector3(ex * explode * 0.9, ey * explode * 0.9, ez * explode * 0.9),
    [ex, ey, ez, explode],
  )
  const pos: [number, number, number] = [
    position[0] + offset.x,
    position[1] + offset.y,
    position[2] + offset.z,
  ]

  useFrame(({ clock }) => {
    if (!groupRef.current || !visual.pulse || dimmed) return
    const t = 0.75 + Math.sin(clock.elapsedTime * 3.2) * 0.25
    groupRef.current.traverse((obj) => {
      const mesh = obj as THREE.Mesh
      if (mesh.isMesh && mesh.material && 'emissiveIntensity' in mesh.material) {
        ;(mesh.material as THREE.MeshStandardMaterial).emissiveIntensity =
          visual.emissiveIntensity * t
      }
    })
  })

  // Apple-style: labels ONLY on hover or selection (heatmap may show status via color alone)
  const showLabel = selected || hovered

  return (
    <group
      ref={groupRef}
      position={pos}
      userData={{ compId: component.id, geometryRole: component.geometry_role }}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation()
        onSelect(component.id)
      }}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        onHover(component.id)
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default'
        onHover(null)
      }}
    >
      {children}
      <GlassOutline active={(hovered || selected) && !dimmed} />
      {showLabel && (
        <Html distanceFactor={12} position={[0, 0.55, 0]} center>
          <div className="floating-label glass">
            {component.display_name}
            <em style={{ color: visual.color }}>{component.data_status}</em>
          </div>
        </Html>
      )}
    </group>
  )
}

function Mat({
  component,
  state,
  viewMode,
  colorOverride,
  dimmed,
}: {
  component: TwinComponent
  state: VehicleState
  viewMode: ViewMode
  colorOverride?: string
  dimmed?: boolean
}) {
  const v = visualFor(component, state, viewMode)
  return (
    <meshStandardMaterial
      color={colorOverride ?? v.color}
      metalness={viewMode === 'HEATMAP' ? 0.1 : 0.28}
      roughness={viewMode === 'HEATMAP' ? 0.35 : 0.5}
      transparent
      opacity={dimmed ? 0.18 : v.opacity}
      emissive={v.emissive}
      emissiveIntensity={dimmed ? 0 : v.emissiveIntensity}
    />
  )
}

function FramePart(p: PartProps) {
  const railLen = FRONT_BUMPER_X - (REAR_AXLE_X - 1.2)
  const y = 0.55
  const z = FRAME_W / 2
  const midX = (FRONT_BUMPER_X + REAR_AXLE_X - 1.2) / 2
  const aftEnd = REAR_AXLE_X - 1.2
  return (
    <Selectable {...p} position={[0, 0, 0]}>
      <mesh position={[midX, y, z]} castShadow>
        <boxGeometry args={[railLen, 0.18, 0.09]} />
        <Mat {...p} />
      </mesh>
      <mesh position={[midX, y, -z]} castShadow>
        <boxGeometry args={[railLen, 0.18, 0.09]} />
        <Mat {...p} />
      </mesh>
      {[-1.2, -0.2, 0.8, 1.8].map((x, i) => (
        <mesh key={i} position={[x, y, 0]}>
          <boxGeometry args={[0.08, 0.12, FRAME_W]} />
          <Mat {...p} />
        </mesh>
      ))}
      {/* Aft chassis-cab open rails — silhouette cue for CA/body builder zone */}
      <mesh position={[(BACK_OF_CAB_X + aftEnd) / 2, y + 0.08, z]} castShadow>
        <boxGeometry args={[Math.abs(BACK_OF_CAB_X - aftEnd), 0.06, 0.06]} />
        <Mat {...p} />
      </mesh>
      <mesh position={[(BACK_OF_CAB_X + aftEnd) / 2, y + 0.08, -z]} castShadow>
        <boxGeometry args={[Math.abs(BACK_OF_CAB_X - aftEnd), 0.06, 0.06]} />
        <Mat {...p} />
      </mesh>
    </Selectable>
  )
}

function CabPart(p: PartProps) {
  const cabLen = BOC - FRONT_OH * 0.15
  const cabX = (FRONT_BUMPER_X + BACK_OF_CAB_X) / 2 - 0.15
  const hoodLen = FRONT_OH * 0.55
  return (
    <Selectable {...p} position={[cabX, 1.15, 0]}>
      {/* Cab shell */}
      <RoundedBox args={[cabLen * 0.55, 1.15, TRACK * 0.85]} radius={0.06} castShadow>
        <Mat {...p} />
      </RoundedBox>
      {/* Windshield plane */}
      <mesh position={[0.35, 0.25, 0]}>
        <boxGeometry args={[cabLen * 0.28, 0.55, TRACK * 0.78]} />
        <meshStandardMaterial color={COLORS.glass} transparent opacity={0.28} />
      </mesh>
      {/* Hood — still placeholder, improves truck silhouette */}
      <mesh position={[cabLen * 0.28 + hoodLen * 0.35, -0.25, 0]} castShadow>
        <boxGeometry args={[hoodLen, 0.35, TRACK * 0.72]} />
        <Mat {...p} />
      </mesh>
      {/* Front bumper bar */}
      <mesh position={[cabLen * 0.28 + hoodLen * 0.85, -0.55, 0]} castShadow>
        <boxGeometry args={[0.12, 0.22, TRACK * 0.9]} />
        <Mat {...p} />
      </mesh>
    </Selectable>
  )
}

function Wheel({
  position,
  p,
}: {
  position: [number, number, number]
  p: PartProps
}) {
  return (
    <group position={position} rotation={[0, 0, Math.PI / 2]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.22, 24]} />
        <Mat {...p} colorOverride="#222831" />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.22, 0.22, 0.24, 16]} />
        <Mat {...p} />
      </mesh>
    </group>
  )
}

function WheelsPart(p: PartProps) {
  const half = TRACK / 2
  const dual = 0.28
  return (
    <Selectable {...p} position={[0, 0, 0]}>
      <Wheel position={[FRONT_AXLE_X, 0.42, half]} p={p} />
      <Wheel position={[FRONT_AXLE_X, 0.42, -half]} p={p} />
      <Wheel position={[REAR_AXLE_X, 0.42, half]} p={p} />
      <Wheel position={[REAR_AXLE_X, 0.42, half - dual]} p={p} />
      <Wheel position={[REAR_AXLE_X, 0.42, -half]} p={p} />
      <Wheel position={[REAR_AXLE_X, 0.42, -(half - dual)]} p={p} />
    </Selectable>
  )
}

function BoxPart({
  p,
  position,
  args,
}: {
  p: PartProps
  position: [number, number, number]
  args: [number, number, number]
}) {
  return (
    <Selectable {...p} position={position}>
      <mesh castShadow>
        <boxGeometry args={args} />
        <Mat {...p} />
      </mesh>
    </Selectable>
  )
}

function EnginePart(p: PartProps) {
  return (
    <Selectable {...p} position={[FRONT_AXLE_X + 0.35, 0.95, 0]}>
      <RoundedBox args={[0.85, 0.7, 0.7]} radius={0.04} castShadow>
        <Mat {...p} />
      </RoundedBox>
    </Selectable>
  )
}

function TransmissionPart(p: PartProps) {
  return <BoxPart p={p} position={[FRONT_AXLE_X - 0.55, 0.75, 0]} args={[0.7, 0.35, 0.4]} />
}

function DriveshaftPart(p: PartProps) {
  const mid = (FRONT_AXLE_X - 0.9 + REAR_AXLE_X + 0.3) / 2
  const len = FRONT_AXLE_X - 0.9 - (REAR_AXLE_X + 0.3)
  return (
    <Selectable {...p} position={[mid, 0.48, 0]}>
      <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, Math.abs(len), 12]} />
        <Mat {...p} />
      </mesh>
    </Selectable>
  )
}

function RadiatorPart(p: PartProps) {
  return <BoxPart p={p} position={[FRONT_BUMPER_X - 0.25, 0.9, 0]} args={[0.12, 0.7, 0.85]} />
}

function FuelTankPart(p: PartProps) {
  return (
    <Selectable {...p} position={[REAR_AXLE_X - 0.85, 0.55, 0]}>
      <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.28, 0.28, 1.1, 24]} />
        <Mat {...p} />
      </mesh>
    </Selectable>
  )
}

function ExhaustPart(p: PartProps) {
  return (
    <Selectable {...p} position={[0.2, 0.45, -FRAME_W / 2 - 0.15]}>
      <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 2.8, 12]} />
        <Mat {...p} />
      </mesh>
      <mesh position={[-0.6, 0.1, 0]}>
        <boxGeometry args={[0.5, 0.25, 0.25]} />
        <Mat {...p} />
      </mesh>
    </Selectable>
  )
}

function SteeringPart(p: PartProps) {
  return (
    <BoxPart p={p} position={[FRONT_AXLE_X + 0.15, 0.7, FRAME_W / 2 + 0.05]} args={[0.25, 0.2, 0.18]} />
  )
}

function FrontAxlePart(p: PartProps) {
  return (
    <Selectable {...p} position={[FRONT_AXLE_X, 0.5, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.16, 0.14, TRACK * 0.92]} />
        <Mat {...p} />
      </mesh>
    </Selectable>
  )
}

function RearAxlePart(p: PartProps) {
  return (
    <Selectable {...p} position={[REAR_AXLE_X, 0.5, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.22, 0.18, TRACK * 0.95]} />
        <Mat {...p} />
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <Mat {...p} />
      </mesh>
    </Selectable>
  )
}

function EvBatteryPart(p: PartProps) {
  return (
    <Selectable {...p} position={[REAR_AXLE_X - 0.15, 0.5, 0]}>
      <RoundedBox args={[1.6, 0.28, FRAME_W * 0.95]} radius={0.03} castShadow>
        <Mat {...p} />
      </RoundedBox>
    </Selectable>
  )
}

function EvEduPart(p: PartProps) {
  return (
    <Selectable {...p} position={[REAR_AXLE_X + 0.55, 0.65, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.28, 0.28, 0.55, 24]} />
        <Mat {...p} />
      </mesh>
    </Selectable>
  )
}

function EvInverterPart(p: PartProps) {
  return (
    <Selectable {...p} position={[FRONT_AXLE_X + 0.2, 0.95, 0]}>
      <RoundedBox args={[0.55, 0.22, 0.4]} radius={0.02} castShadow>
        <Mat {...p} />
      </RoundedBox>
    </Selectable>
  )
}

function EvDcdcPart(p: PartProps) {
  return <BoxPart p={p} position={[FRONT_AXLE_X - 0.35, 1.05, 0.35]} args={[0.28, 0.16, 0.22]} />
}

function EvLtrPart(p: PartProps) {
  return <BoxPart p={p} position={[FRONT_BUMPER_X - 0.2, 0.85, 0]} args={[0.1, 0.55, 0.7]} />
}

function EvCcsPart(p: PartProps) {
  return (
    <BoxPart p={p} position={[BACK_OF_CAB_X + 0.05, 1.05, TRACK * 0.38]} args={[0.08, 0.28, 0.18]} />
  )
}

function LvGatewayPart(p: PartProps) {
  return <BoxPart p={p} position={[BACK_OF_CAB_X + 0.15, 0.95, 0.25]} args={[0.12, 0.2, 0.25]} />
}

const ROLE_MAP: Record<string, (p: PartProps) => ReactNode> = {
  frame: FramePart,
  cab: CabPart,
  wheels: WheelsPart,
  front_axle: FrontAxlePart,
  rear_axle: RearAxlePart,
  engine: EnginePart,
  transmission: TransmissionPart,
  driveshaft: DriveshaftPart,
  radiator: RadiatorPart,
  fuel_tank: FuelTankPart,
  exhaust: ExhaustPart,
  steering: SteeringPart,
  ev_battery: EvBatteryPart,
  ev_edu: EvEduPart,
  ev_inverter: EvInverterPart,
  ev_dcdc: EvDcdcPart,
  ev_ltr: EvLtrPart,
  ev_ccs: EvCcsPart,
  lv_gateway: LvGatewayPart,
}

function DependencyLines() {
  const { selected, catalog, state, visibleComponents, viewMode } = useDemo()
  if (!selected || state !== 'DECONSTRUCTION' || viewMode === 'HEATMAP') return null
  const from = ROLE_ANCHOR[selected.geometry_role]
  if (!from) return null
  const ids = [
    ...selected.dependency_highlights.blocks_access_to,
    ...selected.dependency_highlights.must_disconnect_before,
  ]
  const visibleIds = new Set(visibleComponents.map((c) => c.id))
  return (
    <group>
      {ids.map((id) => {
        const target = catalog.components.find((c) => c.id === id)
        if (!target || !visibleIds.has(id)) return null
        const to = ROLE_ANCHOR[target.geometry_role]
        if (!to) return null
        const isBlock = selected.dependency_highlights.blocks_access_to.includes(id)
        return (
          <Line
            key={id}
            points={[from, to]}
            color={isBlock ? '#F59E0B' : '#EF4444'}
            lineWidth={2}
            dashed
            dashSize={0.12}
            gapSize={0.08}
          />
        )
      })}
    </group>
  )
}

function Vehicle() {
  const {
    visibleComponents,
    selectedId,
    setSelectedId,
    hoveredId,
    setHoveredId,
    explode,
    state,
    viewMode,
    dimUnrelated,
  } = useDemo()

  return (
    <group>
      {visibleComponents.map((c) => {
        registerMesh(c.id, c.geometry_role)
        const Comp = ROLE_MAP[c.geometry_role]
        if (!Comp) return null
        const dimmed = dimUnrelated && selectedId !== null && selectedId !== c.id
        return (
          <Comp
            key={c.id}
            component={c}
            selected={selectedId === c.id}
            hovered={hoveredId === c.id}
            dimmed={dimmed}
            onSelect={setSelectedId}
            onHover={setHoveredId}
            explode={explode}
            state={state}
            viewMode={viewMode}
          />
        )
      })}
    </group>
  )
}

function FocusCamera() {
  const { focusTarget, focusNonce } = useDemo()
  const { camera, scene } = useThree()
  const controls = useThree((s) => s.controls) as unknown as {
    target: THREE.Vector3
    update: () => void
  } | null
  const anim = useRef<{
    fromCam: THREE.Vector3
    toCam: THREE.Vector3
    fromTarget: THREE.Vector3
    toTarget: THREE.Vector3
    t: number
  } | null>(null)

  useEffect(() => {
    if (!focusTarget) return
    let obj: THREE.Object3D | null = null
    scene.traverse((o) => {
      if (o.userData?.compId === focusTarget) obj = o
    })
    if (!obj) return

    const box = new THREE.Box3().setFromObject(obj)
    const sphere = new THREE.Sphere()
    box.getBoundingSphere(sphere)
    const target = sphere.center.clone()
    const dist = Math.max(sphere.radius * 3.2, 2.4)
    const dir = new THREE.Vector3(0.85, 0.45, 0.9).normalize()
    const toCam = target.clone().add(dir.multiplyScalar(dist))

    anim.current = {
      fromCam: camera.position.clone(),
      toCam,
      fromTarget: controls?.target.clone() ?? new THREE.Vector3(0, 0.8, 0),
      toTarget: target,
      t: 0,
    }
  }, [focusTarget, focusNonce, camera, controls, scene])

  useFrame((_, dt) => {
    if (!anim.current) return
    anim.current.t = Math.min(1, anim.current.t + dt * 1.55)
    const k = 1 - Math.pow(1 - anim.current.t, 3)
    camera.position.lerpVectors(anim.current.fromCam, anim.current.toCam, k)
    if (controls) {
      controls.target.lerpVectors(anim.current.fromTarget, anim.current.toTarget, k)
      controls.update()
    }
    if (anim.current.t >= 1) anim.current = null
  })

  return null
}

function DatumGuides() {
  const { viewMode } = useDemo()
  if (viewMode === 'HEATMAP') return null
  return (
    <group>
      <mesh position={[FRONT_AXLE_X, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.35, 0.38, 32]} />
        <meshBasicMaterial color="#3B9EFF" transparent opacity={0.35} />
      </mesh>
      <mesh position={[REAR_AXLE_X, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.35, 0.38, 32]} />
        <meshBasicMaterial color="#3B9EFF" transparent opacity={0.35} />
      </mesh>
    </group>
  )
}

export function Scene() {
  return (
    <>
      <color attach="background" args={['#050a10']} />
      <fog attach="fog" args={['#050a10', 16, 34]} />
      <ambientLight intensity={0.35} />
      <directionalLight
        castShadow
        position={[6, 10, 4]}
        intensity={1.35}
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-5, 4, -3]} intensity={0.4} color="#8ec8ff" />
      <Vehicle />
      <DependencyLines />
      <DatumGuides />
      <FocusCamera />
      <ContactShadows position={[0, 0.001, 0]} opacity={0.5} scale={16} blur={2.5} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color={COLORS.ground} roughness={1} metalness={0} />
      </mesh>
      <OrbitControls
        makeDefault
        target={[0, 0.8, 0]}
        maxPolarAngle={Math.PI * 0.49}
        minDistance={3}
        maxDistance={18}
      />
    </>
  )
}
