const r = require("raylib");

function randomBetween(start, end) {
    return Math.trunc(start + Math.random() * (end - start));
}

function averageOfRandom(start, end, numberOfRandoms) {
    let sum = 0;
    for (let i = 0; i < numberOfRandoms; i++) {
        sum += randomBetween(start, end);
    }
    return Math.trunc(sum / numberOfRandoms);
}

function createTexture(colour) {
    const target = r.LoadRenderTexture(300, 200);

    r.BeginTextureMode(target);
    r.ClearBackground(r.WHITE);

    const numberOfRandoms = 500;
    const numberOfPoints = 900;

    for (let i = 0; i < numberOfPoints; i++) {
        const x = averageOfRandom(0, 300, numberOfRandoms);
        const y = averageOfRandom(0, 200, numberOfRandoms);
        r.DrawCircleV({ x, y }, 25, colour);
    }
    r.EndTextureMode();

    return target;
}

function setup() {
    const screen = {
        width: 900,
        height: 900,
        title: "Random things",
    };
    r.InitWindow(screen.width, screen.height, screen.title);
    r.SetTargetFPS(10);
    r.SetTraceLogLevel(r.LOG_ERROR);

    const targets = [
        createTexture(r.RED),
        createTexture(r.GREEN),
        createTexture(r.ORANGE),
        createTexture(r.GOLD),
        createTexture(r.BLUE),
        createTexture(r.BLACK),
        createTexture(r.PINK),
        createTexture(r.VIOLET),
        createTexture(r.SKYBLUE),
    ];

    return { screen, targets };
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.WHITE);

    let index = 0;
    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 3; column++) {
            r.DrawTexture(
                world.targets[index].texture,
                300 * row,
                column * 300,
                r.WHITE,
            );
            index++;
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
