const r = require("raylib");

function setup() {
    const screen = {
        width: 1600,
        height: 800,
        title: "Random points inside translated circle",
    };
    r.InitWindow(screen.width, screen.height, screen.title);
    r.SetTargetFPS(5);
    r.SetTraceLogLevel(r.LOG_NONE);

    const color = {
        r: 255,
        g: 255,
        b: 0,
        a: 200,
    };

    const circle = {
        center: {
            x: 800,
            y: 400,
        },
        radius: 300,
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

    const xCenter = world.circle.center.x;
    const yCenter = world.circle.center.y;

    r.DrawCircleLines(xCenter, yCenter, world.circle.radius, r.WHITE);

    for (let i = 0; i < 200; i++) {
        const xPoint =
            getRandom(0, world.circle.radius) * Math.cos(world.circle.angle) +
            xCenter;
        const yPoint =
            getRandom(0, world.circle.radius) * Math.sin(world.circle.angle) +
            yCenter;
        world.circle.angle = getRandom(0, 2 * Math.PI);

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
