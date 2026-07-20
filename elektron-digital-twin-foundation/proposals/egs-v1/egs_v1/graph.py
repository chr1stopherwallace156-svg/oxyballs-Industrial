"""EGS-v1 relationship graph queries (proposal)."""

from __future__ import annotations

from collections import defaultdict, deque
from typing import Any, Iterable, Literal

from .errors import EgsGraphError, EgsValidationError
from .validate import validate_edge_collection

Direction = Literal["out", "in", "both"]


class RelationshipGraph:
    """In-memory directed multigraph over component-instance nodes."""

    def __init__(self, edges: Iterable[dict[str, Any]] | None = None, *, validate: bool = True):
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
        src = edge["source_component_instance_id"]
        tgt = edge["target_component_instance_id"]
        direction = edge.get("directionality", "FORWARD")

        if direction == "FORWARD":
            self._out[src].append(eid)
            self._in[tgt].append(eid)
        elif direction == "BACKWARD":
            # treat as reverse arc for traversal
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
            result.add(edge["source_component_instance_id"])
            result.add(edge["target_component_instance_id"])
        return result

    def _endpoint(self, edge: dict[str, Any], *, outbound_from: str) -> str:
        """Neighbor node when traversing outbound_from along edge."""
        src = edge["source_component_instance_id"]
        tgt = edge["target_component_instance_id"]
        direction = edge.get("directionality", "FORWARD")
        if direction == "FORWARD":
            return tgt if outbound_from == src else src
        if direction == "BACKWARD":
            return src if outbound_from == tgt else tgt
        # BIDIRECTIONAL
        return tgt if outbound_from == src else src

    def direct_neighbors(
        self,
        node: str,
        *,
        direction: Direction = "both",
        relationship_types: set[str] | None = None,
    ) -> list[dict[str, Any]]:
        """Return neighbor records: {node, edge_id, relationship_type, via}."""
        edge_ids: list[str] = []
        if direction in ("out", "both"):
            edge_ids.extend(self._out.get(node, []))
        if direction in ("in", "both"):
            edge_ids.extend(self._in.get(node, []))

        seen: set[tuple[str, str]] = set()
        results: list[dict[str, Any]] = []
        for eid in edge_ids:
            edge = self._edges[eid]
            rtype = edge["relationship_type"]
            if relationship_types is not None and rtype not in relationship_types:
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
                    "relationship_type": rtype,
                    "via": via,
                }
            )
        return results

    def dependency_traversal(
        self,
        start: str,
        *,
        relationship_types: set[str] | None = None,
        max_depth: int | None = None,
    ) -> list[str]:
        """BFS following outbound edges (dependencies / what start connects toward)."""
        if start not in self.nodes() and start not in self._out and start not in self._in:
            # allow isolated unknown start → empty
            if start not in {n for e in self._edges.values() for n in (
                e["source_component_instance_id"], e["target_component_instance_id"]
            )}:
                return []

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
                node, direction="out", relationship_types=relationship_types
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
        relationship_types: set[str] | None = None,
        max_depth: int | None = None,
    ) -> list[str]:
        """BFS following inbound edges (what depends on / is impacted by start)."""
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
                node, direction="in", relationship_types=relationship_types
            ):
                n = neigh["node"]
                if n not in visited:
                    visited.add(n)
                    q.append((n, depth + 1))
        return order

    def find_cycles(
        self, *, relationship_types: set[str] | None = None
    ) -> list[list[str]]:
        """Detect directed cycles; return list of node cycles (simple)."""
        nodes = self.nodes()
        WHITE, GRAY, BLACK = 0, 1, 2
        color = {n: WHITE for n in nodes}
        parent: dict[str, str | None] = {n: None for n in nodes}
        cycles: list[list[str]] = []

        def neighbors(n: str) -> list[str]:
            return [
                item["node"]
                for item in self.direct_neighbors(
                    n, direction="out", relationship_types=relationship_types
                )
            ]

        def dfs(u: str) -> None:
            color[u] = GRAY
            for v in neighbors(u):
                if color[v] == WHITE:
                    parent[v] = u
                    dfs(v)
                elif color[v] == GRAY:
                    # reconstruct cycle u -> ... -> v -> u
                    cycle = [v]
                    cur: str | None = u
                    while cur is not None and cur != v:
                        cycle.append(cur)
                        cur = parent.get(cur)
                    cycle.append(v)
                    cycle.reverse()
                    cycles.append(cycle)
            color[u] = BLACK

        for n in sorted(nodes):
            if color[n] == WHITE:
                dfs(n)
        return cycles

    def topological_order(
        self,
        *,
        nodes: set[str] | None = None,
        relationship_types: set[str] | None = None,
    ) -> list[str]:
        """Kahn topological sort over outbound edges. Raises if a cycle exists."""
        subset = nodes if nodes is not None else self.nodes()
        # build adjacency restricted to subset
        indeg = {n: 0 for n in subset}
        outs: dict[str, list[str]] = {n: [] for n in subset}
        for n in subset:
            for neigh in self.direct_neighbors(
                n, direction="out", relationship_types=relationship_types
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
            raise EgsGraphError("graph contains a cycle; topological_order impossible")
        return order

    def removal_precedence_candidates(
        self, target: str
    ) -> list[dict[str, Any]]:
        """
        Nodes that BLOCKS_REMOVAL_OF target (illustrative query helper).
        Does not invent procedures — only returns typed edges present in the graph.
        """
        return self.direct_neighbors(
            target,
            direction="in",
            relationship_types={"BLOCKS_REMOVAL_OF"},
        )
