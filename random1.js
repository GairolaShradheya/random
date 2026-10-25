const r = require("raylib");

function setup() {
    r.InitWindow(800, 800, "random");
    r.SetTargetFPS(10);
    r.SetTraceLogLevel(r.LOG_NONE);

    const number = 0;

    return { number };
}
function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    r.DrawRectangle(world.number, 200, 30, 30, r.WHITE);

    r.EndDrawing();
}

function update(world) {
    world.number = Math.random() * 800;
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
