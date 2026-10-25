const r = require("raylib");

function randomBetween(start, end) {
    return Math.trunc(start + Math.random() * (end - start));
}

function randomCoordinate() {
    const y = randomBetween(50, 743);
    const xShift = (y - 50) * Math.tan(Math.PI / 6);
    const x = randomBetween(800 - xShift, 800 + xShift);
    return { x, y };
}

function setup() {
    const screen = {
        width: 1600,
        height: 800,
        title: "Random points inside rectangle",
    };
    r.InitWindow(screen.width, screen.height, screen.title);
    r.SetTargetFPS(10);
    r.SetTraceLogLevel(r.LOG_NONE);

    const corners = [
        { x: 400, y: 743 },
        { x: 800, y: 50 },
        { x: 1200, y: 743 },
    ];

    const triangle = {
        v1: corners[0],
        v2: corners[1],
        v3: corners[2],
    };

    const points = [];

    const randomPoint = randomCoordinate();

    for (let i = 0; i < 100000; i++) {
        const randomCorner = corners[randomBetween(0, 3)];

        randomPoint.x = (randomCorner.x + randomPoint.x) / 2;
        randomPoint.y = (randomCorner.y + randomPoint.y) / 2;

        points.push({ x: randomPoint.x, y: randomPoint.y });
    }

    return { screen, triangle, points, corners };
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

    r.DrawTriangleLines(
        world.triangle.v1,
        world.triangle.v2,
        world.triangle.v3,
        r.WHITE,
    );

    // for (const line of world.lines) {
    //     r.DrawLineEx(line[0], line[1], 3, r.WHITE);
    // }

    for (const point of world.points) {
        r.DrawCircle(point.x, point.y, 2, r.WHITE);
    }

    r.EndDrawing();
}

function update(world) {}

function teardown() {
    r.CloseWindow();
}
function loop(world) {
    while (!r.WindowShouldClose()) {
        draw(world);
        update(world);
    }
    teardown();
}
function main() {
    const world = setup();
    loop(world);
}

main();
