# DIMENSION_DATABASE.md — L00 Canonical Dimensions (PROVISIONAL)

Storage format: table with per‑row source, confidence, and verification status.

Legend: VERIFIED (OEM), UNVERIFIED, RESEARCH_REQUIRED, ASSUMPTION

Vehicle: 2019 Ford F‑450 Super Duty Regular Cab, DRW, 8 ft bed, 4x2

## Wheelbase / Length / Width / Height

| Name | Value | Units | Source | Confidence | Status | Notes |
|---|---:|:---:|---|:---:|:---:|---|
| Wheelbase | 141.6 | in | Super Duty pickup dimension guide (2017–2019, OEM path) | medium | RESEARCH_REQUIRED | Obtain official BBAS PDF; record page/line |
| Overall length | 231.8 | in | Third‑party (KBB/aggregators) | low | UNVERIFIED | Replace with OEM table |
| Overall width (excl. mirrors) | 105.9 | in | Third‑party | low | UNVERIFIED | Confirm mirror variant; verify OEM |
| Overall height | UNVERIFIED | in | — | — | RESEARCH_REQUIRED | — |

## Overhangs and Track

| Name | Value | Units | Source | Confidence | Status | Notes |
|---|---:|:---:|---|:---:|:---:|---|
| Front overhang | UNVERIFIED | in | — | — | RESEARCH_REQUIRED | — |
| Rear overhang | UNVERIFIED | in | — | — | RESEARCH_REQUIRED | — |
| Front track | UNVERIFIED | in | — | — | RESEARCH_REQUIRED | — |
| Rear track | UNVERIFIED | in | — | — | RESEARCH_REQUIRED | — |

## Frame and Cab Key Dimensions

| Name | Value | Units | Source | Confidence | Status | Notes |
|---|---:|:---:|---|:---:|:---:|---|
| Frame rail section dims | — | — | — | — | RESEARCH_REQUIRED | Vehicle‑specific BBLB |
| Engine bay length (firewall→rad) | — | — | — | — | RESEARCH_REQUIRED | Scan + OEM |
| Door aperture (H×W) | — | — | — | — | RESEARCH_REQUIRED | — |
| Hood planform dims | — | — | — | — | RESEARCH_REQUIRED | — |

All values remain blocked until OEM tables are archived or scans executed. Do not propagate UNVERIFIED numbers into geometry.

