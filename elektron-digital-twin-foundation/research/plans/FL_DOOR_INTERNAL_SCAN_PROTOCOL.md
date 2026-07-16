# FL Door Internal Structure — Targeted Scan Protocol

**Status:** PLANNED (not executed)  
**Silo:** `VEH-000001` / `CFG-000001` / `CMPINST-VEH000001-DOOR-FL`  
**Sprint:** RL-010 / DT-D041  
**Rationale:** Public saturation is incomplete for verified evidence; inner cavity + harness routing remain the blocking geometry gaps. Do not scan the entire vehicle for this gap.

## Preconditions

- Physical donor matches locked config **or** proven interchange under HR-EVI
- Mirror option recorded (manual 8-pin vs power telescope 22-pin)
- Photographs + hash for each step before destructive removal where possible

## Protocol

### 1. Interior Door Trim Panel Removal

- **Target:** Fasteners & plastic clips  
- Extract hidden fasteners at trim base and under handle bezel (sizes to be confirmed on vehicle — do not invent).  
- Disconnect master switch harness pigtail.  
- Scan exposed mounting face.

### 2. Vapor Barrier and Foam Deadener Mapping

- **Target:** Adhesive boundary  
- Trace butyl sealant trail along inner aluminum panel perimeter before removal.  
- Structured-light / photogrammetry of sound-deadening flat pattern.

### 3. Inner Panel Cavity Scan

- **Target:** Intrusion beams and regulator paths  
- Endoscope or compact structured-light via cavity access ports.  
- Capture side-impact beam, window guide channels, lock actuator rod paths.

### 4. Door Harness Routing Tracking

- **Target:** Clip attachment locations  
- Coordinate every tree-clip retaining plug on inner sheet metal.  
- Branch points to speaker and mirror interfaces.  
- Cross-check against EWD (`SRC-CAND-000006`) when acquired — never invent pinouts.

## Outputs (required for promotion)

| Artifact | Required fields |
|---|---|
| Scan set | Local path, full SHA-256, capture date, operator |
| Coordinate notes | Frame ID from coordinate registry |
| Option record | Mirror / power window / trim codes |

## Forbidden

- Promote cavity mesh to silo GEO without Hard Rule 4  
- Apply F-150 inner fastener map without crossover proof (CL-001 scope limit)  
- Mark protocol steps complete without physical execution evidence
