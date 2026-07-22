import { BlockReason, block } from './blockReasons';

/** Authorization statuses (RC-387/408). COMPLETED is deliberately NOT here — it is
 *  an Execution status; execution completion never mutates authorization (RC-408). */
export type AuthStatus =
  | 'DRAFT' | 'APPROVAL_REQUIRED' | 'AUTHORIZED' | 'ACTIVE'
  | 'SUSPENDED' | 'REVOKED' | 'SUPERSEDED' | 'EXPIRED';

/**
 * The transition TABLE is the single source of truth (RC-413). Any diagram is
 * rendered to match it. `AUTHORIZED → SUPERSEDED` is a controlled option, gated
 * separately (see assertTransition).
 */
const ALLOWED: Readonly<Record<AuthStatus, ReadonlyArray<AuthStatus>>> = {
  DRAFT: ['APPROVAL_REQUIRED'],
  APPROVAL_REQUIRED: ['AUTHORIZED', 'DRAFT'],
  AUTHORIZED: ['ACTIVE', 'SUSPENDED', 'REVOKED', 'EXPIRED', 'SUPERSEDED'],
  ACTIVE: ['SUSPENDED', 'REVOKED'],
  SUSPENDED: ['AUTHORIZED', 'REVOKED', 'EXPIRED'],
  REVOKED: ['SUPERSEDED'],
  EXPIRED: ['SUPERSEDED'],
  SUPERSEDED: [],
};

export function isTransitionAllowed(from: AuthStatus, to: AuthStatus): boolean {
  return ALLOWED[from]?.includes(to) ?? false;
}

export interface TransitionContext {
  /** RC-413: AUTHORIZED → SUPERSEDED only when a newer authorization replaces it
   *  AND it has never become ACTIVE. */
  replacedByNewerAuthorization?: boolean;
  everBecameActive?: boolean;
}

/** Assert a transition is legal or throw ILLEGAL_STATE_TRANSITION. */
export function assertTransition(from: AuthStatus, to: AuthStatus, ctx: TransitionContext = {}): void {
  // Execution completion attempting to move authorization is a distinct, explicit block.
  block(
    to !== ('COMPLETED' as unknown as AuthStatus),
    BlockReason.EXECUTION_COMPLETION_CANNOT_MUTATE_AUTHORIZATION,
    'COMPLETED is an execution status, not an authorization status',
  );
  block(
    isTransitionAllowed(from, to),
    BlockReason.ILLEGAL_STATE_TRANSITION,
    `${from} -> ${to}`,
  );
  if (from === 'AUTHORIZED' && to === 'SUPERSEDED') {
    block(
      ctx.replacedByNewerAuthorization === true && ctx.everBecameActive !== true,
      BlockReason.ILLEGAL_STATE_TRANSITION,
      'AUTHORIZED -> SUPERSEDED only when a newer authorization replaces it and it never became ACTIVE',
    );
  }
}

/** RC-388/424: at/after expiry, AUTHORIZED and SUSPENDED expire automatically. */
export function isExpired(authorizationExpiry: string | null, now: Date = new Date()): boolean {
  if (!authorizationExpiry) return false;
  return now.getTime() >= new Date(authorizationExpiry).getTime();
}
