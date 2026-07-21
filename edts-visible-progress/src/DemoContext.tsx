import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import catalogJson from './data/componentCatalog.json'
import type { Catalog, TwinComponent, VehicleState } from './types'

const catalog = catalogJson as Catalog

export type DemoContextValue = {
  catalog: Catalog
  state: VehicleState
  setState: (s: VehicleState) => void
  selectedId: string | null
  setSelectedId: (id: string | null) => void
  hiddenIds: Set<string>
  toggleHidden: (id: string) => void
  removedIds: Set<string>
  toggleRemoved: (id: string) => void
  explode: number
  setExplode: (n: number) => void
  visibleComponents: TwinComponent[]
  selected: TwinComponent | null
}

const DemoContext = createContext<DemoContextValue | null>(null)

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<VehicleState>('FACTORY_ICE')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(() => new Set())
  const [removedIds, setRemovedIds] = useState<Set<string>>(() => new Set())
  const [explode, setExplode] = useState(0)

  const visibleComponents = useMemo(() => {
    return catalog.components.filter((c) => {
      if (!c.visible_in.includes(state)) return false
      if (hiddenIds.has(c.id)) return false
      if (state === 'DECONSTRUCTION' && c.removable && removedIds.has(c.id)) return false
      if (state === 'DECONSTRUCTION' && c.removable && !removedIds.has(c.id)) {
        // In deconstruction, show removable parts until user removes them;
        // also auto-suggest they can be removed — still visible initially.
        return true
      }
      if (state !== 'FACTORY_ICE' && c.removable && c.visible_in.length === 1) {
        // ICE-only parts stay out of EV proposal automatically via visible_in
      }
      return true
    })
  }, [state, hiddenIds, removedIds])

  const selected = useMemo(
    () => catalog.components.find((c) => c.id === selectedId) ?? null,
    [selectedId],
  )

  const value: DemoContextValue = {
    catalog,
    state,
    setState: (s) => {
      setState(s)
      setSelectedId(null)
      if (s === 'FACTORY_ICE') setRemovedIds(new Set())
      if (s === 'DECONSTRUCTION') {
        // Start decon with ICE parts still present for interactive removal
        setRemovedIds(new Set())
      }
    },
    selectedId,
    setSelectedId,
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
    visibleComponents,
    selected,
  }

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

export function useDemo() {
  const ctx = useContext(DemoContext)
  if (!ctx) throw new Error('useDemo outside provider')
  return ctx
}
