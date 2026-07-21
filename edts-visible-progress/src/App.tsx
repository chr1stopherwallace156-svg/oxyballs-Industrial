import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { DemoProvider, useDemo } from './DemoContext'
import { Scene } from './components/Scene'
import { SidePanel } from './components/SidePanel'
import { Toolbar } from './components/Toolbar'
import {
  FloatingChrome,
  HeatmapLegend,
  SimulationPanel,
  TimelineRail,
} from './components/ModePanels'
import './index.css'

function AppShell() {
  const { setSelectedId, state, viewMode, setHoveredId, selectedId, hoveredId } = useDemo()
  const quiet = !hoveredId && !selectedId
  return (
    <div className="app minimal r2" data-state={state} data-mode={viewMode}>
      <Toolbar />
      <FloatingChrome />
      <HeatmapLegend />
      <TimelineRail />
      <SimulationPanel />
      <div className={`hint-idle ${quiet ? 'show' : ''}`}>Hover a part · click to inspect</div>
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
