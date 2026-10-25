const r = require("raylib");

function setup() {
    const screen = {
        width: 1600,
        height: 800,
        title: "Random in range",
    };
    r.InitWindow(screen.width, screen.height, screen.title);
    r.SetTargetFPS(1);
    r.SetTraceLogLevel(r.LOG_NONE);

    const range = {
        start: -50,
        end: 50,
    };

    return { range, screen };
}

function getRandom(start, end) {
    return start + Math.random() * (end - start);
}
function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.WHITE);

    const start = world.range.start;
    const end = world.range.end;

    let randomWidth = getRandom(start, end);
    let position = 0;

    while (position <= world.screen.width) {
        r.DrawRectangle(position, 0, randomWidth, world.screen.height, r.BLUE);
        position += randomWidth + 3;
        randomWidth = getRandom(start, end);
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
