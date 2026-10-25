const r = require("raylib");

function setup() {
    const screen = {
        width: 1600,
        height: 800,
        title: "Random points",
    };
    r.InitWindow(screen.width, screen.height, screen.title);
    r.SetTargetFPS(1);
    r.SetTraceLogLevel(r.LOG_NONE);

    return { screen };
}

function getRandom(start, end) {
    return start + Math.random() * (end - start);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

    const color = {
        r: 255,
        g: 255,
        b: 255,
        a: 100,
    };

    for (let i = 0; i < 100; i++) {
        const xPoint = getRandom(0, world.screen.width);
        const yPoint = getRandom(0, world.screen.height);
        r.DrawCircle(xPoint, yPoint, 15, color);
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
