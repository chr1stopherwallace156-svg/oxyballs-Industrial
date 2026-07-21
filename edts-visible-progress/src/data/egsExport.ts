import egsStore from './stores/EGS.json'
import type { GraphEdge } from '../types'

export const edges = (egsStore.edges ?? []) as GraphEdge[]
