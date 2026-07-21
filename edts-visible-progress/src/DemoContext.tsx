import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import catalogJson from './data/componentCatalog.json'
import type { Catalog, TwinComponent, VehicleState } from './types'

const catalog = catalogJson as unknown as Catalog

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
  resetTransforms: () => void
  visibleComponents: TwinComponent[]
  selected: TwinComponent | null
  isolatedId: string | null
  setIsolatedId: (id: string | null) => void
}

const DemoContext = createContext<DemoContextValue | null>(null)

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<VehicleState>('FACTORY_ICE')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(() => new Set())
  const [removedIds, setRemovedIds] = useState<Set<string>>(() => new Set())
  const [explode, setExplode] = useState(0)
  const [isolatedId, setIsolatedId] = useState<string | null>(null)

  const resetTransforms = useCallback(() => {
    setHiddenIds(new Set())
    setRemovedIds(new Set())
    setExplode(0)
    setIsolatedId(null)
  }, [])

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

  const value: DemoContextValue = {
    catalog,
    state,
    setState: (s) => {
      setState(s)
      setSelectedId(null)
      setIsolatedId(null)
      setRemovedIds(new Set())
      setHiddenIds(new Set())
      setExplode(0)
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
    resetTransforms,
    visibleComponents,
    selected,
    isolatedId,
    setIsolatedId,
  }

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

export function useDemo() {
  const ctx = useContext(DemoContext)
  if (!ctx) throw new Error('useDemo outside provider')
  return ctx
}
