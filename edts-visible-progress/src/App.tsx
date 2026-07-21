import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { DemoProvider, useDemo } from './DemoContext'
import { Scene } from './components/Scene'
import { SidePanel } from './components/SidePanel'
import { Toolbar } from './components/Toolbar'
import {
  HeatmapLegend,
  SimulationPanel,
  TimelineRail,
} from './components/ModePanels'
import './index.css'

function ConfigLockOverlay() {
  const { catalog, hoveredId, selectedId } = useDemo()
  const quiet = !hoveredId && !selectedId
  return (
    <div className={`config-lock-overlay ${quiet ? 'quiet' : ''}`}>
      <span>LOCK</span>
      <code>{catalog.locked_configuration.proposal_configuration_id}</code>
    </div>
  )
}

function HonestyStrip() {
  const { catalog, hoveredId, selectedId, viewMode } = useDemo()
  if (viewMode === 'HEATMAP') return null
  const quiet = !hoveredId && !selectedId
  const d = catalog.honesty.known_dimensions_in
  return (
    <div className={`honesty-strip ${quiet ? 'quiet' : ''}`}>
      <strong>Honesty</strong>
      <span>
        Hover a part for passport. WB {d.wheelbase.value}&quot; · track {d.front_track.value}&quot; ·
        frame H {d.frame_rail_outside_width.value}&quot; extracted. Five-store architecture · no
        invented mass/CG.
      </span>
    </div>
  )
}

function AppShell() {
  const { setSelectedId, state, viewMode, setHoveredId } = useDemo()
  return (
    <div className="app minimal" data-state={state} data-mode={viewMode}>
      <Toolbar />
      <ConfigLockOverlay />
      <HeatmapLegend />
      <HonestyStrip />
      <TimelineRail />
      <SimulationPanel />
      <div className="viewport">
        <Canvas
          shadows
          camera={{ position: [7.8, 4.4, 9.2], fov: 40, near: 0.1, far: 200 }}
          gl={{ antialias: true, toneMappingExposure: 1.05 }}
          onPointerMissed={() => {
            setSelectedId(null)
            setHoveredId(null)
          }}
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
