#!/usr/bin/env node
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { formatCliReport, resolveVin } from '../src/vin/index.js'

type CliFlags = {
  vin: string | null
  json: boolean
  forceRefresh: boolean
  offline: boolean
  compare: string | null
  help: boolean
}

function parseArgs(argv: string[]): CliFlags {
  const flags: CliFlags = {
    vin: null,
    json: false,
    forceRefresh: false,
    offline: false,
    compare: null,
    help: false,
  }
  const positionals: string[] = []
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]!
    if (a === '--json') flags.json = true
    else if (a === '--force-refresh') flags.forceRefresh = true
    else if (a === '--offline') flags.offline = true
    else if (a === '--help' || a === '-h') flags.help = true
    else if (a === '--compare') {
      flags.compare = argv[++i] ?? null
    } else if (a.startsWith('--compare=')) {
      flags.compare = a.slice('--compare='.length)
    } else if (a.startsWith('-')) {
      console.error(`Unknown flag: ${a}`)
      process.exit(1)
    } else {
      positionals.push(a)
    }
  }
  flags.vin = positionals[0] ?? null
  return flags
}

function printHelp() {
  console.log(`EDTS VIN Resolver (DT-D067)

Usage:
  npm run vin -- <17-character VIN>
  npm run vin -- <VIN> --json
  npm run vin -- <VIN> --force-refresh
  npm run vin -- <VIN> --compare CFG-ID
  npm run vin -- <VIN> --offline

Exit codes:
  0 success
  1 invalid input
  2 decoder/network failure
  3 persistence failure
  4 configuration registry error
`)
}

async function main() {
  const flags = parseArgs(process.argv.slice(2))
  if (flags.help || !flags.vin) {
    printHelp()
    process.exit(flags.help ? 0 : 1)
  }

  const dataRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
    'data',
  )

  const { report, exitCode } = await resolveVin({
    vin: flags.vin,
    json: flags.json,
    forceRefresh: flags.forceRefresh,
    offline: flags.offline,
    compareConfigurationId: flags.compare,
    dataRoot,
  })

  if (flags.json) {
    console.log(JSON.stringify(report, null, 2))
  } else {
    console.log(formatCliReport(report))
  }
  process.exit(exitCode)
}

main().catch((err) => {
  console.error(err instanceof Error ? err.stack ?? err.message : err)
  process.exit(3)
})
