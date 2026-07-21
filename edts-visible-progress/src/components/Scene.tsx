import { useMemo, useRef, type ReactNode } from 'react'
import { type ThreeEvent } from '@react-three/fiber'
import {
  ContactShadows,
  Html,
  OrbitControls,
  RoundedBox,
} from '@react-three/drei'
import * as THREE from 'three'
import { useDemo } from '../DemoContext'
import { IN_TO_M, type TwinComponent } from '../types'

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
  oemDark: '#3d4654',
  oemLight: '#9aa3b2',
  cab: '#c5ccd6',
  glass: '#8ec8ff',
  ev: '#3B9EFF',
  evDark: '#1a5fad',
  hv: '#e8873a',
  blocked: '#c45c5c',
  ground: '#0a1218',
  select: '#f0c14a',
}

function hatchMaterial(base: string, placeholder: boolean) {
  return (
    <meshStandardMaterial
      color={base}
      metalness={placeholder ? 0.15 : 0.35}
      roughness={placeholder ? 0.85 : 0.45}
      transparent={placeholder}
      opacity={placeholder ? 0.92 : 1}
      emissive={placeholder ? '#1a2030' : '#000000'}
      emissiveIntensity={placeholder ? 0.15 : 0}
    />
  )
}

type PartProps = {
  component: TwinComponent
  selected: boolean
  onSelect: (id: string) => void
  explode: number
  explodeDir: [number, number, number]
}

function Selectable({
  component,
  selected,
  onSelect,
  explode,
  explodeDir,
  children,
  position = [0, 0, 0],
}: PartProps & {
  children: ReactNode
  position?: [number, number, number]
}) {
  const ref = useRef<THREE.Group>(null)
  const offset = useMemo(
    () =>
      new THREE.Vector3(
        explodeDir[0] * explode * 0.9,
        explodeDir[1] * explode * 0.9,
        explodeDir[2] * explode * 0.9,
      ),
    [explode, explodeDir],
  )
  const pos: [number, number, number] = [
    position[0] + offset.x,
    position[1] + offset.y,
    position[2] + offset.z,
  ]

  const handle = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    onSelect(component.id)
  }

  return (
    <group
      ref={ref}
      position={pos}
      onClick={handle}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default'
      }}
    >
      {children}
      {selected && (
        <Html distanceFactor={12} position={[0, 0.55, 0]} center>
          <div className="floating-label">
            {component.display_name}
            <em>{component.data_status}</em>
          </div>
        </Html>
      )}
    </group>
  )
}

function FramePart(p: PartProps) {
  const railLen = FRONT_BUMPER_X - (REAR_AXLE_X - 1.2)
  const y = 0.55
  const z = FRAME_W / 2
  const midX = (FRONT_BUMPER_X + REAR_AXLE_X - 1.2) / 2
  return (
    <Selectable {...p} explodeDir={[0, -0.2, 0]} position={[0, 0, 0]}>
      <mesh position={[midX, y, z]} castShadow>
        <boxGeometry args={[railLen, 0.18, 0.09]} />
        {hatchMaterial(COLORS.oemDark, true)}
      </mesh>
      <mesh position={[midX, y, -z]} castShadow>
        <boxGeometry args={[railLen, 0.18, 0.09]} />
        {hatchMaterial(COLORS.oemDark, true)}
      </mesh>
      {[-1.2, -0.2, 0.8, 1.8].map((x, i) => (
        <mesh key={i} position={[x, y, 0]}>
          <boxGeometry args={[0.08, 0.12, FRAME_W]} />
          {hatchMaterial(COLORS.oem, true)}
        </mesh>
      ))}
    </Selectable>
  )
}

function CabPart(p: PartProps) {
  const cabLen = BOC - FRONT_OH * 0.15
  const cabX = (FRONT_BUMPER_X + BACK_OF_CAB_X) / 2 - 0.15
  return (
    <Selectable {...p} explodeDir={[0, 1.2, 0]} position={[cabX, 1.15, 0]}>
      <RoundedBox args={[cabLen * 0.55, 1.15, TRACK * 0.85]} radius={0.06} castShadow>
        {hatchMaterial(COLORS.cab, true)}
      </RoundedBox>
      <mesh position={[0.35, 0.25, 0]}>
        <boxGeometry args={[cabLen * 0.28, 0.55, TRACK * 0.78]} />
        <meshStandardMaterial
          color={COLORS.glass}
          transparent
          opacity={0.35}
          metalness={0.2}
          roughness={0.1}
        />
      </mesh>
    </Selectable>
  )
}

