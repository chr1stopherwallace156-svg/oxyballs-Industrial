import assert from 'node:assert/strict';
import { BlockError, BlockReason } from '../src/blockReasons';

/** Assert that `fn` throws a BlockError carrying exactly `reason`. */
export function expectBlock(fn: () => unknown, reason: BlockReason): void {
  try {
    fn();
  } catch (e) {
    if (e instanceof BlockError) {
      assert.equal(e.reason, reason, `expected BlockReason ${reason}, got ${e.reason} (${e.message})`);
      return;
    }
    throw e;
  }
  assert.fail(`expected BlockError ${reason}, but nothing was thrown`);
}

/** Assert that `fn` throws an error whose message includes `needle`. */
export function expectThrowsMessage(fn: () => unknown, needle: string): void {
  try {
    fn();
  } catch (e) {
    assert.ok((e as Error).message.includes(needle), `expected message to include "${needle}", got: ${(e as Error).message}`);
    return;
  }
  assert.fail(`expected a throw including "${needle}", but nothing was thrown`);
}
