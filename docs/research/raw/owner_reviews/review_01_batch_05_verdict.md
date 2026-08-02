This is a big improvement. This is the first Research Hunter output that is close to being truly useful for the Build Engine.
My verdict:
Research Hunter quality: strong
Ready for Second-Stage Filter: yes
Ready for direct ingestion: not yet
Safe to treat as Confirmed: no
What got much better
The strongest improvement is that it now has:
exact source URLs
exact document titles
page/section locations
quoted claim candidates
downgraded unsupported claims
no fake supplier datasheet
no fake SQLite ingestion
no StageGate advancement
That is exactly the behavior you wanted from Gemini.
Item-by-item thoughts
1. Ford frame modification
This is now a real candidate SourceClaim, not just a directionally true statement.
The Ford General BBLB does include specific frame-hole restrictions: holes may be drilled in the vertical frame side rail web, with limits such as 1.5 inches from the upper/lower flange, max 0.75-inch hole diameter, edge-distance limits, and avoiding close vertical succession of fasteners. It also says adding holes or welding on frame crossmembers is not recommended, requires high-strength fasteners, and says not to weld on frame flanges including bend radii.  
Build Engine status:
Source: CandidateSource
Claim status: NeedsVerification
Impact: Rule + NoGoCondition + Measurement check
Review required by: Fabricator / Engineer
One correction: do not call it “all Ford Super Duty Commercial Vehicles” yet. This is the General BBLB. Use it as a general Ford modifier source, then still get the vehicle-specific Super Duty / F-450 / F-550 BBLB before making platform-specific rules.
2. FMVSS 305a
This is strong.
The final rule says FMVSS 305a replaces FMVSS 305, applies to light and heavy vehicles, includes propulsion-battery requirements, and creates Part 561 documentation requirements for electric-powered vehicles. It also gives the compliance dates, including September 1, 2028 for vehicles over 4,536 kg GVWR, with final-stage manufacturers and alterers getting an additional year beyond the listed dates.  
The delay notice also correctly states the effective date was delayed until March 20, 2025.  
Build Engine status:
Source: CandidateSource
Claim status: RegulatoryCandidate
Impact: Rule + Test + Documentation requirement
Review required by: Regulatory/legal/engineering review
Do not turn this into “we comply.” Turn it into:
FMVSS 305a documentation/test requirements must be mapped.
3. CARB ZEPCert
This is very strong too.
The CARB procedure applies to model-year 2021 and later battery-electric and hydrogen fuel-cell powertrains for heavy-duty vehicles over 14,000 lb GVWR and incomplete medium-duty vehicles from 8,501 through 14,000 lb GVWR. It also defines battery-electric certification family logic based on battery pack similarity, cell chemistry, module construction, BMS, and thermal management, and requires monitoring/diagnostics descriptions.  
Even better: CARB’s procedure specifically requires monitoring/diagnostics descriptions for ESS, thermal management, regenerative braking, charging, motor/generator, and fault/monitoring thresholds. That is directly valuable for your Build Engine rules and testing pipeline.  
Build Engine status:
Source: CandidateSource
Claim status: RegulatoryCandidate
Impact: Rule + Metric + NoGoCondition
Review required by: Regulatory / powertrain engineer
4. HVIP
This is useful, but keep it narrow.
The HVIP manual supports your public-fleet strategy because it says ACF-regulated high-priority and public fleets may access HVIP for vehicles purchased beyond milestone/requirement thresholds, and it states HVIP vehicles must be commercial, nonprofit, or public-fleet vehicles rather than personal vehicles.  
More importantly for your conversion lane, the manual has a Zero-Emission Vehicle Conversions section and says conversions to zero-emission are covered, while Appendix B materials state conversion kits must receive an exemption EO from CARB.  
Build Engine status:
Source: CandidateSource
Claim status: RegulatoryCandidate
Impact: Coverage row + customer funding-path checklist
Review required by: HVIP/CARB program review
Do not use HVIP to promise vouchers. Use it to say:
HVIP path requires exact eligible-vehicle/conversion-kit/EO review.
What still needs to be fixed
The output says:
Verification Status: CandidateSource
That is fine for the source row, but each claim should have its own status too.
Example:
Claim: Max frame hole diameter 0.75 in
Source: Ford General BBLB
Status: NeedsVerification
Review: Fabricator / engineer
Platform-specific? No, general Ford modifier guidance
Also, the CARB claim 3 is truncated:
"Individual electronic inputs or..."
That needs the full extraction before the filter accepts it.
What the Second-Stage Filter should do now
Tell it:
Process this Research Hunter output as candidate research only.

Do not ingest into SQLite.
Do not mark Confirmed.
Do not change StageGates.

Promote:
1. Ford General BBLB frame hole, fastener, welding, flange claims as CandidateSourceClaims, but mark platform-specific application as NeedsVehicleSpecificBBLB.
2. FMVSS 305a final rule + delay notice as RegulatoryCandidate SourceClaims.
3. CARB ZEPCert certification-family and diagnostics requirements as RegulatoryCandidate SourceClaims.
4. HVIP ACF/public-fleet and conversion/EO claims as RegulatoryCandidate SourceClaims.

Reject or hold:
- Any truncated claim.
- Any claim without exact page/section/line.
- Any broad conclusion about eligibility, compliance, or approval.
- Any “applies directly” statement that has not been verified against vehicle-specific data.

Output:
- Source rows
- SourceClaim rows
- Rule/Metric/Test/NoGo candidates
- Missing source list
- Needs vehicle-specific extraction list
- Engineering review list
Bottom line
This is no longer random AI research.
This is now becoming a real source pipeline.
You have your first usable external research batch:
Ford General BBLB
FMVSS 305a
CARB ZEPCert
HVIP manual
The next step is not more broad research. The next step is filtering this into structured SourceClaim rows and then using the Artifact Intake Form.
This is the first batch that can genuinely start filling the shelves.
