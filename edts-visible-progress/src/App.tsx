import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { DemoProvider, useDemo } from './DemoContext'
import { Scene } from './components/Scene'
import { SidePanel } from './components/SidePanel'
import { Toolbar } from './components/Toolbar'
import { BADGE_COLORS, type DataStatus } from './types'
import './index.css'

function HonestyStrip() {
  const { catalog } = useDemo()
  const d = catalog.honesty.known_dimensions_in
  return (
    <div className="honesty-strip">
      <strong>Honesty</strong>
      <span>
        Stylized placeholder meshes. Exact layout: WB {d.wheelbase.value}&quot; · track{' '}
        {d.front_track.value}&quot; · frame H {d.frame_rail_outside_width.value}&quot; · overhang{' '}
        {d.front_overhang.value}&quot; ({d.wheelbase.status}). Handoff sample VERIFIED/kWh/kW claims
        rejected — see DT-D058.
      </span>
    </div>
  )
}

function Legend() {
  const statuses = Object.keys(BADGE_COLORS) as DataStatus[]
  return (
    <div className="legend" aria-hidden>
      <span className="legend-title">Data status</span>
      {statuses.map((s) => (
        <span
          key={s}
          className={`badge badge-${s}`}
          style={{ color: BADGE_COLORS[s], borderColor: BADGE_COLORS[s] }}
        >
          {s.replaceAll('_', ' ')}
        </span>
      ))}
    </div>
  )
}

function ConfigLockOverlay() {
  const { catalog } = useDemo()
  return (
    <div className="config-lock-overlay">
      <span>LOCK</span>
      <code>{catalog.locked_configuration.proposal_configuration_id}</code>
    </div>
  )
}

function AppShell() {
  const { setSelectedId, state } = useDemo()
  return (
    <div className="app" data-state={state}>
      <Toolbar />
      <ConfigLockOverlay />
      <Legend />
      <HonestyStrip />
      <div className="viewport">
        <Canvas
          shadows
          camera={{ position: [7.8, 4.4, 9.2], fov: 40, near: 0.1, far: 200 }}
          gl={{ antialias: true, toneMappingExposure: 1.05 }}
          onPointerMissed={() => setSelectedId(null)}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
      <SidePanel />
    </div>
  )
}

export default function App() {
  return (
    <DemoProvider>
      <AppShell />
    </DemoProvider>
  )
}
