import { useDemo } from '../DemoContext'
import type { ViewMode } from '../types'
import { HEATMAP_COLORS, type DataStatus } from '../types'

const MODES: { id: ViewMode; label: string }[] = [
  { id: 'INSPECT', label: 'Inspect' },
  { id: 'HEATMAP', label: 'Heatmap' },
  { id: 'TIMELINE', label: 'Timeline' },
  { id: 'SIMULATION', label: 'Simulation' },
]

export function SearchBar() {
  const { searchQuery, setSearchQuery, searchHits, focusComponent, catalog } = useDemo()
  return (
    <div className="search-bar">
      <input
        type="search"
        placeholder="Search components… e.g. fuel tank"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Search components"
      />
      {searchQuery && (
        <ul className="search-hits">
          {searchHits.length === 0 && <li className="muted">No matches</li>}
          {searchHits.slice(0, 8).map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => {
                  focusComponent(c.id)
                  setSearchQuery('')
                  if (!c.visible_in.includes(catalog.states[0])) {
                    /* focus still selects; state may need switch — handled below */
                  }
                }}
              >
                <span>{c.display_name}</span>
                <em>{c.data_status}</em>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function ModeBar() {
  const { viewMode, setViewMode, applyTimelineStep } = useDemo()
  return (
    <div className="mode-bar" role="tablist" aria-label="View mode">
      {MODES.map((m) => (
        <button
          key={m.id}
          type="button"
          role="tab"
          aria-selected={viewMode === m.id}
          className={viewMode === m.id ? 'active' : ''}
          onClick={() => {
            setViewMode(m.id)
            if (m.id === 'TIMELINE') applyTimelineStep(0)
          }}
        >
          {m.label}
        </button>
      ))}
    </div>
  )
}

export function TimelineRail() {
  const { viewMode, timeline, timelineStep, applyTimelineStep } = useDemo()
  if (viewMode !== 'TIMELINE') return null
  const step = timeline.steps[timelineStep]
  return (
    <div className="timeline-rail">
      <div className="timeline-head">
        <strong>{timeline.title}</strong>
        <p>{timeline.honesty}</p>
      </div>
      <input
        type="range"
        min={0}
        max={timeline.steps.length - 1}
        step={1}
        value={timelineStep}
        onChange={(e) => applyTimelineStep(Number(e.target.value))}
      />
      <div className="timeline-steps">
        {timeline.steps.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={i === timelineStep ? 'active' : ''}
            onClick={() => applyTimelineStep(i)}
          >
            <span>{s.id}</span>
            {s.label}
          </button>
        ))}
      </div>
      {step && (
        <div className="timeline-note">
          <strong>{step.label}</strong>
          <p>{step.note}</p>
        </div>
      )}
    </div>
  )
}

export function SimulationPanel() {
  const { viewMode, simulation } = useDemo()
  if (viewMode !== 'SIMULATION') return null
  const f = simulation.demo_fields
  return (
    <div className="sim-panel">
      <strong>{simulation.title}</strong>
      <span className="sim-status">{simulation.status}</span>
      <p>{simulation.honesty}</p>
      <dl>
        <div>
          <dt>Front axle Δ</dt>
          <dd>{f.front_axle_delta_kg == null ? 'UNKNOWN' : `${f.front_axle_delta_kg} kg`}</dd>
        </div>
        <div>
          <dt>Rear axle Δ</dt>
          <dd>{f.rear_axle_delta_kg == null ? 'UNKNOWN' : `${f.rear_axle_delta_kg} kg`}</dd>
        </div>
        <div>
          <dt>CG shift</dt>
          <dd>{f.cg_shift_mm == null ? 'UNKNOWN' : `${f.cg_shift_mm} mm`}</dd>
        </div>
      </dl>
      <p className="tiny muted">Requires: {simulation.required_before_enable.join(' · ')}</p>
      <p className="tiny">
        Example ±32 kg / 18 mm from feedback is <em>not</em> shown — mass evidence missing (MEPQ-001).
      </p>
    </div>
  )
}

export function HeatmapLegend() {
  const { viewMode } = useDemo()
  if (viewMode !== 'HEATMAP') return null
  const statuses = Object.keys(HEATMAP_COLORS) as DataStatus[]
  return (
    <div className="heatmap-legend">
      <span className="legend-title">Evidence maturity heatmap</span>
      {statuses.map((s) => (
        <span key={s} className="hm-swatch" style={{ background: HEATMAP_COLORS[s] }}>
          {s.replaceAll('_', ' ')}
        </span>
      ))}
    </div>
  )
}
