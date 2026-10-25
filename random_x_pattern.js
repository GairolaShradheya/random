const r = require("raylib");

function setup() {
    const screen = {
        width: 1600,
        height: 800,
        title: "Random Pattern",
    };
    r.InitWindow(screen.width, screen.height, screen.title);
    r.SetTargetFPS(1);
    r.SetTraceLogLevel(r.LOG_NONE);

    const number = 50;

    return { number, screen };
}
function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.WHITE);

    let randomWidth = Math.trunc(Math.random() * world.number);
    let position = 0;

    while (position <= world.screen.width) {
        r.DrawRectangle(position, 0, randomWidth, world.screen.height, r.BLUE);
        position += randomWidth + 3;
        randomWidth = Math.trunc(Math.random() * world.number);
    }

    r.EndDrawing();
}

function update(world) {
    // world.number = Math.random() * 800;
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
