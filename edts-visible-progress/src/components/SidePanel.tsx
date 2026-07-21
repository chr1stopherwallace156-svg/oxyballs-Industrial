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
    isolatedId,
    setIsolatedId,
  } = useDemo()

  if (!selected) {
    return (
      <aside className="side-panel empty">
        <p className="eyebrow">Component passport</p>
        <h2>Select a part</h2>
        <p className="muted">
          Click any mesh. Factory and EV proposal families stay separated. Badges show evidence
          honesty — not confidence %.
        </p>
        <div className="lock-chip">
          <span>LOCK</span>
          <code>{catalog.locked_configuration.proposal_configuration_id}</code>
        </div>
        <div className="honesty-box">
          <strong>Prototype status</strong>
          <p>
            {catalog.prototype_status?.label ?? 'VPR-2 Architecture and Interaction Prototype'} —
            R3F procedural meshes (no GLB). Mass/axle disabled. Timeline = storyboard.
          </p>
        </div>
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
  const isIsolated = isolatedId === selected.id

  return (
    <aside className="side-panel">
      <button type="button" className="close-sel" onClick={() => setSelectedId(null)}>
        Clear
      </button>
      <p className="eyebrow">
        {selected.family === 'EV_PROPOSAL'
          ? 'EV proposal · L3'
          : `Factory · ${selected.layer} · ${selected.decon_group}`}
      </p>
      <h2>{selected.display_name}</h2>
      <div className="badge-row">
        <StatusBadge status={selected.data_status} />
        <span className="elig-pill">{selected.procedure_eligibility}</span>
      </div>

      <section>
        <h3>Maturity dimensions</h3>
        <dl className="maturity-grid">
          <div>
            <dt>Identity</dt>
            <dd>{selected.maturity.identity_status}</dd>
          </div>
          <div>
            <dt>Geometry</dt>
            <dd>{selected.maturity.geometry_status}</dd>
          </div>
          <div>
            <dt>Placement</dt>
            <dd>{selected.maturity.placement_status}</dd>
          </div>
          <div>
            <dt>Mass</dt>
            <dd>{selected.maturity.mass_status}</dd>
          </div>
          <div>
            <dt>Interfaces</dt>
            <dd>{selected.maturity.interface_status}</dd>
          </div>
        </dl>
        <p className="tiny muted">One badge cannot certify all properties — see dimensions above.</p>
      </section>

      <section>
        <h3>Component ID</h3>
        <code className="id-block">{selected.id}</code>
        <p className="tiny muted">{selected.data_classification}</p>
      </section>

      <section>
        <h3>Configuration applicability</h3>
        <div className="lock-chip compact">
          <span>LOCK</span>
          <code>{catalog.locked_configuration.proposal_configuration_id}</code>
        </div>
        <p>
          <strong>{selected.configuration_applicability}</strong>
        </p>
        <p className="tiny muted">
          MY {catalog.locked_configuration.model_year} · {catalog.locked_configuration.summary}
        </p>
      </section>

      <section>
        <h3>Evidence ledger</h3>
        <ul className="ledger">
          {selected.evidence_ledger.map((e, i) => (
            <li key={i}>
              <span className={`claim-status status-${e.status}`}>{e.status}</span>
              <p>{e.claim}</p>
              <code>{e.source_id}</code>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Known interfaces</h3>
        {selected.known_interfaces.length ? (
          <ul className="iface-list">
            {selected.known_interfaces.map((iface) => (
              <li key={iface.interface_id}>
                <code>{iface.interface_id}</code>
                <span className="tiny muted">
                  {iface.class}
                  {iface.target_component ? ` → ${iface.target_component}` : ''} · {iface.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">None recorded</p>
        )}
      </section>

      <section>
        <h3>Missing properties / knowledge gaps</h3>
        {selected.missing_properties.length ? (
          <ul className="gap-list">
            {selected.missing_properties.map((m, i) => (
              <li key={i}>
                <p>{m.property}</p>
                {m.knowledge_gap_id && <code className="kg">{m.knowledge_gap_id}</code>}
                <span className="tiny muted">{m.required_action}</span>
              </li>
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
              <li key={m.code}>
                <code>
                  {m.code} · {m.domain}
                </code>
                <p>{m.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">None linked</p>
        )}
      </section>

      {(selected.dependency_highlights.blocks_access_to.length > 0 ||
        selected.dependency_highlights.must_disconnect_before.length > 0) && (
        <section>
          <h3>Dependency highlights</h3>
          {selected.dependency_highlights.blocks_access_to.length > 0 && (
            <p className="tiny">
              <strong>BLOCKS_ACCESS_TO:</strong>{' '}
              {selected.dependency_highlights.blocks_access_to.join(', ')}
            </p>
          )}
          {selected.dependency_highlights.must_disconnect_before.length > 0 && (
            <p className="tiny">
              <strong>MUST_DISCONNECT_BEFORE:</strong>{' '}
              {selected.dependency_highlights.must_disconnect_before.join(', ')}
            </p>
          )}
        </section>
      )}

      <section>
        <h3>Geometry type</h3>
        <p className="tiny muted">{selected.geometry_type}</p>
      </section>

      <section>
        <h3>Mass / CG (simulation)</h3>
        <p className="tiny">
          mass_kg: {selected.mass_kg == null ? 'null' : selected.mass_kg} · status:{' '}
          <code>{selected.mass_status}</code>
        </p>
        <p className="tiny muted">Blocked until PHYSICALLY_MEASURED / VERIFIED — no invented axle deltas.</p>
      </section>

      <div className="actions">
        <button type="button" onClick={() => toggleHidden(selected.id)}>
          {isHidden ? 'Show' : 'Hide'}
        </button>
        <button
          type="button"
          onClick={() => setIsolatedId(isIsolated ? null : selected.id)}
        >
          {isIsolated ? 'Un-isolate' : 'Isolate'}
        </button>
        {selected.removable && state === 'DECONSTRUCTION' && (
          <button type="button" className="danger" onClick={() => toggleRemoved(selected.id)}>
            {isRemoved ? 'Restore' : 'Remove / Extract'}
          </button>
        )}
      </div>
      {selected.decon_intent && (
        <p className="tiny muted">Conversion intent (L3): {selected.decon_intent}</p>
      )}
    </aside>
  )
}