function Wheel({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, 0, Math.PI / 2]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.22, 24]} />
        {hatchMaterial('#222831', true)}
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.22, 0.22, 0.24, 16]} />
        {hatchMaterial('#8899aa', true)}
      </mesh>
    </group>
  )
}

function WheelsPart(p: PartProps) {
  const half = TRACK / 2
  const dual = 0.28
  return (
    <Selectable {...p} explodeDir={[0, -0.8, 0]} position={[0, 0, 0]}>
      <Wheel position={[FRONT_AXLE_X, 0.42, half]} />
      <Wheel position={[FRONT_AXLE_X, 0.42, -half]} />
      <Wheel position={[REAR_AXLE_X, 0.42, half]} />
      <Wheel position={[REAR_AXLE_X, 0.42, half - dual]} />
      <Wheel position={[REAR_AXLE_X, 0.42, -half]} />
      <Wheel position={[REAR_AXLE_X, 0.42, -(half - dual)]} />
    </Selectable>
  )
}

function FrontAxlePart(p: PartProps) {
  return (
    <Selectable {...p} explodeDir={[0.4, -0.5, 0]} position={[FRONT_AXLE_X, 0.5, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.16, 0.14, TRACK * 0.92]} />
        {hatchMaterial(COLORS.oemLight, true)}
      </mesh>
    </Selectable>
  )
}

function RearAxlePart(p: PartProps) {
  return (
    <Selectable {...p} explodeDir={[-0.4, -0.5, 0]} position={[REAR_AXLE_X, 0.5, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.22, 0.18, TRACK * 0.95]} />
        {hatchMaterial(COLORS.oem, true)}
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        {hatchMaterial(COLORS.oemDark, true)}
      </mesh>
    </Selectable>
  )
}

function EnginePart(p: PartProps) {
  return (
    <Selectable {...p} explodeDir={[0.9, 0.6, 0]} position={[FRONT_AXLE_X + 0.35, 0.95, 0]}>
      <RoundedBox args={[0.85, 0.7, 0.7]} radius={0.04} castShadow>
        {hatchMaterial('#5a616c', true)}
      </RoundedBox>
    </Selectable>
  )
}

function TransmissionPart(p: PartProps) {
  return (
    <Selectable {...p} explodeDir={[0.5, 0.3, 0]} position={[FRONT_AXLE_X - 0.55, 0.75, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.7, 0.35, 0.4]} />
        {hatchMaterial('#4a5160', true)}
      </mesh>
    </Selectable>
  )
}

function RadiatorPart(p: PartProps) {
  return (
    <Selectable {...p} explodeDir={[1.1, 0.2, 0]} position={[FRONT_BUMPER_X - 0.25, 0.9, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.12, 0.7, 0.85]} />
        {hatchMaterial('#7a8494', true)}
      </mesh>
    </Selectable>
  )
}

function FuelTankPart(p: PartProps) {
  return (
    <Selectable {...p} explodeDir={[-0.9, -0.4, 0]} position={[REAR_AXLE_X - 0.85, 0.55, 0]}>
      <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.28, 0.28, 1.1, 24]} />
        {hatchMaterial('#3f4654', true)}
      </mesh>
    </Selectable>
  )
}

function ExhaustPart(p: PartProps) {
  return (
    <Selectable {...p} explodeDir={[0, -0.3, 0.9]} position={[0.2, 0.45, -FRAME_W / 2 - 0.15]}>
      <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 2.8, 12]} />
        {hatchMaterial('#2c323c', true)}
      </mesh>
      <mesh position={[-0.6, 0.1, 0]}>
        <boxGeometry args={[0.5, 0.25, 0.25]} />
        {hatchMaterial('#353b46', true)}
      </mesh>
    </Selectable>
  )
}

function SteeringPart(p: PartProps) {
  return (
    <Selectable
      {...p}
      explodeDir={[0.3, 0.5, 0.5]}
      position={[FRONT_AXLE_X + 0.15, 0.7, FRAME_W / 2 + 0.05]}
    >
      <mesh castShadow>
        <boxGeometry args={[0.25, 0.2, 0.18]} />
        {hatchMaterial('#8a93a3', true)}
      </mesh>
    </Selectable>
  )
}

function EvBatteryPart(p: PartProps) {
  return (
    <Selectable {...p} explodeDir={[0, -1.0, 0]} position={[REAR_AXLE_X - 0.7, 0.5, 0]}>
      <RoundedBox args={[1.2, 0.28, FRAME_W * 0.95]} radius={0.03} castShadow>
        <meshStandardMaterial
          color={COLORS.ev}
          metalness={0.4}
          roughness={0.35}
          emissive={COLORS.evDark}
          emissiveIntensity={0.25}
        />
      </RoundedBox>
    </Selectable>
  )
}

