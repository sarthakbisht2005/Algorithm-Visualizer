export function bfs(grid, start, end) {
    const queue = [start];
    const visited = new Set();
    const parent = {};
    const visitedOrder = [];
    let found = false;
    while (queue.length) {
        const [r, c] = queue.shift();
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) continue;
        if (visited.has(`${r},${c}`) || grid[r][c].isWall) continue;
        visited.add(`${r},${c}`);
        visitedOrder.push([r, c]);
        if (r === end[0] && c === end[1]) {
            found = true;
            break;
        }
        for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
            const nr = r + dr, nc = c + dc;
            if (
                nr >= 0 && nr < grid.length &&
                nc >= 0 && nc < grid[0].length &&
                !visited.has(`${nr},${nc}`) &&
                !grid[nr][nc].isWall
            ) {
                queue.push([nr, nc]);
                parent[`${nr},${nc}`] = `${r},${c}`;
            }
        }
    }
    let path = [];
    if (found) {
        let curr = `${end[0]},${end[1]}`;
        while (parent[curr]) {
            const [r, c] = curr.split(',').map(Number);
            path.push([r, c]);
            curr = parent[curr];
        }
        path = path.reverse();
    }
    return { visitedOrder, path };
}

export function dfs(grid, start, end) {
    const stack = [start];
    const visited = new Set();
    const parent = {};
    const visitedOrder = [];
    let found = false;
    while (stack.length) {
        const [r, c] = stack.pop();
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) continue;
        if (visited.has(`${r},${c}`) || grid[r][c].isWall) continue;
        visited.add(`${r},${c}`);
        visitedOrder.push([r, c]);
        if (r === end[0] && c === end[1]) {
            found = true;
            break;
        }
        for (const [dr, dc] of [[1,0],[0,1],[-1,0],[0,-1]]) {
            const nr = r + dr, nc = c + dc;
            if (
                nr >= 0 && nr < grid.length &&
                nc >= 0 && nc < grid[0].length &&
                !visited.has(`${nr},${nc}`) &&
                !grid[nr][nc].isWall
            ) {
                stack.push([nr, nc]);
                parent[`${nr},${nc}`] = `${r},${c}`;
            }
        }
    }
    let path = [];
    if (found) {
        let curr = `${end[0]},${end[1]}`;
        while (parent[curr]) {
            const [r, c] = curr.split(',').map(Number);
            path.push([r, c]);
            curr = parent[curr];
        }
        path = path.reverse();
    }
    return { visitedOrder, path };
}
