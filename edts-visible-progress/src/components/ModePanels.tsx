import { useDemo } from '../DemoContext'
import type { ViewMode } from '../types'
import { HEATMAP_COLORS, type DataStatus } from '../types'

const MODES: { id: ViewMode; label: string }[] = [
  { id: 'INSPECT', label: 'Inspect' },
  { id: 'HEATMAP', label: 'Heatmap' },
  { id: 'TIMELINE', label: 'Storyboard' },
  { id: 'SIMULATION', label: 'Mass (disabled)' },
]

export function SearchBar() {
  const { searchQuery, setSearchQuery, searchHits, focusComponent } = useDemo()
  return (
    <div className="search-bar pill">
      <input
        type="search"
        placeholder="Search… fuel tank, frame, battery"
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
    <div className="timeline-rail surgery">
      <div className="timeline-head">
        <strong>STORYBOARD TIMELINE</strong>
        <p>
          <span className="storyboard-tag">{timeline.kind ?? 'STORYBOARD'}</span> {timeline.honesty}
        </p>
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
  const { viewMode, massEngine, catalog } = useDemo()
  if (viewMode !== 'SIMULATION') return null

  return (
    <div className="sim-panel">
      <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
        Demonstration mass subset
      </div>
      <strong className="block mt-1">Incomplete vehicle mass basis</strong>
      <span className="sim-status">{massEngine.status}</span>
      <dl>
        <div>
          <dt>Represented sub-mass</dt>
          <dd>
            {massEngine.total_mass_kg == null
              ? '— kg (none measured in SIM)'
              : `${massEngine.total_mass_kg.toFixed(1)} kg`}
          </dd>
        </div>
        <div>
          <dt>Coverage</dt>
          <dd>
            Incomplete · {massEngine.components_with_mass} measured /{' '}
            {massEngine.components_missing_mass} unknown
          </dd>
        </div>
        <div>
          <dt>Axle reaction calculations</dt>
          <dd>DISABLED</dd>
        </div>
      </dl>
      <p className="tiny muted">
        Quarantined assumption numbers live in{' '}
        <code>ASSUMPTION_DEMO_MASS_SUBSET.json</code> and are not loaded into SIM. Invented handoff
        kg values are not shown as engineering results.
      </p>
      <p className="tiny muted">
        {catalog.storage_tiers?.note ??
          'Six domains → three storage tiers (relational · object · client state).'}
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

/** Floating Apple-style top chrome over the viewport only. */
export function FloatingChrome() {
  const { catalog, viewMode, setViewMode } = useDemo()
  return (
    <div className="floating-chrome">
      <SearchBar />
      <div className="floating-actions">
        <button
          type="button"
          className={viewMode === 'HEATMAP' ? 'hm-active' : ''}
          onClick={() => setViewMode(viewMode === 'HEATMAP' ? 'INSPECT' : 'HEATMAP')}
        >
          {viewMode === 'HEATMAP' ? 'Heatmap: ACTIVE' : 'Confidence Visualization'}
        </button>
        <span className="lock-pill">
          LOCK {catalog.locked_configuration.proposal_configuration_id}
        </span>
      </div>
    </div>
  )
}
