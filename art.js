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
        width: 1024,
        height: 1024,
        title: "Art",
    };
    r.InitWindow(screen.width, screen.height, screen.title);
    r.SetTargetFPS(10);

    const gap = 16;
    const texture = {
        width: 64,
        height: 32,
    };

    const target = r.LoadRenderTexture(texture.width, texture.height);

    const tri1 = {
        v1: getPoints(0, 0),
        v2: getPoints(0, texture.height),
        v3: getPoints(texture.width / 2, 0),
    };
    const tri2 = {
        v1: getPoints(texture.width / 2, texture.height),
        v2: getPoints(texture.width, texture.height),
        v3: getPoints(texture.width, 0),
    };

    r.BeginTextureMode(target);
    r.ClearBackground(r.WHITE);
    r.DrawTriangle(tri1.v1, tri1.v2, tri1.v3, r.BLUE);
    r.DrawTriangle(tri2.v1, tri2.v2, tri2.v3, r.BLUE);
    r.EndTextureMode();

    const rectangle1 = getRect(texture, 0);
    const rectangle2 = getRect(texture, texture.width / 2);

    return { screen, target, gap, rectangle1, rectangle2 };
}

function drawPattern(condition, row, col, rPos, cPos, world) {
    const txtr = world.target.texture;
    const x =
        (cPos + 1) * world.gap + cPos * 320 + col * world.rectangle1.width;
    const y =
        (rPos + 1) * world.gap + rPos * 320 + row * world.rectangle1.height;
    const rect = condition ? world.rectangle1 : world.rectangle2;
    r.DrawTextureRec(txtr, rect, { x, y }, r.WHITE);
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const patterns = [
                { x: 0, y: 0, cond: row % 2 === 0 },
                { x: 0, y: 1, cond: col % 2 === 0 },
                { x: 0, y: 2, cond: (row + col) % 2 === 0 },
                { x: 1, y: 0, cond: ((row + col) % 3) % 2 === 0 },
                { x: 1, y: 1, cond: (row * col) % 2 === 0 },
                { x: 1, y: 2, cond: ((row * col) % 3) % 2 === 0 },
                {
                    x: 2,
                    y: 0,
                    cond: row < col ? col % 2 === 0 : row % 2 === 0,
                },
                {
                    x: 2,
                    y: 1,
                    cond: row < col ? row % 2 === 0 : col % 2 === 0,
                },
                { x: 2, y: 2, cond: row < col },
            ];

            for (const ptrn of patterns) {
                drawPattern(ptrn.cond, row, col, ptrn.x, ptrn.y, world);
            }
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
