const r = require("raylib");

function randomBetween(start, end) {
    return Math.trunc(start + Math.random() * (end - start));
}

function randoms(start, end, num) {
    let sum = 0;
    for (let i = 0; i < num; i++) {
        sum += randomBetween(start, end);
    }
    return Math.trunc(sum / num);
}

function setup() {
    const screen = {
        width: 1500,
        height: 900,
        title: "Random points inside parallelogram",
    };
    r.InitWindow(screen.width, screen.height, screen.title);
    r.SetTargetFPS(10);
    r.SetTraceLogLevel(r.LOG_ERROR);

    const points = [];
    const pointCount = {};
    let partition1 = 30;
    let partition2 = 9;

    for (let i = 0; i < 1500; i++) {
        const randomX = randoms(0, 1500, partition2);
        const randomY = randoms(0, 900, partition1);
        points.push({ x: randomX, y: randomY });
    }

    for (const point of points) {
        if (pointCount[point.x] === undefined) {
            pointCount[point.x] = 0;
        } else {
            pointCount[point.x]++;
        }
    }

    // console.log(pointCount);

    return { screen, points, pointCount };
}

function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLUE);

    // for (const point of world.points) {
    //     r.DrawCircleV(point, 8, r.RED);
    // }

    for (const point of Object.keys(world.pointCount)) {
        // console.log(parseInt(point));
        const center = {
            x: parseInt(point),
            y: world.pointCount[point] * -30 + 500,
        };
        r.DrawCircleV(center, 4, r.WHITE);
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
