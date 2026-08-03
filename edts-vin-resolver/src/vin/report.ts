import type { VinResolutionReport } from './types.js'

function cell(v: string | number | null | undefined): string {
  if (v == null || v === '') return 'UNKNOWN'
  return String(v)
}

export function formatCliReport(report: VinResolutionReport): string {
  const id = report.identity
  const top = report.comparisons[0]
  const lines = [
    'EDTS VIN RESOLVER',
    `VIN:                  ${report.vin}`,
    `VIN validation:       ${report.vin_validation}`,
    `Decode provider:      ${report.decode_provider}`,
    `Decode status:        ${report.decode_status}`,
    `Manufacturer:         ${cell(id?.manufacturer)}`,
    `Make:                 ${cell(id?.make)}`,
    `Model year:           ${cell(id?.modelYear)}`,
    `Model:                ${cell(id?.model)}`,
    `Body class:           ${cell(id?.bodyClass)}`,
    `Cab type:             ${cell(id?.cabType)}`,
    `Drive type:           ${cell(id?.driveType)}`,
    `GVWR class:           ${cell(id?.gvwrClass ?? id?.gvwr)}`,
    `Resolution outcome:   ${report.outcome}`,
  ]

  if (top) {
    lines.push('Reference comparison:')
    lines.push(top.configuration_id)
    const makeField = top.fields.find((f) => f.field === 'make_or_manufacturer')
    const yearField = top.fields.find((f) => f.field === 'modelYear')
    lines.push(`Manufacturer match:   ${makeField?.status ?? 'UNKNOWN'}`)
    lines.push(`Model-year match:     ${yearField?.status ?? 'UNKNOWN'}`)
    lines.push(`Configuration result: ${top.reference_result}`)
  }

  lines.push('Action:')
  if (report.vehicle_id) {
    lines.push(`Created/updated vehicle record:`)
    lines.push(report.vehicle_id)
  } else {
    lines.push('No vehicle record written')
  }

  if (report.lifecycle_status) {
    lines.push(`Lifecycle status:     ${report.lifecycle_status}`)
  }

  lines.push('Further verification required:')
  for (const r of report.verification_requirements) {
    lines.push(`- ${r.description}`)
  }

  lines.push('')
  lines.push('HONESTY:')
  for (const h of report.honesty) {
    lines.push(`- ${h}`)
  }

  if (report.evidence_path) lines.push(`Evidence: ${report.evidence_path}`)
  if (report.vehicle_path) lines.push(`Vehicle:  ${report.vehicle_path}`)
  if (report.report_path) lines.push(`Report:   ${report.report_path}`)

  return `${lines.join('\n')}\n`
}

export function formatMarkdownReport(report: VinResolutionReport): string {
  const id = report.identity
  const sections: string[] = [
    `# EDTS VIN Resolution Report`,
    ``,
    `**VIN:** \`${report.vin}\``,
    `**Decision:** DT-D067`,
    `**Outcome:** ${report.outcome}`,
    `**Lifecycle:** ${report.lifecycle_status ?? 'n/a'}`,
    ``,
    `## Honesty`,
    ``,
    `VIN decoding does **not** prove physical geometry, wheelbase, cab-to-axle, frame holes, torque, modifications, or current component condition.`,
    `NHTSA vPIC data is manufacturer-reported. Missing fields are UNKNOWN — not invented.`,
    `This report must **not** be treated as \`CONFIGURATION_CONFIRMED\` or engineering-Verified from VIN alone.`,
    ``,
    `## Decoded identity`,
    ``,
    `| Field | Value |`,
    `|---|---|`,
    `| Manufacturer | ${cell(id?.manufacturer)} |`,
    `| Make | ${cell(id?.make)} |`,
    `| Model year | ${cell(id?.modelYear)} |`,
    `| Model | ${cell(id?.model)} |`,
    `| Series | ${cell(id?.series)} |`,
    `| Body class | ${cell(id?.bodyClass)} |`,
    `| Cab type | ${cell(id?.cabType)} |`,
    `| Drive type | ${cell(id?.driveType)} |`,
    `| GVWR | ${cell(id?.gvwr)} |`,
    `| Engine | ${cell(id?.engineManufacturer)} / ${cell(id?.displacementLiters)} L |`,
    `| Plant | ${cell(id?.plantCity)}, ${cell(id?.plantState)}, ${cell(id?.plantCountry)} |`,
    `| ErrorCode | ${cell(id?.errorCode)} |`,
    `| ErrorText | ${cell(id?.errorText)} |`,
    ``,
  ]

  if (id?.errorText) {
    sections.push(`## Decoder notes`, ``, id.errorText, ``)
  }

  sections.push(`## Configuration comparisons`, ``)
  for (const c of report.comparisons) {
    sections.push(`### ${c.configuration_id}`, ``)
    sections.push(`Result: **${c.reference_result}** · score=${c.score}`, ``)
    sections.push(`| Field | Expected | Observed | Status | Mandatory |`)
    sections.push(`|---|---|---|---|---|`)
    for (const f of c.fields) {
      sections.push(
        `| ${f.field} | ${cell(f.expected as string)} | ${cell(f.observed as string)} | ${f.status} | ${f.mandatory} |`,
      )
    }
    sections.push(``)
  }

  sections.push(`## Conflicts`, ``)
  if (report.conflicts.length === 0) sections.push(`_None_`, ``)
  else for (const x of report.conflicts) sections.push(`- ${x}`)

  sections.push(``, `## Unknowns`, ``)
  for (const u of report.unknowns) sections.push(`- ${u}`)

  sections.push(``, `## Confidence explanation`, ``)
  for (const line of report.confidence_explanation) sections.push(`- ${line}`)

  sections.push(``, `## Required physical verification`, ``)
  for (const r of report.verification_requirements) {
    sections.push(`- **${r.id}**: ${r.description} — ${r.reason}`)
  }

  sections.push(
    ``,
    `## Artifacts`,
    ``,
    `- Evidence: \`${report.evidence_path ?? 'n/a'}\``,
    `- Vehicle: \`${report.vehicle_path ?? 'n/a'}\``,
    ``,
  )

  return sections.join('\n')
}
