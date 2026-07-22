import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import type { ConfigurationExpectation } from './types.js'

export async function loadConfigurations(
  dataRoot: string,
  compareFilter?: string | null,
): Promise<ConfigurationExpectation[]> {
  const dir = path.join(dataRoot, 'configurations')
  const entries = await readdir(dir)
  const configs: ConfigurationExpectation[] = []
  for (const name of entries.sort()) {
    if (!name.endsWith('.json') || name === 'index.json') continue
    const raw = JSON.parse(await readFile(path.join(dir, name), 'utf8')) as ConfigurationExpectation
    if (!raw.configuration_id) {
      throw new Error(`Configuration file missing configuration_id: ${name}`)
    }
    configs.push(raw)
  }
  if (configs.length === 0) {
    throw new Error('No configuration files found under data/configurations')
  }
  if (compareFilter) {
    const filtered = configs.filter((c) => c.configuration_id === compareFilter)
    if (filtered.length === 0) {
      throw new Error(`Configuration not found: ${compareFilter}`)
    }
    return filtered
  }
  return configs
}
