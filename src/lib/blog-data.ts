import type { BlogPost } from "@/types";

export const blogPosts: (BlogPost & { body: string })[] = [
  {
    slug: "building-multiplayer-dungeon-shooter",
    title:
      "Building a Multiplayer Dungeon Shooter: What I Learned About Algorithms, Bots, and WebSockets",
    date: "2026-02-28",
    summary:
      "A deep dive into procedural map generation, A* pathfinding, bot AI state machines, and real-time multiplayer with Colyseus — all built from scratch.",
    tags: [
      "game-dev",
      "algorithms",
      "websockets",
      "typescript",
      "multiplayer",
    ],
    body: `I wanted to build a game that would push me to learn more about algorithms, bot AI, and real-time WebSocket communication. The result is a multiplayer dungeon shooter where players explore procedurally generated maps, fight enemy bots, and progress through increasingly difficult levels — all in real time with friends and family.

In this post, I'll walk through the key technical decisions I made, the problems I ran into, and what I learned along the way.

---

## Tech Stack

| Layer           | Technology                                |
|-----------------|-------------------------------------------|
| **Server**      | Node.js, TypeScript, Express              |
| **Multiplayer** | Colyseus (WebSocket-based state sync)     |
| **Client**      | HTML5 Canvas, Vanilla JavaScript          |
| **Package Mgr** | pnpm                                      |

I used **TypeScript** on the backend for type safety and **vanilla JavaScript** on the client — no React, no frameworks, just raw Canvas rendering. The game is a 120×120 tile grid where enemies are circles chasing you, and players are triangles. I didn't focus much on sprites or art; the goal was to learn the underlying systems.

---

## Colyseus: The Multiplayer Framework

[Colyseus](https://colyseus.io/) is a WebSocket-based multiplayer framework for Node.js. It handles the hard parts of real-time multiplayer: room management, state synchronization, and client-server messaging. Here's how I used it.

### Server Setup

The server entry point creates an Express app, wraps it with Colyseus, and registers the game room:

\`\`\`typescript
// src/index.ts
const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);

const gameServer = new Server({
  transport: new WebSocketTransport({ server: httpServer }),
});

// Register room handler with lobby listing
gameServer.define("dungeon", DungeonRoom)
  .filterBy(['roomName'])
  .enableRealtimeListing();
\`\`\`

The \`.filterBy(['roomName'])\` lets players filter rooms by name, and \`.enableRealtimeListing()\` makes rooms discoverable in real time via the lobby. I also added a REST endpoint so the lobby page can query available rooms:

\`\`\`typescript
app.get('/api/rooms/:roomName', async (req, res) => {
  const rooms = await matchMaker.query({ name: req.params.roomName });
  res.json(rooms.map(room => ({
    roomId: room.roomId,
    clients: room.clients,
    maxClients: room.maxClients,
    metadata: room.metadata || {}
  })));
});
\`\`\`

### Schema-Based State Synchronization

Colyseus uses a schema system powered by \`@colyseus/schema\`. You define your game state as decorated classes, and Colyseus automatically synchronizes changes to all connected clients — only sending deltas, not the full state every time.

\`\`\`typescript
// src/rooms/schema/DungeonState.ts
export class Player extends Schema {
  @type("number") x: number = 0;
  @type("number") y: number = 0;
  @type("string") sessionId: string = "";
  @type("string") name: string = "";
  @type("number") lives: number = 3;
  @type("number") angle: number = 0;
  @type("number") score: number = 0;
  @type("number") invincibleUntil: number = 0;
  @type("number") currentMapDepth: number = 0;
  @type("number") currentMapSeed: number = 0;
}

export class Bot extends Schema {
  @type("string") id: string = "";
  @type("number") x: number = 0;
  @type("number") y: number = 0;
  @type("number") health: number = 100;
  @type("number") targetX: number = 0;
  @type("number") targetY: number = 0;
  @type("number") moveStartTime: number = 0;
  @type("string") mapKey: string = "";
}

export class DungeonState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
  @type({ map: Bot }) bots = new MapSchema<Bot>();
  @type({ map: Bullet }) bullets = new MapSchema<Bullet>();
  @type("number") seed: number = 0;
  @type("number") width: number = 120;
  @type("number") height: number = 120;
  @type("boolean") gameStarted: boolean = false;
  @type("string") hostSessionId: string = "";
  // ... more fields
}
\`\`\`

The key insight is that when the server mutates any \`@type\`-decorated property (like \`bot.x = 5\`), Colyseus automatically detects the change and pushes it to every connected client. You don't manually serialize or broadcast anything — the framework handles the diffing and transport.

### The DungeonRoom Lifecycle

\`DungeonRoom\` extends Colyseus' \`Room\` class and manages the full game lifecycle:

\`\`\`typescript
export class DungeonRoom extends Room<DungeonState> {
  maxClients = 8;

  onCreate(options: any) {
    // Initialize state, generate first dungeon, set up game loop
  }

  onJoin(client: Client, options: any) {
    // Create player, place at spawn, send initial state
  }

  onLeave(client: Client) {
    // Remove player, handle host migration
  }

  onMessage(type: string, client: Client, message: any) {
    // Handle move, shoot, startGame, etc.
  }
}
\`\`\`

The room supports up to 8 players. The first player to join becomes the host and can start the game. Colyseus handles the room lifecycle — creating it when the first player joins and disposing it when the last player leaves.

---

## Client-Side Architecture

The client is split into two pages: a **lobby** and the **game** itself.

### The Lobby (\`index.html\` + \`lobby.js\`)

The lobby page lets players enter a name, create rooms, or browse and join existing ones. It dynamically detects the server URL for both local development and production:

\`\`\`javascript
function getServerConfig() {
  const isLocalhost = window.location.hostname === 'localhost';
  if (isLocalhost) {
    return { wsUrl: 'ws://localhost:2567', httpUrl: 'http://localhost:2567' };
  } else {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    return {
      wsUrl: \`\${protocol}//\${window.location.host}\`,
      httpUrl: \`\${window.location.protocol}//\${window.location.host}\`
    };
  }
}
\`\`\`

The room browser polls the server's REST API every 3 seconds and uses a hash comparison to avoid unnecessary DOM re-renders:

\`\`\`javascript
const currentHash = JSON.stringify(rooms.map(r => ({
  id: r.roomId, clients: r.clients, metadata: r.metadata
})));

if (currentHash === lastRoomsHash && !isFirstLoad) return; // Skip if unchanged
\`\`\`

When a player creates or joins a room, the lobby stores the room info in \`sessionStorage\` and redirects to \`game.html\`. The actual Colyseus connection happens on the game page — not the lobby — to avoid the WebSocket connection being dropped during navigation.

### The Game Page (\`game.html\` + \`game.js\`)

The game page is where all the action happens. On load, it establishes the Colyseus connection:

\`\`\`javascript
async function connect(roomName, create = false, playerName = '') {
  const client = new Colyseus.Client(serverConfig.wsUrl);

  if (create) {
    room = await client.create('dungeon', { roomName, difficulty: 1, playerName });
  } else if (roomName) {
    room = await client.joinById(roomName, { playerName });
  } else {
    room = await client.joinOrCreate('dungeon', { difficulty: 1, playerName });
  }

  mySessionId = room.sessionId;
}
\`\`\`

After connecting, the client sets up a chain of listeners:

- **\`room.state.onChange\`** — Updates the HUD (player count, lives, kill count, map depth) and detects game-start transitions.
- **\`room.onStateChange.once\`** — Fires once with the full initial state. This is where the client generates the dungeon from the seed (more on this below).
- **\`room.onMessage('mapChanged', ...)\`** — When players advance to a new map, the client regenerates the dungeon grid with the new seed.
- **\`state.bots.onAdd / onRemove\`** — Tracks bot spawning and death for interpolation purposes.
- **\`state.players.onAdd / onRemove\`** — Updates the player list UI.

### Canvas Rendering

The game renders on an HTML5 Canvas with a viewport camera that follows the player. The 120×120 grid is too large to show at once, so the camera centers on the player and clamps to the dungeon bounds:

\`\`\`javascript
function render() {
  const myPlayer = room.state.players.get(mySessionId);
  if (myPlayer) {
    cameraX = Math.floor(myPlayer.x) - Math.floor(VIEWPORT_TILES_X / 2);
    cameraY = Math.floor(myPlayer.y) - Math.floor(VIEWPORT_TILES_Y / 2);
    cameraX = Math.max(0, Math.min(cameraX, dungeonWidth - VIEWPORT_TILES_X));
    cameraY = Math.max(0, Math.min(cameraY, dungeonHeight - VIEWPORT_TILES_Y));
  }

  // Draw visible tiles
  for (let y = 0; y < VIEWPORT_TILES_Y; y++) {
    for (let x = 0; x < VIEWPORT_TILES_X; x++) {
      const worldX = Math.floor(x + cameraX);
      const worldY = Math.floor(y + cameraY);
      const tile = dungeonGrid[worldY][worldX];
      // ... color based on tile type, draw rect
    }
  }
}
\`\`\`

Each tile type gets a different color — floors, walls, obstacles, portals (entry = purple, exit = green), transport pads (blue), and the home marker (gold). Players are drawn as triangles pointing in their facing direction, and enemy bots are drawn as circles. Bot movement is interpolated on the client between server updates for smooth rendering despite the discrete tile-based movement on the server.

The game also supports **touch controls** with a floating virtual joystick for mobile play — something I added so family members could play on their phones.

---

## Procedural Map Generation & Why You Need a Seed

One of the biggest "aha" moments for me was understanding **why a seed is needed for random map generation**.

I wanted every game to have a random map, but all players in the room need to see the **exact same map**. The server generates the dungeon and the client generates it independently — they never send the full 120×120 grid over the wire. Instead, the server just sends the **seed** (a single number), and both sides use it to produce identical output.

### The Seeded Random Number Generator

I used a **Linear Congruential Generator (LCG)** — one of the simplest deterministic random number generators:

\`\`\`typescript
export class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed % 2147483647;
    if (this.seed <= 0) this.seed += 2147483646;
  }

  next(): number {
    this.seed = (this.seed * 16807) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }
}
\`\`\`

Given the same seed, this always produces the same sequence of "random" numbers. The dungeon generator uses it for everything — room placement, corridor connections, obstacle positions, transport locations, spawn zones.

### Multi-Map Progression and Seed Chains

Players can travel through multiple maps via portal tiles. Each map needs its own seed, and players need to be able to **go back** to previous maps and find them exactly as they left them. So I use a deterministic seed chain:

\`\`\`typescript
function generateNextSeed(currentSeed: number): number {
  return (currentSeed * 16807) % 2147483647;
}
\`\`\`

Each map's seed is derived from the previous one. The server caches these seeds along with the state of each map (bot positions, used transports, etc.) so that when a player returns to a previous map, it's reconstructed exactly. This was critical because without it, going back to a map would generate a completely different layout.

### The Dungeon Generation Algorithm

The generator creates rooms using a random placement strategy with overlap detection, then connects them with L-shaped corridors that are 4 tiles wide (for multiplayer navigation):

\`\`\`typescript
public generate(mapDepth: number = 0): DungeonData {
  // Place 8-15 rooms (more at deeper map depths)
  // Connect consecutive rooms with L-shaped corridors
  // Place entry portal (or home marker on first map)
  // Place exit portal at least 60 tiles from spawn
  // Place obstacles (with BFS path validation!)
  // Place transport pads and spawn zones
}
\`\`\`

A crucial detail: after placing each obstacle, the generator runs a **BFS pathfinding check** to verify a path still exists from spawn to exit. If an obstacle would block the path, it's removed:

\`\`\`typescript
// Temporarily place the obstacle
this.grid[y][x] = TileType.OBSTACLE;

if (this.hasPath(spawnX, spawnY, exitX, exitY)) {
  obstaclePositions.push({ x, y });
  obstaclesPlaced++;
} else {
  // Would block the path — remove it
  this.grid[y][x] = TileType.FLOOR;
}
\`\`\`

This guarantees every generated map is solvable, no matter how many obstacles are placed.

---

## Pathfinding & Bot AI

I had to really optimize the pathfinding for the enemy bots. They need to chase players through a dungeon full of walls and obstacles, and the path needs to be walkable — no cutting through walls.

### A* Pathfinding with Manhattan Distance

The A* implementation uses **Manhattan distance** as the heuristic because movement is strictly 4-directional (up, down, left, right — no diagonals):

\`\`\`typescript
export class Pathfinding {
  static findPath(grid: number[][], start: Point, goal: Point): Point[] {
    const openList: Node[] = [];
    const closedSet = new Set<string>();

    const startNode: Node = {
      x: start.x, y: start.y,
      g: 0,
      h: this.heuristic(start.x, start.y, goal.x, goal.y),
      f: 0,
      parent: null,
    };
    startNode.f = startNode.g + startNode.h;
    openList.push(startNode);

    while (openList.length > 0) {
      // Find node with lowest f cost
      // Expand neighbors (4 cardinal directions)
      // Return path when goal is reached
    }
    return []; // No path found
  }

  private static heuristic(x1: number, y1: number, x2: number, y2: number): number {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2); // Manhattan distance
  }
}
\`\`\`

Manhattan distance is the correct heuristic here because it exactly represents the minimum number of tile moves needed in a 4-directional grid. Using Euclidean distance would underestimate the cost (since you can't move diagonally), which would still produce correct paths but expand more nodes unnecessarily.

### Pathfinding Performance: Queue System

With up to 30 bots on a 120×120 grid, calculating A* paths every frame would kill performance. I implemented a **pathfinding queue** that limits concurrent calculations:

\`\`\`typescript
private readonly MAX_CONCURRENT_PATHFINDING = 3;

private processPathfindingQueue(players: MapSchema<Player>, mapKey?: string): void {
  const botsToProcess = Math.min(
    this.pathfindingQueue.length,
    this.MAX_CONCURRENT_PATHFINDING
  );

  for (let i = 0; i < botsToProcess; i++) {
    const botId = this.pathfindingQueue.shift();
    // ... calculate path for this bot
  }
}
\`\`\`

Bots only request path recalculation when:
- Enough time has passed (800ms interval)
- The target player moved significantly (3+ tiles)
- Their current path is empty or they're stuck

There's also a **stuck detection** system — if a bot fails to move 3 times in a row, it forces a path recalculation.

### Tactical Roles: Attack vs Flank

Not all bots rush straight at you. 75% are **attackers** (bee-line to the player), but 25% are **flankers** that try to approach from a perpendicular angle:

\`\`\`typescript
private calculateFlankPosition(bot: Bot, player: Player): { x: number; y: number } {
  const angleToPlayer = Math.atan2(playerY - bot.y, playerX - bot.x);

  // Add 90 degrees to approach from the side
  const flankAngle1 = angleToPlayer + Math.PI / 2;
  const flankAngle2 = angleToPlayer - Math.PI / 2;

  // Pick whichever flank position is closer to the bot
  // Fall back to direct attack if both positions are blocked
}
\`\`\`

This creates more interesting gameplay — you can't just kite backwards because some bots will cut you off from the sides.

### Line of Sight: Bresenham's Algorithm

Before falling back to A* pathfinding, bots check if they have a **clear line of sight** to the player using Bresenham's line algorithm:

\`\`\`typescript
static hasLineOfSight(grid: number[][], from: Point, to: Point): boolean {
  const dx = Math.abs(to.x - from.x);
  const dy = Math.abs(to.y - from.y);
  const sx = from.x < to.x ? 1 : -1;
  const sy = from.y < to.y ? 1 : -1;
  let err = dx - dy;

  let x = from.x, y = from.y;

  while (true) {
    if ((x !== from.x || y !== from.y) && (x !== to.x || y !== to.y)) {
      if (!this.isWalkable(grid, x, y)) return false;
    }
    if (x === to.x && y === to.y) return true;

    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x += sx; }
    if (e2 < dx)  { err += dx; y += sy; }
  }
}
\`\`\`

If line of sight exists, the bot uses simple greedy movement (faster). If not, it queues up an A* path calculation.

---

## Distance Algorithms: Manhattan vs Euclidean

I use both Manhattan and Euclidean distance in different contexts, and understanding **when to use which** was an important lesson.

### Manhattan Distance

**Manhattan distance** (\`|x1-x2| + |y1-y2|\`) is used for:
- **A* heuristic** — because movement is 4-directional on a grid, Manhattan distance exactly represents the minimum tile moves
- **Obstacle spacing** — ensuring obstacles are at least 4 tiles apart (measured in grid steps)
- **Spawn/exit proximity checks** — making sure obstacles aren't placed too close to key points

### Euclidean Distance

**Euclidean distance** (\`√((x1-x2)² + (y1-y2)²)\`) is used for:
- **Target selection** — finding the nearest enemy bot as a radius check (a bot 5 tiles north and 5 tiles east is closer than one 10 tiles north)
- **Spawn distance checks** — ensuring bots don't spawn within a radius of players
- **Combat decisions** — the kite distance (5-12 tiles) and bullet dodge range (3 tiles) are Euclidean because they represent true "how close is this thing"
- **Flank distance calculations** — positioning flanker bots perpendicular to the player

The rule of thumb: **Manhattan for grid movement costs, Euclidean for spatial proximity**.

---

## Player Bot FSM: HUNT / KITE / RETREAT

For testing multiplayer with multiple players, I built **headless AI player bots** that use a finite state machine (FSM) with three states:

### State Transitions

\`\`\`
HUNT → KITE    : When enemy bot spotted (visible enemies > 0)
KITE → RETREAT : When surrounded (3+ visible enemies) or critically low lives (≤ 1)
KITE → HUNT    : When area is clear (0 visible enemies)
RETREAT → KITE : When safe (≤ 1 visible enemy and ≥ 2 lives)
RETREAT → HUNT : When completely clear (0 visible enemies and ≥ 2 lives)
\`\`\`

### HUNT State
The bot explores the map looking for enemies. It picks random walkable points and navigates to them using A* pathfinding. When it spots an enemy, it transitions to KITE.

### KITE State
This is the bread and butter. The bot maintains a **safe distance of 5-12 tiles** from the nearest enemy while shooting:
- **Too close (< 5 tiles)**: Back away while shooting
- **Optimal range (5-12 tiles)**: Stand and shoot
- **Too far (> 12 tiles)**: Move closer

### RETREAT State
When overwhelmed, the bot tries to find a **safe corner** — a tile with walls on 3 sides — and runs there. It only shoots enemies that get within 7 tiles.

### Perception System

The bots don't have perfect information. They have a **120° field of view** and a **20-tile view distance**. They also have a **5-second memory** — if a bot loses line of sight to an enemy, it remembers where it last saw the enemy for 5 seconds:

\`\`\`typescript
private perception = {
  FOV_ANGLE: (120 * Math.PI) / 180, // 120 degrees
  VIEW_DISTANCE: 20,                 // tiles
  MEMORY_DURATION: 5000              // 5 seconds
};
\`\`\`

There's also a **250ms reaction delay** before a bot can shoot at a newly acquired target, and an **aim spread of ±5.7°** to make them feel more human and less like aimbots.

---

## Collision Detection

Collision detection in this game is **tile-based** — two entities collide if they occupy the same tile. This is much simpler than pixel-perfect or bounding-box collision detection, and it works well for a grid-based game.

### Bullet vs Bot Collisions

When a bullet and a bot are on the same tile, the bot takes 50 damage (2 hits to kill a base-level bot). The system also tracks **which players contributed damage** to each bot for split kill credit:

\`\`\`typescript
checkBulletVsBots(bullets: MapSchema<Bullet>, bots: MapSchema<Bot>, mapKey?: string): BulletCollisionResult {
  bullets.forEach((bullet, bulletId) => {
    bots.forEach((bot, botId) => {
      // Skip if on different maps
      if (bullet.mapKey !== bot.mapKey) return;

      const bulletTileX = Math.floor(bullet.x);
      const bulletTileY = Math.floor(bullet.y);

      if (bulletTileX === bot.x && bulletTileY === bot.y) {
        bot.health -= 50;
        bulletsToRemove.push(bulletId);

        // Track damage dealer for split kill credit
        if (!this.botDamageDealers.has(botId)) {
          this.botDamageDealers.set(botId, new Set());
        }
        this.botDamageDealers.get(botId)!.add(bullet.playerId);

        if (bot.health <= 0) {
          const dealers = this.botDamageDealers.get(botId);
          const playerIds = dealers ? Array.from(dealers) : [bullet.playerId];
          // Solo kill = 1.0 credit, shared kill = 0.5 each
          const creditPerPlayer = playerIds.length > 1 ? 0.5 : 1.0;
          killEvents.push({ botId, playerIds, creditPerPlayer });
        }
      }
    });
  });
}
\`\`\`

This means if two players both shoot the same bot, they each get half credit. It encourages teamwork without penalizing it.

### Bot vs Player Collisions

When a bot occupies the same tile as a player, the player loses a life. After being hit, the player gets **3 seconds of invincibility** (\`invincibleUntil\` timestamp), and the bot is **pushed away** to a random adjacent walkable tile:

\`\`\`typescript
checkBotVsPlayers(bots: MapSchema<Bot>, players: MapSchema<Player>, mapKey?: string): PlayerCollisionResult {
  bots.forEach((bot) => {
    players.forEach((player) => {
      if (player.lives <= 0 || player.invincibleUntil > currentTime) return;

      if (bot.x === player.x && bot.y === player.y) {
        player.lives--;
        player.invincibleUntil = currentTime + 3000; // 3s invincibility

        // Push bot away to a random adjacent walkable tile
        const pushDirections = [
          { x: 1, y: 0 }, { x: -1, y: 0 },
          { x: 0, y: 1 }, { x: 0, y: -1 }
        ];
        const shuffled = pushDirections.sort(() => Math.random() - 0.5);

        for (const dir of shuffled) {
          const newX = bot.x + dir.x;
          const newY = bot.y + dir.y;
          if (this.isValidMove(newX, newY)) {
            bot.x = newX;
            bot.y = newY;
            break;
          }
        }
      }
    });
  });
}
\`\`\`

The push-away mechanic prevents the bot from immediately hitting the player again on the next frame, giving the invincibility time to kick in. The bot is pushed in a random valid direction, which adds a small element of unpredictability to the encounter.

### Multi-Map Collision Filtering

Since multiple maps can be active simultaneously (different players on different map depths), all collision checks filter by **map key** — a \`"depth_seed"\` string like \`"2_12345"\`. Bullets, bots, and players are only checked against entities on the same map.

---

## Difficulty Scaling

Each map depth increases the difficulty with scaling parameters:

\`\`\`typescript
export const DIFFICULTY_CONFIG = {
  baseBotsCount: 5,        // Starting bots at depth 0
  baseBotHealth: 100,      // Base HP
  baseBotSpeed: 333,       // ms between moves (lower = faster)
  baseObstaclePercent: 5,  // % of floor tiles

  botsPerDepth: 2,         // +2 bots per map
  healthPerDepth: 25,      // +25 HP per map
  speedReductionPerDepth: 15, // 15ms faster per map
  obstaclePercentPerDepth: 1, // +1% obstacles

  // Caps to prevent impossibility
  maxBots: 30,
  maxHealth: 300,
  minSpeed: 150,           // Can't go below 150ms
  maxObstaclePercent: 15,
};
\`\`\`

The caps are important — without them, bots would eventually move faster than the game loop can process, or the map would be so full of obstacles there'd be nowhere to walk.

---

## What I Learned

**Seeds are essential for multiplayer procedural generation.** You can't send a 120×120 grid over the wire — you send a seed and let both sides generate the same result. This also makes it trivial to cache and revisit maps.

**Manhattan vs Euclidean distance isn't interchangeable.** Manhattan is for grid costs, Euclidean is for spatial proximity. Using the wrong one leads to subtle bugs — A* would still work with Euclidean but would expand unnecessary nodes.

**Pathfinding needs to be budgeted.** Running A* for 30 bots every frame on a 14,400-tile grid is expensive. The queue system (max 3 concurrent calculations) with smart recalculation triggers keeps it manageable.

**Tile-based collision is underrated.** For a grid game, checking "same tile" is dead simple and perfectly accurate. No need for AABB or circle collision when your entire world is a grid.

**Colyseus makes multiplayer approachable.** The schema system means you just mutate state and clients update automatically. The room lifecycle handles the messy parts (join/leave/reconnect). I went from zero multiplayer experience to an 8-player game in a reasonable timeframe.

**BFS validation during map generation prevents unsolvable maps.** Placing obstacles randomly can block the only path between spawn and exit. Checking connectivity after each placement is cheap insurance.

**State machines make bot AI readable.** The HUNT/KITE/RETREAT FSM is simple to understand, debug, and extend — much better than a giant if/else tree.

This project taught me more about real-time systems, algorithms, and game architecture than any tutorial could. If you're looking to level up in these areas, I'd highly recommend building a multiplayer game from scratch.`,
  },
];

export function getBlogPost(
  slug: string
): (BlogPost & { body: string }) | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.map(({ body: _body, ...rest }) => rest);
}
