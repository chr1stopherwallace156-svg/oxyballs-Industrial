import { useDemo } from '../DemoContext'
import type { VehicleState } from '../types'
import { StatusBadge } from './StatusBadge'

const STATES: { id: VehicleState; label: string; blurb: string }[] = [
  { id: 'FACTORY_ICE', label: 'Factory ICE', blurb: 'As-built donor layout' },
  { id: 'DECONSTRUCTION', label: 'Deconstruction', blurb: 'Remove ICE support systems' },
  { id: 'EV_PROPOSAL', label: 'EV Proposal', blurb: 'L3 design proposals only' },
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
  } = useDemo()

  return (
    <header className="toolbar">
      <div className="brand-block">
        <p className="brand">ELEKTRON · EDTS</p>
        <h1>Visible Progress Release 1</h1>
        <p className="config">{catalog.locked_configuration.proposal_configuration_id}</p>
      </div>

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
        <span>Explode</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={explode}
          onChange={(e) => setExplode(Number(e.target.value))}
        />
      </label>

      <div className="part-rail">
        <p className="rail-title">Parts</p>
        <ul>
          {catalog.components
            .filter((c) => c.visible_in.includes(state))
            .map((c) => {
              const gone =
                hiddenIds.has(c.id) ||
                (state === 'DECONSTRUCTION' && removedIds.has(c.id))
              return (
                <li key={c.id} className={gone ? 'gone' : ''}>
                  <button type="button" className="part-btn" onClick={() => setSelectedId(c.id)}>
                    <span className={`fam fam-${c.family}`}>{c.family === 'EV_PROPOSAL' ? 'EV' : 'OEM'}</span>
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
        <p className="tiny muted">{visibleComponents.length} meshes in view</p>
      </div>
    </header>
  )
}
