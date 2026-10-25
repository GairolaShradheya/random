const r = require("raylib");

function setup() {
    const screen = {
        width: 1600,
        height: 800,
        title: "Random points inside circle",
    };
    r.InitWindow(screen.width, screen.height, screen.title);
    r.SetTargetFPS(5);
    r.SetTraceLogLevel(r.LOG_NONE);

    const color = {
        r: 255,
        g: 250,
        b: 0,
        a: 100,
    };

    const circle = {
        center: {
            x: 0,
            y: 0,
        },
        radius: 800,
        angle: 0,
    };

    return { screen, circle, color };
}

function getRandom(start, end) {
    return start + Math.random() * (end - start);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

    r.DrawCircleLines(
        world.circle.center.x,
        world.circle.center.y,
        world.circle.radius,
        r.WHITE,
    );

    for (let i = 0; i < 100; i++) {
        const xPoint =
            getRandom(0, world.circle.radius) * Math.cos(world.circle.angle);
        const yPoint =
            getRandom(0, world.circle.radius) * Math.sin(world.circle.angle);
        world.circle.angle = getRandom(0, Math.PI / 2);

        r.DrawCircle(xPoint, yPoint, 15, world.color);
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
