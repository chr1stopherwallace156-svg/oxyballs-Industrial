# MATHEMATICAL_METHODS_REGISTRY.md

**Pack:** EDTS Open-Source Maximum-Leverage Research Mission  
**Config lock:** `CFG-2019-F450-REG-CAB-4X2-60CA-DRW`  
**Decision:** DT-D064  
**Status:** Formulated methods for future calibration — not executed measurements this pass.

---

## Method 6.1 — Weighted Least Squares (WLS) multilateral scale calibration

### Problem

Given \(M\) physical dimensions \(d_i\) (caliper / laser tape) with variances \(\sigma_i^2\), and corresponding cloud distances \(\hat{d}_i\) under global scale \(s\), estimate \(s^*\).

### Model

\[
\hat{d}_i(s) = s \cdot \tilde{d}_i
\]

where \(\tilde{d}_i\) is the unscaled cloud distance.

### WLS objective

\[
s^* = \arg\min_s \sum_{i=1}^{M} \frac{(d_i - s\,\tilde{d}_i)^2}{\sigma_i^2}
\]

### Closed form

\[
s^* = \frac{\sum_{i=1}^{M} (d_i \tilde{d}_i)/\sigma_i^2}{\sum_{i=1}^{M} (\tilde{d}_i^2)/\sigma_i^2}
\]

### Uncertainty (first-order)

With Jacobian-style vector \(\mathbf{J} = [\tilde{d}_1,\ldots,\tilde{d}_M]^\top\) and weight matrix \(\mathbf{W} = \mathrm{diag}(1/\sigma_i^2)\):

\[
\mathrm{Var}(s^*) \approx \left( \mathbf{J}^\top \mathbf{W} \mathbf{J} \right)^{-1}
\]

(under standard linear Gaussian assumptions — validate residuals in field).

### EDTS use

Scale-lock after AprilTag + inter-tag WB checks (~3.69062 m target). Output feeds scan manifest; does not invent \(d_i\).

**Tooling:** SciPy / NumPy.

---

## Method 6.2 — RANSAC plane extraction (frame rail web)

### Problem

From noisy cloud \(P\), extract C-channel web plane, rejecting harness clips / bolt heads.

### Candidate plane

Sample 3 non-collinear points \(\{\mathbf{p}_a,\mathbf{p}_b,\mathbf{p}_c\}\); form unit plane \(\boldsymbol{\pi}=[A,B,C,D]^\top\) with \(A^2+B^2+C^2=1\).

### Inliers

\[
\mathrm{Inliers}(\boldsymbol{\pi}) = \{\mathbf{p}\in P : |A x + B y + C z + D| \le \varepsilon \}
\]

with \(\varepsilon = 1.0\,\mathrm{mm}\) (target).

Select \(\boldsymbol{\pi}^*\) maximizing inlier count; refit via SVD on inlier covariance — normal = singular vector for smallest singular value.

### EDTS use

Rail web / mount face isolation for hole-center QA.

**Tooling:** PyRANSAC-3D `Plane()` + Open3D; downsample first if \(N>10^6\).

---

## Method 6.3 — Bilateral vehicle symmetry analysis

### Problem

Detect damage, manufacturing variation, or scan distortion by reflecting LH cloud across vehicle centerline and comparing to RH.

### Reflection

For centerline plane with normal \(\mathbf{n}_{\mathrm{CL}} = [0,0,1]^\top\) in LHD frame where **+Z is right** (SPEC-3D-001), reflection across the X–Y center plane is:

\[
\mathbf{M}_{\mathrm{refl}} = \mathbf{I} - 2\,\mathbf{n}\mathbf{n}^\top
\]

(with \(\mathbf{n}=\mathbf{n}_{\mathrm{CL}}\)).  
(**Note:** Briefings that use \(\mathbf{n}=[1,0,0]^\top\) assume a different axis convention — EDTS demonstrator CRS uses **+X forward**; centerline normal is **±Z**, not ±X.)

### Residual variance

\[
\sigma_{\mathrm{sym}}^2 = \frac{1}{|\mathcal{N}|}\sum_{(\mathbf{p},\mathbf{q})\in\mathcal{N}} \|\mathbf{M}_{\mathrm{refl}}\mathbf{p} - \mathbf{q}\|^2
\]

for matched neighborhoods \(\mathcal{N}\).

### Gate (proposal)

If \(\sigma_{\mathrm{sym}} > 2.0\,\mathrm{mm}\), flag `SYMMETRY_WARNING` and open knowledge-gap class **KG-SYM-01** (research ID — create formal KG record when first observed).

---

## Method index

| ID | Method | Primary tools | Evidence class when successful |
|---|---|---|---|
| 6.1 | WLS scale | SciPy, AprilTag distances | Supports `METRIC_VERIFICATION` |
| 6.2 | RANSAC plane | PyRANSAC-3D, Open3D | `METRIC_VERIFICATION` feature |
| 6.3 | Symmetry residual | Open3D | QA warning / KG trigger |
