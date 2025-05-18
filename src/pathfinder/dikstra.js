export function dijkstra(grid, start, end) {
    const visitedOrder = [];
    const pq = [];
    grid[start[0]][start[1]].distance = 0;
    pq.push({ row: start[0], col: start[1], dist: 0 });
    const visited = new Set();

    while (pq.length) {
        pq.sort((a, b) => a.dist - b.dist);
        const { row: r, col: c, dist } = pq.shift();
        if (visited.has(`${r},${c}`) || grid[r][c].isWall) continue;
        visited.add(`${r},${c}`);
        visitedOrder.push([r, c]);
        if (r === end[0] && c === end[1]) break;
        for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
            const nr = r + dr, nc = c + dc;
            if (
                nr >= 0 && nr < grid.length &&
                nc >= 0 && nc < grid[0].length &&
                !visited.has(`${nr},${nc}`) &&
                !grid[nr][nc].isWall
            ) {
                const alt = grid[r][c].distance + 1;
                if (alt < grid[nr][nc].distance) {
                    grid[nr][nc].distance = alt;
                    grid[nr][nc].prev = grid[r][c];
                    pq.push({ row: nr, col: nc, dist: alt });
                }
            }
        }
    }
    // Reconstruct path
    let path = [];
    let cell = grid[end[0]][end[1]];
    while (cell.prev) {
        path.push([cell.row, cell.col]);
        cell = cell.prev;
    }
    path = path.reverse();
    return { visitedOrder, path };
}
