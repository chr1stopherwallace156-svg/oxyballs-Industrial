import Foundation

/// Decodes the Phase 4D → 4E handoff (`phase4e_handoff.json`, `schema_id = Phase4EHandoffContract`).
/// This is the immutable input surface. The `4d92e539…`/`CONTRADICTORY`/`DUP-VX` values belong to
/// the upstream 4C→4D `phase4d_handoff_contract.json` and are inherited parent lineage only —
/// never the 4D→4E handoff.
public struct Phase4EHandoffContract: Codable, Equatable, Sendable {
  public let schemaID: String
  public let schemaVersion: String
  public let surfaceOutputID: String
  public let meshArtifactID: String
  public let outputClosureSHA256: String
  public let sourceLineageManifestID: String
  public let phase4EReadiness: String
  public let vertexCount, triangleCount, boundaryCount, holeCount: Int
  public let engineeringMetrologyClaim, productionMeshClaim, completeDigitalTwinClaim: String

  enum CodingKeys: String, CodingKey {
    case schemaID = "schema_id", schemaVersion = "schema_version"
    case surfaceOutputID = "surface_output_id", meshArtifactID = "mesh_artifact_id"
    case outputClosureSHA256 = "output_closure_sha256", sourceLineageManifestID = "source_lineage_manifest_id"
    case phase4EReadiness = "phase4e_readiness"
    case vertexCount = "vertex_count", triangleCount = "triangle_count"
    case boundaryCount = "boundary_count", holeCount = "hole_count"
    case engineeringMetrologyClaim = "engineering_metrology_claim"
    case productionMeshClaim = "production_mesh_claim"
    case completeDigitalTwinClaim = "complete_digital_twin_claim"
  }

  /// Authority ceiling: the handoff must forbid metrology/mesh/twin claims.
  public var claimLocksIntact: Bool {
    engineeringMetrologyClaim == "FORBIDDEN" && productionMeshClaim == "FORBIDDEN" && completeDigitalTwinClaim == "FORBIDDEN"
  }
}
