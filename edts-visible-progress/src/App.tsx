import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { DemoProvider, useDemo } from './DemoContext'
import { Scene } from './components/Scene'
import { SidePanel } from './components/SidePanel'
import { Toolbar } from './components/Toolbar'
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
        {d.front_overhang.value}&quot; ({d.wheelbase.status}). No invented torque, materials, or
        mounts.
      </span>
    </div>
  )
}

function Legend() {
  return (
    <div className="legend" aria-hidden>
      <span className="legend-title">Data status</span>
      <span className="badge badge-VERIFIED">VERIFIED</span>
      <span className="badge badge-PHYSICALLY_MEASURED">PHYSICALLY MEASURED</span>
      <span className="badge badge-ESTIMATED">ESTIMATED</span>
      <span className="badge badge-PLACEHOLDER_GEOMETRY">PLACEHOLDER</span>
      <span className="badge badge-DESIGN_PROPOSAL">DESIGN PROPOSAL</span>
      <span className="badge badge-UNKNOWN">UNKNOWN</span>
      <span className="badge badge-BLOCKED">BLOCKED</span>
    </div>
  )
}

function AppShell() {
  const { setSelectedId } = useDemo()
  return (
    <div className="app">
      <Toolbar />
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
