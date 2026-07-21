import { useDemo } from '../DemoContext'
import type { VehicleState } from '../types'
import { StatusBadge } from './StatusBadge'
import { ModeBar, SearchBar } from './ModePanels'

const STATES: { id: VehicleState; label: string; blurb: string }[] = [
  { id: 'FACTORY_ICE', label: '1. Factory ICE', blurb: 'As-built donor baseline' },
  { id: 'DECONSTRUCTION', label: '2. Deconstruction', blurb: 'Extract ICE systems' },
  { id: 'EV_PROPOSAL', label: '3. EV Proposal', blurb: 'L3 design proposals only' },
]

export function Toolbar() {
  const {
    catalog,
    state,
    setState,
    explode,
    setExplode,
    visibleComponents,
    setSelectedId,
    toggleHidden,
    hiddenIds,
    removedIds,
    toggleRemoved,
    resetTransforms,
    selectedId,
    focusComponent,
  } = useDemo()

  return (
    <header className="toolbar">
      <div className="brand-block">
        <p className="brand">ELEKTRON · EDTS</p>
        <h1>Visible Progress Release 1</h1>
        <div className="lock-chip">
          <span>LOCK</span>
          <code>{catalog.locked_configuration.proposal_configuration_id}</code>
        </div>
        <p className="tiny muted arch-note">{catalog.architecture.join(' · ')}</p>
      </div>

      <SearchBar />
      <ModeBar />

      <div className="state-tabs" role="tablist" aria-label="Vehicle state">
        {STATES.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={state === s.id}
            className={state === s.id ? 'active' : ''}
            onClick={() => setState(s.id)}
          >
            <span className="tab-label">{s.label}</span>
            <span className="tab-blurb">{s.blurb}</span>
          </button>
        ))}
      </div>

      <label className="explode">
        <span>Exploded view · {Math.round(explode * 100)}%</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={explode}
          onChange={(e) => setExplode(Number(e.target.value))}
        />
      </label>

      <button type="button" className="reset-btn" onClick={resetTransforms}>
        Reset transforms
      </button>

      <div className="part-rail">
        <p className="rail-title">Scene tree</p>
        <ul className="scene-tree">
          {catalog.scene_tree.map((group) => {
            const comps = group.component_ids
              .map((id) => catalog.components.find((c) => c.id === id))
              .filter((c): c is NonNullable<typeof c> => !!c && c.visible_in.includes(state))
            if (!comps.length) return null
            return (
              <li key={group.id} className="tree-group">
                <p className="tree-group-label">{group.label}</p>
                <ul>
                  {comps.map((c) => {
                    const gone = hiddenIds.has(c.id) || (c.removable && removedIds.has(c.id))
                    return (
                      <li key={c.id} className={gone ? 'gone' : ''}>
                        <button
                          type="button"
                          className={`part-btn ${selectedId === c.id ? 'selected' : ''}`}
                          onClick={() => focusComponent(c.id)}
                        >
                          <span className={`fam fam-${c.family}`}>
                            {c.family === 'EV_PROPOSAL'
                              ? 'EV'
                              : c.decon_group === 'EXTRACTED'
                                ? 'X'
                                : 'OEM'}
                          </span>
                          <span className="part-name">{c.display_name}</span>
                          <StatusBadge status={c.data_status} />
                        </button>
                        <div className="mini-actions">
                          <button type="button" onClick={() => toggleHidden(c.id)}>
                            {hiddenIds.has(c.id) ? 'Show' : 'Hide'}
                          </button>
                          {c.removable && state === 'DECONSTRUCTION' && (
                            <button type="button" onClick={() => toggleRemoved(c.id)}>
                              {removedIds.has(c.id) ? 'Restore' : 'Remove'}
                            </button>
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </li>
            )
          })}
        </ul>
        <p className="tiny muted">{visibleComponents.length} meshes in view</p>
        <button type="button" className="ghost" onClick={() => setSelectedId(null)}>
          Deselect
        </button>
      </div>
    </header>
  )
}
