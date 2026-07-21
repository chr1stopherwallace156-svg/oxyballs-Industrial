import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { joinCatalog, simulation, timeline } from './data/joinCatalog'
import type {
  Catalog,
  SimulationDoc,
  TimelineDoc,
  TwinComponent,
  VehicleState,
  ViewMode,
} from './types'

const catalog = joinCatalog()

export type DemoContextValue = {
  catalog: Catalog
  timeline: TimelineDoc
  simulation: SimulationDoc
  state: VehicleState
  setState: (s: VehicleState) => void
  viewMode: ViewMode
  setViewMode: (m: ViewMode) => void
  selectedId: string | null
  setSelectedId: (id: string | null) => void
  hoveredId: string | null
  setHoveredId: (id: string | null) => void
  hiddenIds: Set<string>
  toggleHidden: (id: string) => void
  removedIds: Set<string>
  toggleRemoved: (id: string) => void
  explode: number
  setExplode: (n: number) => void
  resetTransforms: () => void
  visibleComponents: TwinComponent[]
  selected: TwinComponent | null
  isolatedId: string | null
  setIsolatedId: (id: string | null) => void
  focusTarget: string | null
  focusNonce: number
  focusComponent: (id: string) => void
  searchQuery: string
  setSearchQuery: (q: string) => void
  searchHits: TwinComponent[]
  timelineStep: number
  setTimelineStep: (i: number) => void
  applyTimelineStep: (i: number) => void
  chromeMinimal: boolean
}

const DemoContext = createContext<DemoContextValue | null>(null)

function searchComponents(q: string, comps: TwinComponent[], aliases: Record<string, string[]>) {
  const needle = q.trim().toLowerCase()
  if (!needle) return []
  return comps.filter((c) => {
    const bag = [c.id, c.display_name, c.category, c.geometry_role, ...(aliases[c.id] ?? [])]
      .join(' ')
      .toLowerCase()
    return bag.includes(needle)
  })
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<VehicleState>('FACTORY_ICE')
  const [viewMode, setViewMode] = useState<ViewMode>('INSPECT')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(() => new Set())
  const [removedIds, setRemovedIds] = useState<Set<string>>(() => new Set())
  const [explode, setExplode] = useState(0)
  const [isolatedId, setIsolatedId] = useState<string | null>(null)
  const [focusTarget, setFocusTarget] = useState<string | null>(null)
  const [focusNonce, setFocusNonce] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [timelineStep, setTimelineStep] = useState(0)

  const resetTransforms = useCallback(() => {
    setHiddenIds(new Set())
    setRemovedIds(new Set())
    setExplode(0)
    setIsolatedId(null)
  }, [])

  const focusComponent = useCallback((id: string) => {
    const comp = catalog.components.find((c) => c.id === id)
    if (comp && !comp.visible_in.includes(state)) {
      // Prefer EV proposal for EV parts, else first listed state
      const next =
        comp.visible_in.find((s) => s === 'EV_PROPOSAL') ??
        comp.visible_in.find((s) => s === 'DECONSTRUCTION') ??
        comp.visible_in[0]
      if (next) {
        setState(next)
        setRemovedIds(new Set())
        setHiddenIds(new Set())
      }
    }
    setSelectedId(id)
    setFocusTarget(id)
    setFocusNonce((n) => n + 1)
  }, [state])

  const applyTimelineStep = useCallback(
    (i: number) => {
      const step = timeline.steps[i]
      if (!step) return
      setTimelineStep(i)
      setViewMode('TIMELINE')
      setState(step.state)
      setIsolatedId(null)
      setExplode(0)

      // Cumulative removals through this step
      const removed = new Set<string>()
      for (let s = 0; s <= i; s++) {
        for (const id of timeline.steps[s].remove) removed.add(id)
      }
      setRemovedIds(removed)
      setHiddenIds(new Set())

      if (step.focus) {
        setSelectedId(step.focus)
        setFocusTarget(step.focus)
        setFocusNonce((n) => n + 1)
      } else {
        setSelectedId(null)
        setFocusTarget(null)
      }
    },
    [],
  )

  const visibleComponents = useMemo(() => {
    return catalog.components.filter((c) => {
      if (!c.visible_in.includes(state)) return false
      if (hiddenIds.has(c.id)) return false
      if (removedIds.has(c.id) && c.removable) return false
      if (isolatedId && c.id !== isolatedId) return false
      return true
    })
  }, [state, hiddenIds, removedIds, isolatedId])

  const selected = useMemo(
    () => catalog.components.find((c) => c.id === selectedId) ?? null,
    [selectedId],
  )

  const searchHits = useMemo(
    () => searchComponents(searchQuery, catalog.components, catalog.search_aliases),
    [searchQuery],
  )

  const value: DemoContextValue = {
    catalog,
    timeline,
    simulation,
    state,
    setState: (s) => {
      setState(s)
      setSelectedId(null)
      setIsolatedId(null)
      setRemovedIds(new Set())
      setHiddenIds(new Set())
      setExplode(0)
      if (viewMode === 'TIMELINE') setViewMode('INSPECT')
    },
    viewMode,
    setViewMode,
    selectedId,
    setSelectedId,
    hoveredId,
    setHoveredId,
    hiddenIds,
    toggleHidden: (id) => {
      setHiddenIds((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      })
    },
    removedIds,
    toggleRemoved: (id) => {
      setRemovedIds((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      })
    },
    explode,
    setExplode,
    resetTransforms,
    visibleComponents,
    selected,
    isolatedId,
    setIsolatedId,
    focusTarget,
    focusNonce,
    focusComponent,
    searchQuery,
    setSearchQuery,
    searchHits,
    timelineStep,
    setTimelineStep,
    applyTimelineStep,
    chromeMinimal: true,
  }

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

export function useDemo() {
  const ctx = useContext(DemoContext)
  if (!ctx) throw new Error('useDemo outside provider')
  return ctx
}
