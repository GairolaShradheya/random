const r = require("raylib");

function setup() {
    const screen = {
        width: 1600,
        height: 800,
        title: "Random points inside parallelogram",
    };
    r.InitWindow(screen.width, screen.height, screen.title);
    r.SetTargetFPS(10);
    r.SetTraceLogLevel(r.LOG_ERROR);

    const color = {
        r: 255,
        g: 255,
        b: 0,
        a: 200,
    };

    const pGram = {
        pos: {
            x: 500,
            y: 100,
        },
        width: 800,
        height: 600,
        angle: 120,
    };

    pGram.diff = pGram.height * Math.tan(toRadian(pGram.angle - 90));

    return { screen, pGram, color };
}

function toRadian(angle) {
    return angle * (Math.PI / 180);
}

function randomBetween(start, end) {
    return start + Math.random() * (end - start);
}

function drawPGram(pGram) {
    const point2 = {
        x: pGram.pos.x + pGram.width,
        y: pGram.pos.y,
    };

    const point3 = {
        x: pGram.pos.x - pGram.diff,
        y: pGram.pos.y + pGram.height,
    };

    const point4 = {
        x: point2.x - pGram.diff,
        y: pGram.pos.y + pGram.height,
    };

    r.DrawLineEx(pGram.pos, point2, 5, r.WHITE);
    r.DrawLineEx(pGram.pos, point3, 5, r.WHITE);
    r.DrawLineEx(point2, point4, 5, r.WHITE);
    r.DrawLineEx(point3, point4, 5, r.WHITE);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

    const pGram = world.pGram;

    drawPGram(pGram);

    for (let i = 0; i < 100; i++) {
        const yPoint = randomBetween(pGram.pos.y, pGram.pos.y + pGram.height);

        const xShift =
            (yPoint - pGram.pos.y) * Math.tan(toRadian(pGram.angle - 90));

        const xPoint = randomBetween(
            pGram.pos.x - xShift,
            pGram.pos.x - xShift + pGram.width,
        );

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
