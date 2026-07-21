# QUANTUM_APPLICABILITY_ASSESSMENT.md

**Pack:** EDTS Open-Source Maximum-Leverage Research Mission  
**Decision:** DT-D064  
**Disposition:** **`REFERENCE_ONLY` — NO QUANTUM ADVANTAGE for current EDTS problem scale**  
**Honesty:** Timings and fidelities below are **formulated / illustrative classical-vs-NISQ comparisons** for a small ILP instance (\(N\!\approx\!50\)), **not** EDTS laboratory measurements on VEH-000001 hardware. Classical branch-and-cut triviality at this scale is the operative engineering conclusion.

---

## 1. Concrete problem — optimal sensor & AprilTag placement

NP-hard combinatorial covering relevant to scan planning:

| Symbol | Meaning | Example scale |
|---|---|---|
| \(N\) | Candidate anchor locations | 50 |
| \(M\) | Surface inspection patches | 200 |
| \(c_i\) | Cost / friction of anchor \(i\) | |
| \(A_{ij}\in\{0,1\}\) | Coverage of patch \(j\) by anchor \(i\) | |
| \(K\) | Max active anchors | budget |

### Classical ILP

\[
\begin{aligned}
\min_{\mathbf{x}\in\{0,1\}^N} &\quad \mathbf{c}^\top\mathbf{x} \\
\text{s.t.} &\quad \sum_i A_{ij} x_i \ge 1 && \forall j=1..M \\
&\quad \sum_i x_i \le K
\end{aligned}
\]

### QUBO map (research only)

Encode constraints with penalty \(\lambda\); obtain upper-triangular \(\mathbf{Q}\) for annealer / QAOA forms:

\[
\min_{\mathbf{x}\in\{0,1\}^N} \mathbf{x}^\top \mathbf{Q}\,\mathbf{x}
\]

---

## 2. Classical benchmark posture

| Item | Assessment |
|---|---|
| Solvers | COIN-OR CBC, SciPy `milp`, Python-MIP; commercial MILP (e.g. Gurobi) where licensed |
| Instance | \(N=50\), \(M=200\) class |
| Expected classical behavior | **Milliseconds-scale** solve to proven optimum on laptop-class CPU for this size |
| Optimality | Branch-and-cut routinely closes **0% gap** at this scale |

Illustrative briefing figure (~12 ms class on modern CPU) is consistent with “trivial for classical ILP” — **do not treat as a locked EDTS perf KPI**.

---

## 3. Quantum / QAOA posture (NISQ)

| Item | Assessment |
|---|---|
| Frameworks | Qiskit Optimization / Aer simulator; cloud backends when studied |
| Typical simulator cost | **Seconds** for small QAOA (\(p\!\sim\!2\)) — orders of magnitude slower than classical ILP here |
| Hardware reality | Queue + decoherence; suboptimal sampling probability common on NISQ |
| Engineering conclusion | No production dependence |

Illustrative briefing contrasts (simulator ~seconds; cloud >> classical; imperfect optimal-state probability) support **reject integration**, not a claim of measured IBM Eagle runs by this agent.

---

## 4. Applicability matrix (locked disposition)

```
┌─────────────────────────────────────────────────────────────┐
│ Quantum Advantage Status:   NO QUANTUM ADVANTAGE            │
│ Mathematical Barrier:       N < ~500 trivial for classical  │
│ Production Recommendation:  REJECT from active pipeline     │
│ Archive Status:             REFERENCE_ONLY                  │
└─────────────────────────────────────────────────────────────┘
```

### Allowed

- Keep QUBO formulation in research archive for future mega-scale covering problems if/when \(N\) grows into regimes where classical heuristics struggle **and** quantum hardware matures.

### Forbidden

- Blocking EDTS delivery on quantum cloud access  
- Marketing “quantum digital twin” claims  
- Replacing CBC/SciPy MILP for sensor placement, tolerance stacking, or sprint planning

---

## 5. Production optimization stack (authorized)

| Task | Stack |
|---|---|
| Anchor / camera placement | Classical ILP (CBC / SciPy MILP) |
| Scale calibration | WLS (Method 6.1) |
| Registration | Open3D FPFH + ICP |
| Visualization | R3F (not an optimizer) |
