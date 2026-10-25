const r = require("raylib");

function setup() {
    const screen = {
        width: 1600,
        height: 800,
        title: "Random points inside rectangle",
    };
    r.InitWindow(screen.width, screen.height, screen.title);
    r.SetTargetFPS(10);
    r.SetTraceLogLevel(r.LOG_NONE);

    const color = {
        r: 255,
        g: 255,
        b: 255,
        a: 100,
    };

    const rectangle = {
        x: 10,
        y: 100,
        width: 800,
        height: 600,
    };

    return { screen, rectangle, color };
}

function getRandom(start, end) {
    return start + Math.random() * (end - start);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

    r.DrawRectangleLinesEx(world.rectangle, 8, r.WHITE);

    for (let i = 0; i < 100; i++) {
        const xPoint = getRandom(
            world.rectangle.x,
            world.rectangle.x + world.rectangle.width,
        );
        const yPoint = getRandom(
            world.rectangle.y,
            world.rectangle.y + world.rectangle.height,
        );
        r.DrawCircle(xPoint, yPoint, 15, world.color);
    }

    r.EndDrawing();
}

function update(world) {
    world.rectangle.x += 10;
}

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
