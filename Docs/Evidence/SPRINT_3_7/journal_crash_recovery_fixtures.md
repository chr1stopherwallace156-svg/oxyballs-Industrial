# Journal crash-recovery fixture coverage

Covered by `FixtureJournaledCapturePackageBuilder.JournalScenario` + `Phase37ResilienceTests`:

1. Complete journal
2. Power loss before payload write
3. Power loss after payload write but before commit marker
4. Power loss after commit marker
5. Truncated final block
6. Modified prior block
7. Incorrect previous-block hash
8. Duplicate sequence number
9. Missing sequence number
10. Recovered session continuation
11. Cancellation with unsealed journal
12. Final journal root bound into package closure (`SPKG-FIXTURE-JOURNALED-CAPTURE-000001`)

Primary resilient narrative: `SPKG-FIXTURE-RESILIENT-CAPTURE-000001`.
