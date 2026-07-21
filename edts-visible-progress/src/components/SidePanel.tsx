import { StatusBadge } from './StatusBadge'
import { useDemo } from '../DemoContext'

export function SidePanel() {
  const {
    catalog,
    selected,
    state,
    setSelectedId,
    toggleHidden,
    toggleRemoved,
    hiddenIds,
    removedIds,
  } = useDemo()

  if (!selected) {
    return (
      <aside className="side-panel empty">
        <p className="eyebrow">Component inspector</p>
        <h2>Select a part</h2>
        <p className="muted">
          Click any mesh in the viewport. Factory parts and EV proposals stay
          visually separated. Badges always show evidence honesty — not confidence %.
        </p>
        <div className="honesty-box">
          <strong>Honesty</strong>
          <p>{catalog.honesty.note}</p>
        </div>
        <dl className="dim-list">
          {Object.entries(catalog.honesty.known_dimensions_in).map(([k, v]) => (
            <div key={k}>
              <dt>{k.replaceAll('_', ' ')}</dt>
              <dd>
                {v.value} in · <span className="tag">{v.status}</span>
              </dd>
            </div>
          ))}
        </dl>
      </aside>
    )
  }

  const isHidden = hiddenIds.has(selected.id)
  const isRemoved = removedIds.has(selected.id)

  return (
    <aside className="side-panel">
      <button type="button" className="close-sel" onClick={() => setSelectedId(null)}>
        Clear
      </button>
      <p className="eyebrow">
        {selected.family === 'EV_PROPOSAL' ? 'EV proposal · L3' : 'Factory · ' + selected.layer}
      </p>
      <h2>{selected.display_name}</h2>
      <StatusBadge status={selected.data_status} />

      <section>
        <h3>Component ID</h3>
        <code className="id-block">{selected.id}</code>
      </section>

      <section>
        <h3>Configuration applicability</h3>
        <p>{selected.configuration_applicability}</p>
        <p className="tiny muted">{catalog.locked_configuration.summary}</p>
      </section>

      <section>
        <h3>Evidence status</h3>
        <p>{selected.evidence_status}</p>
      </section>

      <section>
        <h3>Known interfaces</h3>
        {selected.known_interfaces.length ? (
          <ul>
            {selected.known_interfaces.map((i) => (
              <li key={i}>
                <code>{i}</code>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">None recorded</p>
        )}
      </section>

      <section>
        <h3>Missing properties</h3>
        {selected.missing_properties.length ? (
          <ul>
            {selected.missing_properties.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        ) : (
          <p className="muted">None listed</p>
        )}
      </section>

      <section>
        <h3>MEPQ blockers</h3>
        {selected.mepq_blockers.length ? (
          <ul className="mepq">
            {selected.mepq_blockers.map((m) => (
              <li key={m}>
                <code>{m}</code>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">None linked</p>
        )}
      </section>

      <div className="actions">
        <button type="button" onClick={() => toggleHidden(selected.id)}>
          {isHidden ? 'Show' : 'Hide'}
        </button>
        {selected.removable && state === 'DECONSTRUCTION' && (
          <button type="button" className="danger" onClick={() => toggleRemoved(selected.id)}>
            {isRemoved ? 'Restore' : 'Remove'}
          </button>
        )}
      </div>
      {selected.decon_intent && (
        <p className="tiny muted">Conversion intent (L3): {selected.decon_intent}</p>
      )}
    </aside>
  )
}
