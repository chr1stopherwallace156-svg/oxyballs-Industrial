"""EGS-1.0.0-proposal.2 relationship graph queries (proposal)."""

from __future__ import annotations

from collections import defaultdict, deque
from typing import Any, Iterable, Literal

from .errors import EgsGraphError
from .validate import validate_edge_collection

Direction = Literal["out", "in", "both"]
CycleKind = Literal[
    "HARD_CYCLE",
    "CONDITIONAL_CYCLE",
    "STATE_DEPENDENT_CYCLE",
    "ALTERNATE_PATH_REQUIRED",
]


class RelationshipGraph:
    """In-memory directed multigraph over CFGCOMP/IFACE/OP/CMPINST nodes."""

    def __init__(
        self,
        edges: Iterable[dict[str, Any]] | None = None,
        *,
        validate: bool = True,
    ):
        self._edges: dict[str, dict[str, Any]] = {}
        self._out: dict[str, list[str]] = defaultdict(list)
        self._in: dict[str, list[str]] = defaultdict(list)
        if edges:
            self.add_edges(list(edges), validate=validate)

    def add_edges(self, edges: list[dict[str, Any]], *, validate: bool = True) -> None:
        if validate:
            validate_edge_collection(edges)
        for edge in edges:
            self._add_one(edge)

    def _add_one(self, edge: dict[str, Any]) -> None:
        eid = edge["edge_id"]
        if eid in self._edges:
            raise EgsGraphError(f"edge already present: {eid}")
        self._edges[eid] = edge
        src = edge["source_node_id"]
        tgt = edge["target_node_id"]
        direction = edge.get("directionality", "FORWARD")

        if direction == "FORWARD":
            self._out[src].append(eid)
            self._in[tgt].append(eid)
        elif direction == "BACKWARD":
            self._out[tgt].append(eid)
            self._in[src].append(eid)
        elif direction == "BIDIRECTIONAL":
            self._out[src].append(eid)
            self._in[tgt].append(eid)
            self._out[tgt].append(eid)
            self._in[src].append(eid)
        else:
            raise EgsGraphError(f"unknown directionality: {direction}")

    @property
    def edge_ids(self) -> list[str]:
        return sorted(self._edges)

    def get_edge(self, edge_id: str) -> dict[str, Any]:
        try:
            return self._edges[edge_id]
        except KeyError as exc:
            raise EgsGraphError(f"unknown edge: {edge_id}") from exc

    def nodes(self) -> set[str]:
        result: set[str] = set()
        for edge in self._edges.values():
            result.add(edge["source_node_id"])
            result.add(edge["target_node_id"])
        return result

    def edges_for_plane(self, plane: str) -> list[dict[str, Any]]:
        return [e for e in self._edges.values() if e.get("graph_plane") == plane]

    def _endpoint(self, edge: dict[str, Any], *, outbound_from: str) -> str:
        src = edge["source_node_id"]
        tgt = edge["target_node_id"]
        direction = edge.get("directionality", "FORWARD")
        if direction == "FORWARD":
            return tgt if outbound_from == src else src
        if direction == "BACKWARD":
            return src if outbound_from == tgt else tgt
        return tgt if outbound_from == src else src

    def _edge_matches(
        self,
        edge: dict[str, Any],
        *,
        graph_planes: set[str] | None,
        relationship_classes: set[str] | None,
    ) -> bool:
        if graph_planes is not None and edge.get("graph_plane") not in graph_planes:
            return False
        if (
            relationship_classes is not None
            and edge.get("relationship_class") not in relationship_classes
        ):
            return False
        return True

    def direct_neighbors(
        self,
        node: str,
        *,
        direction: Direction = "both",
        graph_planes: set[str] | None = None,
        relationship_classes: set[str] | None = None,
        relationship_types: set[str] | None = None,
    ) -> list[dict[str, Any]]:
        """Return neighbor records. relationship_types is an alias for classes."""
        classes = relationship_classes or relationship_types
        edge_ids: list[str] = []
        if direction in ("out", "both"):
            edge_ids.extend(self._out.get(node, []))
        if direction in ("in", "both"):
            edge_ids.extend(self._in.get(node, []))

        seen: set[tuple[str, str]] = set()
        results: list[dict[str, Any]] = []
        for eid in edge_ids:
            edge = self._edges[eid]
            if not self._edge_matches(
                edge, graph_planes=graph_planes, relationship_classes=classes
            ):
                continue
            neighbor = self._endpoint(edge, outbound_from=node)
            if neighbor == node:
                continue
            key = (neighbor, eid)
            if key in seen:
                continue
            seen.add(key)
            via = "out" if eid in self._out.get(node, []) else "in"
            results.append(
                {
                    "node": neighbor,
                    "edge_id": eid,
                    "relationship_class": edge["relationship_class"],
                    "graph_plane": edge.get("graph_plane"),
                    "via": via,
                }
            )
        return results

    def dependency_traversal(
        self,
        start: str,
        *,
        graph_planes: set[str] | None = None,
        relationship_classes: set[str] | None = None,
        relationship_types: set[str] | None = None,
        max_depth: int | None = None,
    ) -> list[str]:
        classes = relationship_classes or relationship_types
        visited: set[str] = set()
        order: list[str] = []
        q: deque[tuple[str, int]] = deque([(start, 0)])
        visited.add(start)
        while q:
            node, depth = q.popleft()
            if node != start:
                order.append(node)
            if max_depth is not None and depth >= max_depth:
                continue
            for neigh in self.direct_neighbors(
                node,
                direction="out",
                graph_planes=graph_planes,
                relationship_classes=classes,
            ):
                n = neigh["node"]
                if n not in visited:
                    visited.add(n)
                    q.append((n, depth + 1))
        return order

    def impacted_component_traversal(
        self,
        start: str,
        *,
        graph_planes: set[str] | None = None,
        relationship_classes: set[str] | None = None,
        relationship_types: set[str] | None = None,
        max_depth: int | None = None,
    ) -> list[str]:
        classes = relationship_classes or relationship_types
        visited: set[str] = set()
        order: list[str] = []
        q: deque[tuple[str, int]] = deque([(start, 0)])
        visited.add(start)
        while q:
            node, depth = q.popleft()
            if node != start:
                order.append(node)
            if max_depth is not None and depth >= max_depth:
                continue
            for neigh in self.direct_neighbors(
                node,
                direction="in",
                graph_planes=graph_planes,
                relationship_classes=classes,
            ):
                n = neigh["node"]
                if n not in visited:
                    visited.add(n)
                    q.append((n, depth + 1))
        return order

    def _classify_cycle(
        self, cycle_nodes: list[str], edge_ids_in_cycle: list[str]
    ) -> CycleKind:
        """Never silently auto-resolve — classify only."""
        edges = [self._edges[e] for e in edge_ids_in_cycle if e in self._edges]
        if any(e.get("transient_state") for e in edges):
            return "STATE_DEPENDENT_CYCLE"
        if any(e.get("relationship_class") == "ACCESSIBLE_WHEN" for e in edges):
            return "CONDITIONAL_CYCLE"
        # Multiple outbound alternatives from a node in the cycle → alternate path
        for n in cycle_nodes[:-1]:
            outs = self.direct_neighbors(n, direction="out")
            if len(outs) > 1:
                # if any alternate neighbor not on this cycle
                cycle_set = set(cycle_nodes)
                if any(o["node"] not in cycle_set for o in outs):
                    return "ALTERNATE_PATH_REQUIRED"
        return "HARD_CYCLE"

    def find_cycles(
        self,
        *,
        graph_planes: set[str] | None = None,
        relationship_classes: set[str] | None = None,
        relationship_types: set[str] | None = None,
    ) -> list[dict[str, Any]]:
        """
        Detect directed cycles. Returns list of:
        {nodes, edge_ids, kind} where kind ∈ HARD_CYCLE | CONDITIONAL_CYCLE |
        STATE_DEPENDENT_CYCLE | ALTERNATE_PATH_REQUIRED.
        Never silently auto-resolves cycles.
        """
        classes = relationship_classes or relationship_types
        nodes = self.nodes()
        WHITE, GRAY, BLACK = 0, 1, 2
        color = {n: WHITE for n in nodes}
        parent: dict[str, str | None] = {n: None for n in nodes}
        parent_edge: dict[str, str | None] = {n: None for n in nodes}
        cycles: list[dict[str, Any]] = []

        def neighbors(n: str) -> list[dict[str, Any]]:
            return self.direct_neighbors(
                n,
                direction="out",
                graph_planes=graph_planes,
                relationship_classes=classes,
            )

        def dfs(u: str) -> None:
            color[u] = GRAY
            for item in neighbors(u):
                v = item["node"]
                eid = item["edge_id"]
                if color[v] == WHITE:
                    parent[v] = u
                    parent_edge[v] = eid
                    dfs(v)
                elif color[v] == GRAY:
                    cycle_nodes = [v]
                    cycle_edges = [eid]
                    cur: str | None = u
                    while cur is not None and cur != v:
                        cycle_nodes.append(cur)
                        if parent_edge.get(cur):
                            cycle_edges.append(parent_edge[cur])  # type: ignore[arg-type]
                        cur = parent.get(cur)
                    cycle_nodes.append(v)
                    cycle_nodes.reverse()
                    cycle_edges.reverse()
                    kind = self._classify_cycle(cycle_nodes, cycle_edges)
                    cycles.append(
                        {
                            "nodes": cycle_nodes,
                            "edge_ids": cycle_edges,
                            "kind": kind,
                            "auto_resolved": False,
                        }
                    )
            color[u] = BLACK

        for n in sorted(nodes):
            if color[n] == WHITE:
                dfs(n)
        return cycles

    def topological_order(
        self,
        *,
        nodes: set[str] | None = None,
        graph_planes: set[str] | None = None,
        relationship_classes: set[str] | None = None,
        relationship_types: set[str] | None = None,
    ) -> list[str]:
        """Kahn topological sort. Raises if a HARD_CYCLE (or any cycle) exists."""
        classes = relationship_classes or relationship_types
        subset = nodes if nodes is not None else self.nodes()
        indeg = {n: 0 for n in subset}
        outs: dict[str, list[str]] = {n: [] for n in subset}
        for n in subset:
            for neigh in self.direct_neighbors(
                n,
                direction="out",
                graph_planes=graph_planes,
                relationship_classes=classes,
            ):
                m = neigh["node"]
                if m in subset:
                    outs[n].append(m)
                    indeg[m] += 1

        q = deque(sorted(n for n, d in indeg.items() if d == 0))
        order: list[str] = []
        while q:
            n = q.popleft()
            order.append(n)
            for m in outs[n]:
                indeg[m] -= 1
                if indeg[m] == 0:
                    q.append(m)
        if len(order) != len(subset):
            cycles = self.find_cycles(
                graph_planes=graph_planes, relationship_classes=classes
            )
            kinds = sorted({c["kind"] for c in cycles}) or ["HARD_CYCLE"]
            raise EgsGraphError(
                f"graph contains cycle(s) kind={kinds}; "
                "topological_order impossible — never auto-resolved"
            )
        return order

    def removal_precedence_candidates(self, target: str) -> list[dict[str, Any]]:
        """Inbound BLOCKS_REMOVAL_OF / BLOCKS_ACCESS_TO neighbors."""
        return self.direct_neighbors(
            target,
            direction="in",
            relationship_classes={"BLOCKS_REMOVAL_OF", "BLOCKS_ACCESS_TO"},
        )

    def interface_mates(self, iface_node: str) -> list[dict[str, Any]]:
        """MATES_WITH neighbors for an IFACE-* node (physical plane)."""
        return self.direct_neighbors(
            iface_node,
            direction="both",
            graph_planes={"PHYSICAL"},
            relationship_classes={"MATES_WITH"},
        )