function EvEduPart(p: PartProps) {
  return (
    <Selectable {...p} explodeDir={[-0.6, 0.4, 0]} position={[REAR_AXLE_X + 0.35, 0.65, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.28, 0.28, 0.55, 24]} />
        <meshStandardMaterial color={COLORS.ev} metalness={0.5} roughness={0.3} />
      </mesh>
    </Selectable>
  )
}

function EvInverterPart(p: PartProps) {
  return (
    <Selectable {...p} explodeDir={[0.8, 0.7, 0]} position={[FRONT_AXLE_X + 0.2, 0.95, 0]}>
      <RoundedBox args={[0.55, 0.22, 0.4]} radius={0.02} castShadow>
        <meshStandardMaterial color={COLORS.hv} metalness={0.35} roughness={0.4} />
      </RoundedBox>
    </Selectable>
  )
}

function EvLtrPart(p: PartProps) {
  return (
    <Selectable {...p} explodeDir={[1.0, 0.3, 0]} position={[FRONT_BUMPER_X - 0.2, 0.85, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.1, 0.55, 0.7]} />
        <meshStandardMaterial color={COLORS.ev} metalness={0.3} roughness={0.5} />
      </mesh>
    </Selectable>
  )
}

function LvGatewayPart(p: PartProps) {
  return (
    <Selectable {...p} explodeDir={[0.2, 0.9, 0]} position={[BACK_OF_CAB_X + 0.15, 0.95, 0.25]}>
      <mesh castShadow>
        <boxGeometry args={[0.12, 0.2, 0.25]} />
        <meshStandardMaterial
          color={COLORS.blocked}
          metalness={0.2}
          roughness={0.7}
          emissive="#5a2020"
          emissiveIntensity={0.35}
        />
      </mesh>
    </Selectable>
  )
}

const ROLE_MAP: Record<string, (p: PartProps) => ReactNode> = {
  frame: FramePart,
  cab: CabPart,
  wheels: WheelsPart,
  front_axle: FrontAxlePart,
  rear_axle: RearAxlePart,
  engine: EnginePart,
  transmission: TransmissionPart,
  radiator: RadiatorPart,
  fuel_tank: FuelTankPart,
  exhaust: ExhaustPart,
  steering: SteeringPart,
  ev_battery: EvBatteryPart,
  ev_edu: EvEduPart,
  ev_inverter: EvInverterPart,
  ev_ltr: EvLtrPart,
  lv_gateway: LvGatewayPart,
}

function Vehicle() {
  const { visibleComponents, selectedId, setSelectedId, explode } = useDemo()

  return (
    <group>
      {visibleComponents.map((c) => {
        const Comp = ROLE_MAP[c.geometry_role]
        if (!Comp) return null
        return (
          <Comp
            key={c.id}
            component={c}
            selected={selectedId === c.id}
            onSelect={setSelectedId}
            explode={explode}
            explodeDir={[0, 1, 0]}
          />
        )
      })}
    </group>
  )
}

function DatumGuides() {
  return (
    <group>
      <mesh position={[FRONT_AXLE_X, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.35, 0.38, 32]} />
        <meshBasicMaterial color="#3B9EFF" transparent opacity={0.5} />
      </mesh>
      <mesh position={[REAR_AXLE_X, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.35, 0.38, 32]} />
        <meshBasicMaterial color="#3B9EFF" transparent opacity={0.5} />
      </mesh>
      {/* WB span guide — extracted wheelbase only */}
      <mesh position={[0, 0.015, TRACK / 2 + 0.35]}>
        <boxGeometry args={[WB, 0.01, 0.02]} />
        <meshBasicMaterial color="#2f9ed8" transparent opacity={0.35} />
      </mesh>
    </group>
  )
}

export function Scene() {
  return (
    <>
      <color attach="background" args={['#061018']} />
      <fog attach="fog" args={['#061018', 14, 32]} />
      <ambientLight intensity={0.4} />
      <directionalLight
        castShadow
        position={[6, 10, 4]}
        intensity={1.4}
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-5, 4, -3]} intensity={0.45} color="#8ec8ff" />
      <pointLight position={[FRONT_BUMPER_X, 2.2, 0]} intensity={0.55} color="#5eb8e8" />
      <Vehicle />
      <DatumGuides />
      <ContactShadows position={[0, 0.001, 0]} opacity={0.55} scale={16} blur={2.5} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color={COLORS.ground} roughness={1} metalness={0} />
      </mesh>
      <gridHelper args={[20, 40, '#1e2a3a', '#15202c']} position={[0, 0.002, 0]} />
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
