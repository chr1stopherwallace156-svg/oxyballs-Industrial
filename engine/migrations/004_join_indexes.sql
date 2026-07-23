-- M10.1 performance correction (owner final evidence-pack reconciliation, item 5).
-- A PROVEN, REPRODUCIBLE DEFECT: `EXPLAIN QUERY PLAN` for the benchmarked 3-way
-- vehicle→config→runout join showed `SCAN rc` (a full scan of RunoutCalculations),
-- and verify:perf timing scaled linearly with row count (1k→0.11ms, 10k→1.22ms,
-- 100k→16.5ms per query) — i.e. O(n), not O(log n). Root cause: the two FK columns
-- on the join path were unindexed, so the planner could not drive iv→cp→rc by index.
--
-- These indexes are purely non-semantic: they change query SPEED only, never any
-- result, rule, or state. Adding them is the deterministic correction for the
-- proven defect (Article IV/VI). After this migration the plan becomes a fully
-- indexed lookup and per-query time is sub-linear in fleet size.

-- Drive iv → cp: resolve a vehicle to its configuration packets by index.
CREATE INDEX idx_config_packet_vehicle ON ConfigurationPacket(individual_vehicle_id);

-- Drive cp → rc: resolve a configuration packet to its runout-calculations by index.
CREATE INDEX idx_runout_calc_config ON RunoutCalculations(configuration_packet_id);
