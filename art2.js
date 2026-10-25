const r = require("raylib");

function getPoints(x, y) {
    return { x, y };
}
function getRect(texture, x) {
    return {
        x: x,
        y: 0,
        width: texture.width / 2,
        height: texture.height,
    };
}

function setup() {
    const screen = {
        width: 800,
        height: 800,
        title: "Art",
    };
    r.InitWindow(screen.width, screen.height, screen.title);
    r.SetTargetFPS(10);

    return { screen };
}

function drawPattern(x, y) {
    r.DrawCircle(x, y, 40, { r: 0, g: 0, b: 0, a: 50 });
    r.DrawCircle(x, y, 35, r.WHITE);
    r.DrawCircle(x, y, 25, r.GOLD);
    r.DrawCircle(x, y, 10, r.PINK);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

    for (let i = 0; i <= 840; i += 45) {
        for (let j = 25; j <= 840; j += 45) {
            drawPattern(i, j);
        }
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
